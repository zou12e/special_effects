var btnStart = $('.start');
var imgArea = $('.imgArea');
var imgOrigArr = [];
var imgRanArr = [];
var isStart = false;
var imgCell;
imgSplit();
gameState();
// 显示出九张拆分图片
function imgSplit() {
    // imgArea.html('');
    var cell = '';
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            imgOrigArr.push(i * 3 + j);
            cell = $('<div></div>');
            $(cell).attr('class', 'imgCell');
            $(cell).css({
                'width': 100 + 'px',
                'height': 100 + 'px',
                'left': 100 * j + 'px',
                'top': 100 * i + 'px',
                'background': "url('pic.jpg')",
                'backgroundPosition': (-j) * 100 + 'px ' + (-i) * 100 + 'px',
            })
            imgArea.append(cell);
        }
    }
    imgCell = $('.imgCell');
}
//点击btn
function gameState() {
    btnStart.on('click', function () {
        if (!isStart) {
            $(this).text('复原');
            isStart = true;
            randArr();
            cellOrder(imgRanArr);
            imgCell.css({
                'cursor': 'pointer'
            }).on('mouseover', function () {
                $(this).addClass('hover');
            }).on('mouseout', function () {
                $(this).removeClass('hover');
            }).on('mousedown', function (e) {
                $(this).css('cursor', 'move');
                var cellIndex1 = $(this).index();
                var cellX = e.pageX - imgCell.eq(cellIndex1).offset().left;
                var cellY = e.pageY - imgCell.eq(cellIndex1).offset().top;
                $(document).on('mousemove', function (e2) {
                    imgCell.eq(cellIndex1).css({
                        'z-index': '40',
                        'left': (e2.pageX - cellX - imgArea.offset().left) + 'px',
                        'top': (e2.pageY - cellY - imgArea.offset().top) + 'px',
                    });
                }).on('mouseup', function (e3) {
                    var cellIndex2 = changeIndex((e3.pageX - imgArea.offset().left), (e3.pageY - imgArea.offset().top), cellIndex1);
                    if (cellIndex1 == cellIndex2) {
                        cellReturn(cellIndex1);
                    } else {
                        cellChange(cellIndex1, cellIndex2);
                    }
                    $(document).off('mousemove').off('mouseup');
                }).on('mouseup', function () {
                    $(this).css('cursor', 'pointer')
                })
            })
        } else {
            $(this).text('开始');
            isStart = false;
            cellOrder(imgOrigArr);
            imgCell.css('cursor', 'default').off('mouseover').off('mousedown').off('mouseup');
        }
    })
}
//打乱数组
function randArr() {
    imgRanArr = [];
    var len = imgOrigArr.length;
    var order;
    for (var i = 0; i < len; i++) {
        order = Math.floor(Math.random() * len);
        if (imgRanArr.length > 0) {
            //返回当前数值在数组中的索引值
            while (jQuery.inArray(order, imgRanArr) > -1) {
                order = Math.floor(Math.random() * len);
            }
        }
        imgRanArr.push(order);
    }
    console.log(imgOrigArr, imgRanArr)

    return;
}
//根据有序或无序数组改变图片拼接
function cellOrder(arr) {
    for (var i = 0; i < arr.length; i++) {
        imgCell.eq(i).animate({
            'left': arr[i] % 3 * 100 + 'px',
            'top': Math.floor(arr[i] / 3) * 100 + 'px',
        }, 400);
    }
};
//获取到将要交换的两个图片在数组中的标记数字的位置
function changeIndex(x, y, orig) {
    if (x < 0 || x > 300 || y < 0 || y > 300) {
        return orig;
    }
    var row = Math.floor(y / 100),
        col = Math.floor(x / 100),
        location = row * 3 + col;
    var i = 0, len = imgRanArr.length;
    while ((i < len) && (imgRanArr[i] !== location)) {
        console.log(1)
        i++;
    }
    console.log(i)
    return i;
}
//图片返回原来的位置
function cellReturn(index) {
    var row = Math.floor(imgRanArr[index] / 3),
        col = imgRanArr[index] % 3;
    imgCell.eq(index).animate({
        'top': row * 100 + 'px',
        'left': col * 100 + 'px',
    }, 400, function () {
        $(this).css('z-index', '10');
    });
}
//交换两张图片
function cellChange(from, to) {
    var rowFrom = Math.floor(imgRanArr[from] / 3),
        colFrom = imgRanArr[from] % 3,
        rowTo = Math.floor(imgRanArr[to] / 3),
        colTo = imgRanArr[to] % 3,
        temp = imgRanArr[from];
    imgCell.eq(from).animate({
        'top': rowTo * 100 + 'px',
        'left': colTo * 100 + 'px',
    }, 400, function () {
        $(this).css('z-index', '10');
    });
    imgCell.eq(to).animate({
        'top': rowFrom * 100 + 'px',
        'left': colFrom * 100 + 'px',
    }, 400, function () {
        $(this).css('z-index', '10');
        imgRanArr[from] = imgRanArr[to];
        imgRanArr[to] = temp;
        if (checkPass(imgOrigArr, imgRanArr)) {
            sucess();
        }
    })
}
//检查是否游戏结束
function checkPass(rightArr, puzzleArr) {
    if (rightArr.toString() == puzzleArr.toString()) {
        return true;
    } else {
        return false;
    }
};

function sucess() {
    for (var i = 0; i < imgOrigArr.length; i++) {
        if (imgCell.eq(i).has('hover')) {
            imgCell.eq(i).removeClass('hover')
        }
    }
    imgCell.css('cursor', 'default').off('mouseover').off('mousedown').off('mouseup');
    btnStart.text('开始');
    isStart = false;
    alert('you are right');
}