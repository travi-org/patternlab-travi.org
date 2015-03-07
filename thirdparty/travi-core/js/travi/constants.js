(function (travi) {
    'use strict';

    var ownProp = Object.prototype.hasOwnProperty,
        constantList = {};

    function set(key, value) {
        if (!ownProp.call(constantList, key)) {
            constantList[key] = value;
        }
    }

    function get(key) {
        return constantList[key];
    }

    travi.namespace('constants', {
        set: set,
        get: get
    });
}(travi));