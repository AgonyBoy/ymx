/**
 * 自定义jquery公共插件
 */
(function($){
  $.fn.extend({
    createProgress:function(progress){      //给指定dom创建进度条
          var _id ="#"+this.attr("id");         //获取元素id
          //var _color ="#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); //随机颜色
          var bar = new ProgressBar.Circle(_id, { //创建进度条对象
            strokeWidth: 5,
            easing: 'easeInOut',
            duration: 1400,
            color: "#da251d",
            trailColor: '#dfdfdf',
            trailWidth: 2,
            svgStyle: null,
            step: function(state, circle) {
                  var value = Math.round(circle.value() * 100);
                  if (value === 0) {
                    circle.setText('');
                  } else {
                    circle.setText(value+"%");
                  }
                }
          });
          bar.text.style.fontSize = '0.5rem';
          bar.animate(progress);  // 加载进度条动画
    }
  });
  /**
   * 定义全局滚动条事件
   */
  window.scrollEvent = function(option){
    var _load,_more,_over,_callback,$more;
    if(typeof(option)=="object"){
      _load = option.addStatus!=undefined?option.addStatus:"加载中...";
      _more = option.stopStatus!=undefined?option.stopStatus:"上拉加载";
      _over = option.overStatus!=undefined?option.overStatus:"没有更多";
      _auto = option.autoLoad!=undefined&&option.autoLoad?true:false;
      _callback = option.callback!=undefined&&typeof(option.callback)=="function"?option.callback:null;

      if(_more!=""){
        var $loader = $("div.mui-content").find("p.ymx-more");
        if($loader.length==0){
          $more = $("<p class='ymx-more'>"+_more+"</p>");
          $more.refreshMore =function(bool){
            if(bool){
              $more.removeClass("loading");
              $more.text(_over);
            }else{
              $more.removeClass("loading");
              $more.text(_more);
            }
          }
          $("div.mui-content").append($more);
        }
      }
      if(_auto&&_callback!=null){loadCallback($more,0);}
    }else{
      mui.toast("方法参数不合法！");
      return false;
    }
    //滚动条事件
    $(window).scroll(function(e){
      var _win_height =$(window).height();
      var _scroll_height = $(document).scrollTop();
      var _cha =$(document).height() - _win_height;
      if(_scroll_height === _cha){
        if(_callback!=null){
          loadCallback($more,_scroll_height);
        }
      }
    });

    //加载回调函数数据
    function loadCallback($more,_scroll_height){
      var _text = $more.text();
      if($more!=undefined&&_text===_more&&_text!=_load){
        $more.addClass("loading");
        $more.text(_load);
        $more.loadPoint=function(){
          $(document).scrollTop(_scroll_height);
        }
        _callback($more);
      }
    }
  }

  /**
   * 随机生成指定长度字符串
   */
  window.randomStr = function(len){
    var _str ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var _sb ="";
    for(var i=0;i<len;i++){
      _sb+=_str.charAt(Math.ceil(Math.random()*(_str.length-1)));
    }
    return _sb;
  }
})(jQuery);