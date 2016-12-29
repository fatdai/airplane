/**
 * Created by mac on 16/12/26.
 */

var _ = require('underscore');

function genToken(){
    var c = 1;
    return function(){
        return c++;
    }
}

var token = genToken();

console.log(token());
console.log(token());
console.log(token());


 var GameObject = require('../server/gameobject');
var obj = new GameObject({x:1,y:20,dir:1,isMove:true,id:2});
obj.print();



// return [min,max]
function randomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}


console.log("-----------------------------");
for(var i = 0; i < 10; i++){
    console.log(randomNum(1,3));
}

function Person(obj){
    this.id = obj.id;
    this.name = obj.name;
}

function testForEach(){
    console.log("---------testForEach------------");
    var pers = {};

    var p1 = new Person({id:1,name:'zhangsan'});
    var p2 = new Person({id:2,name:'lisi'});
    var p3 = new Person({id:3,name:'wangwu'});
    var p4 = new Person({id:4,name:'zhaoliu'});

    pers[p1.id] = p1;
    pers[p2.id] = p2;
    pers[p3.id] = p3;
    pers[p4.id] = p4;

    _.forEach(pers,function(v){
        console.log(v.id , v.name);
    });

    console.log("---------test size------------");
    console.log("size:",_.size(pers));

    delete  pers[p2.id];

    console.log("size:",_.size(pers));
}

testForEach();


Array.prototype.remove=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
};

function testRemove(){
    console.log("---------test remove------------");
    var arr = [0,1,2,3,4,5,6,7,8];
    arr.remove(4);
    _.forEach(arr,function(v){
        console.log(v);
    });
}

testRemove();

function testFuzhi(){
    console.log("---------test 数组赋值------------");

    function Player(){
        this.events = [];
    }

    Player.prototype.fushEvent = function(events){
        this.events = events;
    };

    function User(name){
        this.name = name;
    }

    var eArr = [new User("a"),new User("b"),new User("c"),new User("d")];
    var p = new Player();
    //p.fushEvent(eArr);
    p.events = eArr;
    eArr = [];

    console.log("eArr.size:",eArr.length);
    console.log("p.events.size:", p.events.length);
}

testFuzhi();


function testRandom(){

    console.log("---------test 数组赋值------------");
    //// 线性同余生成器
    //Math.seed = 5;
    //Math.seededRandom = function(max, min) {
    //    max = max || 1;
    //    min = min || 0;
    //    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    //    var rnd = Math.seed / 233280.0;
    //    return min + rnd * (max - min);
    //};
    //
    //for (var i= 0; i<10; i++) {
    //    console.log(Math.seededRandom());
    //}

    Math.seededRandom = function(min,max){
        max = max || 1;
        min = min || 0;
        Math.seed = (Math.seed * 9301 + 49297) % 233280;
        var rnd = Math.seed / 233280.0;
        //return min + rnd * (max - min);

        var range = max - min;
        return(min + Math.round(rnd * range));
    };

    Math.seed = 5;
    for(var i = 0; i < 20; ++i){
        console.log(Math.seededRandom(4,10));
    }

}

testRandom();


function test_map(){
    console.log("---------test_map------------");
    var arr = [1,2,3,4,5,6,7,8,9];
    arr.map(function(v){
        if(v % 2 == 0){
            return v;
        }
    }).filter(function(f){return f;});
    console.log(arr);
}

test_map();

function test_timeout(){
    console.log("---------test_timeout------------");
    setTimeout(function(){
        console.log("time2 : ",Date.now());
    },1000);
    console.log("time1 : ",Date.now());
}

test_timeout();

function test_key(){
    console.log("---------test_key------------");
    var a = {key:'scene',v:'zhang'};

    function send(obj){
        var ret = {};
        ret[obj.key] = obj.v;
        return ret;
    }

    console.log(send(a));
}

test_key();

function test_obj(){
    console.log("---------test_obj------------");
    var obj = {};
    obj.name = 'zhangsan';
    obj.cmd = {id:1,e:2,type:'down'};

    var tmp = obj.cmd;
    tmp.name = 'hello world!';

    console.log(obj);
}

test_obj();