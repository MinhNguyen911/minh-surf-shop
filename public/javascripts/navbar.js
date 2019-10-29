$(function () {
    setNavigation();
});

function setNavigation() {
    var path = window.location.pathname;
    $(".nav-item a").each(function () {
        var href = $(this).attr('href');
        if (path === href) {
            $(this).closest('li').addClass('active');
        }
    });
}