# YOUTHTORY 디자인 스펙 문서

> 레퍼런스: pickysociety.com 스타일 기반
> 최종 수정: 2026-03-12

---

## 1. 톤앤매너

### 1-1. 컬러 시스템

| 용도 | 컬러명 | HEX | 사용처 |
|------|--------|-----|--------|
| 메인 텍스트 | Dark | `#212121` | 본문, 제목, 가격 |
| 서브 텍스트 | Gray 600 | `#757575` | 부가 설명, 카테고리명 |
| 비활성 텍스트 | Gray 400 | `#BDBDBD` | 플레이스홀더, 비활성 탭 |
| 배경 (기본) | White | `#FFFFFF` | 페이지 배경 |
| 배경 (섹션) | Light Gray | `#F8F8F8` | 섹션 구분 배경 |
| 구분선 | Border | `#E5E5E5` | 헤더 하단, 카드 보더 |
| 액센트 (CTA) | Black | `#000000` | 장바구니, 구매 버튼 |
| 액센트 (보조) | Warm Gray | `#9E9E9E` | 아이콘, 보조 버튼 |
| 할인가 | Red | `#E53935` | 세일 가격, SALE 뱃지 |
| 성공/완료 | Green | `#43A047` | 재고 있음, 완료 상태 |
| 카카오 | Kakao Yellow | `#FEE500` | 카카오 로그인/상담 버튼 |

```css
:root {
  --color-text-primary: #212121;
  --color-text-secondary: #757575;
  --color-text-disabled: #BDBDBD;
  --color-bg-white: #FFFFFF;
  --color-bg-light: #F8F8F8;
  --color-border: #E5E5E5;
  --color-accent: #000000;
  --color-accent-sub: #9E9E9E;
  --color-sale: #E53935;
  --color-success: #43A047;
  --color-kakao: #FEE500;
}
```

### 1-2. 타이포그래피

**폰트 패밀리**
```css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

body {
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  color: #212121;
  letter-spacing: -0.02em;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
```

**타이포 스케일**

| 레벨 | 용도 | font-size | font-weight | letter-spacing | line-height |
|------|------|-----------|-------------|----------------|-------------|
| H1 | 메인 비주얼 타이틀 | `42px` | `700` | `-0.03em` | `1.2` |
| H2 | 섹션 타이틀 | `28px` | `600` | `-0.02em` | `1.3` |
| H3 | 카테고리 타이틀 | `20px` | `600` | `-0.02em` | `1.4` |
| H4 | 상품명 (리스트) | `14px` | `400` | `-0.01em` | `1.5` |
| Body1 | 본문 텍스트 | `15px` | `400` | `-0.02em` | `1.7` |
| Body2 | 부가 정보 | `13px` | `400` | `-0.01em` | `1.6` |
| Caption | 날짜, 라벨 | `11px` | `500` | `0.02em` | `1.4` |
| Price | 가격 | `15px` | `600` | `0` | `1` |
| Price (할인 전) | 원가 | `13px` | `400` | `0` | `1` |
| Nav | 네비게이션 | `13px` | `500` | `0.04em` | `1` |

**영문 표기 규칙**
- 브랜드명, 카테고리명: `text-transform: uppercase; letter-spacing: 0.08em;`
- 네비게이션 영문: `font-weight: 500; letter-spacing: 0.04em;`

### 1-3. 여백 시스템

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-2xl: 60px;
  --space-3xl: 80px;
  --space-4xl: 120px;

  /* 섹션 간 여백 */
  --section-gap: 80px;          /* 데스크탑 */
  --section-gap-mobile: 48px;   /* 모바일 */

  /* 컨텐츠 영역 */
  --content-max-width: 1200px;
  --content-padding: 0 40px;           /* 데스크탑 */
  --content-padding-tablet: 0 24px;    /* 태블릿 */
  --content-padding-mobile: 0 16px;    /* 모바일 */
}
```

---

## 2. 메인 페이지 레이아웃

전체 구조: 풀스크린 비주얼 → 섹션 반복 (스크롤 다운 유도)

### 2-1. 헤더 (Header)

**데스크탑 (1200px 이상)**
```
┌─────────────────────────────────────────────────────┐
│  [로고]     MEN  WOMEN  BEST  NEW  SALE    🔍 👤 🛒  │
│─────────────────────────────────────────────────────│
```

- 높이: `60px`
- 배경: `#FFFFFF` (스크롤 시 `backdrop-filter: blur(12px); background: rgba(255,255,255,0.95);`)
- `position: fixed; top: 0; z-index: 1000;`
- 로고: 좌측, `height: 24px`, 클릭 시 메인으로 이동
- 네비게이션: 중앙 정렬, `gap: 32px`, `font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em;`
- 유틸리티 아이콘: 우측, `gap: 20px`, 아이콘 사이즈 `20px`
- 호버 효과: `color: #000; border-bottom: 1px solid #000;` (자연스러운 언더라인)
- 하단 구분선: `border-bottom: 1px solid #E5E5E5;`

**모바일 (768px 이하)**
```
┌───────────────────────────────┐
│  [☰]    [로고]       🔍 🛒   │
│───────────────────────────────│
```

- 높이: `52px`
- 햄버거 메뉴: 좌측, `width: 24px`
- 로고: 중앙
- 유틸리티: 우측 (검색 + 장바구니만)

**MEN/WOMEN 호버 시 메가 메뉴**
```
┌─────────────────────────────────────────────────────┐
│  STYLE             ITEM              SEASON PICK    │
│  미니멀             상의               봄 신상         │
│  캐주얼             하의               여름 프리뷰      │
│  스트릿             아우터             SALE           │
│  댄디/시크           악세서리                           │
│                    세트                              │
│─────────────────────────────────────────────────────│
```

- `max-height: 320px; background: #FFFFFF;`
- 진입 애니메이션: `opacity 0→1, translateY(-8px)→0, duration: 0.25s ease-out`
- 3컬럼 그리드: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; padding: 40px;`
- 카테고리 그룹 제목: `font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 16px; color: #212121;`
- 카테고리 항목: `font-size: 14px; font-weight: 400; color: #757575; line-height: 2;`
- 항목 호버: `color: #212121;`

### 2-2. 메인 비주얼 (Hero Section)

**풀스크린 슬라이더** — Swiper.js 사용
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                                                     │
│              [풀스크린 이미지/영상]                     │
│                                                     │
│         2026 SPRING COLLECTION                      │
│           SHOP NOW →                                │
│                                                     │
│                  ● ○ ○                              │
│─────────────────────────────────────────────────────│
```

```css
.hero-section {
  width: 100%;
  height: 100vh;           /* 풀스크린 */
  min-height: 600px;
  max-height: 900px;
  position: relative;
  overflow: hidden;
}

.hero-slide {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 60px 40px;
  background: linear-gradient(transparent, rgba(0,0,0,0.3));
  color: #FFFFFF;
}

.hero-title {
  font-size: 42px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.hero-cta {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #FFFFFF;
  border-bottom: 1px solid #FFFFFF;
  padding-bottom: 2px;
}
```

- 자동 재생: `autoplay: { delay: 5000 }`
- 전환 효과: `effect: 'fade', fadeEffect: { crossFade: true }`
- 페이지네이션: 하단 중앙, 커스텀 닷 (현재: `8px` 원, 비활성: `6px` 원)
- 모바일: `height: 70vh; min-height: 400px;`

### 2-3. 카테고리 바 (Category Quick Access)

```
┌─────────────────────────────────────────────────────┐
│     MEN             WOMEN           BEST   NEW     │
│  [이미지 원형]     [이미지 원형]                       │
│─────────────────────────────────────────────────────│
```

```css
.category-bar {
  padding: 48px 40px;
  display: flex;
  justify-content: center;
  gap: 48px;
}

.category-bar__item {
  text-align: center;
  cursor: pointer;
}

.category-bar__image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
  transition: transform 0.3s ease;
}

.category-bar__image:hover {
  transform: scale(1.05);
}

.category-bar__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #212121;
}
```

### 2-4. NEW ARRIVALS 섹션

```
┌─────────────────────────────────────────────────────┐
│                  NEW ARRIVALS                       │
│                  최근 입고된 신상품                     │
│                                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  │ 이미지 │ │ 이미지 │ │ 이미지 │ │ 이미지 │              │
│  │      │ │      │ │      │ │      │               │
│  │ 상품명 │ │ 상품명 │ │ 상품명 │ │ 상품명 │              │
│  │ 가격  │ │ 가격  │ │ 가격  │ │ 가격  │              │
│  └──────┘ └──────┘ └──────┘ └──────┘               │
│                                                     │
│                VIEW ALL →                           │
│─────────────────────────────────────────────────────│
```

```css
.section-new {
  padding: 80px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #212121;
}

.section-subtitle {
  text-align: center;
  font-size: 14px;
  color: #757575;
  margin-bottom: 48px;
}

.product-grid--4col {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* 태블릿 */
@media (max-width: 768px) {
  .product-grid--4col {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

/* 모바일 */
@media (max-width: 480px) {
  .product-grid--4col {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

.section-viewall {
  text-align: center;
  margin-top: 48px;
}

.section-viewall a {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #212121;
  border-bottom: 1px solid #212121;
  padding-bottom: 2px;
  transition: opacity 0.2s;
}

.section-viewall a:hover {
  opacity: 0.6;
}
```

### 2-5. 룩북/비주얼 배너 섹션

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│         [풀폭 이미지 또는 2분할 이미지]                  │
│                                                     │
│          MEN'S SPRING LOOKBOOK                      │
│             EXPLORE →                               │
│                                                     │
│─────────────────────────────────────────────────────│
```

```css
.visual-banner {
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
}

.visual-banner__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 6s ease;
}

.visual-banner:hover .visual-banner__image {
  transform: scale(1.03);
}

.visual-banner__content {
  position: absolute;
  bottom: 48px;
  left: 48px;
  color: #FFFFFF;
}

.visual-banner__title {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

/* 2분할 배너 */
.visual-banner--split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 500px;
  gap: 4px;
}

@media (max-width: 768px) {
  .visual-banner {
    height: 360px;
  }
  .visual-banner--split {
    grid-template-columns: 1fr;
    height: auto;
  }
  .visual-banner--split > div {
    height: 300px;
  }
}
```

### 2-6. BEST SELLERS 섹션

NEW ARRIVALS와 동일한 그리드 구조, 탭 네비게이션 추가

```
┌─────────────────────────────────────────────────────┐
│                  BEST SELLERS                       │
│                                                     │
│          [전체] [MEN] [WOMEN] [ACC]                  │
│                                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  │  01  │ │  02  │ │  03  │ │  04  │               │
│  │ 이미지 │ │ 이미지 │ │ 이미지 │ │ 이미지 │              │
│  │ 상품명 │ │ 상품명 │ │ 상품명 │ │ 상품명 │              │
│  │ 가격  │ │ 가격  │ │ 가격  │ │ 가격  │              │
│  └──────┘ └──────┘ └──────┘ └──────┘               │
│─────────────────────────────────────────────────────│
```

```css
.tab-nav {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 40px;
}

.tab-nav__item {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #BDBDBD;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-nav__item.active,
.tab-nav__item:hover {
  color: #212121;
  border-bottom-color: #212121;
}

/* 베스트 순위 뱃지 */
.product-card__rank {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 28px;
  height: 28px;
  background: #000000;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
```

### 2-7. STYLE PICK 섹션 (에디터 추천)

```
┌─────────────────────────────────────────────────────┐
│                  STYLE PICK                         │
│                                                     │
│  ┌────────────────────┐  ┌──────┐ ┌──────┐         │
│  │                    │  │ 이미지 │ │ 이미지 │         │
│  │    대형 이미지       │  │ 상품명 │ │ 상품명 │         │
│  │                    │  │ 가격  │ │ 가격  │         │
│  │                    │  ├──────┤ ├──────┤         │
│  │                    │  │ 이미지 │ │ 이미지 │         │
│  │                    │  │ 상품명 │ │ 상품명 │         │
│  └────────────────────┘  │ 가격  │ │ 가격  │         │
│                          └──────┘ └──────┘         │
│─────────────────────────────────────────────────────│
```

```css
.style-pick-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.style-pick-grid__featured {
  grid-row: span 2;
}

.style-pick-grid__small {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .style-pick-grid {
    grid-template-columns: 1fr;
  }
  .style-pick-grid__featured {
    grid-row: auto;
  }
}
```

### 2-8. 인스타그램/SNS 피드 섹션

```
┌─────────────────────────────────────────────────────┐
│               @YOUTHTORY ON INSTAGRAM               │
│                                                     │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐        │
│  │    │ │    │ │    │ │    │ │    │ │    │        │
│  │    │ │    │ │    │ │    │ │    │ │    │        │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘        │
│─────────────────────────────────────────────────────│
```

```css
.instagram-feed {
  padding: 80px 0;
  background: #F8F8F8;
}

.instagram-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
}

.instagram-grid__item {
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
}

.instagram-grid__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.instagram-grid__item:hover img {
  transform: scale(1.05);
  opacity: 0.85;
}

@media (max-width: 768px) {
  .instagram-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 2-9. 푸터 (Footer)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  YOUTHTORY          CUSTOMER SERVICE    FOLLOW US   │
│                     1234-5678           Instagram    │
│  회사 정보            평일 10:00-18:00     YouTube     │
│  이용약관             점심 12:00-13:00                 │
│  개인정보처리방침                                      │
│  입점/협업 문의        COMPANY INFO                   │
│                     대표: OOO                       │
│                     사업자등록번호: ...               │
│                                                     │
│─────────────────────────────────────────────────────│
│  (c) 2026 YOUTHTORY. All rights reserved.           │
│─────────────────────────────────────────────────────│
```

```css
.footer {
  background: #F8F8F8;
  padding: 60px 40px 24px;
  border-top: 1px solid #E5E5E5;
}

.footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
}

.footer__brand {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.footer__links a {
  display: block;
  font-size: 13px;
  color: #757575;
  line-height: 2.2;
  transition: color 0.2s;
}

.footer__links a:hover {
  color: #212121;
}

.footer__copyright {
  max-width: 1200px;
  margin: 40px auto 0;
  padding-top: 20px;
  border-top: 1px solid #E5E5E5;
  font-size: 11px;
  color: #BDBDBD;
  text-align: center;
}

@media (max-width: 768px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

---

## 3. 카테고리/리스트 페이지 레이아웃

### 3-1. 페이지 구조

```
┌─────────────────────────────────────────────────────┐
│  [헤더]                                              │
│─────────────────────────────────────────────────────│
│  MEN > 미니멀 > 상의                    (브레드크럼)    │
│─────────────────────────────────────────────────────│
│  MINIMAL TOPS                          (타이틀)      │
│─────────────────────────────────────────────────────│
│  [스타일: 전체|미니멀|캐주얼|...] [아이템: 전체|상의|...]  │
│─────────────────────────────────────────────────────│
│  총 128개 상품                    정렬: 신상품순 ▼      │
│─────────────────────────────────────────────────────│
│                                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  │      │ │      │ │      │ │      │               │
│  │      │ │      │ │      │ │      │               │
│  │ 상품명 │ │ 상품명 │ │ 상품명 │ │ 상품명 │              │
│  │ 가격  │ │ 가격  │ │ 가격  │ │ 가격  │              │
│  └──────┘ └──────┘ └──────┘ └──────┘               │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  │ ...  │ │ ...  │ │ ...  │ │ ...  │               │
│                                                     │
│              [1] [2] [3] ... [>]                    │
│─────────────────────────────────────────────────────│
```

### 3-2. 브레드크럼

```css
.breadcrumb {
  padding: 16px 40px;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 12px;
  color: #BDBDBD;
}

.breadcrumb a {
  color: #BDBDBD;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: #757575;
}

.breadcrumb__separator {
  margin: 0 8px;
  color: #E5E5E5;
}

.breadcrumb__current {
  color: #212121;
  font-weight: 500;
}
```

### 3-3. 서브 카테고리 필터

```css
.sub-category-filter {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 24px 40px;
  flex-wrap: wrap;
}

.sub-category-filter__item {
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 400;
  color: #757575;
  border: 1px solid #E5E5E5;
  border-radius: 0;          /* pickysociety 스타일: 각진 버튼 */
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.sub-category-filter__item.active,
.sub-category-filter__item:hover {
  color: #FFFFFF;
  background: #212121;
  border-color: #212121;
}
```

### 3-4. 정렬 바

```css
.sort-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #E5E5E5;
  border-bottom: 1px solid #E5E5E5;
}

.sort-bar__count {
  font-size: 13px;
  color: #757575;
}

.sort-bar__select {
  font-size: 13px;
  color: #212121;
  border: none;
  background: transparent;
  font-family: 'Pretendard', sans-serif;
  cursor: pointer;
  padding: 4px 8px;
}
```

### 3-5. 상품 그리드 (리스트)

데스크탑: 4열, 태블릿: 3열, 모바일: 2열

```css
.product-list-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
}

@media (max-width: 1024px) {
  .product-list-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 16px;
  }
}

@media (max-width: 768px) {
  .product-list-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 12px;
    padding: 24px 16px;
  }
}
```

### 3-6. 페이지네이션

```css
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 48px 0;
}

.pagination__item {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 400;
  color: #757575;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination__item.active {
  color: #212121;
  font-weight: 600;
  border-bottom: 2px solid #212121;
}

.pagination__item:hover:not(.active) {
  color: #212121;
}
```

---

## 4. 상품 상세 페이지 레이아웃

### 4-1. 전체 구조

```
┌─────────────────────────────────────────────────────┐
│  [헤더]                                              │
│  MEN > 미니멀 > 상의                                  │
│─────────────────────────────────────────────────────│
│                                                     │
│  ┌──────────────┐   브랜드명                          │
│  │              │   상품명                            │
│  │   메인 이미지   │                                   │
│  │              │   ₩89,000                          │
│  │              │   ──────────                       │
│  │              │   색상: ● ● ●                       │
│  │              │   사이즈: [S] [M] [L] [XL]          │
│  │              │   ──────────                       │
│  │              │   수량: [-] 1 [+]                   │
│  └──────────────┘                                   │
│  [썸네일][썸네일]    [장바구니 담기] [바로 구매]            │
│  [썸네일][썸네일]    ♡ 위시리스트    공유                 │
│                                                     │
│─────────────────────────────────────────────────────│
│  [상품정보] [리뷰(128)] [Q&A(23)] [배송/교환]           │
│─────────────────────────────────────────────────────│
│                                                     │
│              상세 이미지 영역                           │
│                                                     │
│─────────────────────────────────────────────────────│
│           RELATED ITEMS (연관 상품)                   │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  └──────┘ └──────┘ └──────┘ └──────┘               │
│─────────────────────────────────────────────────────│
```

### 4-2. 상단 상품 정보 영역

```css
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

/* 이미지 영역 */
.product-detail__gallery {
  position: sticky;
  top: 80px;
  align-self: start;
}

.product-detail__main-image {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  margin-bottom: 12px;
  cursor: zoom-in;
}

.product-detail__thumbnails {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.product-detail__thumb {
  aspect-ratio: 1;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid transparent;
  transition: border-color 0.2s;
}

.product-detail__thumb.active,
.product-detail__thumb:hover {
  border-color: #212121;
}

/* 정보 영역 */
.product-detail__info {
  padding-top: 8px;
}

.product-detail__brand {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #757575;
  margin-bottom: 8px;
}

.product-detail__name {
  font-size: 22px;
  font-weight: 500;
  color: #212121;
  line-height: 1.4;
  margin-bottom: 16px;
}

.product-detail__price {
  font-size: 20px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 4px;
}

.product-detail__price--original {
  font-size: 15px;
  font-weight: 400;
  color: #BDBDBD;
  text-decoration: line-through;
  margin-right: 8px;
}

.product-detail__price--sale {
  font-size: 20px;
  font-weight: 600;
  color: #E53935;
}

.product-detail__discount-rate {
  font-size: 20px;
  font-weight: 700;
  color: #E53935;
  margin-right: 8px;
}

.product-detail__divider {
  border: none;
  border-top: 1px solid #E5E5E5;
  margin: 24px 0;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0;
  }
  .product-detail__gallery {
    position: static;
  }
  .product-detail__info {
    padding: 0 16px;
  }
}
```

### 4-3. 옵션 선택

```css
/* 색상 선택 */
.option-color {
  margin-bottom: 24px;
}

.option-color__label {
  font-size: 13px;
  font-weight: 500;
  color: #212121;
  margin-bottom: 12px;
}

.option-color__swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #E5E5E5;
  cursor: pointer;
  margin-right: 8px;
  transition: box-shadow 0.2s;
}

.option-color__swatch.active,
.option-color__swatch:hover {
  box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 3px #212121;
}

/* 사이즈 선택 */
.option-size__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 40px;
  padding: 0 16px;
  border: 1px solid #E5E5E5;
  font-size: 13px;
  font-weight: 400;
  color: #212121;
  cursor: pointer;
  margin-right: 8px;
  margin-bottom: 8px;
  transition: all 0.2s;
}

.option-size__item.active {
  border-color: #212121;
  font-weight: 500;
}

.option-size__item.soldout {
  color: #BDBDBD;
  border-color: #E5E5E5;
  text-decoration: line-through;
  cursor: not-allowed;
}

/* 수량 선택 */
.quantity-selector {
  display: inline-flex;
  align-items: center;
  border: 1px solid #E5E5E5;
  height: 40px;
}

.quantity-selector__btn {
  width: 40px;
  height: 100%;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #757575;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-selector__value {
  width: 48px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  border-left: 1px solid #E5E5E5;
  border-right: 1px solid #E5E5E5;
}
```

### 4-4. 구매 버튼

```css
.product-actions {
  margin-top: 32px;
  display: flex;
  gap: 8px;
}

.btn-cart {
  flex: 1;
  height: 52px;
  background: #FFFFFF;
  color: #212121;
  border: 1px solid #212121;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Pretendard', sans-serif;
}

.btn-cart:hover {
  background: #F8F8F8;
}

.btn-buy {
  flex: 1;
  height: 52px;
  background: #000000;
  color: #FFFFFF;
  border: 1px solid #000000;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Pretendard', sans-serif;
}

.btn-buy:hover {
  background: #333333;
}

.product-sub-actions {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.btn-wishlist,
.btn-share {
  font-size: 13px;
  color: #757575;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;
  font-family: 'Pretendard', sans-serif;
}

.btn-wishlist:hover,
.btn-share:hover {
  color: #212121;
}
```

### 4-5. 상세 탭 네비게이션

```css
.detail-tabs {
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #212121;
}

.detail-tabs__nav {
  display: flex;
}

.detail-tabs__item {
  flex: 1;
  text-align: center;
  padding: 16px 0;
  font-size: 14px;
  font-weight: 500;
  color: #757575;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  border-left: 1px solid #E5E5E5;
}

.detail-tabs__item:first-child {
  border-left: none;
}

.detail-tabs__item.active {
  color: #212121;
  font-weight: 600;
  border-bottom-color: #212121;
}

.detail-tabs__content {
  padding: 48px 40px;
}

/* 상세 이미지 (상품 정보 탭) */
.detail-content__images img {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  display: block;
}
```

---

## 5. 반응형 브레이크포인트 규칙

### 5-1. 브레이크포인트 정의

| 이름 | 범위 | 대상 기기 |
|------|------|----------|
| Desktop L | `1200px` 이상 | 데스크탑 풀 |
| Desktop S | `1024px ~ 1199px` | 소형 데스크탑/랩탑 |
| Tablet | `768px ~ 1023px` | 태블릿 가로 |
| Mobile L | `481px ~ 767px` | 태블릿 세로, 대형 모바일 |
| Mobile S | `480px` 이하 | 일반 모바일 |

### 5-2. 반응형 변환 규칙

```css
/* 컨텐츠 래퍼 */
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 1024px) {
  .wrapper {
    padding: 0 24px;
  }
}

@media (max-width: 768px) {
  .wrapper {
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .wrapper {
    padding: 0 16px;
  }
}
```

**그리드 변환 규칙**

| 컴포넌트 | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| 상품 그리드 | 4열 | 3열 | 2열 |
| 인스타 피드 | 6열 | 4열 | 3열 |
| 푸터 | 3열 | 2열 | 1열 |
| 상품 상세 | 2열 (이미지+정보) | 2열 | 1열 (스택) |
| 비주얼 배너 (분할) | 2열 | 2열 | 1열 (스택) |

**타이포 스케일 변환**

| 레벨 | Desktop | Mobile |
|------|---------|--------|
| H1 (히어로) | `42px` | `28px` |
| H2 (섹션) | `28px` | `22px` |
| H3 (카테고리) | `20px` | `18px` |
| Body1 | `15px` | `14px` |
| 상품 가격 | `15px` | `14px` |

**여백 변환**

| 용도 | Desktop | Mobile |
|------|---------|--------|
| 섹션 간격 | `80px` | `48px` |
| 컨텐츠 패딩 | `40px` | `16px` |
| 상품 그리드 gap | `24px` | `12px` |
| 섹션 타이틀 mb | `48px` | `32px` |

---

## 6. 컴포넌트 스타일 가이드

### 6-1. 상품 카드 (Product Card)

모든 상품 목록에서 사용하는 핵심 컴포넌트

```
┌──────────────┐
│              │
│    이미지     │  ← aspect-ratio: 3/4
│   (호버 시    │
│    2번째     │
│    이미지)    │
│              │
│  [NEW] [SALE]│  ← 뱃지
├──────────────┤
│ 상품명        │
│ ₩89,000      │
│ ~~₩129,000~~ │  ← 할인 시
│ ★★★★☆ (128) │  ← 선택적
└──────────────┘
```

```css
.product-card {
  position: relative;
  cursor: pointer;
}

.product-card__image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background: #F8F8F8;
  margin-bottom: 12px;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.4s ease;
}

/* 호버 시 두 번째 이미지 */
.product-card__image--hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.product-card:hover .product-card__image--hover {
  opacity: 1;
}

/* 뱃지 */
.product-card__badges {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 2;
}

.product-card__badge {
  display: inline-block;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.product-card__badge--new {
  background: #000000;
  color: #FFFFFF;
}

.product-card__badge--sale {
  background: #E53935;
  color: #FFFFFF;
}

.product-card__badge--soldout {
  background: #BDBDBD;
  color: #FFFFFF;
}

/* 퀵 액션 (호버 시 나타남) */
.product-card__quick-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.product-card:hover .product-card__quick-actions {
  opacity: 1;
}

.product-card__quick-btn {
  flex: 1;
  height: 40px;
  background: rgba(0, 0, 0, 0.85);
  color: #FFFFFF;
  border: none;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
}

/* 상품 정보 */
.product-card__info {
  padding: 0 2px;
}

.product-card__name {
  font-size: 14px;
  font-weight: 400;
  color: #212121;
  line-height: 1.5;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__price-wrapper {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
}

.product-card__price {
  font-size: 15px;
  font-weight: 600;
  color: #212121;
}

.product-card__price--original {
  font-size: 13px;
  font-weight: 400;
  color: #BDBDBD;
  text-decoration: line-through;
}

.product-card__discount {
  font-size: 14px;
  font-weight: 700;
  color: #E53935;
}

/* 리뷰 수 */
.product-card__review {
  margin-top: 6px;
  font-size: 11px;
  color: #9E9E9E;
}

/* 모바일 조정 */
@media (max-width: 768px) {
  .product-card__image-wrapper {
    margin-bottom: 8px;
  }
  .product-card__name {
    font-size: 13px;
  }
  .product-card__price {
    font-size: 14px;
  }
  .product-card__quick-actions {
    display: none;  /* 모바일에서는 퀵 액션 숨김 */
  }
}
```

### 6-2. 버튼 (Buttons)

```css
/* 기본 버튼 리셋 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
}

/* Primary — 검정 배경 */
.btn--primary {
  height: 48px;
  padding: 0 32px;
  background: #000000;
  color: #FFFFFF;
  border: 1px solid #000000;
}

.btn--primary:hover {
  background: #333333;
  border-color: #333333;
}

/* Secondary — 흰 배경 + 검정 테두리 */
.btn--secondary {
  height: 48px;
  padding: 0 32px;
  background: #FFFFFF;
  color: #212121;
  border: 1px solid #212121;
}

.btn--secondary:hover {
  background: #F8F8F8;
}

/* Ghost — 테두리 없음, 밑줄 스타일 */
.btn--ghost {
  height: auto;
  padding: 0;
  background: transparent;
  color: #212121;
  border-bottom: 1px solid #212121;
  padding-bottom: 2px;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.btn--ghost:hover {
  opacity: 0.6;
}

/* Small */
.btn--sm {
  height: 36px;
  padding: 0 20px;
  font-size: 12px;
}

/* Large (풀폭) */
.btn--lg {
  width: 100%;
  height: 52px;
  font-size: 15px;
  font-weight: 600;
}

/* Disabled */
.btn:disabled,
.btn--disabled {
  background: #E5E5E5;
  color: #BDBDBD;
  border-color: #E5E5E5;
  cursor: not-allowed;
}

/* 카카오 */
.btn--kakao {
  height: 48px;
  padding: 0 32px;
  background: #FEE500;
  color: #000000;
  border: 1px solid #FEE500;
  font-weight: 600;
}
```

### 6-3. 네비게이션 (Navigation)

```css
/* 데스크탑 GNB */
.gnb {
  display: flex;
  align-items: center;
  gap: 32px;
}

.gnb__item {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #212121;
  text-decoration: none;
  position: relative;
  padding: 4px 0;
}

.gnb__item::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 1px;
  background: #212121;
  transition: width 0.3s ease;
}

.gnb__item:hover::after,
.gnb__item.active::after {
  width: 100%;
}

/* 모바일 사이드 메뉴 */
.mobile-nav {
  position: fixed;
  top: 0;
  left: -100%;
  width: 85%;
  max-width: 360px;
  height: 100vh;
  background: #FFFFFF;
  z-index: 2000;
  transition: left 0.35s ease;
  overflow-y: auto;
  padding: 24px;
}

.mobile-nav.open {
  left: 0;
}

.mobile-nav__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.35s ease;
}

.mobile-nav__overlay.visible {
  opacity: 1;
  visibility: visible;
}

.mobile-nav__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
}

.mobile-nav__section-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #BDBDBD;
  margin: 24px 0 12px;
}

.mobile-nav__link {
  display: block;
  font-size: 16px;
  font-weight: 400;
  color: #212121;
  padding: 12px 0;
  border-bottom: 1px solid #F8F8F8;
  text-decoration: none;
}

.mobile-nav__link--depth2 {
  font-size: 14px;
  color: #757575;
  padding-left: 16px;
}
```

### 6-4. 입력 필드 (Input Fields)

```css
.input {
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border: 1px solid #E5E5E5;
  border-radius: 0;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  color: #212121;
  background: #FFFFFF;
  transition: border-color 0.2s;
  -webkit-appearance: none;
}

.input:focus {
  outline: none;
  border-color: #212121;
}

.input::placeholder {
  color: #BDBDBD;
}

.input--error {
  border-color: #E53935;
}

.input-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #212121;
  margin-bottom: 8px;
}

.input-error-msg {
  font-size: 12px;
  color: #E53935;
  margin-top: 4px;
}

/* 검색 입력 */
.search-input {
  width: 100%;
  height: 52px;
  padding: 0 48px 0 20px;
  border: none;
  border-bottom: 2px solid #212121;
  font-size: 18px;
  font-weight: 400;
  color: #212121;
  background: transparent;
}

.search-input:focus {
  outline: none;
}
```

### 6-5. 모달/오버레이

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.modal-overlay.visible {
  opacity: 1;
  visibility: visible;
}

.modal {
  background: #FFFFFF;
  max-width: 480px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 40px;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.modal-overlay.visible .modal {
  transform: translateY(0);
}

.modal__title {
  font-size: 20px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 24px;
}

.modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #757575;
}
```

### 6-6. 토스트/알림

```css
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: #212121;
  color: #FFFFFF;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 400;
  z-index: 4000;
  opacity: 0;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}
```

### 6-7. 로딩 상태

```css
/* 스켈레톤 로딩 */
.skeleton {
  background: linear-gradient(90deg, #F0F0F0 25%, #E0E0E0 50%, #F0F0F0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 0;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton--image {
  aspect-ratio: 3 / 4;
  width: 100%;
}

.skeleton--text {
  height: 14px;
  width: 80%;
  margin-bottom: 8px;
}

.skeleton--price {
  height: 16px;
  width: 40%;
}
```

### 6-8. 스크롤 톱 버튼

```css
.scroll-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 900;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.scroll-top.visible {
  opacity: 1;
  visibility: visible;
}

.scroll-top:hover {
  background: #212121;
  color: #FFFFFF;
  border-color: #212121;
}
```

---

## 7. 애니메이션 가이드

### 7-1. 기본 원칙
- 모든 트랜지션: `0.2s ~ 0.4s ease` (과하지 않게)
- 호버 효과: `0.2s`
- 페이드 인/아웃: `0.3s`
- 슬라이드: `0.35s ease`
- 스크롤 진입: `0.5s ease-out` (IntersectionObserver 활용)

### 7-2. 스크롤 진입 애니메이션

```css
.fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
// IntersectionObserver로 진입 감지
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
```

---

## 8. 카페24 모듈 태그 적용 참고

### 상품 카드 모듈 예시 (module_product_listmain)
```html
<div module="product_listmain_1" class="product-grid--4col">
  <ul>
    <li class="product-card">
      <div class="product-card__image-wrapper">
        <a href="{link_product_detail}">
          <img src="{img_medium}" alt="{name}" class="product-card__image">
        </a>
        <!-- 뱃지 -->
        <div class="product-card__badges">
          {icon_new}<span class="product-card__badge product-card__badge--new">NEW</span>{/icon_new}
          {icon_sale}<span class="product-card__badge product-card__badge--sale">SALE</span>{/icon_sale}
          {soldout_icon}<span class="product-card__badge product-card__badge--soldout">SOLD OUT</span>{/soldout_icon}
        </div>
      </div>
      <div class="product-card__info">
        <p class="product-card__name">{name}</p>
        <div class="product-card__price-wrapper">
          {discount_price}
            <span class="product-card__discount">{discount_rate}%</span>
            <span class="product-card__price">{discount_sale_price}</span>
            <span class="product-card__price--original">{sale_price}</span>
          {/discount_price}
          {not_discount_price}
            <span class="product-card__price">{sale_price}</span>
          {/not_discount_price}
        </div>
      </div>
    </li>
  </ul>
</div>
```

---

> 이 문서는 YOUTHTORY 스킨 개발 시 모든 페이지의 디자인 기준이 됩니다.
> 변경 사항은 반드시 이 문서에 반영하고, skin-designer 에이전트가 참조합니다.
