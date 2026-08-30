#!/usr/bin/env python3
"""SG기전 자동 블로그 생성기.

큐(_queue.yaml)에서 다음 pending 주제를 가져와 Claude API로 MDX 포스트를
생성하고, content/blog/에 저장한 뒤 큐를 업데이트한다. 큐가 소진되면
Claude가 스스로 새 주제를 발굴한다.

실행:
    ANTHROPIC_API_KEY=sk-ant-... python scripts/generate-blog-post.py

환경변수:
    ANTHROPIC_API_KEY (필수)
    CLAUDE_MODEL      (선택, 기본 claude-opus-5)
"""
from __future__ import annotations

import datetime
import os
import pathlib
import re
import sys

import yaml
from anthropic import Anthropic

# ─── 설정 ────────────────────────────────────────────────
ROOT = pathlib.Path(__file__).parent.parent
CONTENT_DIR = ROOT / "content" / "blog"
QUEUE_FILE = CONTENT_DIR / "_queue.yaml"
MODEL = os.environ.get("CLAUDE_MODEL", "claude-opus-5")
MIN_WORD_COUNT = 1500
BANNED_PHRASES = [
    "박재영",
    "12년 경력",
    "1000+ 제작 실적",
    "1000+ 납품",
    "경기도 화성",
    "화성 공장",
    "화성시",
]


# ─── 큐 조작 ────────────────────────────────────────────
def load_queue() -> dict:
    with open(QUEUE_FILE, encoding="utf-8") as f:
        return yaml.safe_load(f)


def save_queue(queue: dict) -> None:
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        yaml.dump(
            queue,
            f,
            allow_unicode=True,
            sort_keys=False,
            default_flow_style=False,
            width=100,
        )


def next_pending(queue: dict) -> tuple[int | None, dict | None]:
    """Return (idx, topic) for the next pending item, or (None, None)."""
    for i, t in enumerate(queue["topics"]):
        if t.get("status", "pending") == "pending":
            return i, t
    return None, None


# ─── 기존 포스트 인벤토리 ─────────────────────────────
def existing_posts() -> list[tuple[str, str]]:
    """Return [(title, slug), ...] for all non-draft posts sorted newest first."""
    items: list[tuple[str, str, str]] = []  # (date, title, slug)
    for p in CONTENT_DIR.glob("*.mdx"):
        if p.name.startswith("_"):
            continue
        text = p.read_text(encoding="utf-8")
        if "draft: true" in text:
            continue
        title_m = re.search(r'^title:\s*"?([^"\n]+)"?', text, re.MULTILINE)
        date_m = re.search(r"^date:\s*(\S+)", text, re.MULTILINE)
        if not title_m:
            continue
        title = title_m.group(1).strip().strip('"')
        date_val = date_m.group(1) if date_m else "0000-00-00"
        items.append((date_val, title, p.stem))
    items.sort(reverse=True)
    return [(t, s) for _, t, s in items]


# ─── 프롬프트 조립 ─────────────────────────────────────
def build_system_prompt(posts_inventory: list[tuple[str, str]]) -> str:
    posts_list = "\n".join(
        f"- [{title}](/blog/{slug})" for title, slug in posts_inventory
    )
    banned_list = "\n".join(f"- {p}" for p in BANNED_PHRASES)
    today = datetime.date.today().isoformat()

    return f"""당신은 SG기전(한국 B2B 분전반·컨트롤박스 맞춤 제조업체) 블로그의 시니어 콘텐츠 에디터이자 SEO 브리프 스페셜리스트입니다.

## 미션

"경쟁 페이지보다 명확히 상위에 오를 수 있는" 한국어 B2B 블로그 포스트 한 편을 MDX로 생성합니다. 단순한 정보 전달이 아니라 **고객의 구매 문제를 해결하고 견적 문의를 만들어내는 것**이 최종 목적입니다.

---

## 1. 검색 의도 · 페이지 타입 결정 (내부 추론)

먼저 주제의 검색 의도를 판별하고 그에 맞는 페이지 포맷을 씁니다:

- **Informational(정보 탐색)**: 개념·규정·비교 가이드 → 장문 가이드형
- **Commercial(구매 검토)**: 벤더 선정·비교·후기 → 판단 기준 + 사례
- **Transactional(구매 실행)**: 견적·주문 · 문의 → 짧고 실행 지향 랜딩
- **Navigational**: 특정 브랜드 검색 → 이 프로젝트엔 거의 없음

한국 B2B 분전반 시장 특성상 대부분 **Informational + Commercial 하이브리드**입니다.

---

## 2. Information Gain (반드시 담을 것)

이 글이 기존 랭킹 페이지들과 비교해 **어떤 새 가치**를 제공하는지 최소 하나는 확실히 담아야 합니다:

- **실제 납품 사례 데이터** (경기대학교 옥외 IP65 SUS · 서울교통공사 관제센터 TPS실 · 목동 오피스텔 세대분전반 · 학교/공공기관 대량 발주 등)
- **KEC/KS 규정 조항 인용** (예: "KEC 132.3에 따르면...")
- **실무 체크리스트/판정 기준표** — 독자가 그 자리에서 복붙해 쓸 수 있는 것
- **엔지니어 관점의 오류 사례** — "이 부분을 놓쳐서 재작업했다"
- **정확한 수치 규격** (부스바 허용 전류표, MCCB kA 기준, IP 등급 비교)

"더 자세히", "더 잘 정리" 같은 모호한 gain은 무효.

---

## 3. E-E-A-T 신호 (모든 글에 명시적으로 삽입)

- **Experience (경험)**: 자체 공장에서 직접 제작·시공한 사례 · 발주처 요구사항 반영 실례
- **Expertise (전문성)**: 국가 자격증(건축기사·전기기능사) 보유 인력이 도면 검토 · 정확한 규격 용어(MCCB · ELB · AF · AT · kA · IP · SUS · KEC · KS) 사용
- **Authoritativeness (권위)**: LS일렉트릭 등 공인 제조사 정품 부품 · 대학·공공기관 납품 실적 언급
- **Trust (신뢰)**: 전화·이메일·스마트스토어 3채널 CTA · 실제 회사 정보 노출 · 성능 시험 성적서 제공 가능 언급

---

## 4. 키워드 배치 규칙 (엄격히 준수)

주 키워드(사용자가 제시한 첫 번째 검색어)는 **자연스럽게** 다음 6곳에 반드시 등장:

1. `title` (60자 이내, 앞쪽에)
2. `description` (첫 100자 안에)
3. 첫 문단 (첫 100자 안에)
4. 최소 1개의 H2 안에
5. URL slug (이미 topic에서 지정됨)
6. 커버 이미지의 alt는 title로 자동 처리되므로 별도 조치 불필요

보조 키워드 5-8개: 본문·H2·태그에 자연스럽게 분산. 억지 반복 금지.
의미적 관련어(entities): KEC · KS · MCCB · ELB · IP등급 · 부스바 · 정품 차단기 · LS일렉트릭 · 접지 · 극수 등을 주제와 관련 있으면 자연스럽게 언급.

---

## 5. 콘텐츠 구조 (엄수) — 7단계 페인해결 프레임

1. **제목** — 고객 상황 명시 (질문형 또는 페인 재현형). 예: "기성 CCTV 함체가 작아서 장비를 겹쳐 넣고 있나요?"
2. **첫 문단** — 페인 재현. 독자가 "이건 내 얘기다" 느끼게 (2-3문장)
3. **방치 시 문제** — 재작업·발열·검수 지적·일정 지연 등 구체적 손실
4. **판단 기준·체크리스트** — 독자가 발주 전 사용할 수 있는 실무 리스트
5. **SG기전 해결 방식** — 자체 공장 CNC 정밀 가공 · KEC 준수 · LS 정품 · 도면 지원
6. **Proof/사례** — 실제 납품 케이스 언급 (경기대·서울교통공사 등)
7. **낮은 마찰 CTA** — "사진과 치수 어떻게 보내면 견적이 시작되는지" 안내

---

## 6. 형식 요구사항

### Frontmatter (반드시 이 순서로)
```
---
title: "..."          # 60-90자, 주 키워드 앞쪽 배치
description: "..."    # 130-155자, 주 키워드 첫 100자 안, USP 포함, CTA로 끝
date: {today}
tags:                 # 5-12개, 주+보조 키워드
  - ...
cover: /images/...    # 아래 4개 중 하나
draft: false
---
```

커버 이미지 선택지 (주제에 맞게 하나):
- `/images/product-main.jpg` — 실내 정밀 분전반
- `/images/product-cabinet.jpg` — 표준 분전함·제어함
- `/images/product-construction.jpg` — 가설 분전반·건설 현장
- `/images/product-orange.jpg` — 옥외 방수·IP65

### 본문 · 마이크로 규칙

- **분량**: 1,500~1,900 어절 (한국어 기준). 짧으면 얕고, 길면 이탈.
- **H2 개수**: 최소 5개, 최대 8개. 모두 **질문형** 또는 실무 명령형 (예: "발주 전 확인해야 할 7가지는?")
- **각 H2 아래 본문**: 답 우선(answer-first) 구조. 첫 2-3문장에 결론, 그다음 근거. 이상적 패시지 길이 134-167 어절 (AI 검색 인용 최적).
- **표 (마크다운 `| ... |`)**: 최소 1개 삽입. 규격 비교 · 체크리스트 · 사양 정리 등에 활용.
- **불릿·번호 리스트**: 절차·기준·항목 나열에 적극 활용.
- **강조**: 핵심 용어에 `**bold**`. 남용 금지 (문단당 1-3회).
- **인용 · Callout**: `<Callout variant="info" title="핵심 요약">` 또는 `variant="warning" title="주의"` 로 결정적 인사이트 시각화.
- **ContactCta**: 본문 상단(문제 정의 직후)과 하단(FAQ/다음 읽을거리 직전) **각 1회 이상**. headline은 문맥에 맞게 (예: "맞춤 견적 · 도면 상담", "긴급 발주 · 서울 대응").
- **자주 묻는 질문 (Q&A)**: 말미 근처에 `## 자주 묻는 질문` 섹션 필수. Q 3-5개, 각 A 2-4문장. 이 섹션은 AI 검색(ChatGPT, Perplexity, AI Overviews) 인용에 최적.
- **내부 링크**: 본문 안에 인라인으로 자연스럽게 3-5개, 말미 `## 다음 읽을거리`에 3-5개. 아래 인벤토리에서만 선택.

### 저자 바이라인
페이지 템플릿이 자동 삽입합니다. 본문에 "저자:" 등을 쓰지 마세요.

---

## 7. 절대 사용 금지 어구
{banned_list}

- 회사 위치는 "자체 공장"으로만.
- 경력 연수·제작 실적 수치는 만들지 마세요.
- 회사 강점 표현: "국가 자격증 보유", "다양한 특수 목적 납품 경험", "자체 공장 직접 제작", "KEC/KS 규정 준수", "LS일렉트릭 등 정품 차단기".

### Website Relevance Rule (핵심)
SG기전이 실제로 제공하는 것만 다루세요:
- ✅ 분전반 · 분전함 · 제어함 · 컨트롤박스 맞춤 제작
- ✅ 철제·SUS304 스테인리스·옥외 IP 함체
- ✅ CNC 레이저 타공 · 분체 도장
- ✅ 도면 지원 · 실측 방문 · 반복 발주
- ❌ 시공(전기공사)·유지보수 서비스는 SG기전이 직접 하지 않음
- ❌ 설치 인력 파견도 아님

---

## 8. 활용 가능한 기존 포스트 (내부 링크 대상)

아래에서만 3-5개 골라 본문 인라인 + `## 다음 읽을거리` 섹션에 배치:

{posts_list}

---

## 9. MDX 컴포넌트

- `<ContactCta headline="문맥에 맞는 문구" />` — 다크 CTA 카드 (전화·이메일·스마트스토어 자동 표시). **최소 2회**.
- `<Callout variant="info" title="핵심 요약">본문</Callout>` — 노랑 강조 박스.
- `<Callout variant="warning" title="주의">본문</Callout>` — 경고 박스.

컴포넌트 안에도 마크다운 사용 가능. 컴포넌트 자체는 JSX 태그로 작성.

---

## 10. 출력 규칙 (엄수)

- 오직 MDX 파일의 완전한 본문만 출력 (`---`부터 시작)
- 파일 앞뒤에 설명·인사·코드블록 마크(``` 등) **절대 금지**
- 파일명·저장 지시 등 포함 금지
- 브리프 · 아웃라인 · 메타 코멘트 없이 바로 최종 콘텐츠만
"""


def build_user_prompt(topic: dict) -> str:
    keywords = ", ".join(topic.get("keywords", []))
    return f"""다음 주제로 블로그 포스트 한 편을 작성해주세요.

- **Slug (URL)**: `{topic['slug']}`
- **제목 초안**: {topic['title']}
- **타겟 세그먼트**: {topic['segment']}
- **콘텐츠 앵글**: {topic['angle']}
- **핵심 Pain**: {topic['pain']}
- **커버할 검색어**: {keywords}

제목은 초안을 그대로 쓰거나, 더 매력적인 문구로 다듬어도 됩니다 (단 slug URL은 유지). Frontmatter의 tags에는 위 검색어들이 자연스럽게 포함되도록 하세요.

바로 MDX 본문을 출력해주세요."""


# ─── 검증 ────────────────────────────────────────────────
def validate_mdx(text: str) -> tuple[bool, str]:
    if not text.startswith("---"):
        return False, "Frontmatter 시작 마커(---) 없음"
    parts = text.split("---", 2)
    if len(parts) < 3:
        return False, "Frontmatter 종료 마커 없음"
    fm, body = parts[1], parts[2]

    for field in ("title:", "description:", "date:", "tags:", "draft:"):
        if field not in fm:
            return False, f"Frontmatter에 {field} 없음"
    if "draft: true" in fm:
        return False, "draft: true 상태"

    h2_count = len(re.findall(r"^##\s", body, re.MULTILINE))
    if h2_count < 4:
        return False, f"H2 개수 부족 ({h2_count} < 4)"

    words = re.findall(r"[가-힣a-zA-Z0-9]+", body)
    if len(words) < MIN_WORD_COUNT:
        return False, f"어절 수 부족 ({len(words)} < {MIN_WORD_COUNT})"

    for phrase in BANNED_PHRASES:
        if phrase in body:
            return False, f"금지 어구 포함: {phrase}"

    if "<ContactCta" not in body:
        return False, "<ContactCta /> 컴포넌트 없음"

    return True, "OK"


# ─── 생성 · 발굴 ─────────────────────────────────────────
def strip_code_fence(text: str) -> str:
    text = re.sub(r"^```[a-zA-Z]*\n", "", text)
    text = re.sub(r"\n```\s*$", "", text)
    return text.strip()


def generate_post(topic: dict, posts_inventory: list[tuple[str, str]]) -> str:
    client = Anthropic()
    system = build_system_prompt(posts_inventory)
    user = build_user_prompt(topic)

    for attempt in range(3):
        print(f"  Attempt {attempt + 1}/3 with {MODEL}...", flush=True)
        with client.messages.stream(
            model=MODEL,
            max_tokens=16000,
            system=system,
            messages=[{"role": "user", "content": user}],
        ) as stream:
            response = stream.get_final_message()

        text = "".join(b.text for b in response.content if b.type == "text").strip()
        text = strip_code_fence(text)

        ok, reason = validate_mdx(text)
        if ok:
            word_count = len(re.findall(r"[가-힣a-zA-Z0-9]+", text))
            print(f"  ✓ Validated: {word_count} 어절, {len(text)} chars", flush=True)
            usage = response.usage
            print(
                f"  📊 Tokens: in={usage.input_tokens}, "
                f"out={usage.output_tokens}, "
                f"cache_read={getattr(usage, 'cache_read_input_tokens', 0)}",
                flush=True,
            )
            return text

        print(f"  ✗ Validation failed: {reason}", flush=True)
        user += f"\n\n**이전 시도가 다음 이유로 실패했습니다**: {reason}. 이번엔 이 문제를 해결하세요."

    raise SystemExit(f"Generation failed after 3 attempts")


def curate_new_topic(posts_inventory: list[tuple[str, str]]) -> dict:
    """Ask Claude to propose a new topic when queue is exhausted."""
    client = Anthropic()
    posts_titles = "\n".join(f"- {title}" for title, _ in posts_inventory)

    system = """당신은 SG기전 블로그의 콘텐츠 전략가입니다. 지금까지 발행된 포스트 목록을 보고, 다음에 쓸 새로운 주제 하나를 YAML 형식으로 제안하세요.

## 규칙
- 기존 포스트와 주제 · 앵글 모두 중복되지 않을 것
- 7 고객 세그먼트 로테이션: 전기공사업체 · 시설관리자 · 보안업체 · LED전광판 · 건설회사 · 행사운영사 · 소방업체 · 검색유입
- 7 앵글 로테이션: 페인해결 · 시간단축 · 안전리스크 · 비용절감 · 편의성 · 품질신뢰 · 맞춤적합성 · 증거 · 구매가이드 · 검색유입
- 한국 B2B 분전반 시장의 실제 검색어를 반영 (부스바 · MCCB · 아크릴 · 옥외 · IP등급 · 서울교통공사 · 접지 · 매립 · 승압 · 배수펌프 · 조명 · 옥외 SUS 등)
- slug는 영문 kebab-case

## 출력 형식 (YAML만, 다른 설명 없이)

```yaml
slug: proposed-slug-in-english
title: "제안하는 한국어 제목"
segment: 세그먼트명
angle: 앵글명
pain: "핵심 Pain 한 줄"
keywords: [검색어1, 검색어2, 검색어3]
```
"""
    user = f"""지금까지 발행된 포스트 ({len(posts_inventory)}편):

{posts_titles}

다음에 쓸 새 주제 하나를 위 YAML 형식으로 제안해주세요."""

    response = client.messages.create(
        model=MODEL,
        max_tokens=1000,
        system=system,
        messages=[{"role": "user", "content": user}],
    )
    text = "".join(b.text for b in response.content if b.type == "text").strip()
    text = strip_code_fence(text)
    topic = yaml.safe_load(text)
    topic.setdefault("status", "pending")
    return topic


# ─── 메인 ───────────────────────────────────────────────
def main() -> None:
    queue = load_queue()
    posts_inventory = existing_posts()
    print(f"기존 포스트 인벤토리: {len(posts_inventory)}편", flush=True)

    idx, topic = next_pending(queue)

    if topic is None:
        print("큐 소진. Claude로 새 주제 발굴...", flush=True)
        topic = curate_new_topic(posts_inventory)
        queue["topics"].append(topic)
        idx = len(queue["topics"]) - 1
        print(f"발굴: {topic['slug']} — {topic['title']}", flush=True)

    date_str = datetime.date.today().isoformat()
    filename = f"{date_str}-{topic['slug']}.mdx"
    filepath = CONTENT_DIR / filename

    if filepath.exists():
        print(f"이미 존재하는 파일: {filename}. 큐 상태만 업데이트 후 종료.", flush=True)
        queue["topics"][idx]["status"] = "done"
        queue["topics"][idx]["published_slug"] = f"{date_str}-{topic['slug']}"
        queue["next_index"] = idx + 1
        save_queue(queue)
        return

    print(f"\n▶ 생성 시작: {topic['slug']} ({topic['segment']} · {topic['angle']})", flush=True)
    print(f"▶ 제목 초안: {topic['title']}\n", flush=True)

    mdx = generate_post(topic, posts_inventory)
    filepath.write_text(mdx, encoding="utf-8")
    print(f"\n✓ 저장 완료: {filepath.relative_to(ROOT)}", flush=True)

    queue["topics"][idx]["status"] = "done"
    queue["topics"][idx]["published_slug"] = f"{date_str}-{topic['slug']}"
    queue["next_index"] = idx + 1
    save_queue(queue)
    print(f"✓ 큐 업데이트: next_index={idx + 1}\n", flush=True)


if __name__ == "__main__":
    main()
