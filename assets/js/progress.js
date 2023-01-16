function getHeight() {
    if ($('#more-articles').length) {
        return $('#more-articles').outerHeight(true);
    } else { 
        return 0;
    }
}

$(document).on('scroll', function() {
    var pixels = $(document).scrollTop()
    var total = $(document).height() - $(window).height() - $('footer').outerHeight(true) - getHeight()
    var percentage = 100 * pixels / total 
    $('.progress').css('width', percentage + '%')
})