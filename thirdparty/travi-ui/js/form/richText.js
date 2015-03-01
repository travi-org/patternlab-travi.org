(function (travi) {
    'use strict';

    function init() {
        $('textarea.richEditor').wymeditor({
            skin: 'silver',
            updateSelector: 'form',
            postInit: function (wym) {
                wym.fullscreen();
            }
        });
    }

    travi.register('ui.form.richText', {
        init: init
    });
}(travi));