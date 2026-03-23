function setGridSize(obj, s) {
    $(".mPrdList ul").attr("class", "grid" + s);
    $(".gridsize").each(function() {
        $(this).attr("src", $(this).attr("src").replace("_on", ""));
    });
    $(obj).find("img").each(function() {
        $(this).attr("src", $(this).attr("src").replace(".png", "_on.png"));
    });
}