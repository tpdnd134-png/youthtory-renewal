// ============================================
// 검색 오버레이 — 인기상품 (MutationObserver, 모든 페이지 대응)
// ============================================
(function(){
    function loadSearchRec(el){
        if(!el || !el.classList.contains('open')) return;
        if(!document.getElementById('searchRecGrid')){
            el.insertAdjacentHTML('beforeend',
                '<div class="search-rec"><p class="search-rec-title">인기 상품</p>' +
                '<ul class="search-rec-grid" id="searchRecGrid"></ul></div>');
        }
        var grid = document.getElementById('searchRecGrid');
        if(!grid || grid.children.length > 0) return;
        var xhr = new XMLHttpRequest();
        var skinMatch = location.pathname.match(/^\/skin-[^\/]+/);
        var prefix = skinMatch ? skinMatch[0] : '';
        xhr.open('GET', prefix + '/product/list.html?cate_no=42', true);
        xhr.onload = function(){
            if(xhr.status !== 200) return;
            try{
                var doc = new DOMParser().parseFromString(xhr.responseText,'text/html');
                var ul = doc.querySelector('ul.grid4');
                if(!ul) return;
                var items = ul.querySelectorAll('li');
                for(var i=0,added=0;i<items.length&&added<8;i++){
                    var img = items[i].querySelector('img');
                    if(!img||!img.src||img.src.indexOf('product')===-1) continue;
                    grid.appendChild(items[i].cloneNode(true));
                    added++;
                }
            }catch(e){}
        };
        xhr.send();
    }
    function attachObserver(el){
        var obs = new MutationObserver(function(){ loadSearchRec(el); });
        obs.observe(el, {attributes:true, attributeFilter:['class']});
    }
    function watchSearch(){
        var el = document.getElementById('mobileSearch');
        if(el){ attachObserver(el); return; }
        var bodyObs = new MutationObserver(function(){
            var el2 = document.getElementById('mobileSearch');
            if(el2){ bodyObs.disconnect(); attachObserver(el2); }
        });
        bodyObs.observe(document.documentElement, {childList:true, subtree:true});
    }
    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', watchSearch);
    } else {
        watchSearch();
    }
})();

function gogoNew(no)
{
    window.open(gogo[no]);
}
function gogoSelf(no)
{
    location.href = gogo[no];
}


var IsSlidesScroll = false;
(function(){ try { var $ = typeof jQuery !== 'undefined' ? jQuery : null; if(!$) return;

    $( window ).scroll(function() {
      if($(window).scrollTop() == 0) {
         $( ".scrollTop" ).fadeOut();
      }
      else {
         $( ".scrollTop" ).fadeIn();
      }
        
    });
    
    $(document).on("focus", "#member_id, #member_passwd, #order_name, #order_id1, #order_id2, #order_password", function() {
        $(this).css("background-image", "url('')");
    });
    $("#toggle").click(function() {
        $("#wrap_dialog").toggle();
        $(this).toggleClass("open");
        $("#loginpopup").toggleClass("opened");
    });
    $("#loginpopup, #wrap_dialog").on("mousewheel", function() {
        return false;
    });

    $("#toggle-right").click(function() {
        $(this).toggleClass("open");
        $("#right").toggleClass("opened");
    });
} catch(e){} })();


(function(){ try { var $ = typeof jQuery !== 'undefined' ? jQuery : null; if(!$) return;
    $('#toparea, #bottomarea').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
} catch(e){} })();


/* ============================================================
   장바구니 추천 상품 (U8) — la-room 스타일 가로 스크롤
   ============================================================ */
(function(){ try { var $ = typeof jQuery !== 'undefined' ? jQuery : null; if(!$) return; $(function(){
    if(location.pathname.indexOf('/order/basket') === -1) return;

    var css = '<style>' +
    '.yt-rec{max-width:1200px;margin:60px auto 40px;padding:0 24px;font-family:helvetica,"Noto Sans KR",sans-serif}' +
    '.yt-rec-header{margin-bottom:24px}' +
    '.yt-rec-title{font-size:14px;font-weight:400;color:#111;margin:0 0 4px}' +
    '.yt-rec-sub{font-size:12px;color:#999;margin:0}' +
    '.yt-rec-grid{display:flex;overflow-x:auto;gap:12px;padding:0 0 8px;margin:0;list-style:none;-webkit-overflow-scrolling:touch;scrollbar-width:none;-ms-overflow-style:none}' +
    '.yt-rec-grid::-webkit-scrollbar{display:none}' +
    '.yt-rec-grid>li{flex:0 0 180px}' +
    '.yt-rec-grid>li .prdpadding{padding:0}' +
    '.yt-rec-grid>li .prdline img,.yt-rec-grid>li img{width:100%;height:auto;display:block}' +
    '.yt-rec-grid>li .name{font-size:12px;font-weight:400;color:#212121;margin:8px 0 2px;line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.yt-rec-grid>li .name a{text-decoration:none;color:#212121}' +
    '.yt-rec-grid>li .prices,.yt-rec-grid>li .price{font-size:12px;color:#999}' +
    '.yt-rec-grid>li .colorWrap,.yt-rec-grid>li .info,.yt-rec-grid>li .prd-keywords{display:none}' +
    '.yt-rec-link{display:inline-block;margin-top:20px;font-size:12px;color:#999;text-decoration:none}' +
    '.yt-rec-link:hover{color:#111}' +
    '@media(max-width:768px){.yt-rec{padding:0 16px;margin:40px auto 24px}.yt-rec-grid>li{flex:0 0 140px}}' +
    '</style>';
    $('head').append(css);

    var html = '<div class="yt-rec">' +
    '<div class="yt-rec-header"><p class="yt-rec-title">추천 상품</p><p class="yt-rec-sub">이런 상품은 어떠세요?</p></div>' +
    '<ul class="yt-rec-grid" id="ytRecGrid"></ul>' +
    '<a href="/product/list.html?cate_no=42" class="yt-rec-link">더보기 →</a></div>';

    var $help = $('.ec-base-help');
    if($help.length) { $help.before(html); } else { $('#contents').append(html); }

    var skinMatch = location.pathname.match(/^\/skin-[^\/]+/);
    var prefix = skinMatch ? skinMatch[0] : '';
    $.get(prefix + '/product/list.html?cate_no=42', function(data){
        var $doc = $(data);
        var $items = $doc.find('.xans-product-listnormal ul.grid4 li');
        if(!$items.length) $items = $doc.find('ul.grid4 li');
        $items.slice(0, 12).each(function(){
            $('#ytRecGrid').append($(this).clone());
        });
    });
}); } catch(e){} })();

// ============================================
// 할인율 자동 계산 + 뱃지 정리
// ============================================
(function(){
    function parsePrice(text) {
        if (!text) return 0;
        return parseInt(text.replace(/[^0-9]/g, ''), 10) || 0;
    }

    function calcDiscountRates() {
        var items = document.querySelectorAll('.ga09list .prdpadding, .main-products .prdpadding');
        for (var i = 0; i < items.length; i++) {
            var pricesEl = items[i].querySelector('.prices');
            if (!pricesEl) continue;

            var spans = pricesEl.querySelectorAll('.price');
            var origSpan = null, saleSpan = null;
            for (var j = 0; j < spans.length; j++) {
                if (spans[j].style.display === 'none') continue;
                if (!spans[j].textContent.trim()) continue;
                if (spans[j].classList.contains('normal')) {
                    saleSpan = spans[j];
                } else {
                    origSpan = spans[j];
                }
            }

            var pctEl = pricesEl.querySelector('.sale-pct');
            if (!pctEl) continue;

            if (origSpan && saleSpan) {
                var orig = parsePrice(origSpan.textContent);
                var sale = parsePrice(saleSpan.textContent);
                if (orig > 0 && sale > 0 && sale < orig) {
                    var pct = Math.round(((orig - sale) / orig) * 100);
                    pctEl.textContent = pct + '%';
                }
            }
        }
    }

    // 페이지 로드 + 동적 콘텐츠 대응
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){ setTimeout(calcDiscountRates, 300); });
    } else {
        setTimeout(calcDiscountRates, 300);
    }
    // 카페24 AJAX 로딩 후 재계산
    setInterval(calcDiscountRates, 2000);
})();

// ============================================
// NEW 뱃지 자동 표시 (카페24 API 기반, 7일 이내 등록 상품)
// ============================================
(function(){
    var CACHE_KEY = 'yt_new_products';
    var CACHE_TTL = 10 * 60 * 1000; // 10분
    var JSON_URL = 'https://cdn.jsdelivr.net/gh/tpdnd134-png/youthtory-renewal@main/new-products.json';

    function applyNewBadges(newNos) {
        if (!newNos || !newNos.length) return;
        // 모든 상품 li 요소에서 product_no 추출 (URL 기반)
        var allItems = document.querySelectorAll('.ga09list li, .xans-product-listnormal li, .xans-product-listrecommend li, .yt-scroll-grid > li, .main-products li, ul.grid4 > li');
        allItems.forEach(function(li) {
            var link = li.querySelector('a[href*="product_no="]') || li.querySelector('a[href*="/product/detail"]');
            if (!link) return;
            var match = link.href.match(/product_no=(\d+)/);
            if (!match) return;
            var no = parseInt(match[1], 10);
            if (newNos.indexOf(no) === -1) return;

            // 방법1: .prd-badges 안에 NEW 뱃지
            var badgeWrap = li.querySelector('.prd-badges');
            if (badgeWrap) {
                var existing = badgeWrap.querySelector('.badge-new');
                if (existing && existing.textContent.trim()) return;
                if (existing) {
                    existing.textContent = 'NEW';
                    existing.style.animation = 'badgeFadeIn 0.3s ease';
                    return;
                }
                var badge = document.createElement('span');
                badge.className = 'badge badge-new';
                badge.textContent = 'NEW';
                badge.style.animation = 'badgeFadeIn 0.3s ease';
                badgeWrap.insertBefore(badge, badgeWrap.firstChild);
                return;
            }

            // 방법2: 이미지 위에 오버레이 뱃지 (메인 페이지 등)
            var imgWrap = li.querySelector('.hoverimg') || li.querySelector('.prdline');
            if (!imgWrap || imgWrap.querySelector('.badge-new')) return;
            var badge2 = document.createElement('span');
            badge2.className = 'prd-badge badge-new';
            badge2.textContent = 'NEW';
            badge2.style.animation = 'badgeFadeIn 0.3s ease';
            imgWrap.appendChild(badge2);
        });
    }

    function run() {
        // 캐시 확인
        try {
            var cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
            if (cached && Date.now() - cached.ts < CACHE_TTL) {
                applyNewBadges(cached.nos);
                return;
            }
        } catch(e) {}

        // JSON fetch (비동기, 논블로킹)
        var doFetch = window.requestIdleCallback || function(cb){ setTimeout(cb, 100); };
        doFetch(function() {
            console.log('[NEW Badge] Fetching:', JSON_URL);
            fetch(JSON_URL + '?t=' + Math.floor(Date.now() / 60000))
                .then(function(r) {
                    console.log('[NEW Badge] Response:', r.status, r.ok);
                    return r.ok ? r.json() : null;
                })
                .then(function(data) {
                    console.log('[NEW Badge] Data:', data ? data.count + ' products' : 'null');
                    if (!data || !data.new_products) return;
                    sessionStorage.setItem(CACHE_KEY, JSON.stringify({
                        ts: Date.now(),
                        nos: data.new_products
                    }));
                    applyNewBadges(data.new_products);
                    console.log('[NEW Badge] Applied badges for', data.new_products.length, 'products');
                })
                .catch(function(e) { console.error('[NEW Badge] Error:', e); });
        });
    }

    // 페이지 로드 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){ setTimeout(run, 500); });
    } else {
        setTimeout(run, 500);
    }
    // 메인 페이지 동적 로딩 대응
    setInterval(function() {
        try {
            var cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
            if (cached) applyNewBadges(cached.nos);
        } catch(e) {}
    }, 3000);
})();