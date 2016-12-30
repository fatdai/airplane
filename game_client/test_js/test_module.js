/**
 * Created by mac on 16/12/30.
 */



'use strict';

define(['test_math'],function(test_math){
    function addThree(x,y,z){
        return  test_math.add(test_math.add(x,y),z);
    }

    return {addThree:addThree};
});

