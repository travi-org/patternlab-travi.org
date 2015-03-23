(function (travi) {
    'use strict';

    var callbacks = {};

    function stub() {
        sinon.stub(travi.events, 'subscribe', function (name, callback) {
            assert.isFunction(callback);
            callbacks[name] = callback;
        });
    }

    function publish(name, data) {
        var callback = callbacks[name];

        if (callback) {
            callback(data);
        } else {
            throw 'No callback cached for event: ' + name;
        }
    }

    function restore() {
        callbacks = {};
        travi.test.common.restore(travi.events.subscribe);
    }

    travi.namespace('test.events', {
        stub: stub,
        publish: publish,
        restore: restore
    });
}(travi));