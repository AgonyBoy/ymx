/**
 * 自定义jquery公共插件
 */
(function($){
  /**
   * 定义全局滚动条事件
   */
  window.scrollEvent = function(option){
    var _load,_more,_over;
    if(typeof(option)=="object"){
      _load = option.addStatus!=undefined?option.addStatus:null;
      _more = option.stopStatus!=undefined?option.stopStatus:null;
      _over = option.overStatus!=undefined?option.overStatus:null;
    }else{
      mui.toast("方法参数不合法！");
      return false;
    }
    $(window).scroll(function(e){
      var _win_height =$(window).height();
      var _scroll_height = $(document).scrollTop();
      var _cha =$(document).height() - _win_height;
      console.log(_win_height+'====='+_scroll_height+"======"+_cha);
      if(_scroll_height === _cha){
        var _length = $("div.mui-content").find("p.more").length;
        if(_length>0){
          $("div.mui-content").find("p.more").remove();
        }
        $("div.mui-content").append("<p class='more'>正在加载...</p>");
        console.log("xiangdenl "+_length);
      }
    });
  }
})(jQuery);