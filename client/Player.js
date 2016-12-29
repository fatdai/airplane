/**
 * Created by mac on 16/12/29.
 */

'use strict';

var DEFAULT_SPEED = 100;
var ACCE_SPEED = 300; // 0.5秒可以加速到正常速度

window.Player = GameObject.extend({
    init:function(obj){
        this.id = obj.id;
        this.x = obj.x;
        this.y = obj.y;
        this.dir = obj.dir;
        this.color = "red";
        this.w = 50;
        this.h = 50;

        // 影子
        this.sx = this.x;
        this.sy = this.y;
        this.scolor = "white";

        // 和 gameobject 不一样的属性
        this.state = obj.state;
        this.curSpeed = 0;
        this.conn = obj.conn;
        this.lastDir = this.dir;
        this.lastCmdFrame = -1;

        //
        this.executedEvents = [];
        this.unExecutedEvents = [];
    },

    runCommand : function(cmd){
        console.log("[runCommand] :",cmd.dir);
        this.lastCmdFrame = cmd.frame;
        this.lastDir = this.dir;
        this.dir = cmd.dir;
        if(this.dir === EventType.STOP){
            if(this.state === State.MOVING ||
                this.state === State.ACCE){
                this.state = State.DEACCE;
            }
        }else{
            if(this.state === State.STOP ||
                this.state === State.DEACCE){
                this.state = State.ACCE;
            }
        }
    },

    processInput : function(){
        if(this.unExecutedEvents.length > 0 && this.executedEvents.length < 1){
            var cmd = {dt_ms:dtMs,dir:this.unExecutedEvents[0].type,frame:frameCount,id:this.id};
            this.unExecutedEvents.splice(0,1);
            this.runCommand(cmd);
            this.executedEvents.push(cmd);

            // 模拟延迟200ms
            sendWithDelay(this.conn,'playerMove',cmd);
        }
    },

    getShadowRect : function(){
        return {x:this.sx-this.w/2,y:this.sy - this.h/2,w:this.w,h:this.h};
    },

    updatePosition : function(dir,step){
        switch (dir){
            case EventType.UP:
                this.y -= step;
                if(this.y < 0){
                    this.y = 0;
                }
                break;
            case EventType.DOWN:
                this.y += step;
                if(this.y > canvasHeight){
                    this.y = canvasHeight;
                }
                break;
            case EventType.LEFT:
                this.x -= step;
                if(this.x < 0){
                    this.x = 0;
                }
                break;
            case EventType.RIGHT:
                this.x += step;
                if(this.x > canvasWidth){
                    this.x = canvasWidth;
                }
                break;
            default :
                break;
        }
    },

    update:function(){

        this.processInput();

        // 模拟更新位置
        switch (this.state){
            case State.ACCE:
                this.curSpeed += (dtMs * ACCE_SPEED / 1000);
                if(this.curSpeed > DEFAULT_SPEED){
                    this.curSpeed = DEFAULT_SPEED;
                    this.state = State.MOVING;
                }
                var step = this.curSpeed * dtMs / 1000;
                this.updatePosition(this.dir,step);
                break;
            case State.MOVING:
                var step = DEFAULT_SPEED * dtMs / 1000;
                this.updatePosition(this.dir,step);
                break;
            case State.DEACCE:
                this.curSpeed -= (dtMs * ACCE_SPEED / 1000);
                if(this.curSpeed < 0){
                    this.curSpeed = 0;
                    this.x = this.sx;
                    this.y = this.sy;
                    this.state = State.STOP;
                }else{
                    var step = this.curSpeed * dtMs / 1000;
                    this.updatePosition(this.lastDir,step);
                }
                break;
            default :
                break;
        }

        var collision = false;

        //  检查碰撞,直接使用影子去计算
        for(var i = 0; i < others.length;++i){
            if(isCollision(this.getShadowRect(),others[i].getRect())){
                collision = true;
                this.setColor('yellow');
                others[i].setColor('blue');

                // 发生了碰撞,告诉服务器,服务端进行验证


                break;
            }else{
                this.setColor('red');
                others[i].setColor('green');
            }
        }
    },

    shoot : function(){
        // 发射小球

    }

});