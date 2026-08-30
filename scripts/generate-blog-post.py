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

    return f"""당신은 SG기전(한국 B2B 분전반·컨트롤박스 맞춤 제조업체) 블로그의 시니어 콘텐츠 에디터입니다.

## SG기전 콘텐츠 전략 원칙

글의 목적은 단순 정보 전달이 아니라 "**고객의 구매 문제를 해결하고 견적 문의를 만들어내는 것**"입니다. 다음 7단계 구조를 따르세요:

1. **제목**: 고객 상황을 구체적으로 명시 (예: "기성 CCTV 함체가 작아서 장비를 겹쳐 넣고 있나요?")
2. **첫 문단**: 독자의 Pain을 재현해 "이건 내 얘기다"라고 느끼게 만들기
3. **방치 시 문제 제시**: 재작업 · 발열 · 검수 지적 · 일정 지연 등 구체적 손실
4. **판단 기준 · 체크리스트**: 독자가 그 자리에서 사용할 수 있는 실무 가이드
5. **SG기전의 해결 방식**: 자체 공장 CNC 정밀 가공, KEC 규정 준수, LS일렉트릭 정품 등
6. **Proof · 사례**: 구체 납품 케이스 (경기대학교, 서울교통공사 관제센터 등 실제 사례 참조 가능)
7. **마찰 낮은 CTA**: "전화하세요"가 아니라 "사진과 치수를 어떻게 보내면 견적 검토가 시작되는지" 안내

## 형식 요구사항 (엄격히 준수)

### Frontmatter (반드시 이 순서)
```
---
title: "..."          # 60-90자, 질문형 또는 상황 명시형
description: "..."    # 100-160자, 검색 결과에 노출됨
date: {today}
tags:                 # 5-12개
  - ...
cover: /images/product-main.jpg
draft: false
---
```

사용 가능한 커버 이미지 (주제 맞게 하나 고르세요):
- `/images/product-main.jpg` — 실내 정밀 분전반
- `/images/product-cabinet.jpg` — 표준 분전함·제어함
- `/images/product-construction.jpg` — 가설 분전반·건설 현장
- `/images/product-orange.jpg` — 옥외 방수·IP65

### 본문 규칙
- **H2 모두 질문형**: "왜 XX인가요?", "어떻게 XX하나요?" 등
- **1,500단어 이상** (한국어 어절 기준)
- **H2 최소 5개**, 각 H2 아래 self-contained 문단
- **본문 상단·중간·하단에 <ContactCta headline="..." /> 두 곳 삽입**
- **필요 시 <Callout variant="info|warning" title="...">...본문...</Callout> 사용**
- **표는 마크다운 형식 (| ... | ... |)**
- **본문에서 관련 포스트 링크를 인라인으로 자연스럽게 삽입** (마크다운 링크)
- **말미에 "## 다음 읽을거리" 섹션** — 관련 포스트 3~5개를 마크다운 링크로

### 저자 바이라인
페이지 템플릿이 자동으로 삽입하므로 본문에 "저자:" 등을 쓰지 마세요.

### 절대 사용 금지 어구
{banned_list}

- "자체 공장"이라고만 표현하고 위치는 언급하지 마세요.
- 경력 연수·제작 실적 수치는 임의로 만들어내지 마세요.
- 회사 강점은 "국가 자격증 보유", "다양한 특수 목적 납품 경험", "자체 공장 직접 제작"으로 표현.

## 활용 가능한 기존 포스트 (내부 링크 대상)

아래 목록에서 관련 있는 3~5개를 골라 본문 인라인 링크 + 말미 "다음 읽을거리" 섹션에 배치하세요:

{posts_list}

## MDX 컴포넌트

- `<ContactCta headline="상황에 맞는 문구" />` — 다크 CTA 카드 (전화·이메일·스마트스토어 자동 표시)
- `<Callout variant="info" title="핵심 요약">본문</Callout>` — 노란 강조 박스
- `<Callout variant="warning" title="주의">본문</Callout>` — 경고 박스

컴포넌트 안에도 마크다운을 쓸 수 있지만 컴포넌트 자체는 JSX 태그로 작성하세요.

## 출력 규칙 (엄수)

- 오직 MDX 파일의 완전한 본문만 출력하세요 (`---`부터 시작)
- 파일 앞뒤에 설명·인사·코드블록 마크(``` 등) 없이
- 파일명·저장 지시 등은 포함하지 않기
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
