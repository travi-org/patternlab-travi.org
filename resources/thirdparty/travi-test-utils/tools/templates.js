(function (travi) {
    'use strict';

    var callbacks = {};

    function stub() {
        sinon.stub(travi.templates, 'render', function (templateName, data, callback) {
            assert.isObject(data);
            assert.isFunction(callback);
            callbacks[templateName] = callback;
        });
    }

    function render(templateName, renderedTemplate) {
        var callback = callbacks[templateName];

        if (callback) {
            callback(renderedTemplate);
        } else {
            throw 'No callback cached for template: ' + templateName;
        }
    }

    function restore() {
        callbacks = {};
        travi.test.common.restore(travi.templates.render);
    }

    travi.namespace('test.templates', {
        stub: stub,
        render: render,
        restore: restore
    });
}(travi));