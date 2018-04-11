var main = $('#main'),
    go = $('#go'),
    speed = 5,
    num = 0,
    timer,
    flag = true,
    colors = ['#1AAB8A', '#E15650', '#121B39', '#80A84E'];
//动态创建div
function cDiv() {
    var oDiv = $('<div></div>');
    var index = Math.floor(Math.random() * 4);
    oDiv.attr('class', 'row');
    for (var j = 0; j < 4; j++) {
        var iDiv = $('<div></div>');
        oDiv.append(iDiv);
    }
    if (main.children().length == 0) {
        main.append(oDiv);
    } else {
        oDiv.insertBefore(main.children()[0]);
    }
    // var clickDiv = Array.from(oDiv.children())[index];
    var clickDiv = oDiv.children()[index];
    
    $(clickDiv).css('background-color', colors[index]);
    $(clickDiv).attr('class', 'i');
};
function move(dom) {
    clearInterval(timer);
    timer = setInterval(function () {
        var step = parseInt(dom.css('top')) + speed;
        dom.css('top', step + 'px');
        if (parseInt(dom.css('top')) >= 0) {
            cDiv();
            dom.css({
                'top': -150 + 'px',
            });
        }
        var len = dom.children().length;
        if (len == 6) {
            for (var i = 0; i < 4; i++) {
                if (dom.children()[len - 1].children[i].className == 'i') {
                    dom.css('top', '-150px');
                    alert('游戏结束,最高得分: ' + num);
                    clearInterval(timer);
                    flag = false;
                }
            }
            $(dom.children()[len - 1]).remove();
        }
    }, 20);
    bindEvent();
}

function bindEvent() {
    main.on('click', function (event) {
        if (flag) {
            if (event.target.className == 'i') {
                event.target.style.backgroundColor = "#bbb";
                //清除盒子标记
                event.target.className = '';
                //计分
                num++;
                //显示得分
            } else {
                main.css('top', '0px');
                alert('游戏结束 最高得分: ' + num);
                clearInterval(timer);
                flag = false;
            }
            if (num % 10 == 0) {
                speed++;
            }
        }
    })
}
function clickStart() {
    $('a').on('click', function () {
        if (main.children().length) {
            //暴力清楚main里面所有盒子
            main.html('');
        }
        //清空计分
        //隐藏开始盒子
        $('a').css('display', 'none');
        //调用定时器
        move(main);
    })
}
clickStart();

