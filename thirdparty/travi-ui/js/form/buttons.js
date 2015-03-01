(function (travi) {
    'use strict';

    function init() {
        $('input[type=submit]').button();
    }

    travi.register('ui.form.buttons', {
        init: init
    });
}(travi));