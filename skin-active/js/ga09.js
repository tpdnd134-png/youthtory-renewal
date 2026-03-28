function gogoNew(no)
{
    window.open(gogo[no]);
}
function gogoSelf(no)
{
    location.href = gogo[no];
}


var IsSlidesScroll = false;
$(document).ready(function(){

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
});


/* 장바구니: 스토어픽업 버튼 → 전체주문 버튼으로 교체 (즉시 실행 — ga09.js는 </body> 뒤 로드) */
(function(){
    if(location.pathname.indexOf('/order/basket') === -1) return;
    var btn = document.querySelector('button[onclick*="orderStorePickupSelectBasket"]');
    var realBtn = document.querySelector('div[onclick*="orderAll"]');
    if(btn && realBtn){
        btn.setAttribute('link-order', realBtn.getAttribute('link-order'));
        btn.setAttribute('link-login', realBtn.getAttribute('link-login'));
        btn.setAttribute('onclick', 'Basket.orderAll(this)');
    }
})();

$(function() {
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
});


/* ============================================================
   장바구니 추천 상품 (U8) — 가로 스크롤
   ============================================================ */
$(function(){
    if(location.pathname.indexOf('/order/basket') === -1) return;

    var css = '<style>' +
    '.yt-rec{max-width:1200px;margin:60px auto 40px;padding:0 24px;font-family:helvetica,"Noto Sans KR",sans-serif}' +
    '.yt-rec-header{margin-bottom:24px}' +
    '.yt-rec-title{font-size:14px;font-weight:400;color:#111;margin:0 0 4px}' +
    '.yt-rec-sub{font-size:12px;color:#999;margin:0}' +
    '.yt-rec-grid{display:flex;overflow-x:auto;gap:12px;padding:0 0 8px;margin:0;list-style:none;-webkit-overflow-scrolling:touch;scrollbar-width:none;-ms-overflow-style:none}' +
    '.yt-rec-grid::-webkit-scrollbar{display:none}' +
    '.yt-rec-grid>li{flex:0 0 180px;overflow:hidden}' +
    '.yt-rec-grid>li .prdpadding{padding:0}' +
    '.yt-rec-grid>li .prdline{width:180px;height:240px;overflow:hidden}' +
    '.yt-rec-grid>li .prdline img{width:100%;height:100%;object-fit:cover;display:block}' +
    '.yt-rec-grid>li .hoverimg{width:100%;height:100%}' +
    '.yt-rec-grid>li .hoverimg a{display:block;width:100%;height:100%}' +
    '.yt-rec-grid>li .name{font-size:12px;font-weight:400;color:#212121;margin:8px 0 2px;line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.yt-rec-grid>li .name a{text-decoration:none;color:#212121}' +
    '.yt-rec-grid>li .prices,.yt-rec-grid>li .price{font-size:12px;color:#999}' +
    '.yt-rec-grid>li .colorWrap,.yt-rec-grid>li .info,.yt-rec-grid>li .prd-keywords,.yt-rec-grid>li>img{display:none}' +
    '.yt-rec-link{display:inline-block;margin-top:20px;font-size:12px;color:#999;text-decoration:none}' +
    '.yt-rec-link:hover{color:#111}' +
    '@media(max-width:768px){.yt-rec{padding:0 16px;margin:40px auto 24px}.yt-rec-grid>li{flex:0 0 140px}.yt-rec-grid>li .prdline{width:140px;height:187px}}' +
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
});
