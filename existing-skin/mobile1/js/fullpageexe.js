
$(document).ready(function(){

    //initialising fullpage.js in the jQuery way
    $('#fullpage').fullpage({
        sectionsColor: ['#fff', '#fff', '#000', '#fff'],
        navigation: true,
        slidesNavigation: true,
        anchors: ['firstPage', 'secondPage', '3rdPage', 'lastPage'],
        normalScrollElements: '#aside'
    });

    // calling fullpage.js methods using jQuery
    $('#moveSectionUp').click(function(e){
        e.preventDefault();
        $.fn.fullpage.moveSectionUp();
    });

    $('#moveSectionDown').click(function(e){
        e.preventDefault();
        $.fn.fullpage.moveSectionDown();
    });
});