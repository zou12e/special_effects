function Index() {
    this.dom = {
        rightBox: $('.rightBox'),
        tbody: $('.bodyBox'),
        totalMoney: $('.totalMoney'),
        addShop: $('.addShop')
    }
    this.obj = {
        money: 0,
        name: '',
        data: [],
        totalMoney: 0
    }
    this.bindEvent();
}
//点击button-->data中添加数据，判断此商品是否存在-->根据data中几组数据增加html结构
Index.prototype.bindEvent = function () {
    var self = this;
    self.dom.addShop.on('click', function () {
        var $this = $(this);
        self.dom.rightBox.css('display', 'block');
        self.obj.money = $this.siblings('.money').html();
        self.obj.name = $this.siblings('.name').html();
        self.addJson(self.obj);
        self.addHtml();
    })
};
Index.prototype.addJson = function (obj) {
    var self = this;
    var data = self.obj.data;
    for (var j = 0; j < data.length; j++) {
        if (data[j].name == obj.name) {
            data[j].num++;
            return;
        }
    }
    data.push({
        name: obj.name,
        money: obj.money,
        num: 1
    });
}
Index.prototype.addHtml = function () {
    var self = this;
    var textHtml = '';
    var data = self.obj.data;
    var tbody = self.dom.tbody;
    var totalMoney = self.obj.totalMoney;
    tbody.html('');
    for (var i = 0; i < data.length; i++) {
        textHtml += '<tr><td>' + data[i].name + '</td><td>' +
            data[i].money + '</td><td><a class="reduce">-</a>' + data[i].num + ' ';
        textHtml += '<a class="addNum">+</a></td><td>￥' + (data[i].num * data[i].money).toFixed(2) + '</td></tr>';
        totalMoney += data[i].num * data[i].money;
        self.dom.totalMoney.text('￥' + totalMoney.toFixed(2));        
    }
    tbody.append(textHtml);
    self.bindSign();
}
Index.prototype.bindSign = function(){
    var self = this;
    var data = self.obj.data;
    $('.addNum').on('click',function(){
        var index = $(this).parents('tr').index();
        data[index].num ++;
        self.addHtml();
    })
    $('.reduce').on('click',function(){
        var index = $(this).parents('tr').index();
        data[index].num --;
        if(data[index].num == 0){
            data.splice(index,1);
        }
        if(data.length == 0){
            self.dom.totalMoney.text(0);
            self.dom.rightBox.css('display','none');
        }
        self.addHtml();
    })
}








































new Index();