function Index(dom, use24Hours) {
    this.column = Array.from(dom);
    this.classList = ['visible', 'close', 'far', 'far', 'distant', 'distant'];
    this.use24Hours = use24Hours;
    this.start();
}
//开始--》获取到当前时间
// --》当前时间 14 17 35 -->字符串141735
//-->六个数与六个类名为column的div分别对应上
//-->分别找到每一列为当前时间的数字垂直局中显示 --根据数字大小调节在Y轴上移动的距离
//-->同一列中不同数字位置不同 透明度不同（根据为每一个数字见不同的类名实现）

Index.prototype.start = function () {
    var self = this;
    setInterval(function(){
    var c = self.getClock();
    self.column.forEach(function (ele, index) {
        var n = + c[index];
        var offset = n * 86;
        $(ele).css({
            'transform': 'translateY(calc(50vh - ' + offset + 'px - ' + 43 + 'px))'
        })
        Array.from(ele.children).forEach(function (ele2, i2) {
            
            var className = self.getClassName(n,i2);
            $(ele2).attr('class', className)
        })
    })
    },200)
}
Index.prototype.getClock = function () {
    var d = new Date();
    return [this.use24Hours ? d.getHours() : d.getHours() % 12 || 12, d.getMinutes(), d.getSeconds()].reduce(function (p, n) {
         
          return (p + ('0' + n).slice(-2));
    }, '')
}
Index.prototype.getClassName = function (n,i2) {
    var className = this.classList.find(function(className,classIndex){
        return i2 - classIndex === n || i2 + classIndex === n;
    })
    return className || '';
}

new Index($('.column'), true)

