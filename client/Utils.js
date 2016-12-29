/**
 * Created by mac on 16/12/26.
 */


// return [min,max]
function randomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
};

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

// 将mousedown的坐标转换成在 canvas 上的坐标
function getPointOnCanvas(x,y){
    var bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width  / bbox.width),
        y: y - bbox.top  * (canvas.height / bbox.height)
    };
}

function isCollision(rect1,rect2){
    if(rect1.x + rect1.w < rect2.x || rect1.x > rect2.x + rect2.w || rect1.y + rect1.h < rect2.y || rect1.y > rect2.y + rect2.h){
        return false;
    }
    return true;
}


//------------------------
// 产生固定的随机数 [min,max]
Math.seededRandom = function(min,max){
    max = max || 1;
    min = min || 0;
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280.0;
    //return min + rnd * (max - min);

    var range = max - min;
    return(min + Math.round(rnd * range));
};


