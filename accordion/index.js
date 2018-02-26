var oUl = $('ul'),
    oLi = $('li'),
    len = oLi.length,
    width = parseInt(oUl.css('width')),
    //除了当前显示的大图之外的其他li的宽度
    ot = Math.floor((width - 400) / (len - 1));
    flag = true;
function init(){
    //初始进来相当于点击最后一张图片
    if(flag){
        change($(oLi[len-1]));        
    }
}
function bindEvent(){
    oLi.on('click',function(){
        change($(this));
        //每次判断是否是点击最后一张图片，改变flag如果是最后一张图片就不需要调用change
        if(($(this).index() +1) == len){
            flag = false;
        }else{
            flag = true;            
        }
    });
    oUl.on('mouseleave',function(){
        init();
    })
}
function change(event){
    event.animate({
        'width':'400px'
    },300,'linear').siblings().animate({
        'width':ot + 'px'
    },300,'linear');
    event.find('.title').css({
        'display':'none'
    })
    event.siblings().find('.title').css({
        'display':'block'
    })
    event.find('.decration').css({
        'bottom':'0px'
    })
    event.siblings().find('.decration').css({
        'bottom':'-50px'
    })
}
init();
bindEvent();




