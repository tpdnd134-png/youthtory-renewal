

$(document).ready(function() {
    $S.bSlider = false;
    $S.bGenerate = true;
    if (typeof($S) !== 'undefined') {
        $S.sModule = "xans-product-relation";
        $S.sGrid = "grid3";
        $S.iLine = "1";
        $S.iActive = "0";
        $S.sMode = "multi";
        $S.iAutoSlideInterval = "0";
        $S.sPagingType = "circle";
        $S.init();
        $(".ga09swipe").css("visibility", "visible");
    }
});