var activeClass = 'tm-current';
var nextBtn = $('.navR span');
var preBtn = $('.navL span');
var ulCon = $('.photoBox');
var boxCon = $('.photoView');
var len;

init();
function init() {
    start();
    mouseHover();
    bindEvent();
}
function start() {
    ulCon.find('li').on('click', function () {
        var $this = $(this);
        $this.toggleClass(activeClass).siblings().removeClass(activeClass);
        var src = $this.find('img').attr('src'),
            flag = $this.hasClass(activeClass),
            img = new Image();
        img.src = src;
        if (flag) {
            img.onload = function () {
                var imgW = img.width;
                var imgH = img.height;
                boxCon.css({
                    'width': imgW + 'px',
                    'height': imgH + 'px',
                    'transition': 'all 100ms ease-out'
                })
                boxCon.find('img').css({
                    'transform': 'scale(0.9)'
                })
                boxCon.find('a').css({
                    'height': imgH + 'px'
                })
                boxCon.find('span').css({
                    'top': (imgH / 2 - 10) + 'px'
                })
                boxCon.find('img').on('click', function () {
                    $this.removeClass(activeClass);
                    boxCon.css({
                        'width': 0,
                        'height': 0
                    })
                })
            }
            boxCon.find('img').attr('src', src);
        } else {
            boxCon.css({
                'width': 0,
                'height': 0,
                'transition': 'all 100ms ease-out'
            })
        }
    })
}
function mouseHover() {
    boxCon.find('a').hover(function () {
        var $this = $(this);
        var cla = $this.attr('class');
        var index = ulCon.find('li').index($('li.' + activeClass));
        len = ulCon.find('li').length - 1;
        if ((cla == 'navL' && index == 0) ||
            cla == 'navR' && index == len) {
            $this.children().css({
                'display': 'none'
            })
        } else {
            $this.children().css({
                'display': 'inline-block'
            })
        }
    }, function () {
        var $this = $(this);
        $this.children().css({
            'display': 'none'
        })
    })
}

function bindEvent() {
    var clickTar = {};
    boxCon.find('span').on('click', function () {
        var $this = $(this);
        clickTar.class = $($this.parent()).attr('class');
        clickTar.index = ulCon.find('li').index($('li.' + activeClass))
        var index = clickTar.index;
        clickTar.class == 'navL' ? index-- : index++;
        if (index >= 0 && index <= len) {
            var src = ulCon.find('li').eq(index).find('img').attr('src');
            ulCon.find('li').eq(index).toggleClass(activeClass).siblings().removeClass(activeClass);
            boxCon.find('img').attr('src', src);
            var img = new Image();
            img.src = src;
            boxCon.css({
                'height': img.height + 'px',
                'width': img.width + 'px',
                'transition': 'all 5ms ease-out'
            })
            boxCon.find('img').css({
                'transform': 'scale(0.96)'
            })
            boxCon.find('a').css({
                'height': img.height + 'px'
            })
            boxCon.find('span').css({
                'top': (img.height / 2 + 10) + 'px'
            })
        }
        if (index < 1 || index > len) {
            index = 0;
            $this.css('display', 'none')
        }
    })
}
