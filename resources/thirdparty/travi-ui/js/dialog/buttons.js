(function (travi) {
    'use strict';

    var dialogEvents = travi.ui.dialog.events,
        buttons = travi.ui.form.buttons;

    function init() {
        dialogEvents.load(function () {
            buttons.init();
        });
    }

    travi.register('ui.dialog.buttons', {
        init: init
    });
}(travi));