/**
 * FOLDER BANNER v1.0.0 - iOS Style Interactive Shopping Banner
 * SHOP YOUTHTORY (shopyouthtory.kr)
 * Built: 2026-03-30 00:15
 */

/* Inject CSS */
(function(){
  var s=document.createElement('style');
  s.id='folder-banner-styles';
  s.textContent='/* ===================================================    FOLDER BANNER v2 - Scatter Pop Interactive Banner    SHOP YOUTHTORY (shopyouthtory.kr)    =================================================== */  /* Reset & Base */ .folder-banner-wrap * {   margin: 0;   padding: 0;   box-sizing: border-box;   -webkit-font-smoothing: antialiased; }  .folder-banner-wrap {   position: relative;   width: 100%;   height: 70vh;   min-height: 520px;   max-height: 800px;   background: linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 50%, #d2d2d7 100%);   display: flex;   align-items: center;   justify-content: center;   overflow: hidden;   font-family: -apple-system, BlinkMacSystemFont, \'SF Pro Display\', \'Helvetica Neue\', sans-serif;   user-select: none; }  /* 배경 그라디언트 애니메이션 */ .folder-banner-wrap::before {   content: \'\';   position: absolute;   top: -50%;   left: -50%;   width: 200%;   height: 200%;   background:     radial-gradient(ellipse at 20% 50%, rgba(120, 119, 198, 0.12) 0%, transparent 50%),     radial-gradient(ellipse at 80% 20%, rgba(255, 119, 115, 0.08) 0%, transparent 50%),     radial-gradient(ellipse at 60% 80%, rgba(76, 175, 80, 0.06) 0%, transparent 50%);   animation: bgFloat 20s ease-in-out infinite; }  @keyframes bgFloat {   0%, 100% { transform: translate(0, 0) rotate(0deg); }   33% { transform: translate(2%, -2%) rotate(1deg); }   66% { transform: translate(-1%, 1%) rotate(-0.5deg); } }  /* iOS 상단바 */ .folder-banner-topbar {   position: absolute;   top: 0;   left: 0;   right: 0;   width: 100%;   height: 54px;   display: flex;   align-items: center;   justify-content: center;   z-index: 10;   padding: 10px 24px 0; }  .folder-banner-time {   font-size: 15px;   font-weight: 600;   color: #1d1d1f;   letter-spacing: 0.3px; }  /* ============ 폴더 컨테이너 ============ */ .folder-container {   position: relative;   display: flex;   gap: 48px;   align-items: center;   justify-content: center;   z-index: 5;   transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);   width: 100%;   padding: 0 16px; }  /* 개별 폴더 */ .folder-item {   display: flex;   flex-direction: column;   align-items: center;   gap: 10px;   cursor: pointer;   transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);   position: relative; }  .folder-item:hover {   transform: scale(1.08); }  .folder-item:active {   transform: scale(0.92); }  /* ============ 이모티콘 스타일 폴더 아이콘 ============ */ .folder-icon {   width: 80px;   height: 80px;   border-radius: 24px;   background: rgba(255, 255, 255, 0.6);   backdrop-filter: blur(20px);   -webkit-backdrop-filter: blur(20px);   border: 1px solid rgba(255, 255, 255, 0.4);   display: flex;   align-items: center;   justify-content: center;   transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);   box-shadow:     0 4px 16px rgba(0, 0, 0, 0.06),     0 0 1px rgba(0, 0, 0, 0.1);   font-size: 42px;   line-height: 1;   position: relative;   overflow: visible; }  .folder-item.active .folder-icon {   transform: scale(1.2);   background: rgba(255, 255, 255, 0.8);   box-shadow:     0 12px 40px rgba(0, 0, 0, 0.15),     0 0 1px rgba(0, 0, 0, 0.15); }  /* 폴더 아이콘 흔들림 애니메이션 (호버) */ .folder-item:hover .folder-icon {   animation: wiggle 0.5s ease-in-out; }  @keyframes wiggle {   0%, 100% { transform: rotate(0deg); }   25% { transform: rotate(-5deg); }   75% { transform: rotate(5deg); } }  .folder-item.active:hover .folder-icon {   animation: none; }  /* 폴더 라벨 */ .folder-label {   font-size: 13px;   font-weight: 600;   color: #1d1d1f;   letter-spacing: 1px;   text-align: center;   transition: all 0.3s ease;   text-transform: uppercase; }  /* ============ 산발적 팝아웃 오버레이 ============ */ .folder-overlay {   position: absolute;   top: 0;   left: 0;   right: 0;   bottom: 0;   z-index: 20;   pointer-events: none;   opacity: 0;   transition: opacity 0.35s ease; }  .folder-overlay.visible {   pointer-events: all;   opacity: 1; }  /* 배경 블러 */ .folder-overlay-bg {   position: absolute;   top: 0;   left: 0;   right: 0;   bottom: 0;   background: rgba(245, 245, 247, 0.65);   backdrop-filter: blur(25px) saturate(180%);   -webkit-backdrop-filter: blur(25px) saturate(180%);   transition: opacity 0.35s ease;   opacity: 0; }  .folder-overlay.visible .folder-overlay-bg {   opacity: 1; }  /* 폴더 타이틀 (오버레이 상단) */ .folder-overlay-title {   position: absolute;   top: 28px;   left: 0;   right: 0;   text-align: center;   z-index: 2;   font-size: 24px;   font-weight: 700;   color: #1d1d1f;   letter-spacing: 2px;   opacity: 0;   transform: translateY(-10px);   transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1) 0.1s; }  .folder-overlay.visible .folder-overlay-title {   opacity: 1;   transform: translateY(0); }  /* ============ 산발적 상품 카드 ============ */ .folder-product-scatter {   position: absolute;   top: 0;   left: 0;   right: 0;   bottom: 0;   z-index: 3; }  /* 상품 카드 - 절대 위치 + 산발적 배치 */ .product-card {   position: absolute;   width: 140px;   background: rgba(255, 255, 255, 0.92);   backdrop-filter: blur(10px);   -webkit-backdrop-filter: blur(10px);   border-radius: 18px;   overflow: hidden;   cursor: pointer;   text-decoration: none;   color: inherit;   display: block;   box-shadow:     0 8px 32px rgba(0, 0, 0, 0.1),     0 2px 8px rgba(0, 0, 0, 0.06);   /* 초기 상태: 폴더 위치에서 작게 */   opacity: 0;   transform: scale(0) rotate(0deg);   transform-origin: center center;   transition:     opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),     transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),     box-shadow 0.3s ease; }  /* 카드 등장 상태 (JS에서 인라인 스타일로 최종 위치/회전 설정) */ .product-card.scattered {   opacity: 1; }  .product-card:hover {   z-index: 10 !important;   box-shadow:     0 16px 48px rgba(0, 0, 0, 0.18),     0 4px 12px rgba(0, 0, 0, 0.08);   transform: scale(1.08) rotate(0deg) !important; }  .product-card:active {   transform: scale(0.95) rotate(0deg) !important; }  /* 상품 이미지 */ .product-card-img {   width: 100%;   aspect-ratio: 1 / 1.1;   overflow: hidden;   background: linear-gradient(145deg, #f0f0f5 0%, #e8e8ed 100%);   position: relative; }  .product-card-img img {   width: 100%;   height: 100%;   object-fit: cover;   transition: transform 0.5s ease; }  .product-card:hover .product-card-img img {   transform: scale(1.08); }  /* 이미지 플레이스홀더 */ .product-card-img:not(:has(img))::after {   content: \'\';   position: absolute;   top: 50%;   left: 50%;   transform: translate(-50%, -50%);   width: 36%;   height: 36%;   opacity: 0.12;   background-image: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%231d1d1f\' stroke-width=\'1.5\'%3E%3Crect x=\'3\' y=\'3\' width=\'18\' height=\'18\' rx=\'2\'/%3E%3Cpath d=\'M3 16l5-5 4 4 4-4 5 5\'/%3E%3Ccircle cx=\'8.5\' cy=\'8.5\' r=\'1.5\'/%3E%3C/svg%3E");   background-size: contain;   background-repeat: no-repeat; }  .product-card-img.loading {   background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);   background-size: 200% 100%;   animation: shimmer 1.5s infinite; }  @keyframes shimmer {   0% { background-position: 200% 0; }   100% { background-position: -200% 0; } }  /* 상품 정보 */ .product-card-info {   padding: 10px 12px 12px; }  .product-card-name {   font-size: 11px;   font-weight: 500;   color: #1d1d1f;   line-height: 1.3;   display: -webkit-box;   -webkit-line-clamp: 1;   -webkit-box-orient: vertical;   overflow: hidden;   margin-bottom: 4px;   letter-spacing: -0.2px; }  .product-card-price {   font-size: 13px;   font-weight: 700;   color: #1d1d1f;   letter-spacing: -0.3px; }  .product-card-original-price {   font-size: 10px;   font-weight: 400;   color: #86868b;   text-decoration: line-through;   margin-left: 3px; }  .product-card-discount {   font-size: 11px;   font-weight: 700;   color: #ff3b30;   margin-right: 3px; }  /* 브랜드 */ .folder-banner-brand {   position: absolute;   top: 54px;   left: 0;   right: 0;   text-align: center;   z-index: 8;   padding: 16px 16px;   width: 100%; }  .folder-banner-brand-text {   font-size: 11px;   font-weight: 600;   color: #86868b;   letter-spacing: 3px;   text-transform: uppercase; }  .folder-banner-headline {   font-size: 32px;   font-weight: 700;   color: #1d1d1f;   margin-top: 8px;   letter-spacing: -0.5px; }  .folder-banner-subtext {   font-size: 14px;   font-weight: 400;   color: #86868b;   margin-top: 6px; }  /* CTA 힌트 */ .folder-banner-cta {   position: absolute;   bottom: 36px;   left: 0;   right: 0;   text-align: center;   z-index: 8;   width: 100%;   padding: 0 16px;   transition: opacity 0.3s ease; }  .folder-banner-cta-text {   font-size: 13px;   color: #86868b;   animation: pulse 2s ease-in-out infinite; }  @keyframes pulse {   0%, 100% { opacity: 0.5; }   50% { opacity: 1; } }  .folder-banner-cta-arrow {   display: inline-block;   margin-top: 4px;   font-size: 16px;   color: #86868b;   animation: bounce 2s ease-in-out infinite; }  @keyframes bounce {   0%, 100% { transform: translateY(0); }   50% { transform: translateY(4px); } }  /* ============ 반응형 - 모바일 ============ */ @media (max-width: 768px) {   .folder-banner-wrap {     height: 75vh;     min-height: 480px;   }    .folder-container {     gap: 36px;   }    .folder-icon {     width: 68px;     height: 68px;     border-radius: 20px;     font-size: 36px;   }    .folder-label {     font-size: 11px;   }    .folder-banner-headline {     font-size: 24px;   }    .folder-banner-subtext {     font-size: 12px;   }    .product-card {     width: 115px;     border-radius: 14px;   }    .product-card-img {     aspect-ratio: 1 / 1;   }    .product-card-info {     padding: 7px 9px 9px;   }    .product-card-name {     font-size: 9px;     margin-bottom: 3px;   }    .product-card-price {     font-size: 11px;   }    .product-card-original-price {     font-size: 9px;   }    .product-card-discount {     font-size: 9px;   }    .folder-overlay-title {     font-size: 20px;     top: 22px;   }    .folder-banner-cta {     bottom: 24px;   } }  /* 작은 모바일 */ @media (max-width: 480px) {   .folder-banner-wrap {     min-height: 420px;   }    .folder-container {     gap: 28px;   }    .folder-icon {     width: 60px;     height: 60px;     border-radius: 18px;     font-size: 32px;   }    .product-card {     width: 100px;     border-radius: 12px;   }    .product-card-info {     padding: 5px 7px 7px;   }    .product-card-name {     font-size: 8px;   }    .product-card-price {     font-size: 10px;   } }  /* 넓은 화면 */ @media (min-width: 1024px) {   .folder-icon {     width: 90px;     height: 90px;     border-radius: 26px;     font-size: 48px;   }    .folder-label {     font-size: 14px;   }    .product-card {     width: 160px;     border-radius: 20px;   }    .product-card-info {     padding: 12px 14px 14px;   }    .product-card-name {     font-size: 12px;   }    .product-card-price {     font-size: 14px;   } }  /* ============ 다크모드 ============ */ @media (prefers-color-scheme: dark) {   .folder-banner-wrap {     background: linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 50%, #1c1c1e 100%);   }    .folder-banner-wrap::before {     background:       radial-gradient(ellipse at 20% 50%, rgba(120, 119, 198, 0.08) 0%, transparent 50%),       radial-gradient(ellipse at 80% 20%, rgba(255, 119, 115, 0.06) 0%, transparent 50%);   }    .folder-icon {     background: rgba(58, 58, 60, 0.7);     border-color: rgba(255, 255, 255, 0.1);   }    .folder-label,   .folder-banner-headline,   .product-card-name,   .product-card-price,   .folder-overlay-title,   .folder-banner-time {     color: #f5f5f7;   }    .folder-overlay-bg {     background: rgba(28, 28, 30, 0.75);   }    .product-card {     background: rgba(58, 58, 60, 0.9);   }    .folder-banner-brand-text,   .folder-banner-subtext,   .folder-banner-cta-text,   .folder-banner-cta-arrow {     color: #98989d;   }    .product-card-original-price {     color: #98989d;   } } ';
  document.head.appendChild(s);
})();

/**
 * FOLDER BANNER v2 - Scatter Pop Interactive Banner
 * SHOP YOUTHTORY (shopyouthtory.kr)
 *
 * 폴더 클릭 → 상품이 산발적으로 튀어나옴 → 상품 클릭 → 상품 페이지 이동
 */

(function() {
  'use strict';

  const CONFIG = {
    mallId: 'youthtory',
    apiBase: 'https://youthtory.cafe24api.com/api/v2',
    domain: 'https://shopyouthtory.kr',
    productsPerFolder: 6,
    categories: {
      MEN: {
        label: 'MEN',
        shopNo: 42,
        bestNo: 120,
        emoji: '<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="44" fill="#4A90D9" opacity="0.15"/><circle cx="50" cy="50" r="38" fill="none" stroke="#4A90D9" stroke-width="2.5"/><circle cx="37" cy="42" r="3.5" fill="#1d1d1f"/><circle cx="63" cy="42" r="3.5" fill="#1d1d1f"/><path d="M35 60 Q50 72 65 60" fill="none" stroke="#1d1d1f" stroke-width="2.8" stroke-linecap="round"/><path d="M30 28 Q50 18 70 28" fill="none" stroke="#4A90D9" stroke-width="3" stroke-linecap="round"/></svg>'
      },
      WOMEN: {
        label: 'WOMEN',
        shopNo: 138,
        bestNo: 150,
        emoji: '<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="44" fill="#FF6B8A" opacity="0.15"/><circle cx="50" cy="50" r="38" fill="none" stroke="#FF6B8A" stroke-width="2.5"/><circle cx="37" cy="42" r="3.5" fill="#1d1d1f"/><circle cx="63" cy="42" r="3.5" fill="#1d1d1f"/><path d="M35 58 Q50 70 65 58" fill="none" stroke="#1d1d1f" stroke-width="2.8" stroke-linecap="round"/><circle cx="28" cy="54" r="6" fill="#FF6B8A" opacity="0.3"/><circle cx="72" cy="54" r="6" fill="#FF6B8A" opacity="0.3"/><path d="M26 26 Q36 16 46 24 Q50 14 54 24 Q64 16 74 26" fill="none" stroke="#FF6B8A" stroke-width="2.5" stroke-linecap="round"/></svg>'
      }
    },
    containerSelector: '#folder-banner-root',
    cacheExpiry: 5 * 60 * 1000,
    headline: 'FIND YOUR STYLE',
    subtext: '',
    brandName: 'SHOP YOUTHTORY'
  };

  // ============ 산발적 위치 프리셋 (폴더 중심 기준 상대 좌표) ============
  // 6개 카드가 폴더 주변으로 산발적으로 배치됨
  const SCATTER_POSITIONS = {
    desktop: [
      { x: -280, y: -160, rotate: -8 },
      { x: -90,  y: -200, rotate: 5 },
      { x: 120,  y: -170, rotate: -4 },
      { x: -240, y: 60,   rotate: 6 },
      { x: -40,  y: 100,  rotate: -7 },
      { x: 180,  y: 50,   rotate: 3 },
    ],
    mobile: [
      { x: -120, y: -150, rotate: -6 },
      { x: 20,   y: -170, rotate: 5 },
      { x: 130,  y: -120, rotate: -3 },
      { x: -130, y: 30,   rotate: 4 },
      { x: 10,   y: 80,   rotate: -5 },
      { x: 130,  y: 50,   rotate: 3 },
    ]
  };

  let productCache = {};
  let cacheTimestamp = {};

  let state = {
    openFolder: null,
    isAnimating: false
  };

  // ============ API ============
  async function fetchProducts(categoryNo, count) {
    const cacheKey = `cat_${categoryNo}`;
    const now = Date.now();
    if (productCache[cacheKey] && (now - cacheTimestamp[cacheKey]) < CONFIG.cacheExpiry) {
      return shuffleArray([...productCache[cacheKey]]).slice(0, count);
    }
    try {
      const skinPrefix = (location.pathname.match(/^\/skin-[^\/]+/) || [''])[0];
      const response = await fetch(`${skinPrefix}/product/list.html?cate_no=${categoryNo}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const items = doc.querySelectorAll('ul.grid4 > li, .xans-product-listnormal li');
      const products = [];
      items.forEach(li => {
        const img = li.querySelector('.prdline img, .hoverimg img, .thumbnail img');
        const nameEl = li.querySelector('.name a');
        const priceEl = li.querySelector('.price span, .price, .prices');
        if (!img || !nameEl) return;
        const imgSrc = img.getAttribute('src') || '';
        if (!imgSrc || imgSrc.indexOf('product') === -1) return;
        let href = nameEl.getAttribute('href') || '';
        if (skinPrefix && href.startsWith('/') && !href.startsWith(skinPrefix)) href = skinPrefix + href;
        products.push({
          id: products.length,
          name: nameEl.textContent.trim(),
          price: priceEl ? priceEl.textContent.trim().replace(/[^\d,원]/g, '') : '',
          originalPrice: null,
          discount: 0,
          image: imgSrc,
          url: href
        });
      });
      if (products.length === 0) throw new Error('No products');
      productCache[cacheKey] = products;
      cacheTimestamp[cacheKey] = now;
      return shuffleArray([...products]).slice(0, count);
    } catch (err) {
      console.warn('[FolderBanner] fetch failed:', err);
      return getFallbackProducts(categoryNo, count);
    }
  }

  function tryGetProductsFromPage(gender, count) {
    try {
      if (typeof product_list !== 'undefined' && Array.isArray(product_list)) {
        const products = product_list.map(p => ({
          id: p.product_no || p.no,
          name: p.product_name || p.name,
          price: formatPrice(p.price || p.sale_price),
          originalPrice: p.retail_price ? formatPrice(p.retail_price) : null,
          discount: p.retail_price ? Math.round((1 - (p.price || p.sale_price) / p.retail_price) * 100) : 0,
          image: p.list_image || p.image || p.thumb || '',
          url: p.url || `/product/detail.html?product_no=${p.product_no || p.no}`
        }));
        return shuffleArray(products).slice(0, count);
      }
    } catch(e) {}
    return null;
  }

  function getFallbackProducts(categoryNo, count) {
    const isMen = [42, 120].includes(categoryNo);
    const prefix = isMen ? 'MEN' : 'WOMEN';
    const items = [];
    for (let i = 0; i < count; i++) {
      const price = Math.floor(Math.random() * 80 + 20) * 1000;
      const hasDiscount = Math.random() > 0.5;
      const originalPrice = hasDiscount ? Math.floor(price * (1.2 + Math.random() * 0.5)) : null;
      items.push({
        id: `fallback_${categoryNo}_${i}`,
        name: `${prefix} Style Item ${String(i + 1).padStart(2, '0')}`,
        price: formatPrice(price),
        originalPrice: originalPrice ? formatPrice(originalPrice) : null,
        discount: originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0,
        image: '',
        url: `/product/list.html?cate_no=${categoryNo}`
      });
    }
    return items;
  }

  // ============ 유틸 ============
  function formatPrice(price) {
    if (!price) return '0';
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return num.toLocaleString('ko-KR') + '원';
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getCurrentTime() {
    return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  function isMobile() {
    return window.innerWidth <= 768;
  }

  // ============ 산발 위치 계산 (랜덤성 추가) ============
  function getScatterPositions() {
    const base = isMobile() ? SCATTER_POSITIONS.mobile : SCATTER_POSITIONS.desktop;
    // 약간의 랜덤 오프셋 추가
    return base.map(pos => ({
      x: pos.x + (Math.random() - 0.5) * 40,
      y: pos.y + (Math.random() - 0.5) * 30,
      rotate: pos.rotate + (Math.random() - 0.5) * 6
    }));
  }

  // ============ 렌더링 ============
  function renderBanner() {
    const container = document.querySelector(CONFIG.containerSelector);
    if (!container) return;

    container.innerHTML = `
      <div class="folder-banner-wrap" id="folderBannerWrap">
        <div class="folder-banner-topbar">
          <span class="folder-banner-time" id="folderTime">${getCurrentTime()}</span>
        </div>
        <div class="folder-banner-brand">
          <div class="folder-banner-brand-text">${CONFIG.brandName}</div>
          <div class="folder-banner-headline">${CONFIG.headline}</div>
          <div class="folder-banner-subtext">${CONFIG.subtext}</div>
        </div>
        <div class="folder-container" id="folderContainer">
          ${renderFolder('MEN')}
          ${renderFolder('WOMEN')}
        </div>
        <div class="folder-overlay" id="folderOverlay">
          <div class="folder-overlay-bg" id="folderOverlayBg"></div>
          <div class="folder-overlay-title" id="folderOverlayTitle"></div>
          <div class="folder-product-scatter" id="folderProductScatter"></div>
        </div>
        <div class="folder-banner-cta" id="folderCta">
          <div class="folder-banner-cta-text">폴더를 탭하세요</div>
          <div class="folder-banner-cta-arrow">↓</div>
        </div>
      </div>
    `;

    bindEvents();
    setInterval(() => {
      const t = document.getElementById('folderTime');
      if (t) t.textContent = getCurrentTime();
    }, 30000);
  }

  function renderFolder(gender) {
    const cat = CONFIG.categories[gender];
    return `
      <div class="folder-item" data-gender="${gender}" id="folder_${gender}">
        <div class="folder-icon">${cat.emoji}</div>
        <span class="folder-label">${cat.label}</span>
      </div>
    `;
  }

  function renderProductCard(product, index) {
    const discountHtml = product.discount > 0
      ? `<span class="product-card-discount">${product.discount}%</span>` : '';
    const originalPriceHtml = product.originalPrice
      ? `<span class="product-card-original-price">${product.originalPrice}</span>` : '';
    const imageHtml = product.image
      ? `<img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">` : '';

    return `
      <a href="${product.url}" class="product-card" target="_self"
         data-product-id="${product.id}" data-index="${index}"
         style="z-index:${6 - index}">
        <div class="product-card-img ${!product.image ? '' : ''}">
          ${imageHtml}
        </div>
        <div class="product-card-info">
          <div class="product-card-name">${product.name}</div>
          <div class="product-card-price">
            ${discountHtml}${product.price}${originalPriceHtml}
          </div>
        </div>
      </a>
    `;
  }

  // ============ 이벤트 ============
  function bindEvents() {
    document.querySelectorAll('.folder-item').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (state.isAnimating) return;
        openFolder(el.dataset.gender);
      });
    });

    document.getElementById('folderOverlay').addEventListener('click', (e) => {
      if (state.isAnimating) return;
      const card = e.target.closest('.product-card');
      if (card) {
        trackProductClick(card.dataset.productId, state.openFolder);
        return;
      }
      closeFolder();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.openFolder) closeFolder();
    });
  }

  // ============ 폴더 열기 (산발적 팝아웃) ============
  async function openFolder(gender) {
    if (state.openFolder === gender) { closeFolder(); return; }

    state.isAnimating = true;
    state.openFolder = gender;

    const cat = CONFIG.categories[gender];
    const overlay = document.getElementById('folderOverlay');
    const title = document.getElementById('folderOverlayTitle');
    const scatter = document.getElementById('folderProductScatter');
    const cta = document.getElementById('folderCta');
    const folderEl = document.getElementById(`folder_${gender}`);

    document.querySelectorAll('.folder-item').forEach(el => el.classList.remove('active'));
    if (folderEl) folderEl.classList.add('active');
    if (cta) cta.style.opacity = '0';

    title.textContent = cat.label;
    scatter.innerHTML = '';
    overlay.classList.add('visible');

    // 폴더 아이콘의 중심 좌표 계산
    const banner = document.getElementById('folderBannerWrap');
    const bannerRect = banner.getBoundingClientRect();
    const folderRect = folderEl.getBoundingClientRect();
    const folderCenterX = folderRect.left + folderRect.width / 2 - bannerRect.left;
    const folderCenterY = folderRect.top + folderRect.height / 2 - bannerRect.top;

    // 상품 데이터 로드
    let products = tryGetProductsFromPage(gender, CONFIG.productsPerFolder);
    if (!products || products.length === 0) {
      products = await fetchProducts(cat.bestNo, CONFIG.productsPerFolder);
    }
    if (!products || products.length === 0) {
      products = await fetchProducts(cat.shopNo, CONFIG.productsPerFolder);
    }

    // 산발적 위치 계산
    const positions = getScatterPositions();
    const cardWidth = isMobile() ? (window.innerWidth <= 480 ? 100 : 115) : 140;

    // 카드 생성 + 초기 위치(폴더 중심)에 배치
    scatter.innerHTML = products.map((p, i) => renderProductCard(p, i)).join('');

    const cards = scatter.querySelectorAll('.product-card');
    cards.forEach((card, i) => {
      // 초기: 폴더 중심에서 시작
      card.style.left = `${folderCenterX - cardWidth / 2}px`;
      card.style.top = `${folderCenterY - 60}px`;
      card.style.transform = `scale(0) rotate(0deg)`;
      card.style.transitionDelay = `${i * 0.07}s`;
    });

    // 프레임 후 산발적 위치로 이동
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    cards.forEach((card, i) => {
      const pos = positions[i] || positions[0];
      const targetX = folderCenterX + pos.x - cardWidth / 2;
      const targetY = folderCenterY + pos.y - 60;

      // 배너 영역 내로 클램핑
      const clampedX = Math.max(8, Math.min(bannerRect.width - cardWidth - 8, targetX));
      const clampedY = Math.max(60, Math.min(bannerRect.height - 200, targetY));

      card.style.left = `${clampedX}px`;
      card.style.top = `${clampedY}px`;
      card.style.transform = `scale(1) rotate(${pos.rotate}deg)`;
      card.classList.add('scattered');
    });

    // 이미지 로드 처리
    scatter.querySelectorAll('img').forEach(img => {
      img.addEventListener('load', () => img.parentElement.classList.remove('loading'));
    });

    setTimeout(() => { state.isAnimating = false; }, 600);
    trackFolderOpen(gender);
  }

  // ============ 폴더 닫기 (다시 폴더로 수축) ============
  function closeFolder() {
    state.isAnimating = true;

    const overlay = document.getElementById('folderOverlay');
    const scatter = document.getElementById('folderProductScatter');
    const cta = document.getElementById('folderCta');
    const gender = state.openFolder;

    // 카드들을 다시 폴더 위치로 수축
    if (gender) {
      const banner = document.getElementById('folderBannerWrap');
      const bannerRect = banner.getBoundingClientRect();
      const folderEl = document.getElementById(`folder_${gender}`);
      if (folderEl) {
        const folderRect = folderEl.getBoundingClientRect();
        const cx = folderRect.left + folderRect.width / 2 - bannerRect.left;
        const cy = folderRect.top + folderRect.height / 2 - bannerRect.top;
        const cardWidth = isMobile() ? (window.innerWidth <= 480 ? 100 : 115) : 140;

        scatter.querySelectorAll('.product-card').forEach((card, i) => {
          card.style.transitionDelay = `${i * 0.03}s`;
          card.style.left = `${cx - cardWidth / 2}px`;
          card.style.top = `${cy - 60}px`;
          card.style.transform = `scale(0) rotate(0deg)`;
          card.classList.remove('scattered');
        });
      }
    }

    document.querySelectorAll('.folder-item').forEach(el => el.classList.remove('active'));

    setTimeout(() => {
      overlay.classList.remove('visible');
    }, 200);

    setTimeout(() => {
      scatter.innerHTML = '';
      state.openFolder = null;
      state.isAnimating = false;
      if (cta) cta.style.opacity = '1';
    }, 600);

    trackFolderClose();
  }

  // ============ 트래킹 ============
  function trackFolderOpen(gender) {
    try {
      if (typeof gtag === 'function') gtag('event', 'folder_banner_open', { event_category: 'engagement', event_label: gender });
    } catch(e) {}
  }
  function trackFolderClose() {
    try {
      if (typeof gtag === 'function') gtag('event', 'folder_banner_close', { event_category: 'engagement' });
    } catch(e) {}
  }
  function trackProductClick(productId, gender) {
    try {
      if (typeof gtag === 'function') gtag('event', 'folder_banner_product_click', { event_category: 'conversion', event_label: `${gender}_${productId}` });
    } catch(e) {}
  }

  // ============ CSS 인젝션 ============
  function injectStyles() { return; // CSS already injected by build
    if (document.getElementById('folder-banner-styles')) return;
    const style = document.createElement('style');
    style.id = 'folder-banner-styles';
    style.textContent = window.__FOLDER_BANNER_CSS__ || '';
    document.head.appendChild(style);
  }

  // ============ 초기화 ============
  function init() {
    let container = document.querySelector(CONFIG.containerSelector);
    if (!container) {
      container = document.createElement('div');
      container.id = 'folder-banner-root';
      const mainBanner = document.querySelector('.hero-split, .hero-mobile, #mainBanner, .main_banner, .slideArea');
      if (mainBanner) mainBanner.parentNode.insertBefore(container, mainBanner.nextSibling);
      else document.body.insertBefore(container, document.body.firstChild);
    }
    injectStyles();
    renderBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.FolderBanner = {
    open: openFolder,
    close: closeFolder,
    refresh: () => {
      productCache = {};
      cacheTimestamp = {};
      if (state.openFolder) {
        const g = state.openFolder;
        closeFolder();
        setTimeout(() => openFolder(g), 700);
      }
    },
    config: CONFIG
  };

})();
