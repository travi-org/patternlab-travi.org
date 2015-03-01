(function (travi) {
    'use strict';

    var testEvents = travi.events,

        keys = {
            LOADED: 'dialog-loaded',
            RESIZED: 'dialog-resized',
            FORM_SUCCESS: 'dialog-form-success',
            FORM_RESULT_CREATED: 'dialog-form-result-created'
        };

    function load(callback) {
        testEvents.subscribe(keys.LOADED, callback);
    }

    function form(callbacks) {
        if (callbacks.success) {
            testEvents.subscribe(keys.FORM_SUCCESS, callbacks.success);
        }

        if (callbacks.created) {
            testEvents.subscribe(keys.FORM_RESULT_CREATED, callbacks.created);
        }
    }

    travi.register('ui.dialog.events', {
        keys: keys,
        load: load,
        form: form
    });
}(travi));