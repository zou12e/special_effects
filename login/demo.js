var oLogin = $('.btn-login'),
    oUser = $('.user')[0],
    oKey = $('.key')[0],
    oError = $('.error');
    regUser = /^[1]\d{10}$/g;
    regKey = /^[A-Z]\w{5,}/g; //\w{5,} 匹配字母或数字或下划线或汉字 等价于 '[^A-Za-z0-9_]' >= 5位
oLogin.on('click', function () {
    var username = oUser.value;
    var password = oKey.value;

    //test() 方法用于检测一个字符串是否匹配某个模式. 如果字符串中有匹配的值返回 true ,否则返回 false
    if (regUser.test(username) && regKey.test(password)) {
        oLogin.text('登录中...');
    } else {
        oError.removeClass('hide');
    }
})

$('ul').on('click', function () {0
    oLogin.text('登录');
    oError.addClass('hide');
});