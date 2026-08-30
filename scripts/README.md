# SG기전 자동 블로그 발행 시스템

`.github/workflows/auto-blog.yml` + `scripts/generate-blog-post.py` + `content/blog/_queue.yaml`
조합으로 매주 화요일·금요일 09:00 KST에 새 블로그 포스트를 자동 발행합니다.

## 동작 흐름

```
매주 화·금 09:00 KST (cron)
     ↓
GitHub Actions runner (ubuntu-latest)
     ↓
1. Checkout main
2. Python 3.12 + anthropic SDK 설치
3. Node.js 20 + npm ci (velite 실행에 필요)
4. python scripts/generate-blog-post.py 실행
     ├─ content/blog/_queue.yaml 로드
     ├─ next_index 위치의 pending 주제 pick
     ├─ 큐 소진 시 Claude가 새 주제 발굴
     ├─ 기존 포스트 인벤토리 수집 (내부 링크용)
     ├─ Claude API 호출 (모델 기본 claude-opus-5)
     ├─ MDX 검증 (frontmatter · H2 개수 · 어절 · 금지어구 · <ContactCta>)
     └─ content/blog/YYYY-MM-DD-{slug}.mdx 저장 + 큐 업데이트
5. npx next build (velite 검증 포함)
6. git commit + push (main 직접)
     ↓
Vercel 자동 배포 → 새 글 라이브
```

## 필수 시크릿·변수

### Secret (필수)

Repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

- **`ANTHROPIC_API_KEY`** = Anthropic Console(<https://console.anthropic.com/>)에서 발급받은 키 (`sk-ant-...`)

### Variable (선택)

Repository → **Settings** → **Secrets and variables** → **Actions** → **Variables** 탭:

- **`CLAUDE_MODEL`** = 사용할 Claude 모델 ID
  - 기본값: `claude-opus-5` (품질 우선, 글당 약 $0.15)
  - 저렴한 대안: `claude-sonnet-5` (글당 약 $0.05, 품질 우수)

변수를 설정하지 않으면 Opus 5를 사용합니다.

## 수동 실행 (테스트)

`workflow_dispatch` 트리거가 활성화돼 있어 언제든 수동 실행 가능:

Repository → **Actions** → **Auto-Generate Blog Post** → **Run workflow**

## 로컬에서 실행

```bash
# API 키 준비
export ANTHROPIC_API_KEY=sk-ant-...
export CLAUDE_MODEL=claude-opus-5  # 선택

# 실행 (프로젝트 루트에서)
pip install anthropic pyyaml
python scripts/generate-blog-post.py
```

## 주제 큐 관리

`content/blog/_queue.yaml` 편집으로 관리합니다.

- **새 주제 추가**: `topics:` 배열 끝에 항목 추가
- **우선순위 변경**: 배열 순서 재조정
- **주제 스킵**: 해당 항목을 `status: skipped`로 표시
- **큐 소진 후**: 스크립트가 Claude에게 새 주제 하나를 발굴하도록 요청, 결과를 큐 끝에 자동 추가

### 주제 필드

```yaml
- slug: english-kebab-case-url
  title: "한국어 제목 초안 (Claude가 다듬을 수 있음)"
  segment: 전기공사업체 | 시설관리자 | 보안업체 | LED전광판 | 건설회사 | 행사운영사 | 소방업체 | 검색유입
  angle: 페인해결 | 시간단축 | 안전리스크 | 비용절감 | 편의성 | 품질신뢰 | 맞춤적합성 | 증거 | 구매가이드 | 검색유입
  pain: "핵심 페인 한 줄"
  keywords: [검색어1, 검색어2, 검색어3]
  status: pending  # pending → done (자동 갱신)
```

## 품질 게이트

스크립트는 다음을 자동 검증하고 통과 못 하면 최대 3회까지 재생성합니다:

- Frontmatter 필수 필드 (title · description · date · tags · draft)
- `draft: true` 상태 아님
- H2 개수 ≥ 4
- 어절 수 ≥ 1,500
- 금지 어구(박재영, 12년 경력, 1000+ 제작 실적, 경기도 화성, 화성시, 화성 공장) 미포함
- `<ContactCta />` 컴포넌트 존재

3회 모두 실패하면 워크플로가 exit 1로 종료 (커밋 없음).

빌드 검증(`npx next build`) 실패 시에도 커밋되지 않음.

## 비용 관리

### 예상 비용

- **Opus 5** 기준 글당 약 $0.15 (입력 8K + 출력 4K 토큰)
- **주 2회** × **월 4.3주** = **월 약 $1.30**

- **Sonnet 5** 기준 글당 약 $0.05
- **월 약 $0.43**

### 비용 확인

Anthropic Console → Usage 탭에서 실시간 확인 가능. Anthropic 계정 자체에 지출 한도(월 상한) 설정도 권장.

### 모델 변경

Repository Variable `CLAUDE_MODEL` 값을 바꾸면 다음 실행부터 적용됩니다.

## 실패 알림

기본 설정에는 별도 알림 없음. 워크플로 실패 시 GitHub 웹훅 · 이메일이 계정 알림 설정에 따라 발송됩니다.

Slack/Discord 알림 필요 시 워크플로 마지막에 `if: failure()` 스텝 추가로 확장 가능.

## 롤백

자동 발행된 글이 마음에 안 들 때:

```bash
# 해당 파일 삭제 + 큐 상태 원복
git rm content/blog/YYYY-MM-DD-{slug}.mdx
# _queue.yaml에서 해당 topic의 status를 다시 pending으로
# next_index를 1 감소
git commit -m "rollback: remove auto-generated post"
git push
```

Vercel이 즉시 재배포해서 프로덕션에서 사라집니다.

## 확장 아이디어

- **GSC 검색어 자동 수집**: Google Search Console API로 새 유입 키워드를 자동으로 큐에 추가
- **Naver Search Advisor 연동**: 유입 검색어 fetching
- **A/B 제목 실험**: 같은 본문에 제목 3안 생성 후 30일 뒤 성과 좋은 것 유지
- **성과 기반 재시도**: Vercel Analytics 데이터로 저성과 글 재작성

이 기능들은 필요 시 별도 PR로 확장하시면 됩니다.
