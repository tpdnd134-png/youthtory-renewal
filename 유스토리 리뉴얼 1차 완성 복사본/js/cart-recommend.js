/**
 * YOUTHTORY Cart Recommend (U8)
 * 장바구니 페이지 하단에 추천 상품 자동 삽입
 * la-room 스타일 — 가로 스크롤 + 섹션 헤더
 */
(function(){
    // 장바구니 페이지에서만 실행
    if(location.pathname.indexOf('/order/basket') === -1) return;

    // 스타일 삽입
    var css = document.createElement('style');
    css.textContent = '\
.yt-rec{max-width:1200px;margin:60px auto 40px;padding:0 24px;font-family:helvetica,"Noto Sans KR",sans-serif}\
.yt-rec-header{margin-bottom:24px}\
.yt-rec-title{font-size:14px;font-weight:400;letter-spacing:0.02em;color:#111;margin:0 0 4px}\
.yt-rec-sub{font-size:12px;color:#999;letter-spacing:0.02em;margin:0}\
.yt-rec-grid{display:flex;overflow-x:auto;gap:12px;padding:0;margin:0;list-style:none;-webkit-overflow-scrolling:touch;scrollbar-width:none;-ms-overflow-style:none}\
.yt-rec-grid::-webkit-scrollbar{display:none}\
.yt-rec-grid>li{flex:0 0 180px;min-width:0}\
.yt-rec-grid>li .prdpadding{padding:0}\
.yt-rec-grid>li .prdline img,.yt-rec-grid>li>a>img{width:100%;height:auto;display:block}\
.yt-rec-grid>li .name{font-size:12px;font-weight:400;color:#212121;margin:8px 0 2px;line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\
.yt-rec-grid>li .name a{text-decoration:none;color:#212121}\
.yt-rec-grid>li .prices,.yt-rec-grid>li .price{font-size:12px;color:#999}\
.yt-rec-grid>li .colorWrap,.yt-rec-grid>li .info,.yt-rec-grid>li .prd-keywords{display:none}\
.yt-rec-link{display:inline-block;margin-top:20px;font-size:12px;color:#999;letter-spacing:0.05em;text-decoration:none;transition:color 0.2s}\
.yt-rec-link:hover{color:#111}\
@media(max-width:768px){\
.yt-rec{padding:0 16px;margin:40px auto 24px}\
.yt-rec-grid>li{flex:0 0 140px}\
}';
    document.head.appendChild(css);

    // 컨테이너 생성
    var container = document.createElement('div');
    container.className = 'yt-rec';
    container.innerHTML = '\
<div class="yt-rec-header">\
<p class="yt-rec-title">추천 상품</p>\
<p class="yt-rec-sub">이런 상품은 어떠세요?</p>\
</div>\
<ul class="yt-rec-grid" id="ytRecGrid"></ul>\
<a href="/product/list.html?cate_no=42" class="yt-rec-link">더보기 →</a>';

    // 이용안내 앞에 삽입 (또는 페이지 하단)
    var guide = document.querySelector('.ec-base-help') || document.querySelector('#contents');
    if(guide && guide.parentNode) {
        guide.parentNode.insertBefore(container, guide);
    } else {
        document.body.appendChild(container);
    }

    // 상품 로드
    var skinMatch = location.pathname.match(/^\/skin-[^\/]+/);
    var prefix = skinMatch ? skinMatch[0] : '';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', prefix + '/product/list.html?cate_no=42', true);
    xhr.timeout = 8000;
    xhr.onload = function(){
        if(xhr.status === 200){
            try{
                var doc = new DOMParser().parseFromString(xhr.responseText, 'text/html');
                var ul = doc.querySelector('.xans-product-listnormal ul.grid4') || doc.querySelector('ul.grid4');
                if(ul){
                    var items = ul.querySelectorAll('li');
                    var grid = document.getElementById('ytRecGrid');
                    for(var i = 0; i < Math.min(items.length, 12); i++){
                        grid.appendChild(items[i].cloneNode(true));
                    }
                }
            }catch(e){}
        }
    };
    xhr.send();
})();
