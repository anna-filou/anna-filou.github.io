$(document).on('scroll', function() {
    var pixels = $(document).scrollTop()
    var total = $(document).height() - $(window).height() - $('footer').outerHeight(true) - $('#more-articles').outerHeight(true)
    var percentage = 100 * pixels / total 
    $('.progress').css('width', percentage + '%')
})