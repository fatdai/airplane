/**
 * Created by mac on 16/12/30.
 */

'use strict';

define(['utils'],function(utils){

    function Bg(obj){
        obj = obj || {};
        this.w = obj.w || 1000;
        this.h = obj.h || 1000;
        this.color = obj.color || "white";
        this.dots = [];
    };

    Bg.prototype.init = function(){
        for(var i = 0;i < 300; ++i){
            this.dots.push({x:utils.randomNum(0,this.w),y:utils.randomNum(0,this.h)});
        }
    };

    Bg.prototype.update = function(dt){
        var step = dt * 8;
        for(var i = 0;i < this.dots.length; ++i){
            this.dots[i].x -= step;
            if(this.dots[i].x < 0){
                this.dots[i].x = this.w;
            }
        }
    };

    Bg.prototype.render = function(ctx){
        ctx.save();
        ctx.fillStyle = this.color;
        for(var i = 0; i < this.dots.length; ++i){
            ctx.fillRect(this.dots[i].x,this.dots[i].y,1,1);
        }
        ctx.restore();
    };

    window.Bg = Bg;

});