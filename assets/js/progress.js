function getHeight() {
    var moreArticles = document.getElementById('more-articles');
    if (moreArticles) {
        return moreArticles.offsetHeight;
    } else { 
        return 0;
    }
}

document.addEventListener('scroll', function() {
    var pixels = window.scrollY || document.documentElement.scrollTop;
    var total = document.documentElement.scrollHeight - window.innerHeight - document.querySelector('footer').offsetHeight - getHeight();
    var percentage = 100 * pixels / total;
    document.querySelector('.progress').style.width = percentage + '%';
});
