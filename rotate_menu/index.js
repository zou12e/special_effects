$('.btn').on('click', function () {
    change();
})
function change() {
    var wrap = $('.wrapper');
    wrap.toggleClass('open');
    var oLi = wrap.find('li');
    var deg = 360 / oLi.length;
    for (var i = 0; i < oLi.length; i++) {
        var d = i * deg;
        wrap.hasClass('open') ? rotateZ(oLi[i], d) : rotateZ(oLi[i], -360);
    }
}
function rotateZ(dom, deg) {
    $(dom)
        .css({ 'transform': 'rotateZ(' + deg + 'deg)' })
        .find('div').css({ 'transform': 'rotateZ(' + -deg + 'deg)' })
}
setTimeout(function () { change() }, 100);