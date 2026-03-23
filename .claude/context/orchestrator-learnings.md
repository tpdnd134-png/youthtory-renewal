# Orchestrator Learnings

## 변경 이력
- v1.0 (2026-03-13) - 초기 생성
- v1.1 (2026-03-13) - 에디토리얼 스타일 적용 완료, 학습 기록
- v1.2 (2026-03-13) - skin1 직접 수정 방식 전환, CSS 수정 완료

## 2026-03-13 YOUTHTORY 리뉴얼 - skin1 직접 수정 작업

### 프로젝트 전환
- 기존 preview/ 방식은 **잘못된 접근**이었음
- 카페24 스킨은 `existing-skin/skin1/`을 직접 수정해야 함
- 작업용 복사본 `skin1-renewed/` 생성하여 원본 보존

### 핵심 깨달음
1. **카페24 스킨 수정의 올바른 방법**
   - 원본 스킨 백업 필수
   - HTML 구조는 가급적 유지 (카페24 모듈 태그 보존)
   - CSS만 수정하는 것이 가장 안전하고 효율적

2. **모듈 태그 절대 삭제 금지**
   - `{$product_name}`, `{$image_medium}` 등 변수
   - `module="..."` 속성
   - `<!--@import(...)-->`, `<!--@css(...)-->`, `<!--@js(...)-->` 디렉티브

### 수정 전략
1. 폰트 변경: Montserrat → Noto Sans KR (한글 최적화)
2. 색상 통일: #212121 (주), #999999 (보조), #dadada (구분선)
3. 그리드: 4열, gap 10px, 좌정렬
4. 호버 효과: scale(1.05), opacity 변화, letter-spacing 확장
5. 직선형 디자인: border-radius 0

### 팀 구성 변화
- 기존: gap-analyzer, editorial-stylist (프리뷰 방식)
- 신규: cafe24-css-editor, skin-structure-analyst (직접 수정 방식)

### 수정된 CSS 파일
| 파일 | 역할 |
|------|------|
| ga09product.css | 상품 그리드/카드 |
| top.css | 헤더 |
| left.css | 로고/네비게이션 |
| right.css | 햄버거 메뉴 |
| bottom.css | 푸터 |
| fullpage.css | 메인 인트로 |

---

## 2026-03-13 YOUTHTORY 리뉴얼 - 레퍼런스 분석 작업 (이전)

### 프로젝트 상황
- 현재 프리뷰가 레퍼런스(pickysociety.com)의 "느낌"을 제대로 구현하지 못함
- 기술적으로는 작동하지만, 에디토리얼/패션 무드가 부족

### 최종 팀 구성
- gap-analyzer: 현재 vs 레퍼런스 Gap 분석
- editorial-stylist: 에디토리얼 패션 무드 구현
- team-builder + learnings-keeper: 자가 진화 (필수)

### 예상하지 못했던 필요 에이전트
- 없음 (gap-analyzer + editorial-stylist로 충분)

### 효과적이었던 팀 패턴
- "분석 → 구현" 2단계 패턴이 효과적
- gap-report.md를 중간 산출물로 사용하여 명확한 수정 지시 전달

### 학습 내용
1. **레퍼런스 분석 시 "무드"에 집중** - 단순 수치 비교가 아니라 전체적인 느낌의 차이를 파악
2. **타이포그래피 weight가 가장 큰 임팩트** - 200-300 vs 600-800의 차이가 럭셔리/일반의 경계
3. **border-radius 제거** - 직선적 형태가 에디토리얼 무드에 필수
4. **letter-spacing hover 효과** - 미묘하지만 고급스러운 인터랙션

### 다음에 비슷한 프로젝트 시작 시 초기 팀에 포함할 것
- cafe24-css-editor (카페24 스킨 CSS 수정 전문)
- skin-structure-analyst (HTML 구조 분석, 모듈 태그 보존)
- 기본: team-builder, learnings-keeper
