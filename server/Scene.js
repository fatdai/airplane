/**
 * Created by mac on 16/12/26.
 */

var _ = require('underscore');

// 事件
var EventType = {NONE:0,UP:1,DOWN:2,RIGHT:3,LEFT:4,MOUSEDOWN:5,STOP:6};
var State = {ACCE:1,MOVING:2,DEACCE:3,STOP:4}; // 状态

function Scene(){
    this.players = {};  // 在线的玩家
    this.conns = {}; // socket.id  socket  为了方便查找
};

Scene.prototype.addNewGameObject = function (gameobject) {
    this.players[gameobject.id] = gameobject;
    this.conns[gameobject.conn.id] = gameobject;
};
Scene.prototype.removeByGameObject = function(gameobject){
    delete this.players[gameobject.id];
    delete this.conns[gameobject.conn.id];
};

Scene.prototype.removeBySocket = function(socket){
    var p = this.conns[socket.id];
    delete  this.conns[socket.id];
    if(p){
        delete  this.players[p.id];
    }
};


Scene.prototype.pushEventToOthers = function(source,e){
    var self = this;
    _.forEach(this.players,function(p){
        if(p.id != source.id){
            self.pushEventToTarget(p,e);
        }
    });
};
Scene.prototype.pushEventToTarget = function(target,e){
    this.sendWithTestDelay(target.conn, e.type, e.data);
};

Scene.prototype.pushAll = function (type,data) {
    var self = this;
    _.forEach(this.players,function(p){
        if(p && p.conn){
            self.sendWithTestDelay(p.conn,type,data);
        }
    });
};


Scene.prototype.packJson = function(){
    var arr = [];
    _.forEach(this.players,function(p){
        arr.push(p.packJson());
    });
    return {players:arr};
};



Scene.prototype.findGameObjectBySocket = function(socket){
    return this.conns[socket.id];
};

Scene.prototype.findGameObjectById = function(id){
    return this.players[id];
};

Scene.prototype.runCommand = function (cmd) {

    var p = this.findGameObjectById(cmd.id);
    p.dir = cmd.dir;
    console.log("runCommand:", p.dir);
    if(cmd.e === EventType.STOP){
        p.state = State.STOP;
    }else{
        p.state = State.MOVING;
    }
};

// 所以的包 都模拟一个延迟 200 ms
Scene.prototype.sendWithTestDelay = function(conn,type,data){
    setTimeout(function(){
        conn.emit(type,data);
    },200);
};

// 碰撞检测
Scene.prototype.checkCollision = function(){

};

// 游戏主循环
var startTime = Date.now();
var gameTimeMs = 0;
var dtMs = 0;
var DEFAULT_SPEED = 100;
Scene.prototype.gameLoop = function(){

    var now = Date.now();
    dtMs = now - startTime;
    startTime = now;
    gameTimeMs += dtMs;

    // update
    _.forEach(this.players,function(p){
        if(p.state !== State.STOP) {
            var step = dtMs * DEFAULT_SPEED / 1000;
            switch (p.dir){
                case EventType.DOWN:
                    p.y += step;
                    if(p.y > 480){
                        p.y = 480;
                    }
                    break;
                case EventType.UP:
                    p.y -= step;
                    if(p.y < 0){
                        p.y = 0;
                    }
                    break;
                case EventType.LEFT:
                    p.x -= step;
                    if(p.x < 0){
                        p.x = 0;
                    }
                    break;
                case EventType.RIGHT:
                    p.x += step;
                    if(p.x > 640){
                        p.x = 640;
                    }
                    break;
                default :
                    break;
            }
        }
    });

    // 准备发送 snapShot
    this.pushAll('snapshot',this.packJson());
};

function isCollision(rect1,rect2){
    if( rect1.x + rect1.w < rect2.x ||
        rect1.x > rect2.x + rect2.w ||
        rect1.y + rect1.h < rect2.y ||
        rect1.y > rect2.y + rect2.h){
        return false;
    }
    return true;
};

module.exports = Scene;