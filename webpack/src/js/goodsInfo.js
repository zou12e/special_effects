require('../css/goodsInfo.less');
require('./goodsCover.js');
require('jquery');

function getId() {
    var optionList = window.location.search.slice('1').split(';'),
        idNum;
    optionList.forEach(function (ele, index) {
        if(ele.indexOf('id') !== -1) {
            idNum = ele.slice(3);
        }
    })
    return idNum;
}

function getGoodsInfo(cb) {
    var _url = 'http://localhost:8080/api/goodsList.json';
    $.ajax({
        type: 'GET',
        dataType:'json',
        url: _url,
        timeout: 8000,
        success: function (data) {
            cb(data);   
        },
        error: function (data) {
            alert('商品详情数据获取失败');
        }
    })
}
getGoodsInfo(createGoodsInfo);
function createGoodsInfo(dataList) {
    var idNum = getId(),
        len = dataList.list.length,
        data = dataList.list,
        str = '', 
        minNum,
        maxNum,
        liStr = '';
    for(var i = 0; i < len; i++) {
        if(data[i].id == idNum) {
            $('.infor_one_img').html('<img src="'+ data[i].imgurl[0] +'"/>');
            
            $('.one_name').add($('.infor_th p')).html(data[i].name);
            data[i].imgurl.forEach(function (ele, index) {
                str += '<img src="'+ ele +'"/>';
            });
            $('.infor_th').append($(str));
            data[i].spectList.sort(findPriceRange('price'));
            $('.one_price').html('￥' + data[i].spectList[0].price + '-' + data[i].spectList[data[i].spectList.length-1].price);
            data[i].spectList.forEach(function (ele, index) {
                liStr += '<li class="buy_spect_li" data-price="'+ ele.price +'">'+ ele.spect +'</li>';
            });
            $('.buy_spect_wrap ul').html(liStr);
            $('.price_value').html($('.one_price').html());
            return;
        }    
    }
}
function findPriceRange(price) {
    return function (a, b) {
        var value1 = a[price];
        var value2 = b[price];
        return value1 - value2;
    }
}

function bindEvent() {
    $('.infor_two').add($('.infor_fo')).on('click',function () {
        
        $('.buy_wrap').css('display','block');
        $('html').add($('body').css({height: '100%',overflow: 'hidden'}));
    })
    $('.buy_gray').click(function () {
        $('html').add($('body').css({height: 'auto',overflow: 'visible'}));
        $('.buy_wrap').css('display','none');
        
    })  
}
bindEvent();



