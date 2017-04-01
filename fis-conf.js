var path = require('path');

// --------------------------------
// 支持 amd 设置
// --------------------------------
fis.config.set('modules.postprocessor.vm', 'amd');
fis.config.set('modules.postprocessor.js', 'amd');
fis.config.set('settings.postprocessor.amd', { 
  packages: [
    // 用来存放 libs 库
    {
      name: 'libs',
      location: 'static/libs/',
      main: 'index'
    }
  ]
});

// 设置 less 的 include_paths 便于组件引入
fis.config.set('settings.parser.less.include_paths', [
  './static/css',
  './components/preboot-mixins'
]);



//支持less
fis.config.set('modules.parser.less', 'less');
//去掉注释
fis.config.set('settings.optimizer.clean-css.keepSpecialComments', 0);
//css自动厂商前缀
fis.config.set("modules.preprocessor.css", "cssprefixer");
// 使用 depscombine 是因为，在配置 pack 的时候，命中的文件其依赖也会打包进来。
fis.config.set('modules.packager', 'depscombine');

fis.config.set('pack', {
  //pack1. 公共样式
  'css/common.css': [
    'components/**.css',
    'components/**.less',
    'static/css/*.css',
    'static/css/main.less',
    'widget/**.css',
    'widget/**.less',
    //'page/**.css',
    //'page/**.less',
  ],

  //pack2. 公共库，三方组件和项目组件
  //       项目组件(static/libs)如不是特别通用的，可以在个列表里面排除，然后使用pack3的方式进行打包
  //       这样来减小公共库的大小
  'js/common.js': [
    'static/libs/*.js', //项目组件
    'components/zepto/*.js',  //zepto
    'components/swiper/swiper.js',  //swiper
    'components/iscroll/iscroll.js',
    //其他zepto组件
    'components/zepto-other/cookie-master/zepto.cookie.min.js',
    'components/ztree/*.js'  //ztree
  ],

  //pack3. 如果某个页面引入的资源需要单独打包，请把配置添加到这里
  //       默认情况不单独打包页面的业务js
  // 'page/home-concat.js': ['page/home.vm']
});



//server端的静态目录配置
fis.config.set('statics','/assets');

fis.config.merge({
  
  roadmap : {
    // domain : '/smp',
    path : [
      {
        //排除组件中的less,md和json类型的文件
        reg: /^\/components\/.*\.(?:less|md|json)$/i,
        release: false
      },
      {
        reg: /^\/components\/(.*)$/i,
        isMod: false,
        release: '${statics}/components/$1'
      },
      
      {
        reg: /^\/static\/libs\/common\.js$/i,
        isMod: false,
        release: '${statics}/${namespace}/libs/common.js'
      },
      //排除组件中的less,md和json类型的文件
      // {
      //   reg: /^\/static\/libs\/common\.js$/i,
      //   isMod: false,
      //   release: '${statics}/${namespace}/libs/common.js'
      // },
      {
        reg: /^\/static\/(.*)$/i,
        isMod: false,
        release: '${statics}/$1'
      },
      {
        reg: /^\/_webapp\/.*$/i,
        release: false
      }
    ],
    ext : {
      //less后缀的文件将输出为css后缀
      //并且在parser之后的其他处理流程中被当做css文件处理
      less : 'css'
    }
  }
});

// markdown 支持
// // npm install -g fis-parser-marked
// // use the `fis-parser-marked` plugin to parse *.md file
// fis.config.set('modules.parser.md', 'marked');
// // *.md will be released as *.html
// fis.config.set('roadmap.ext.md', 'html');

// js 模板支持
fis.config.set('modules.parser.tmpl', 'utc');
fis.config.set('roadmap.ext.tmpl', 'js');
fis.config.set('roadmap.domain','/main');
