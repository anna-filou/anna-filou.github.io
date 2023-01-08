$(document).on('scroll', function() {
    var pixels = $(document).scrollTop()
    var total = $(document).height() - $(window).height()
    var percentage = 100 * pixels / total 
    $('.progress').css('width', percentage + '%')
})