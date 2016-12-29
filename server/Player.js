/**
 * Created by mac on 16/12/29.
 */


var cls = require('../public/lib/class');

module.exports = Player = cls.Class.extend({
    init : function(obj){
        this.x = obj.x;
        this.y = obj.y;
        this.dir = obj.dir;
        this.state = obj.state;
        this.id = obj.id;
        this.conn = obj.conn;
    },

    packJson : function(){
        return {x:this.x,y:this.y,dir:this.dir,id:this.id,state : this.state};
    }
});