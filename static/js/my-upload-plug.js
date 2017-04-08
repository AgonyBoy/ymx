/**
 * 基于百度团队webuploader的二次封装jquery插件
 * 用于日常图片上传
 */
(function($,_BS){
  window._uploader =function(option){
    if(typeof(option)!="object"){throw new Error("param error !");return false;}

    /**
     * 获取自定义参数
     */
    var _btn=option.button!=undefined ? option.button : null;
    var _multiple=typeof(option.multiple)!=undefined && typeof(option.multiple)==="boolean"?option.multiple:false;

    var $uploader=_BS.create({
      server:option.server!=undefined && option.server!=""?option.server:null,
      pick:{
        id:_btn,
        multiple:_multiple
      },
      accept:{                          //配置上传图片的文件后缀格式
        title:'图片上传控件',
        extensions:'gif,jpg,jpeg,png',
        mimeTypes:'image/gif,image/jpeg,image/jpg,image/png'
      },
      thumb:{
        width:1,
        height:1,
        allowMagnify:false,
        crop:false
      },
      compress:false,
      auto:option.auto!=undefined&&typeof(option.auto)==="boolean"?option.auto:true, //是否自动上传
      chunked:option.chunked!=undefined&&typeof(option.chunked)==="boolean"?option.chunked:false, //是否开启分片上传
      chunkSize:option.chunkSize!=undefined&&typeof(option.chunkSize)==="number"?option.chunkSize:1048576,                //分片分成1M/次
      chunkRetry:2,                     //出现网络问题重试几次
      // formData:{},                      //文件上传的参数，每次发送都会发送此对象参数
      fileVal:'file'                    //文件上传域的name
      // fileNumLimit:10,                  //验证文件总数量, 超出则不允许加入队列。
      // fileSingleSizeLimit:5242880,      //验证单个文件大小是否超出限制, 超出则不允许加入队列。
      // duplicate:true                   //去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
    });

    //当文件被加入队列之前触发，此事件的handler返回值为false，则此文件不会被添加进入队列。
    $uploader.on("beforeFileQueued",function(file){
      console.log("加入一个队列前");
    });

/**
    //当文件被加入队列以后触发
    $uploader.on("fileQueued",function(file){
        //生成缩略图
        $uploader.makeThumb( file, function( error, ret ) {
            if ( error ) {
              alert("生成缩略图出错");
            } else {
              //执行缩略图显示 ret-图片路径
            }
        });
        console.log("加入一个队列后");
    });
    */

    //当一批文件添加进队列以后触发
    $uploader.on("filesQueued",function(files){
      console.log("加入一批文件队列后");
    });

    //当文件被移除队列后触发
    $uploader.on("fileDequeued",function(file){
      console.log("移除一个文件队列后");
    });

    //当所有文件上传结束时触发
    $uploader.on("uploadFinished",function(){
      console.log("所有文件上传结束");
    });

    //某个文件开始上传前触发，一个文件只会触发一次。
    $uploader.on("uploadStard",function(file){
      console.log(file.name+"开始上传");
    });

    
    /**当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
     * object {Object}
     * data {Object}默认的上传参数，可以扩展此对象来控制上传参数。
     * headers {Object}可以扩展此对象来控制上传头部。
     */
    $uploader.on("uploadBeforeSend",function(object,data,headers){

    });

    /**当某个文件上传到服务端响应后，会派送此事件来询问服务端响应是否有效。如果此事件handler返回值为false, 则此文件将派送server类型的uploadError事件。
     *object {Object}
     *ret {Object}服务端的返回数据，json格式，如果服务端不是json格式，从ret._raw中取数据，自行解析。
     */
    $uploader.on("uploadAccept",function(object,ret){

    });

    //上传进度 percentage{Number} 上传进度
    $uploader.on("uploadProgress",function(file,percentage){

    });

    /**上传文件出错
     *file {File}File对象
     *reason {String}出错的code
     */
    $uploader.on("uploadError",function(file,reason){
      console.log(file.name+"文件上传出错");
    });

    /**当文件上传成功时触发
     *file {File}File对象
     *response {Object}服务端返回的数据
     */
    $uploader.on("uploadSuccess",function(file,response){
      console.log(file.name+"文件上传成功！");
    });

    //不管成功或者失败，文件上传完成时触发。
    $uploader.on("uploadComplete",function(file){

    });
    return $uploader;
  }
})(jQuery,WebUploader);