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


define(['bg'],function(){

    // 定义全局变量
    var gCanvas;
    var gGraphics;
    var gCanvasWidth,gCanvasHeight;
    var gGameWidth = 1000,gGameHeight = 1000;
    var bg;

    var dtMs = 0;
    var startTime = 0;

    start();

    //------------------------------------------------------
    function start(){
        gCanvas = document.getElementById('canvas');
        gGraphics = gCanvas.getContext('2d');
        gCanvasWidth = gCanvas.width;
        gCanvasHeight = gCanvas.height;

        startTime = Date.now();
        bg = new Bg({w:gGameWidth,h:gGameHeight,color:'white'});
        bg.init();

        gameLoop();
    }

    function gameLoop(){

        var curTime = Date.now();
        dtMs = curTime - startTime;
        startTime = curTime;

        update();
        render(gGraphics);
        requestAnimationFrame(gameLoop);
    };

    function update(){
        bg.update(dtMs/1000);
    };

    function render(ctx){
        ctx.clearRect(0,0,gCanvasWidth,gCanvasHeight);
        bg.render(ctx);
    };
});
