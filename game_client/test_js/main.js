/**
 * Created by mac on 16/12/30.
 */

'use strict';

//------------------------------------------
// 模块的配置
require.config({

    //baseUrl : "../../node_modules",  //

    paths : {
        "underscore":"../../node_modules/underscore/underscore"   // 不需要后缀?
    },

    // 如果没有遵循 AMD 规范,则可以使用 shim
    shim : {
        'underscore':{
            exports:'_'
        }
        //,
        //'backbone':{
        //    deps : ['underscore','jquery'],
        //    exports : 'Backbone'
        //}
    }
});
//------------------------------------------


define(['test_module'],function(test_module){
    console.log('xxx1111');
});

