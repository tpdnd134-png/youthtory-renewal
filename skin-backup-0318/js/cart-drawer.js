/**
 * YOUTHTORY Cart Drawer
 * - 헤더 장바구니 아이콘 클릭 → 드로어 열기
 * - 카페24 기본 장바구니 담기 동작은 건드리지 않음
 * - 담기 성공 후 카페24 기본 확인 팝업은 그대로 표시
 */
(function(){
    'use strict';

    // 드로어 HTML 삽입
    function createDrawerHTML() {
        if (document.getElementById('cartDrawer')) return;

        var html = '' +
        '<div class="cart-drawer-overlay" id="cartDrawerOverlay"></div>' +
        '<div class="cart-drawer" id="cartDrawer">' +
            '<div class="cart-drawer-header">' +
                '<span class="cart-drawer-title">BAG</span>' +
                '<button class="cart-drawer-close" id="cartDrawerClose">&times;</button>' +
            '</div>' +
            '<div class="cart-drawer-body" id="cartDrawerBody">' +
                '<div class="cart-drawer-loading">loading...</div>' +
            '</div>' +
            '<div class="cart-drawer-footer" id="cartDrawerFooter" style="display:none;">' +
                '<div class="cart-drawer-summary">' +
                    '<div class="cart-drawer-row"><span>Subtotal</span><span id="cartSubtotal">0</span></div>' +
                    '<div class="cart-drawer-row"><span>Shipping</span><span id="cartShipping">0</span></div>' +
                    '<div class="cart-drawer-row cart-drawer-total"><span>Total</span><span id="cartTotal">0</span></div>' +
                '</div>' +
                '<a href="/order/orderform.html" class="cart-drawer-checkout">Proceed To Checkout</a>' +
            '</div>' +
        '</div>';

        var div = document.createElement('div');
        div.innerHTML = html;
        document.body.appendChild(div);

        document.getElementById('cartDrawerClose').addEventListener('click', closeDrawer);
        document.getElementById('cartDrawerOverlay').addEventListener('click', closeDrawer);
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeDrawer();
        });
    }

    function openDrawer() {
        createDrawerHTML();
        document.getElementById('cartDrawer').classList.add('open');
        document.getElementById('cartDrawerOverlay').classList.add('open');
        document.body.style.overflow = 'hidden';
        loadCartItems();
    }

    function closeDrawer() {
        var drawer = document.getElementById('cartDrawer');
        var overlay = document.getElementById('cartDrawerOverlay');
        if (drawer) drawer.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    // 카페24 장바구니 페이지에서 아이템 로드
    function loadCartItems() {
        var body = document.getElementById('cartDrawerBody');
        var footer = document.getElementById('cartDrawerFooter');
        body.innerHTML = '<div class="cart-drawer-loading">loading...</div>';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/order/basket.html', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(xhr.responseText, 'text/html');
                var items = parseCartItems(doc);

                if (items.length === 0) {
                    body.innerHTML = '<div class="cart-drawer-empty">장바구니가 비어 있습니다.</div>';
                    footer.style.display = 'none';
                } else {
                    renderItems(body, items);
                    footer.style.display = 'block';
                    updateSummary(doc);
                }
            } else {
                body.innerHTML = '<div class="cart-drawer-empty">장바구니를 불러올 수 없습니다.</div>';
                footer.style.display = 'none';
            }
        };
        xhr.onerror = function() {
            body.innerHTML = '<div class="cart-drawer-empty">네트워크 오류가 발생했습니다.</div>';
            footer.style.display = 'none';
        };
        xhr.send();
    }

    function parseCartItems(doc) {
        var items = [];
        var rows = doc.querySelectorAll('.xans-order-list tr, .xans-order-basketpackage tbody tr');

        rows.forEach(function(row) {
            var imgEl = row.querySelector('img.thumb, td img, .thumbnail img');
            var nameEl = row.querySelector('.name a, td.name a, .product a');
            var priceEl = row.querySelector('.price, td.price, .right .price');
            var optionEl = row.querySelector('.option, td.option, .description');

            if (nameEl && imgEl) {
                items.push({
                    image: imgEl.getAttribute('src') || '',
                    name: nameEl.textContent.trim(),
                    link: nameEl.getAttribute('href') || '#',
                    price: priceEl ? priceEl.textContent.trim() : '',
                    option: optionEl ? optionEl.textContent.trim().replace(/\s+/g, ' ') : ''
                });
            }
        });

        if (items.length === 0) {
            var altRows = doc.querySelectorAll('[class*="basket"] table tbody tr');
            altRows.forEach(function(row) {
                var img = row.querySelector('img');
                var link = row.querySelector('a[href*="product"]');
                if (img && link) {
                    var tds = row.querySelectorAll('td');
                    items.push({
                        image: img.getAttribute('src') || '',
                        name: link.textContent.trim(),
                        link: link.getAttribute('href') || '#',
                        price: tds.length > 0 ? tds[tds.length - 1].textContent.trim() : '',
                        option: ''
                    });
                }
            });
        }

        return items;
    }

    function renderItems(container, items) {
        var html = '';
        items.forEach(function(item) {
            html += '' +
            '<div class="cart-drawer-item">' +
                '<div class="cart-drawer-item-img">' +
                    '<a href="' + item.link + '"><img src="' + item.image + '" alt=""></a>' +
                '</div>' +
                '<div class="cart-drawer-item-info">' +
                    '<a href="' + item.link + '" class="cart-drawer-item-name">' + item.name + '</a>' +
                    (item.option ? '<p class="cart-drawer-item-option">' + item.option + '</p>' : '') +
                    '<p class="cart-drawer-item-price">' + item.price + '</p>' +
                '</div>' +
            '</div>';
        });
        container.innerHTML = html;
    }

    function updateSummary(doc) {
        var totalEl = doc.querySelector('.totalSummary strong, .total strong, [class*="total"] strong, .totalPrice');
        var subtotalSpan = document.getElementById('cartSubtotal');
        var shippingSpan = document.getElementById('cartShipping');
        var totalSpan = document.getElementById('cartTotal');

        if (totalEl) {
            var totalText = totalEl.textContent.trim();
            if (subtotalSpan) subtotalSpan.textContent = totalText;
            if (totalSpan) totalSpan.textContent = totalText;
        }
        if (shippingSpan) shippingSpan.textContent = '0';
    }

    // 헤더 장바구니 아이콘 클릭 시 드로어 열기 (페이지 이동 대신)
    function interceptCartLinks() {
        document.addEventListener('click', function(e) {
            var link = e.target.closest('a[href="/order/basket.html"], a[href*="basket.html"]');
            if (link && link.closest('.mobile-icons, .gnb-right, #topcarticon')) {
                e.preventDefault();
                openDrawer();
            }
        });
    }

    // 초기화
    document.addEventListener('DOMContentLoaded', function() {
        createDrawerHTML();
        interceptCartLinks();
    });

    window.openCartDrawer = openDrawer;
    window.closeCartDrawer = closeDrawer;

})();
