(function (travi) {
    'use strict';

    var ENHANCEMENT_VERSION_KEY = 'ev',
        DAYS_BEFORE_ENHANCEMENT_COOKIE_EXPIRATION = 10,
        SMALL_SCREEN_CHOICE = 'small',
        LARGE_SCREEN_CHOICE = 'large',
        BASIC_CHOICE = 'basic',
        SMALL_COOKIE_VALUE = 's',
        LARGE_COOKIE_VALUE = 'l';

    function getConstants() {
        return {
            ENHANCEMENT_VERSION_KEY: ENHANCEMENT_VERSION_KEY,
            DAYS_BEFORE_ENHANCEMENT_COOKIE_EXPIRATION: DAYS_BEFORE_ENHANCEMENT_COOKIE_EXPIRATION,
            SMALL_SCREEN_CHOICE: SMALL_SCREEN_CHOICE,
            LARGE_SCREEN_CHOICE: LARGE_SCREEN_CHOICE,
            BASIC_CHOICE: BASIC_CHOICE,
            LARGE_COOKIE_VALUE: LARGE_COOKIE_VALUE,
            SMALL_COOKIE_VALUE: SMALL_COOKIE_VALUE
        };
    }

    travi.namespace('enhancements.constants', {
        get: getConstants
    });
}(travi));