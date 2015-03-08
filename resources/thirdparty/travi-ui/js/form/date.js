(function (travi) {
    'use strict';

    function init() {
        $('input[type=date].datepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            buttonImage: '/resources/thirdparty/travi-styles/img/calendar.gif',
            buttonImageOnly: true,
            showOn: 'both'
        });
    }

    travi.register('ui.form.date', {
        init: init
    });
}(travi));