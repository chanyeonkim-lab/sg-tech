#!/usr/bin/env node
/**
 * IndexNow 핑 스크립트.
 * 실행 조건: VERCEL_ENV=production (프리뷰/로컬 빌드에서는 no-op)
 *
 * 수행:
 *   1. .velite/index.js 를 읽어 최근 7일 이내 게시/수정된 블로그 포스트 URL 수집
 *   2. 정적 라우트(홈, 제품, 블로그 리스트 등) 몇 개는 항상 함께 갱신
 *   3. https://api.indexnow.org/indexnow 로 JSON POST (Bing/Yandex 등이 공유)
 *
 * 실패해도 빌드는 통과시켜야 하므로 예외는 로깅만 하고 exit 0.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const HOST = "www.sg-powertech.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${HOST}`;
const KEY = "a966d5534eacc7eea330a3f3c960b491";
const RECENT_DAYS = 7;

const STATIC_ROUTES = ["/", "/blog", "/products", "/portfolio", "/about"];

function isProduction() {
  return process.env.VERCEL_ENV === "production" || process.env.INDEXNOW_FORCE === "1";
}

async function loadRecentPostUrls() {
  try {
    const veliteIndex = resolve(projectRoot, ".velite/index.js");
    const mod = await import(veliteIndex);
    const posts = mod.posts ?? [];
    const cutoff = Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000;
    return posts
      .filter((p) => !p.draft)
      .filter((p) => {
        const stamp = new Date(p.updated ?? p.date).getTime();
        return stamp >= cutoff;
      })
      .map((p) => `${SITE_URL}/blog/${p.slug}`);
  } catch (err) {
    console.warn("[indexnow] velite 로드 실패:", err.message);
    return [];
  }
}

async function ping(urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  console.log(`[indexnow] ${res.status} ${res.statusText} · ${urls.length}개 URL 제출`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.warn("[indexnow] 응답 본문:", text.slice(0, 500));
  }
}

async function main() {
  if (!isProduction()) {
    console.log("[indexnow] production 빌드 아님 → 건너뜀 (VERCEL_ENV=" + (process.env.VERCEL_ENV ?? "unset") + ")");
    return;
  }

  const recentPosts = await loadRecentPostUrls();
  const urls = Array.from(new Set([
    ...STATIC_ROUTES.map((r) => `${SITE_URL}${r}`),
    ...recentPosts,
  ]));

  if (urls.length === 0) {
    console.log("[indexnow] 제출할 URL 없음");
    return;
  }

  try {
    await ping(urls);
  } catch (err) {
    console.warn("[indexnow] 핑 실패:", err.message);
  }
}

main().catch((err) => {
  console.warn("[indexnow] 예외:", err.message);
});
