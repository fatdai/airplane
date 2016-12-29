/**
 * Created by mac on 16/12/29.
 */


var cls = require('../public/lib/class');

GameObject = cls.Class.extend({
    init:function(obj){
        console.log('[GameObject init] called!');
        this.x = obj.x;
        this.y = obj.y;
    }
});

Player = GameObject.extend({
    init:function(obj){
        console.log('[Player init] called!');
        this.name = obj.name;
    }
});

var p = new Player({x:1,y:2,name:'zhangsan'});
console.log(p.x, p.y, p.name);