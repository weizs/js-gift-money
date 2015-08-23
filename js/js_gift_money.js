/**
 * Created by weizs on 2015/8/21.
 */


(function(){

    var defaultOptions={
            callback:function(){},
            width:100,
            height:56,
            xMin:0,
            yMin:0,
            size:4,
            wrapWidth:800,
            wrapHeight:1200,
            minDelay:300,
            maxDelay:800,
            animateGap:800//TODO
        },
        animate=[],
        indexCache=[],
        position={},
        count=1;

    var HB=function(options){
        this.options= $.extend({},defaultOptions,options);
        this.init();
    };

    HB.prototype={
        init:function(){
            var _self=this;
            _self.wrap=$(_self.options.wrap);
            _self.wrap.on('click','.hb',function(){
                var $this=$(this);
                _self.stop();
                _self.options.callback.call(this,$this,$this.attr('id').split('_')[1]);
            });
            _self.wrap.on('animationend webkitAnimationEnd','.hb',function(){
                var $this=$(this);
                $this.css(_self.getPos());
                $this.css('-webkit-animation-delay',Math.random().toFixed(1)+'s');
                $this.toggleClass('a1').toggleClass('a2');
                //$this.toggleClass('a1').toggleClass('a2');
                //console.log($this);
            });
        },
        stop:function(){
            this.animate=false;
            while(animate.length) clearTimeout(animate.shift());
            this.wrap.find('.hb').remove();
        },
        play:function(){
            var _self=this;
            //console.log('play');
            _self.animate=true;
            for(var i=0;i<_self.options.size;i++){
                setTimeout(function(){
                    _self.show();
                },_self.getDelay(true));
            }
        },
        show:function(){
            if(!this.animate)return;
            var _self=this;
            var pos = _self.getPos(),
                object = _self.getDom(pos);

            _self.wrap.append(object.dom);

            //animate[object.index]=setTimeout(function(){
            //    _self.hide(object);
            //},_self.getDelay());
        },
        hide:function(object){
            object.dom.hide();
            var index=indexCache.indexOf(object.id);
            if(index!=-1){
                var val=indexCache.splice(index,1)[0];
                delete position[val];
            }
            if(!indexCache.length&&this.animate){
                this.animate=false;
                this.play();
            }
            object.dom.remove();
        },
        getDom:function(pos){
            var index=count++,
                opt=this.options;
            pos.index=index;
            position[index]=pos;
            indexCache.push(index);
            return {
                dom:$('<div id="id_'+index+'" class="hb a1" style="left:'+pos.left+'px;top:'+pos.top+'px;width:'+opt.width+'px;height:'+opt.height+'px;line-height:'+opt.height+'px;">点我</div>'),
                id:index
            };
        },
        getDelay:function(begin){
            var opt=this.options,
                time=opt.minDelay+parseInt((opt.maxDelay-opt.minDelay)*Math.random());
            return begin?opt.maxDelay-time:time;
        },
        getPos:function(){
            var opt=this.options;
            return {
                left:opt.xMin+parseInt((opt.wrapWidth-opt.width-opt.xMin)*Math.random()),
                top:opt.yMin+parseInt((opt.wrapHeight-opt.height-opt.yMin)*Math.random())
            };
        }
    };

    var play=function(){
        var wrap=$('#wrap'),
            hb=new HB({
                wrap:wrap,
                wrapWidth:wrap.width(),
                wrapHeight:wrap.height(),
                callback:function(a,index){
                    alert('中奖了:'+index);

                    setTimeout(function(){
                        hb.play();
                    },2000);

                }
            });

        hb.play();
    };
    setTimeout(function(){
        play();
    },1);

})();