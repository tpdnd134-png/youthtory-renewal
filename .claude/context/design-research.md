# YOUTHTORY Design Research — World-Class Fashion E-commerce

> Sources: pickysociety.com (direct crawl), Celine, Acne Studios, 2024-2025 design trend reports
> Last updated: 2026-03-13

---

## 1. Typography System

| Element | Font Size | Weight | Letter-spacing | Transform |
|---------|-----------|--------|----------------|-----------|
| Logo | clamp(18px, 2.5vw, 28px) | 800 | 0.35em | uppercase |
| Hero headline | clamp(36px, 7vw, 100px) | 200 | 0.15em | uppercase |
| Hero subline | clamp(11px, 1.2vw, 14px) | 400 | 0.5em | uppercase |
| Section title | clamp(18px, 2.5vw, 32px) | 300 | 0.4em | uppercase |
| Nav links | 11px | 700 | 0.15em | uppercase |
| Product name | 13px | 400 | 0.01em | none |
| Product price | 13px | 400 | 0 | none |
| Button | 11px | 600 | 0.25em | uppercase |
| Badge/label | 11px | 500-600 | 0.3-0.5em | uppercase |
| Body copy | 14px | 400 | 0 | none |
| Caption/meta | 11-12px | 400 | 0.05em | none |

**Key insight (Celine/Acne):** Use weight 200-300 for large display text. The contrast between ultra-light headlines and heavy logo creates editorial luxury feel.

---

## 2. Spacing System

| Context | Value |
|---------|-------|
| Section vertical padding | 100px (desktop) / 60px (mobile) |
| Container max-width | 1180px (YOUTHTORY), 1920px (picky — not applicable) |
| Product grid gap | 16px (YOUTHTORY), 10px (picky) |
| Card internal padding | 0 (image bleeds fully) |
| Section title margin-bottom | 60px |
| Button padding | 13-16px 48-52px |
| Footer padding | 80px 0 40px |

---

## 3. Color System

| Role | Value | Usage |
|------|-------|-------|
| Background | #FFFFFF | All pages |
| Primary text | #111111 | Headlines, body |
| Secondary text | #666666 | Meta, labels |
| Tertiary text | #999999 | Dates, counts |
| Border | #E8E8E8 | Dividers, input borders |
| Gray background | #F8F8F8 | Section alternates |
| Product image bg | #F2F2F2 | Placeholder/image background |
| Accent blue | #2C5AFF | CTA focus, badges, links |
| Header dark | rgba(42,41,41,0.45) | Transparent header on hero |
| Hero overlay | rgba(0,0,0,0.1-0.35) | Image darkening gradient |
| Footer bg | #111111 | Dark footer |
| Footer text | rgba(255,255,255,0.7) | Footer body |
| Footer heading | #FFFFFF | Footer titles |
| Announcement | #1a1a1a | Dark top bar |

---

## 4. Hero Pattern (pickysociety + luxury brands)

```css
/* Structure */
.hero: height 100vh, position relative, overflow hidden

/* Background image */
.hero__slide: background-size cover, background-position center
.hero__slide::after: gradient rgba(0,0,0,0.05) → rgba(0,0,0,0.4)

/* Typography positioning */
.hero__content: position absolute, centered (top:50% left:50% transform:-50%,-50%)

/* CTA button */
border: 1px solid rgba(255,255,255,0.85)
background: transparent → rgba(255,255,255,0.18) on hover
letter-spacing transitions: 0.25em → 0.3em on hover

/* Slider dots (Swiper) */
bullet: 6px × 6px, rgba(255,255,255,0.5)
bullet-active: 28px × 6px, #FFFFFF, border-radius 3px (pill shape)
```

---

## 5. Product Card Pattern

```css
/* Image area */
aspect-ratio: 3/4 (recommended for apparel)
background: #F2F2F2
overflow: hidden

/* Hover effect */
transform: scale(1.06)
opacity: 0.92
transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)

/* Badges (NEW/BEST/SALE) */
position: absolute, top: 10px, left: 10px
z-index: 2
height: 20px auto (small icon images)

/* Text */
name: 13px/400, margin-top: 14px, hover opacity: 0.6
price: 13px/400, margin-top: 5px
```

---

## 6. Animation Patterns

```css
/* Scroll reveal */
initial: opacity 0, translateY(40px)
revealed: opacity 1, translateY(0)
timing: 0.8s cubic-bezier(0.16, 1, 0.3, 1)  /* spring easing */
trigger: IntersectionObserver threshold 0.1

/* Hover transitions */
standard: 0.3s ease
letter-spacing change: 0.4s ease (CTA buttons)
image zoom: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
header opacity: 0.3s ease

/* Swiper hero */
autoplay delay: 5000ms
transition speed: 700-800ms
effect: fade with crossFade
```

---

## 7. 2024-2025 Fashion E-commerce Trends Applied

1. **Fluid typography** (`clamp()`) — scales smoothly across all viewports
2. **Ultra-light hero headlines** — weight 200 for luxury editorial feel
3. **Transparent overlaying header** — immersive, image-first experience
4. **Spring easing** — `cubic-bezier(0.16, 1, 0.3, 1)` for organic scroll reveals
5. **Pill-shaped slider dots** — active dot elongates (not just color change)
6. **Hover letter-spacing expansion** — CTA buttons feel alive on hover
7. **Dark footer** — premium contrast, clear brand closure
8. **Tight product grid** — editorial density, not e-commerce generic

---

## 8. Quick Reference Cheatsheet

```
HERO:       100vh | weight:200 | clamp(36,7vw,100px) | overlay rgba(0,0,0,0.1→0.4)
HEADER:     74px | rgba(42,41,41,0.45) → white | logo clamp(18,2.5vw,28px)/800
GRID:       4col | gap:16px | image #F2F2F2 | hover scale(1.06) opacity(0.92)
SECTION:    pad:100px | title clamp(18,2.5vw,32px)/300/tracking:0.4em
BANNER:     55vh | weight:200 | clamp(32,5vw,72px) | overlay rgba(0,0,0,0.25)
FOOTER:     bg:#111 | text:rgba(255,255,255,0.7) | heading:#FFF
ANIMATION:  cubic-bezier(0.16,1,0.3,1) 0.8s | threshold:0.1
ACCENT:     #2C5AFF (use sparingly — badges, focus, active states only)
```
