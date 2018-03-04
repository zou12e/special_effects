(function () {
    var defaultPar = {
        rotateNum:5,
        body: 'body',
        clickCb: function () { },
        renderCb: function () { },
    }
    window.Lottery = Lottery;
    function Lottery(par) {
        this.pars = $.extend(true, {}, defaultPar, par);
        this.isDoing = false;
        this.init();
    }
    Lottery.prototype.init = function () {
        var self = this;
        $(this.pars.body).find('#button').on('click', function () {
            if (!self.isDoing) {
                self.isDoing = true;
                self.pars.clickCb();
            }
        })
        $(this.pars.body).find('.box').on('transitionend', function () {
            var deg = $(self.pars.body).attr('data-deg');
            self.pars.renderCb(deg);
            $(self.pars.body).find('.box').css({
                transform: 'rotate(' + deg + 'deg)',
                transition: 'none'
            })
            self.isDoing = false;
        })
    }
    Lottery.prototype.goRotate = function (deg) {
        var rotateEnd = this.pars.rotateNum * 360 + deg;
        $(this.pars.body).find('.box').css({
            transform: 'rotate(' + rotateEnd + 'deg)',
            transition: 'all 5s'
        })
        $(this.pars.body).attr('data-deg', deg);
    }
})()