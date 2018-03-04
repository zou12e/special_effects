var items = $('.slider-item');
var prev = $('.prev');
var next = $('.next');
var num = 0;
var flag = true;
function init() {
    for (var i = 0; i < items.length; i++) {
        var item = $(items[i]);
        var width = parseInt($(items[i]).css('width'));
        item.css({
            'left': i * width + 'px',
        });
        var itemChildren = item.children();
        for (var j = 0; j < itemChildren.length; j++) {
            var itemChild = $(itemChildren[j]);
            itemChild.css({
                'backgroundPositionX': -i * width + 'px'
            });
        }
    }
    bindEvent();
}
function bindEvent() {
    prev.on('click', function () {
        if (flag) {
            change(-1);
        }
    });
    next.on('click', function () {
        if (flag) {
            change(1);
        }
    });
}
function change(type) {
    if (type == -1) {
        var rotate = ++num * 90;
    } else if (type == 1) {
        var rotate = --num * 90;
    }
    var item = 0;
    var len = items.length;
    var timer = setInterval(function () {
        flag = false;
        $(items[item]).css({
            'transform': "rotateX(" + rotate + "deg)"
        });
        item++;
        if (item >= len) {
            clearInterval(timer);
            $(items[len - 1]).on('transitionend', function () {
                flag = true;
            })
        }
    }, 100);
}

init();
