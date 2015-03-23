(function (global) {
    'use strict';

    var cache = [];

    global.realAmplify = global.amplify;

    function subscribe(name, callback) {
        cache.push({
            name: name,
            callback: callback
        });
        global.realAmplify.subscribe(name, callback);
    }

    function restore() {
        var i,
            subscription,
            cacheSize = cache.length;

        for (i = 0; i < cacheSize; i += 1) {
            subscription = cache[i];

            global.realAmplify.unsubscribe(subscription.name, subscription.callback);
        }

        cache = [];
    }

    global.amplify = {
        publish: global.realAmplify.publish,
        subscribe: subscribe,
        restore: restore
    };
}(this));