var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// 65～90号为26个大写英文字母,97～122号为26个小写英文字母

for (var i = 65; i <= 122; i++) {
    if (i > 90 && i < 97) {
        continue;
    }
    // 接受一个指定的 Unicode 值,然后返回一个字符串
    arr.push(String.fromCharCode(i));
}
var canvasStr, value;
createCanvas();
function createCanvas() {
    canvasStr = '';
    value = '';
    for (var i = 0; i < 6; i++) {
        var a = arr[Math.floor(Math.random() * arr.length)]
        canvasStr += a + ' ';
        value += a;
    }
    var canvas = $('#canvasStr')[0],
        ctx = canvas.getContext('2d'),
        x = canvas.width / 2,
        oImg = new Image();
    oImg.src = './images/bg.jpg';
    // createPattern() 方法在指定的方向内重复指定的元素。
    // 元素可以是图片、视频，或者其他 <canvas> 元素。
    // 被重复的元素可用于绘制/填充矩形、
    oImg.onload = function () {
        var pattern = ctx.createPattern(oImg, 'repeat');
        // fillStyle填充
        ctx.fillStyle = pattern;
        // fillRect绘制
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // 从中心点将文字分散到两边
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ccc';
        // 字体大小 ，样式
        ctx.font = '46px Roboto Slab';
        // setTransform(a, b, c, d, e, f) 先重置再变换
        // 参数：水平缩放、水平倾斜、垂直倾斜、垂直缩放、水平移动、垂直移动
        ctx.setTransform(1, -0.12, 0.2, 1, 0, 12);
        // 开始绘制字体  相对于画布的 X,Y
        ctx.fillText(canvasStr, x, 60);
    }
}

function captcha(inputValue) {
    if (value == inputValue) {
        return true;
    } else {
        return false;
    }
}
function showResult() {
    var inputValue = $('.input').val();
    var result = captcha(inputValue);
    if (result) {
        $('.pic').css({
            display: 'inline-block',
            backgroundImage: 'url("./images/true.png")'
        });
        createCanvas();
    } else {
        $('.errorText').css({
            display: 'inline-block'
        }).text('验证码错误，请重新输入');
        $('.pic').css({
            display: 'inline-block',
            backgroundImage: 'url("./images/false.png")'
        });
        createCanvas();
    }
}

$('.submit').on('click', function () { showResult() });
$('.refresh').on('click', function () { createCanvas() });
$('.input').focus(function () {
    $('.errorText').add($('.pic')).fadeOut(100);
})