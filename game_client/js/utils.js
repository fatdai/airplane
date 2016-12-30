/**
 * Created by mac on 16/12/30.
 */


'use strict';

define(function(){

    // return [min,max]
    function randomNum(Min,Max)
    {
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    };

    return {
        randomNum:randomNum
    };

});