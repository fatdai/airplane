/**
 * Created by mac on 16/12/26.
 */


var KEEP_DISTANCE = 0;

GameObject = Class.extend({
    init:function(obj){
        this.id = obj.id;
        this.x = obj.x;
        this.y = obj.y;
        this.dir = obj.dir;
        this.color = "green";
        this.w = 50;
        this.h = 50;

        this.sx = this.x; // 影子
        this.sy = this.y;
        this.scolor = "white";
    },

    update:function(){
        this.followShadow();
    },

    followShadow : function(){
        switch (this.dir){
            case EventType.UP:
                this.y = this.sy + KEEP_DISTANCE;
                this.x = this.sx;
                break;
            case EventType.DOWN:
                this.y = this.sy - KEEP_DISTANCE;
                this.x = this.sx;
                break;
            case EventType.LEFT:
                this.x = this.sx + KEEP_DISTANCE;
                this.y = this.sy;
                break;
            case EventType.RIGHT:
                this.x = this.sx - KEEP_DISTANCE;
                this.y = this.sy;
                break;
            case EventType.STOP:
                this.x = this.sx;
                this.y = this.sy;
                break;
            default :
                break;
        }
    },

    render:function(){
        ctx.save();
        this.renderShadow();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.w/2,this.y - this.h/2,this.w,this.h);
        ctx.restore();
    },

    renderShadow : function(){
        ctx.fillStyle = this.scolor;
        ctx.fillRect(this.sx - this.w/2,this.sy - this.h/2,this.w,this.h);
    },

    // 检查位置是否合法
    checkPosition : function(pos){
        return true;
    },
    
    getRect : function () {
        return {x:this.x-this.w/2,y:this.y - this.h/2,w:this.w,h:this.h};
    },

    setColor : function(color){
        this.color = color;
    }
});

//var UNIT = 20;
//var DEFAULT_SPEED = 100;
//var ACCE_SPEED = 200; // 0.5秒可以加速到正常速度
////var INTERPOLATION_TIME_MS = 300;  //
//
//// 保持一定距离
//var KEEP_DISTANCE = 20;
//
//function GameObject(obj){
//    this.x = obj.x;
//    this.y = obj.y;
//    this.id = obj.id;
//
//    // 如果为true,则 state应该为 ACCE MOVING
//    // 如果为false,则 state应该为 DEACCE STOP
//    //this.isMove = obj.isMove;  // 是否是在运动
//
//    this.dir = obj.dir;
//    this.state = obj.state;
//
//    this.conn = null;
//    this.host = false;
//    this.curSpeed = 0;
//
//    // 影子的位置
//    this.sx = this.x;
//    this.sy = this.y;
//    this.scolor = "white";  // 影子的颜色
//    this.sdir = this.dir; // 影子的方向
//    this.sState = this.state; // 影子的状态
//
//    // 之前的位置
//    this.lastDir = this.dir;
//
//    this.events = [];
//    this.lastCmdFrame = -1;
//};
//
//GameObject.prototype.getRect = function(){
//    return {x:this.x-UNIT/2,y:this.y - UNIT/2,w:UNIT,h:UNIT};
//};
//
//
//GameObject.prototype.runCommand = function (cmd) {
//    console.log("[runCommand]开始执行命令!");
//    this.lastCmdFrame = cmd.frame;
//    this.lastDir = this.dir;
//    this.dir = cmd.e;
//    if(this.dir === EventType.STOP){
//        if(this.state === State.MOVING ||
//            this.state === State.ACCE){
//            this.state = State.DEACCE;
//        }
//    }else{
//        if(this.state === State.STOP ||
//            this.state === State.DEACCE){
//            this.state = State.ACCE;
//        }
//    }
//};
//
//GameObject.prototype.applyNextCmd = function(){
//
//};
//
//GameObject.prototype.processInput = function(){
//
//    if(this.events.length > 0){
//        var cmd = {dt_ms:dtMs,e:this.events[0],frame:frameCount,id:this.id};
//        this.events.splice(0,1);
//        var self = this;
//
//        pendingActions.push(cmd);
//
//        // 客户端先模拟
//        this.runCommand(cmd);
//
//        // 模拟200ms延迟
//        setTimeout(function(){
//            //console.log("发送输入事件!");
//            self.conn.emit('playerMove',{cmd:cmd});
//        },200);
//    }
//};
//
//GameObject.prototype.followShadow = function(){
//    //if(this.x != this.sx || this.y != this.sy){
//    //    this.x = this.sx;
//    //}
//
//    if(this.id == player.id){
//        return;
//    }
//
//    switch (this.dir){
//        case EventType.UP:
//            this.y = this.sy + KEEP_DISTANCE;
//            this.x = this.sx;
//            break;
//        case EventType.DOWN:
//            this.y = this.sy - KEEP_DISTANCE;
//            this.x = this.sx;
//            break;
//        case EventType.LEFT:
//            this.x = this.sx + KEEP_DISTANCE;
//            this.y = this.sy;
//            break;
//        case EventType.RIGHT:
//            this.x = this.sx - KEEP_DISTANCE;
//            this.y = this.sy;
//            break;
//        case EventType.STOP:
//            this.x = this.sx;
//            this.y = this.sy;
//            break;
//        default :
//            break;
//    }
//};
//
//GameObject.prototype.checkPosition = function(position){
//    return true;
//};
//
//GameObject.prototype.update = function(){
//
//    // 处理主角
//    if(this.host){
//        this.processInput();
//    }
//
//    //
//    this.followShadow();
//
//    // player 的模拟
//    if(this.host){
//
//        if(this.state === State.ACCE){
//            console.log("加速");
//            // 加速
//            this.curSpeed += (dtMs * ACCE_SPEED / 1000);
//            if(this.curSpeed > DEFAULT_SPEED){
//                this.curSpeed = DEFAULT_SPEED;
//                this.state = State.MOVING;
//            }
//            var step = this.curSpeed * dtMs / 1000;
//            this.updatePosition(this.dir,step);
//        }else if(this.state === State.MOVING){
//            console.log("正常运动");
//            //  正常运动
//            var step = DEFAULT_SPEED * dtMs / 1000;
//            this.updatePosition(this.dir,step);
//        }else if(this.state === State.DEACCE){
//            console.log("减速运动");
//            // 减速运动
//            this.curSpeed -= (dtMs * ACCE_SPEED / 1000);
//            if(this.curSpeed < 0){
//                this.curSpeed = 0;
//                this.x = this.sx;
//                this.y = this.sy;
//                this.state = State.STOP;
//            }else{
//                var step = this.curSpeed * dtMs / 1000;
//                this.updatePosition(this.lastDir,step);
//            }
//        }
//    }
//};
//
//GameObject.prototype.updatePosition = function (dir,step){
//    switch (dir){
//        case EventType.UP:
//            this.y -= step;
//            if(this.y < 0){
//                this.y = 0;
//            }
//            break;
//        case EventType.DOWN:
//            this.y += step;
//            if(this.y > canvasHeight){
//                this.y = canvasHeight;
//            }
//            break;
//        case EventType.LEFT:
//            this.x -= step;
//            if(this.x < 0){
//                this.x = 0;
//            }
//            break;
//        case EventType.RIGHT:
//            this.x += step;
//            if(this.x > canvasWidth){
//                this.x = canvasWidth;
//            }
//            break;
//        default :
//            break;
//    }
//};
//
//GameObject.prototype.renderShadow = function(ctx){
//    ctx.save();
//    ctx.fillStyle = this.scolor;
//    ctx.fillRect(this.sx - UNIT/2,this.sy - UNIT/2,UNIT,UNIT);
//    ctx.restore();
//};
//
//GameObject.prototype.render = function(ctx){
//
//    this.renderShadow(ctx);
//
//    ctx.save();
//    if(this.host){
//        ctx.fillStyle = "red";
//    }else{
//        ctx.fillStyle = "green";
//    }
//    ctx.fillRect(this.x - UNIT/2,this.y - UNIT/2,UNIT,UNIT);
//    ctx.restore();
//};UNIT = 20;
//var DEFAULT_SPEED = 100;
//var ACCE_SPEED = 200; // 0.5秒可以加速到正常速度
////var INTERPOLATION_TIME_MS = 300;  //
//
//// 保持一定距离
//var KEEP_DISTANCE = 20;
//
//function GameObject(obj){
//    this.x = obj.x;
//    this.y = obj.y;
//    this.id = obj.id;
//
//    // 如果为true,则 state应该为 ACCE MOVING
//    // 如果为false,则 state应该为 DEACCE STOP
//    //this.isMove = obj.isMove;  // 是否是在运动
//
//    this.dir = obj.dir;
//    this.state = obj.state;
//
//    this.conn = null;
//    this.host = false;
//    this.curSpeed = 0;
//
//    // 影子的位置
//    this.sx = this.x;
//    this.sy = this.y;
//    this.scolor = "white";  // 影子的颜色
//    this.sdir = this.dir; // 影子的方向
//    this.sState = this.state; // 影子的状态
//
//    // 之前的位置
//    this.lastDir = this.dir;
//
//    this.events = [];
//    this.lastCmdFrame = -1;
//};
//
//GameObject.prototype.getRect = function(){
//    return {x:this.x-UNIT/2,y:this.y - UNIT/2,w:UNIT,h:UNIT};
//};
//
//
//GameObject.prototype.runCommand = function (cmd) {
//    console.log("[runCommand]开始执行命令!");
//    this.lastCmdFrame = cmd.frame;
//    this.lastDir = this.dir;
//    this.dir = cmd.e;
//    if(this.dir === EventType.STOP){
//        if(this.state === State.MOVING ||
//            this.state === State.ACCE){
//            this.state = State.DEACCE;
//        }
//    }else{
//        if(this.state === State.STOP ||
//            this.state === State.DEACCE){
//            this.state = State.ACCE;
//        }
//    }
//};
//
//GameObject.prototype.applyNextCmd = function(){
//
//};
//
//GameObject.prototype.processInput = function(){
//
//    if(this.events.length > 0){
//        var cmd = {dt_ms:dtMs,e:this.events[0],frame:frameCount,id:this.id};
//        this.events.splice(0,1);
//        var self = this;
//
//        pendingActions.push(cmd);
//
//        // 客户端先模拟
//        this.runCommand(cmd);
//
//        // 模拟200ms延迟
//        setTimeout(function(){
//            //console.log("发送输入事件!");
//            self.conn.emit('playerMove',{cmd:cmd});
//        },200);
//    }
//};
//
//GameObject.prototype.followShadow = function(){
//    //if(this.x != this.sx || this.y != this.sy){
//    //    this.x = this.sx;
//    //}
//
//    if(this.id == player.id){
//        return;
//    }
//
//    switch (this.dir){
//        case EventType.UP:
//            this.y = this.sy + KEEP_DISTANCE;
//            this.x = this.sx;
//            break;
//        case EventType.DOWN:
//            this.y = this.sy - KEEP_DISTANCE;
//            this.x = this.sx;
//            break;
//        case EventType.LEFT:
//            this.x = this.sx + KEEP_DISTANCE;
//            this.y = this.sy;
//            break;
//        case EventType.RIGHT:
//            this.x = this.sx - KEEP_DISTANCE;
//            this.y = this.sy;
//            break;
//        case EventType.STOP:
//            this.x = this.sx;
//            this.y = this.sy;
//            break;
//        default :
//            break;
//    }
//};
//
//GameObject.prototype.checkPosition = function(position){
//    return true;
//};
//
//GameObject.prototype.update = function(){
//
//    // 处理主角
//    if(this.host){
//        this.processInput();
//    }
//
//    //
//    this.followShadow();
//
//    // player 的模拟
//    if(this.host){
//
//        if(this.state === State.ACCE){
//            console.log("加速");
//            // 加速
//            this.curSpeed += (dtMs * ACCE_SPEED / 1000);
//            if(this.curSpeed > DEFAULT_SPEED){
//                this.curSpeed = DEFAULT_SPEED;
//                this.state = State.MOVING;
//            }
//            var step = this.curSpeed * dtMs / 1000;
//            this.updatePosition(this.dir,step);
//        }else if(this.state === State.MOVING){
//            console.log("正常运动");
//            //  正常运动
//            var step = DEFAULT_SPEED * dtMs / 1000;
//            this.updatePosition(this.dir,step);
//        }else if(this.state === State.DEACCE){
//            console.log("减速运动");
//            // 减速运动
//            this.curSpeed -= (dtMs * ACCE_SPEED / 1000);
//            if(this.curSpeed < 0){
//                this.curSpeed = 0;
//                this.x = this.sx;
//                this.y = this.sy;
//                this.state = State.STOP;
//            }else{
//                var step = this.curSpeed * dtMs / 1000;
//                this.updatePosition(this.lastDir,step);
//            }
//        }
//    }
//};
//
//GameObject.prototype.updatePosition = function (dir,step){
//    switch (dir){
//        case EventType.UP:
//            this.y -= step;
//            if(this.y < 0){
//                this.y = 0;
//            }
//            break;
//        case EventType.DOWN:
//            this.y += step;
//            if(this.y > canvasHeight){
//                this.y = canvasHeight;
//            }
//            break;
//        case EventType.LEFT:
//            this.x -= step;
//            if(this.x < 0){
//                this.x = 0;
//            }
//            break;
//        case EventType.RIGHT:
//            this.x += step;
//            if(this.x > canvasWidth){
//                this.x = canvasWidth;
//            }
//            break;
//        default :
//            break;
//    }
//};
//
//GameObject.prototype.renderShadow = function(ctx){
//    ctx.save();
//    ctx.fillStyle = this.scolor;
//    ctx.fillRect(this.sx - UNIT/2,this.sy - UNIT/2,UNIT,UNIT);
//    ctx.restore();
//};
//
//GameObject.prototype.render = function(ctx){
//
//    this.renderShadow(ctx);
//
//    ctx.save();
//    if(this.host){
//        ctx.fillStyle = "red";
//    }else{
//        ctx.fillStyle = "green";
//    }
//    ctx.fillRect(this.x - UNIT/2,this.y - UNIT/2,UNIT,UNIT);
//    ctx.restore();
//};

//---------------------------------------------
//function get_interpolation_time_point_ms(){
//    if(gameTimeMs > INTERPOLATION_TIME_MS){
//        return gameTimeMs - INTERPOLATION_TIME_MS;
//    }
//    return 0;
//};
//
//function get_snapshots_adjacent_to_time_point(timePoint){
//    for(var i = 0; i < worldSnapShots.length;++i){
//        if(worldSnapShots[i].clientTimeMs > timePoint){
//            toSnapShot = worldSnapShots[i];
//            break;
//        }
//        fromSnapShot = worldSnapShots[i];
//    }
//};
//
//function interpolate(timePoint){
//    var f = (timePoint - fromSnapShot.clientTimeMs)/(toSnapShot.clientTimeMs - timePoint);
//    for(var i = 0;i < fromSnapShot.players.length; ++i){
//        var fromPlayer = fromSnapShot.players[i];
//        for(var j = 0; j < toSnapShot.players.length;++j){
//            var toPlayer = toSnapShot.players[j];
//            if(fromPlayer.id == toPlayer.id && toPlayer.id !== this.id){
//                // 开始插值
//                var new_x = (toPlayer.x - fromPlayer.x) * f + fromPlayer.x;
//                var new_y = (toPlayer.y - fromPlayer.y) * f + fromPlayer.y;
//
//                toPlayer.x = new_x;
//                toPlayer.y = new_y;
//            }
//        }
//    }
//}