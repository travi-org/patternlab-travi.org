(function (travi) {
    'use strict';

    var dialogEvents = travi.ui.dialog.events,
        date = travi.ui.form.date;

    function init() {
        dialogEvents.load(date.init);
    }

    travi.register('ui.dialog.date', {
        init: init
    });
}(travi));