$(document).ready(function() {
    if($("#BoardDelForm").length > 0) {
        var url = "/board/review/return_review.html";
        $("#BoardDelForm #list_url").val(url);
    }
});

BOARD_COMMENT.setLocationPage = function(link)
{
    if(link.indexOf('return_url=/board/review/read.html') > -1) {
        link = link.replace('/board/review/read.html', '/board/review/review_pop.html');
    } 
    location.href = link;
}