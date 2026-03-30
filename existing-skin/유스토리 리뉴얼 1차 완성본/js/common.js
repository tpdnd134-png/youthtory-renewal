// 링크 주소 수정 시작

function myFavorite() {
window.external.AddFavorite('http://youthtory.cafe24.com', '유스토리')
}

var gogo = new Array();

gogo[0] = "https://www.cjlogistics.com/ko/tool/parcel/tracking"; // 택배사
gogo[1] = "#"; // 페북
gogo[2] = "https://www.instagram.com/Shop_youthtory"; // 인스타
gogo[3] = "#"; // 블로그



// 이하 아래는 수정 금지!!

function bluring(){
if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();
}
document.onfocusin=bluring;


//window popup script
function winPop(url) {
    window.open(url, "popup", "width=300,height=300,left=10,top=10,resizable=no,scrollbars=no");
}
/**
 * document.location.href split
 * return array Param
 */
function getQueryString(sKey)
{
    var sQueryString = document.location.search.substring(1);
    var aParam       = {};

    if (sQueryString) {
        var aFields = sQueryString.split("&");
        var aField  = [];
        for (var i=0; i<aFields.length; i++) {
            aField = aFields[i].split('=');
            aParam[aField[0]] = aField[1];
        }
    }

    aParam.page = aParam.page ? aParam.page : 1;
    return sKey ? aParam[sKey] : aParam;
};

// ============================================
// 검색 오버레이 — 인기상품 자동 삽입
// layout 파일 수정 없이 #mobileSearch에 동적 추가
// ============================================
(function(){
    function ensureSearchRec(){
        var overlay = document.getElementById('mobileSearch');
        if(!overlay || document.getElementById('searchRecGrid')) return;
        var recHTML = '<div class="search-rec" id="searchRec">' +
            '<p class="search-rec-title">인기 상품</p>' +
            '<ul class="search-rec-grid" id="searchRecGrid"></ul></div>';
        overlay.insertAdjacentHTML('beforeend', recHTML);
    }
    function loadSearchRec(){
        var grid = document.getElementById('searchRecGrid');
        if(!grid || grid.children.length > 0) return;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/product/list.html?cate_no=42', true);
        xhr.timeout = 8000;
        xhr.onload = function(){
            if(xhr.status === 200){
                try{
                    var doc = new DOMParser().parseFromString(xhr.responseText,'text/html');
                    var ul = doc.querySelector('.xans-product-listnormal ul.grid4') || doc.querySelector('ul.grid4');
                    if(ul){
                        var items = ul.querySelectorAll('li');
                        var added = 0;
                        for(var i=0;i<items.length && added<8;i++){
                            var img = items[i].querySelector('.prdline img, .hoverimg img');
                            if(!img || !img.src || img.src.indexOf('product') === -1) continue;
                            var clone = items[i].cloneNode(true);
                            var chips = clone.querySelector('.colorWrap');
                            if(chips) chips.style.display='none';
                            grid.appendChild(clone);
                            added++;
                        }
                    }
                }catch(e){}
            }
        };
        xhr.send();
    }
    document.addEventListener('DOMContentLoaded', function(){
        var checkInterval = setInterval(function(){
            if(window.toggleMobileSearch && !window._searchRecPatched){
                window._searchRecPatched = true;
                clearInterval(checkInterval);
                var origToggle = window.toggleMobileSearch;
                window.toggleMobileSearch = function(){
                    origToggle();
                    var el = document.getElementById('mobileSearch');
                    if(el && el.classList.contains('open')){
                        ensureSearchRec();
                        loadSearchRec();
                    }
                };
            }
        }, 100);
        setTimeout(function(){ clearInterval(checkInterval); }, 5000);
    });
})();

// jQuery 탭 기능 (jQuery 미로드 시 안전하게 스킵)
try {
    $(document).ready(function(){
        $.eTab = function(ul){
            $(ul).find('a').click(function(){
                var _li = $(this).parent('li').addClass('selected').siblings().removeClass('selected'),
                    _target = $(this).attr('href'),
                    _siblings = '.' + $(_target).attr('class');
                $(_target).show().siblings(_siblings).hide();
                return false
            });
        }
        if ( window.call_eTab ) {
            call_eTab();
        };
    });
} catch(e) {}
