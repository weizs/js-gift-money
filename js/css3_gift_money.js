/**
 * Created by weizs on 2015/8/25.
 */
(function($){
    var defaultOptions={
            callback:function(){},
            width:56,
            height:60,
            xMin:0,
            yMin:0,
            size:3,
            wrapWidth:800,
            wrapHeight:450,
            minDelay:100,
            maxDelay:1500,
            minDuration:300,
            maxDuration:600
        },
        count=1;

    var HB=function(options){
        this.options= $.extend({},defaultOptions,options);
        this.init();
    };

    HB.prototype={
        init:function(){
            var _self=this,
                opt=_self.options;

            opt.maxDelay=opt.maxDelay-opt.minDelay;
            opt.maxDuration=opt.maxDuration-opt.minDuration;

            _self.wrap=$(opt.wrap);

            _self.wrap.on('click','.hb',function(){
                var $this=$(this);
                _self.stop();
                opt.callback.call(this,$this,$this.attr('id').split('_')[1]);
            });
            _self.wrap.on('webkitAnimationEnd animationend','.hb',function(){
                var $this=$(this);
                _self.setAnimateProp($this);
                $this.css(_self.getPos());
                $this.toggleClass('a1').toggleClass('a2');
            });
        },
        stop:function(){
            this.wrap.find('.hb').remove();
        },
        play:function(){
            var _self=this;
            for(var i=0;i<_self.options.size;i++)
                _self.show();
        },
        setAnimateProp:function($dom){
            var opt=this.options;
            $dom.css({
                '-webkit-animation-delay':(opt.minDelay+Math.random().toFixed(2)*opt.maxDelay)+'ms',
                '-webkit-animation-duration':(opt.minDuration+Math.random().toFixed(2)*opt.maxDuration)+'ms'
            });
        },
        show:function(){
            var _self=this;
            var pos = _self.getPos(),
                object = _self.getDom(pos);

            _self.setAnimateProp(object.dom);
            _self.wrap.append(object.dom);
        },
        getDom:function(pos){
            var index=count++,
                opt=this.options;
            pos.index=index;
            return {
                dom:$('<div id="id_'+index+'" class="hb a1 '+(index%2?'r1':'r2')+'" style="left:'+pos.left+'px;top:'+pos.top+'px;width:'+opt.width+'px;height:'+opt.height+'px;line-height:'+opt.height+'px;"></div>'),
                id:index
            };
        },
        getPos:function(){
            var opt=this.options;
            return {
                left:opt.xMin+parseInt((opt.wrapWidth-opt.width-opt.xMin)*Math.random()),
                top:opt.yMin+parseInt((opt.wrapHeight-opt.height-opt.yMin)*Math.random())
            };
        }
    };

    $.hb=function(options){
        return new HB(options);
    };
})(window.jQuery||window.Zepto);
