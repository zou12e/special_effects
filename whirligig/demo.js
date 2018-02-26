var oWrap = $('.wrapper');
var oImg = $('img');
var len = oImg.length;
var deg = 360 / len;
var body = $('body');
var nowX, nowY, lastX, lastY, disx = 0, disy = 0, roY = 0, roX = 0;
var timer;
function init() {
    for (var i = 0; i < len; i++) {
        var img = $(oImg[i]);
        img.css({
            'transform': 'rotateY(' + i * deg + 'deg) translateZ(400px)',
            //每一个先绕着Y轴旋转36的倍数的角度，再平移  注意先后顺序的不同效果
            'transition': 'transform 1s ' + (len - 1 - i) * 0.1 + 's'
            //动画执行时间1S，每一张延迟开始时间，第一张最后执行动画
        });
    }
}
init();
drag();
function drag() {
    body.on('mousedown', function (e) {
        var event = e || window.event;
        clearInterval(timer);
        lastX = event.clientX;
        lastY = event.clientY;
        body.on('mousemove', function (e) {
            var event = e || window.event;
            nowX = event.clientX;
            nowY = event.clientY;
            disx = nowX - lastX;
            disy = nowY - lastY;
            roY += disx * 0.2;
            roX -= disy * 0.2;
            oWrap.css({
                'transform': 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)',
                'cursor': 'move'
            });
            lastX = nowX;
            lastY = nowY;//每次将当前触发对象的点为变化的初始点，
                });
        body.on('mouseup', function () {
            body.off('mousemove')
            clearInterval(timer);
            timer = setInterval(function () {
                disx *= 0.98;
                disy *= 0.98;
                roY += disx * 0.2;
                roX -= disy * 0.2;
                oWrap.css({
                    'transform': 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)',
                    'cursor':'pointer'
                })
            }, 20);
        });
        return false;//取消鼠标默认事件
    });
}















