# YOUTHTORY 변경 이력

## 2026-03-18 디자인 통일성 + 기능 동기화 대작업

### Part A: 기능 동기화 + 코드 통합
- **js/common.js**: 두 layout 파일에 중복되던 인라인 JS 함수 통합 (toggleMenuOverlay, toggleSubMenu, loadMobileSubs, toggleMobileSearch, loadSearchRec, ESC핸들러, GNB 메가오버레이)
- **layout.html**: 인라인 JS/CSS 제거, COMMUNITY 메뉴 하드코딩 추가
- **layout-list.html**: 검색 오버레이 동기화 (인기 상품 슬라이드 HTML + placeholder 한글 + 닫기버튼 위치), 메뉴 footer 추가, COMMUNITY 메뉴 추가, 인라인 JS 제거
- **top.html**: PC 검색바 → 검색 아이콘으로 교체 (클릭 시 풀스크린 오버레이)
- **css/top.css**: 검색 아이콘 스타일로 변경
- **이유**: layout.html에만 있던 기능(인기 상품 슬라이드, 메뉴 footer, COMMUNITY)을 layout-list.html에도 동기화. PC에서도 풀스크린 검색 오버레이 사용 가능하도록.

### Part B: 전역 디자인 통일
- **css/common-skin.css**: 5개 섹션 추가 — 검색 인기상품 CSS, COMMUNITY 메뉴 스타일, PC 검색 오버레이, 전역 폰트 오버라이드(FontAwesome 제외), 전역 색상/보더/입력필드/버튼 통일
- **css/button.css**: Arial → Noto Sans KR (2곳)
- **css/collection.css**: Montserrat/Nanum Gothic → Noto Sans KR (1곳)
- **css/module/product/additional.css**: Montserrat/Nanum Gothic → Noto Sans KR (8곳)
- **css/module/product/basketAdd.css**: 브레이크포인트 767px → 768px
- **이유**: 158개 모듈 CSS 중 114개(72%)가 레거시 스타일 유지 중이었음. 전역 오버라이드로 일괄 통일.

### Part C: 보조 페이지 리뉴얼
- **css/module/member/login.css**: 색상 통일 + width:500px → max-width 반응형
- **css/module/member/join.css**: 색상/보더 통일 + 고정 width → max-width 반응형
- **css/module/myshop/main.css**: 색상/보더 통일
- **css/module/board/listPackage.css**: 색상 통일 + 배경 #fafafa
- **css/module/board/readPackage.css**: 색상 통일 + 링크색 #008bcc → #212121
- **css/module/order/form.css**: 색상/보더/배경 전면 통일

## 2026-03-17 MEN/WOMEN 토글 + Swiper 가로 슬라이드 구현
- **index.html**: Swiper 11 CDN 추가 (CSS + JS), 캐러셀 CSS 추가 (슬라이드/화살표/pill 페이지네이션/모바일 반응형), productGrid를 Swiper 구조(swiper-wrapper + pagination + prev/next)로 변경, XHR에 5초 타임아웃·try/catch·fallback "SHOP NOW" 링크 추가, 토글 전환 시 Swiper destroy/재생성
- **js/fullpageexe.js**: anchors를 firstPage/secondPage/lastPage → hero/products/footer로 변경
- **index.html (추가 수정)**: selector `ul.grid4.prdList` → `.xans-product-listnormal ul.grid4` (카페24 렌더링 구조 대응), `$(document).ready` → `document.addEventListener('DOMContentLoaded')` (jQuery 의존 제거), `destroy(true,true)` → `destroy(true,false)` (스타일 보존), XHR race condition 방지 (currentXhr abort), 스켈레톤 로딩 UI + 양방향 캐시 프리로드 (Women+Men 동시 fetch, 토글 즉시 전환), `.swiper-slide` 하드코딩 width 제거 (Swiper 자동 계산), `.swiper-slide li` selector 추가 (상품 스타일 적용)
- **이유**: 내일(3/18) 오픈 준비 — 메인 페이지에서 MEN/WOMEN 토글로 상품 가로 캐러셀 표시 (Phase 2 U2 기능)
- **검증 결과** (skin8 미리보기):
  - ✅ Women 상품 로드 + Swiper 4슬라이드
  - ✅ Men 토글 → 8슬라이드 즉시 전환 (캐시)
  - ✅ Pagination dots 클릭 → 슬라이드 전환
  - ✅ 상품 클릭 → 상세 페이지 (옵션/장바구니/구매 정상)
  - ✅ 히어로 Women/Men 카테고리 링크
  - ✅ 장바구니 페이지 정상
  - ✅ 결제 동선 미영향 확인

## 2026-03-16 Phase 0 수정
- **top.html**: 존재하지 않는 top.js 참조 제거 — 404 에러 해소 (html-fixer)
- **index.html**: 모듈명 복원 listrecommend→listmain_1, listnew→listmain_3 — 메인 상품 표시 복구 (html-fixer)
- **detail.css**: .selectButton, .totalPrice, .option-sheet-body .selectButton의 display:none 제거 — 옵션선택/합계금액 복구 (css-fixer)
- **basketAdd.css**: .close display:none 제거 — 장바구니 팝업 닫기 버튼 복구 (css-fixer)
- **common-skin.css**: 전역 리셋(*, img, ul)의 !important 제거 — 카페24 모듈 호환성 개선 (css-fixer)
- **layout.html, layout-list.html, layout/basic/layout.html**: cart-drawer.js import 주석 처리 — Phase 2에서 재검토 (js-fixer)
- **detail_infoarea.html**: 중복 탭 스크롤 JS 주석 처리 — detail.html 쪽 유지 (js-fixer)
- **이유**: Phase 0 안정화 — 카페24 기능 차단 해제 및 불필요한 코드 정리

## 2026-03-16 마스터 프롬프트 강화
- **CLAUDE.md**: 프로젝트 개요 → 작업 규약서로 강화. Phase 정의, 에이전트 권한 테이블, 디자인 검증 기준, 변경 이력 규칙 추가 (orchestrator)
- **agents/qa-validator.md**: 검증 전담 에이전트 신설 — Phase 완료 시 게이트키핑 (orchestrator)
- **context/team-registry.md**: 작업 대상 폴더 skin1-renewed → existing-skin/skin1 통일, qa-validator 등록, Phase별 상태 반영 (orchestrator)
- **context/changelog.md**: 변경 이력 파일 생성 (orchestrator)
- **이유**: 안정화 원칙 검토 결과, 기존 3가지 원칙이 디자인/UX 목표까지 커버하기엔 부족하여 마스터 프롬프트를 강화하고 검증 체계를 구축

## 2026-03-13 (이전 작업 기록)
- **css/ga09product.css**: 상품 그리드/카드 pickysociety 스타일 적용 (cafe24-css-editor)
- **css/top.css**: 헤더 높이 74px, 미니멀 스타일 (cafe24-css-editor)
- **css/left.css**: 네비게이션 letter-spacing hover 효과 (cafe24-css-editor)
- **css/right.css**: 햄버거 메뉴 라인 1px, 반투명 다크 오버레이 (cafe24-css-editor)
- **css/bottom.css**: 푸터 여백 및 색상 조정 (cafe24-css-editor)
- **css/fullpage.css**: 인트로 타이포 라이트 웨이트, cubic-bezier 애니메이션 (cafe24-css-editor)
- **layout.html**: Noto Sans KR 폰트 추가, 글로벌 스타일 인라인 (cafe24-css-editor)
- **이유**: pickysociety.com 레퍼런스 기반 에디토리얼 패션 무드 CSS 1차 적용
