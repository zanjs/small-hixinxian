var dTime = myDate = new Date().getTime();
if (typeof DEBUG === 'undefined') DEBUG = true;
requirejs.config({
    //这个设置是基于引用 全局公共  path路径.js的页面来设置的.
    baseUrl: './js/libs',
    urlArgs: "xue=" + (new Date()).getTime(),
    //基于baseUrl
    paths: {
        app: '../app',
        controller: '../app/controller',
        model: '../app/model',
        view: '../app/view',
        jquery : './jquery/jquery',
        'cookie' : './jquery/jquery.cookie',
        "lazy" : './jquery/jquery.lazyload.min',
        "layer" : './layer/layer.min',
        "uf" : '../app/model/uf'
    },

    //shim的key 先在paths配置中找,如果没有的话,再以baseUrl指定目录下去找
    shim: {
        backbone: {
            //deps属性相当于require([])命令的第一个参数,指定所依赖的模块,
            //require([])参数路径规则:
            //1.  以./,../打头的总是参照baseUrl去找,
            //2.  直接路径开头的,先在paths配置中找,如果没有的话再以baseUrl为基准去找
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'underscore':{
            exports: '_'
        },
        'uf':{
            exports: '_'
        },
        'backbone.localStorage':{
            deps: ['backbone']
        },
        'toDosJs':{
            deps: ['backbone','backbone.localStorage']
        }


    },
    map: {
        '*': {
            'css': 'css'
        }
    }

});
