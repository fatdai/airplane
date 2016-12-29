var fs = require('fs');
var http = require('http');
var GameObject = require('./server/Player');
var _ = require('underscore');

var Scene = require('./server/Scene');


var sendFile = function(url,res){
    fs.readFile(__dirname + url,function(err,data){
        if(err){
            console.log("error : " , err);
            res.writeHead(500);
            return res.end("Error loading index.html");
        }

        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
};

var server = http.createServer(function(req,res){

    var url = req.url;
    if(url == "/favicon.ico"){
        return; // 不处理图标
    }
    console.log("request url : ",url);
    if(url == "/"){
        // send index html
        var filePath = "/client/index.html";
        console.log("filepath:",filePath);
        sendFile(filePath,res);
    }else{
        sendFile(url,res);
    }
});

var io = require('socket.io').listen(server);

//----------------------------------------------
// 产生id
function genToken(){
    var c = 1;
    return function(){
        return c++;
    }
}

var token = genToken();

//----------------------------------------------
// 声明一个变量
var scene = new Scene();
//var gameTimeMs = 0;
//var startTime = 0;

//----------------------------------------------
server.listen(8888,function(){
    console.log("服务器启动成功! 监听端口:",8888);

    io.on('connection',function(socket){

        console.log("a user connected!");

        // 玩家开始连接
        socket.on('start_con',function(data){
            console.log("[receive cmd start_con]");
            var id = token();

            // 将这个玩家放到在线列表里面
            data.id = id;
            data.conn = socket;
            var player = new Player(data);
            scene.addNewGameObject(player);

            // 先确定这个客户端的id
            console.log("[send cmd start_con_reply]");
            scene.sendWithTestDelay(socket,'start_con_reply',{id:id});

            // 广播给其他在线玩家
            console.log("[send cmd initNewGameObject to all]");
            scene.pushEventToOthers(player,{type:'initNewGameObject',data:player.packJson()});

            // 直接让同步的做
            // 将场景信息发送给这个新玩家
            //scene.pushEventToTarget(player,{type:'sceneinfo',data:scene.packJson()});
        });

        // 玩家掉线
        socket.on('disconnect',function(){
            console.log("客户端掉线!");

            // 通知其他玩家掉线
            var p = scene.findGameObjectBySocket(socket);
            if(p){
                scene.removeBySocket(socket);
                scene.pushEventToOthers(p,{type:'userDisconnect',data:{id: p.id}});
            }
        });

        // 收到玩家的命令
        socket.on('playerMove',function(cmd){
            var p = scene.findGameObjectById(cmd.id);
            if(p){
                scene.runCommand(cmd);
                cmd.pos = {x: p.x,y: p.y};
                // 立刻将此命令广播出去?
                scene.pushAll('playerMoveReply',cmd);
            }else{
                console.log('没有找到玩家');
            }
        });
    });

    // 启动游戏循环
    setInterval(function(){
        scene.gameLoop();
    },1000/10);

    setInterval(function(){
        console.log("当前在线玩家数量:", _.size(scene.players));
    },2000);

    // 发包循环 100 ms 发一次,所有要发的包都放这里?
    //setInterval(function(){
    //
    //},1000/10);
});









