(function (global, travi) {
    'use strict';

    var refresh = function () {
        global.location.reload();
    };

    travi.namespace('browserProxy', {
        refresh: refresh
    });
}(this, travi));
