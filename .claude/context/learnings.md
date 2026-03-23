# YOUTHTORY 리뉴얼 — 학습 기록

## 2026-03-13 세션 B — 에디토리얼 스타일 정밀 적용

### Gap 분석 핵심 발견
1. **타이포그래피 weight가 가장 큰 차이점** - 레퍼런스는 200-300, 현재는 600-800
2. **여백이 부족** - 섹션 간 padding이 80px에서 100-120px로 증가 필요
3. **애니메이션이 평범** - cubic-bezier(0.16, 1, 0.3, 1) spring easing 적용 필요
4. **포인트 컬러 과다** - announcement bar의 파란색이 너무 강렬

### 적용한 수정사항
- announcement bar: #2C5AFF → #1a1a1a (다크)
- 섹션 타이틀: 10px/700 → clamp(20px, 3vw, 28px)/300
- 리스트 카테고리 타이틀: 800 → 200 weight
- 그리드 gap: 20px → 16px
- 상품 이미지 hover: scale(1.04) → scale(1.06) + opacity(0.94)
- 상품명: 12px/500 → 13px/400
- border-radius: 12px → 0 (이미지에서 제거)
- 섹션 padding: 100px → 120px
- CTA 버튼: hover 시 letter-spacing 0.25em → 0.32em 변화
- spring easing: cubic-bezier(0.16, 1, 0.3, 1) 적용

### 에디토리얼 무드의 핵심 요소
1. **Ultra-light typography** - weight 200-300이 럭셔리 패션의 핵심
2. **Generous whitespace** - "숨쉬는 공간"이 고급스러움을 만듦
3. **Subtle interactions** - 과하지 않은 hover 효과 (opacity 0.94, scale 1.06)
4. **Muted colors** - 포인트 컬러 절제, 그레이 계열 강화
5. **No border-radius** - 직선적인 형태가 더 에디토리얼함
6. **Letter-spacing expansion** - CTA hover 시 글자 간격 넓어지는 효과

### 에이전트 팀 구성 (v2)
- gap-analyzer: 현재 vs 레퍼런스 차이 분석
- editorial-stylist: 에디토리얼 패션 무드 구현
- team-builder, learnings-keeper: 자가 진화

## 기술 (tech)
<!-- 카페24 스킨 개발 관련 기술 노하우 -->

---

## 2026-03-13 세션 — pickysociety 크롤링 기반 디자인 정밀 반영

### 핵심 학습

**레퍼런스 크롤링 접근법**
- `WebFetch` 툴로 pickysociety.com 직접 크롤링 → 실제 CSS 수치 추출 (헤더 74px, rgba(42,41,41,0.45), 그리드 10px 등)
- 렌더링된 HTML ≠ 소스 파일. 카페24는 반드시 `module="..."` 소스 구문 사용
- 서브페이지 URL(cate_no 등)이 없으면 404 발생 → 메인 페이지 크롤링만으로도 핵심 수치 충분히 추출 가능

**CSS 아키텍처**
- `clamp()` 유동 타이포그래피 필수: `clamp(36px, 7vw, 100px)` 패턴으로 모든 디스플레이 텍스트 처리
- 히어로 헤드라인: weight 200, letter-spacing 0.15em → 럭셔리 에디토리얼 feel
- 섹션 타이틀: weight 300, letter-spacing 0.4em, uppercase → 패션 브랜드 분위기
- 스크롤 reveal: `cubic-bezier(0.16, 1, 0.3, 1)` spring easing이 CSS ease보다 훨씬 자연스러움
- Swiper dot: 6px 원 → active 시 28px pill shape (border-radius:3px) → 모던한 느낌

**프리뷰 시스템 설계**
- 실제 이미지 없는 환경: gradient 배경으로 의류 색상 시뮬레이션 (beige, navy, black, olive 등)
- 프리뷰 파일이 `../skin/css/` 직접 참조 → CSS 수정하면 새로고침만으로 즉시 반영
- `header--transparent` 클래스: 히어로 위에서 dark → 스크롤 시 JS로 클래스 교체하여 white

**에이전트 병렬 실행**
- 독립적인 파일 4개(layout.css, override.css, 프리뷰 3종, 리서치)를 동시 실행 → 대폭 시간 단축
- 에이전트 토큰 한도 초과 시: output 파일 tail로 진행상황 확인 후 직접 이어서 처리

**카페24 호환성 확인 사항**
- 시스템 페이지(장바구니/결제/로그인): `<!--@contents-->` 자동 삽입으로 모두 정상 작동
- 레이아웃 파일 2개 필수: `layout.html` (메인), `layout-list.html` (리스트/상세+리뷰JS)
- 카테고리 번호(cate_no)는 업로드 후 카페24 관리자에서 직접 수정 필요

### 완성된 파일 목록 (42개)
- 레이아웃: layout.html, layout-list.html
- 파셜: top.html, right.html, bottom.html, prdlist.html, detail_infoarea.html, detailguide.html, loginpopup.html
- 콘텐츠: index.html, product/list.html, product/detail.html
- CSS: layout.css (1700+줄), override.css (2100+줄)
- 복사 에셋: board/review/**, js/**, css/module/**
- 프리뷰: preview/index.html (1269줄), preview/list.html (847줄), preview/detail.html (956줄)

### 디자인 수치 (design-research.md 참조)
- 헤더: rgba(42,41,41,0.45) 반투명 다크 → 스크롤 시 흰색
- 히어로: 100vh, weight:200, clamp(36px,7vw,100px), overlay rgba(0,0,0,0.05→0.4)
- 그리드: gap 16px, 4열(PC) → 3열(1200px) → 2열(768px)
- 푸터: #111111 배경, rgba(255,255,255,0.7) 텍스트

## 디자인 (design)
<!-- 디자인 의사결정 및 레퍼런스 분석 결과 -->

## 프로세스 (process)
<!-- 작업 프로세스 개선사항 -->

## 카페24 (cafe24)
<!-- 카페24 플랫폼 관련 팁 -->
