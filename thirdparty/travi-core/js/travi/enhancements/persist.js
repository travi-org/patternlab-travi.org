(function (travi) {
    'use strict';

    var cookies = travi.cookies,
        browserProxy = travi.browserProxy,
        constants = travi.enhancements.constants.get();

    function setEnhancementVersionTo(versionKey) {
        cookies.create(
            constants.ENHANCEMENT_VERSION_KEY,
            versionKey,
            constants.DAYS_BEFORE_ENHANCEMENT_COOKIE_EXPIRATION
        );
        browserProxy.refresh();
    }

    travi.namespace('enhancements.persist', {
        update: setEnhancementVersionTo
    });
}(travi));