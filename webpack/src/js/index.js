require('../css/index.less');
require('jquery');

var dataList;

function getGoodsList(cb) {
    var _url = 'http://localhost:8080/api/goodsList.json';
    $.ajax({
        type: 'GET',
        dataType:'json',
        url: _url,
        timeout: 8000,
        success: function (data) {
            cb(data);
            dataList = data;
        },
        error: function (data) {
            console.log('商品列表数据获取失败');
        }
    })
}
getGoodsList(creataList);
function creataList(data) {
    var str = '';
    data.list.forEach(function (ele, index) {
        str += '<a href="http://localhost:8080/goodsInfo.html?id='+ ele.id +'"><div class="goods_item">\
                        <img src="'+ ele.imgurl[0] +'" alt="">\
                        <p class="item_name">'+ ele.name +'</p>\
                        <p class="item_price">'+ ele.spectList[0].price +'</p>\
                    </div></a>';
    })
    $('.tab_content').html(str);  
}



