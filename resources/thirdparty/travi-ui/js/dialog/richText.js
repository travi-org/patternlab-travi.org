(function (travi) {
    'use strict';

    var events = travi.events,
        dialogEvents = travi.ui.dialog.events,
        richText = travi.ui.form.richText;

    function init() {
        dialogEvents.load(function () {
            richText.init();
            events.publish(dialogEvents.keys.RESIZED);
        });
    }

    travi.register('ui.dialog.richText', {
        init: init
    });
}(travi));