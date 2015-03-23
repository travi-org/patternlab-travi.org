(function (travi) {
    'use strict';

    var cache = [];

    travi.register = function (namespace, object) {
        travi.namespace(namespace, object);

        if (object.init) {
            cache.push(object.init);
        }
    };

    travi.reload = function reload() {
        var i,
            cacheSize = cache.length;

        for (i = 0; i < cacheSize; i += 1) {
            cache[i]();
        }
    };
}(travi));