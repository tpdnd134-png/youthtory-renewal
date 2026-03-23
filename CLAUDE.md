# YOUTHTORY 쇼핑몰 리뉴얼 — 작업 규약서

## 프로젝트 개요
- YOUTHTORY(shopyouthtory.kr) 남성+여성 의류 쇼핑몰 전체 리뉴얼
- 플랫폼: 카페24 (skin1 커스터마이징)
- 레퍼런스: pickysociety.com (트렌디한 톤, 풀페이지 비주얼, 상품 중심)
- 목표: 세련된 디자인 + 사용자 편의성 기능 + 구현 안정화

## 작업 디렉토리 (유일한 수정 대상)
```
/Users/han-aleum/projects/youthtory-renewal/existing-skin/유스토리 리뉴얼 1차/   ← 여기서만 작업
```
- 디자인 완료된 작동 상태 파일. 작동하는 코드는 건드리지 않고, 새 기능만 추가한다.

## 기술 스택
- HTML5 + CSS3 (Flexbox/Grid)
- Vanilla JS (카페24 jQuery 호환)
- 카페24 모듈 태그
- Swiper.js / fullpage.js (슬라이더)
- Noto Sans KR (한글 폰트)

---

## 현재 작업 Phase

### Phase 0: 파일 안정화 ← 현재
- **목표**: 5일간 즉흥 수정으로 불안정해진 파일 정리 → 깨끗한 기반 확보
- **제약**: CSS만 수정, HTML은 감싸기만, JS는 분류만 (수정 금지)
- **완료 기준**:
  1. 카페24 기능을 방해하는 불필요한 !important 제거
  2. 모든 카페24 모듈 태그 정상 작동 확인
  3. skin1-backup-original과 diff 검토 완료
  4. PC/모바일 기본 동선 작동: 메인 → 리스트 → 상세 → 장바구니

### Phase 0.5: 모바일 DOM 검증
- **목표**: 768px 이하에서 DOM 순서대로 콘텐츠가 올바르게 흐르는지 확인
- **검증 순서**: 이미지 → 상품정보 → 옵션 → 구매 → 설명 → 리뷰 → Q&A
- absolute/sticky → relative 전환 시 순서 깨짐 점검

### Phase 1: 디자인 정밀 적용
- **목표**: design-research.md 수치 기준으로 에디토리얼 무드 완성
- **제약**: CSS 수정 + 새 래퍼 요소 추가 허용 (기존 모듈 태그 삭제/이동 금지)
- **완료 기준**: 아래 디자인 검증 기준 수치와 일치

### Phase 2: UX 기능 구현
- **목표**: 쇼핑몰 사용자 편의성 기능 추가
- **제약**: 카페24 모듈 태그 보존, 새 HTML/JS 추가 허용
- **기능 목록**:
  - U1: 메인 배너 3→1개 + Women/Men 전환 버튼
  - U2: 메인 상품 슬라이드 (Women/Men 토글, pickysociety 스타일)
  - U3: 실시간 인기 상품 슬라이더 (메인)
  - U4: 검색 오버레이 UI (la-room 스타일)
  - U5: 풀스크린 사이드바 카테고리 (ZARA 스타일, 번호+펼침)
  - U6: 1차 카테고리 가로 슬라이드 탭
  - U7: 장바구니 디자인 개편 (la-room 스타일)
  - U8: 장바구니 하단 인기 상품 슬라이더
- **디자인 원칙**: 기존 완성 스타일 기반 통일 (에디토리얼 무드)

---

## 안정화 vs 개선 판단 기준

> "이 변경 없이 사이트가 정상 작동하는가?"
> - **Yes** → 개선 (Phase 1+로 미룸)
> - **No** → 안정화 (Phase 0에서 즉시 처리)

---

## 카페24 모듈 태그 (전 Phase 절대 삭제 금지)
```html
{$variable_name}           ← 변수
module="module_name"       ← 모듈 속성
<!--@import(/path)-->      ← HTML import
<!--@css(/path)-->         ← CSS import
<!--@js(/path)-->          ← JS import
```

---

## 디자인 검증 기준 (design-research.md 기반)

### 타이포그래피
| 요소 | 크기 | Weight | Letter-spacing |
|------|------|--------|----------------|
| Hero headline | clamp(36px, 7vw, 100px) | 200 | 0.15em |
| Section title | clamp(18px, 2.5vw, 32px) | 300 | 0.4em |
| Nav links | 11px | 700 | 0.15em |
| Product name | 13px | 400 | 0.01em |
| Button | 11px | 600 | 0.25em |

### 스페이싱
| 컨텍스트 | 값 |
|----------|-----|
| 섹션 padding | 100px(PC) / 60px(모바일) |
| 그리드 gap | 16px |
| 섹션 타이틀 margin-bottom | 60px |
| 버튼 padding | 13-16px 48-52px |

### 컬러
| 역할 | 값 |
|------|-----|
| 배경 | #FFFFFF |
| Primary text | #111111 |
| Secondary text | #666666 |
| Tertiary text | #999999 |
| Border | #E8E8E8 |

### 인터랙션
- Image hover: scale(1.06), opacity(0.92), 0.5s
- Spring easing: cubic-bezier(0.16, 1, 0.3, 1)
- CTA hover: letter-spacing 확장
- border-radius: 0 (직선형)

---

## 에이전트 팀 — 역할 & 권한

| 에이전트 | 수정 가능 파일 | Phase | 금지 사항 |
|---------|--------------|-------|----------|
| **cafe24-css-editor** | css/*.css | 0, 1 | HTML 수정, JS 수정 |
| **skin-structure-analyst** | *.html | 0, 1, 2 | 모듈 태그 삭제/이동 |
| **skin-designer** | 새 파일 생성 | 2 | 기존 파일 구조 변경 |
| **qa-validator** | 없음 (검증만) | 전체 | 파일 수정 금지 |
| **editorial-stylist** | css/*.css | 1 | HTML 수정 |
| gap-analyzer | 없음 (분석만) | 전체 | 파일 수정 금지 |
| ux-researcher | 없음 (분석만) | 전체 | 파일 수정 금지 |
| category-planner | 없음 (설계만) | 전체 | 파일 수정 금지 |
| team-builder | 에이전트 파일 | 전체 | 스킨 파일 수정 금지 |
| learnings-keeper | 학습 기록 | 전체 | 스킨 파일 수정 금지 |

호출: `"{에이전트명}야, {요청}"`

---

## 변경 이력 규칙

모든 파일 수정 시 아래 형식으로 `.claude/context/changelog.md`에 기록:
```
## YYYY-MM-DD
- **파일**: 수정 내용 (에이전트명)
- **이유**: 왜 수정했는지
```
- !important 추가 시 반드시 사유 기록
- skin1-backup-original과 달라진 부분 누적 관리

---

## 수정된 파일 목록 (Phase 0 이전까지)
| 파일 | 역할 |
|------|------|
| css/ga09product.css | 상품 그리드/카드 |
| css/top.css | 헤더 (높이 74px) |
| css/left.css | 로고/네비게이션 |
| css/right.css | 햄버거 메뉴 |
| css/bottom.css | 푸터 |
| css/fullpage.css | 메인 인트로 |
| layout.html | Noto Sans KR 폰트 + 글로벌 스타일 |

## 카테고리 체계
- 1차: MEN / WOMEN
- 2차 스타일: 미니멀 / 캐주얼 / 스트릿 / 댄디(남) or 시크(여) / 시즌 픽
- 3차 아이템: 상의 / 하의 / 아우터 / 원피스(여) / 악세서리 / 세트
