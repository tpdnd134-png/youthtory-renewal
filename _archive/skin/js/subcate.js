$(document).ready(function() {
   ga09_cate_on(); 
});


function ga09_cate_on() {
    var url = location.href;
    if(url.indexOf('cate_no=') > -1) {
        var cateno = url.substring(url.indexOf('cate_no='));
        if(cateno.indexOf('&') > -1) {
            cateno = cateno.substring(0, cateno.indexOf('&'));
        }
        
        $(".menuCategory a").each(function() {
            if ($(this).attr("href").indexOf(cateno) > -1) {
                $(this).parent("li").css("background-color", "#000");
                $(this).parent("li").css("border-color", "#000;");
                $(this).css("color", "#fff");
            }
        });
    }
    
}
