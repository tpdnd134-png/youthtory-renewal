# YOUTHTORY Gap Analysis Report

> 분석일: 2026-03-13
> 분석 대상: preview/index.html, preview/list.html, preview/detail.html
> 레퍼런스: design-research.md (pickysociety.com 기반)

---

## Executive Summary

현재 프리뷰의 가장 큰 3가지 Gap:

1. **타이포그래피 weight가 너무 무겁다** - 헤드라인이 800 weight로 "강한" 느낌. 레퍼런스는 200-300 weight의 "가볍고 세련된" 느낌.
2. **여백이 부족하다** - 섹션 간 padding이 좁고, 요소들이 빽빽함. 레퍼런스는 "숨쉬는 공간"이 넉넉함.
3. **애니메이션이 평범하다** - 기본 `ease` 사용. 레퍼런스는 `cubic-bezier(0.16, 1, 0.3, 1)` spring easing으로 유기적인 느낌.

---

## 1. Typography Gap

### 현재 상태 (index.html 인라인 CSS)
```css
/* Hero Title */
.hero__title {
  font-size: clamp(36px, 8vw, 100px);
  font-weight: 600;  /* <-- 문제: 너무 무거움 */
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Section Title */
.section__title {
  font-size: 11px;
  font-weight: 800;  /* <-- 문제: 너무 무거움 */
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

/* Product Name */
p.name {
  font-size: 12px;
  font-weight: 500;  /* <-- 약간 무거움 */
}
```

### 레퍼런스 기준 (design-research.md)
```css
/* Hero Title */
font-size: clamp(36px, 7vw, 100px);
font-weight: 200;  /* Ultra-light! */
letter-spacing: 0.15em;

/* Section Title */
font-size: clamp(18px, 2.5vw, 32px);
font-weight: 300;
letter-spacing: 0.4em;

/* Product Name */
font-size: 13px;
font-weight: 400;
```

### 수정 지시

1. **Hero Title**: `font-weight: 600` -> `font-weight: 200`, `letter-spacing: 0.1em` -> `letter-spacing: 0.15em`
2. **Section Title**: `font-weight: 800` -> `font-weight: 300`, `font-size: 11px` -> `font-size: clamp(18px, 2.5vw, 32px)`, `letter-spacing: 0.3em` -> `letter-spacing: 0.4em`
3. **Product Name**: `font-size: 12px` -> `font-size: 13px`, `font-weight: 500` -> `font-weight: 400`
4. **Hero Subtitle**: 추가 필요 - `font-size: clamp(11px, 1.2vw, 14px)`, `font-weight: 400`, `letter-spacing: 0.5em`

---

## 2. Spacing Gap

### 현재 상태
```css
/* Section padding */
.section { padding: 80px 0; }  /* <-- 부족 */

/* Grid gap */
.product-grid { gap: 24px; }  /* <-- 과함 */

/* Section title margin */
.section__title { margin-bottom: 24px; }  /* <-- 부족 */

/* Hero content positioning */
.hero__content { bottom: 120px; }  /* <-- 고정값, 중앙 아님 */
```

### 레퍼런스 기준
```css
/* Section padding */
padding: 100px 0;  /* desktop */

/* Grid gap */
gap: 16px;

/* Section title margin */
margin-bottom: 60px;

/* Hero content positioning */
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);  /* 정중앙 */
```

### 수정 지시

1. **Section padding**: `80px 0` -> `100px 0`
2. **Grid gap**: `24px` -> `16px`
3. **Section title margin**: `24px` -> `60px`
4. **Hero content**: 하단 고정 -> 정중앙 배치
5. **Container padding**: 확인 필요 (24px 유지)

---

## 3. Color/Tone Gap

### 현재 상태
```css
/* Announcement bar */
.announcement-bar { background: #2C5AFF; }  /* <-- 너무 화려함 */

/* Text hierarchy 불명확 */
color: #111111;  /* 대부분 동일 */

/* Hover 상태 */
opacity: 0.7;  /* <-- 너무 강함 */
```

### 레퍼런스 기준
```css
/* Announcement bar */
background: #1a1a1a;  /* 다크, 절제된 */

/* Text hierarchy */
Primary: #111111
Secondary: #666666
Tertiary: #999999

/* Hover 상태 */
opacity: 0.92 (images)
color transition만 (text)
```

### 수정 지시

1. **Announcement bar**: `#2C5AFF` -> `#1a1a1a` (다크)
2. **메타 텍스트**: 날짜, 카운트 등 `#999999`로 변경
3. **서브 텍스트**: 설명 등 `#666666`로 변경
4. **Image hover**: `opacity: 0.92` 적용
5. **포인트 컬러**: 뱃지, 활성 상태에만 제한적 사용

---

## 4. Animation Gap

### 현재 상태
```css
/* Transition */
transition: all 0.3s ease;  /* <-- 평범함 */

/* Image hover */
transform: scale(1.02);  /* <-- 너무 작음 */
transition: 0.3s ease;  /* <-- 빠름 */

/* Swiper dots */
.swiper-pagination-bullet-active {
  width: 24px;  /* 기본 pill, 괜찮음 */
}

/* Scroll reveal */
없음  /* <-- 없음! */
```

### 레퍼런스 기준
```css
/* Transition */
transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* Image */
transition: 0.3s ease;  /* Others */

/* Image hover */
transform: scale(1.06);
opacity: 0.92;

/* Scroll reveal */
@keyframes: opacity 0 -> 1, translateY 40px -> 0
timing: 0.8s cubic-bezier(0.16, 1, 0.3, 1)
trigger: IntersectionObserver threshold 0.1
```

### 수정 지시

1. **Image transition**: `0.3s ease` -> `0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
2. **Image scale**: `1.02` -> `1.06`
3. **Image opacity on hover**: `0.92` 추가
4. **Scroll reveal**: IntersectionObserver 기반 fadeInUp 애니메이션 추가
5. **CTA hover**: letter-spacing `0.25em` -> `0.3em` 변화 추가

---

## 5. Overall Mood Gap

### 현재 느낌
- "깔끔한 쇼핑몰" - 기능적, 정리된 느낌
- 요소가 좀 많음 (badge, label, subtitle 등)
- 텍스트 정보가 많음
- 이미지보다 UI가 눈에 들어옴
- "볼드한" 느낌 (weight 800, strong colors)

### 레퍼런스 느낌
- "에디토리얼 매거진" - 예술적, 감각적
- 요소가 적음 (미니멀)
- 이미지가 주인공
- UI는 거의 보이지 않음
- "가벼운" 느낌 (weight 200-300, muted colors)

### 무드 전환을 위한 핵심 수정

1. **Hero 섹션**: 텍스트 weight 200으로 내리고, 정중앙 배치, subtitle 추가
2. **섹션 타이틀**: 크기 키우고 weight 내려서 "매거진 헤드라인" 느낌
3. **상품 카드**: 정보 줄이기, 이미지 비율 유지, hover 미묘하게
4. **전체 색상**: 포인트 컬러 줄이고, 그레이 계열 강화
5. **Scroll reveal**: 페이지 로드 시 자연스럽게 나타나는 효과

---

## Priority Fix List (High -> Low)

### Critical (즉시 수정)
1. **Hero Title weight**: 600 -> 200
2. **Section Title**: 11px/800 -> clamp(18px, 2.5vw, 32px)/300
3. **Announcement bar**: #2C5AFF -> #1a1a1a

### High (핵심 무드)
4. **Section padding**: 80px -> 100px
5. **Section title margin-bottom**: 24px -> 60px
6. **Image hover**: scale(1.06), opacity(0.92), 0.5s cubic-bezier

### Medium (디테일)
7. **Grid gap**: 24px -> 16px
8. **Product name**: 12px/500 -> 13px/400
9. **Text hierarchy**: secondary #666, tertiary #999

### Low (Advanced)
10. **Scroll reveal animation**: IntersectionObserver 구현
11. **CTA letter-spacing hover**: 0.25em -> 0.3em
12. **Hero content**: 정중앙 배치

---

## 수정 우선순위별 예상 작업량

| Priority | 항목 수 | 예상 시간 | 임팩트 |
|----------|---------|----------|--------|
| Critical | 3 | 15분 | 높음 |
| High | 3 | 20분 | 높음 |
| Medium | 3 | 15분 | 중간 |
| Low | 3 | 30분 | 낮음 |

**총 예상 시간**: 약 1시간 20분
**권장**: Critical + High 먼저 수정 (35분), 결과 확인 후 Medium/Low 진행
