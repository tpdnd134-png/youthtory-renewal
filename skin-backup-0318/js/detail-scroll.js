$(document).ready(function(){ 

    $(window).scroll(function() {
        if($(this).scrollTop() > $("#bottom").offset().top - ($("#detailinfo").height() + 254)){ // 80: .fixmenu top
            $("#detailinfo").removeClass("fixmenu");
            $("#detail-right").css("top", "inherit").css("bottom", "-170px");	// -180 : #detail-right padding-bottom + .fixmenu top
        }
        else if($(this).scrollTop() > 0) {
            $("#detail-right").css("bottom", "inherit").css("top", "0");
            $("#detailinfo").addClass("fixmenu");
        }
        else {
            $("#detailinfo").removeClass("fixmenu");
        }
    });
    
});
