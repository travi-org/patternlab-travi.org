(function (travi) {
    'use strict';

    var cookies = travi.cookies,
        persist = travi.enhancements.persist,
        constants = travi.enhancements.constants.get();

    function isSmallScreen() {
        return Modernizr.mq('only screen and (min-width: 320px) and (max-width: 480px)');
    }

    function determineSvgSupport() {
        cookies.create(
            'svg',
            Modernizr.svg ? 't' : 'f',
            constants.DAYS_BEFORE_ENHANCEMENT_COOKIE_EXPIRATION
        );
    }

    function detectEnhancementVersion() {
        if (isSmallScreen()) {
            persist.update(constants.SMALL_COOKIE_VALUE);
        } else {
            persist.update(constants.LARGE_COOKIE_VALUE);
        }
    }

    function setInitialEnhancementVersion() {
        if (!cookies.exists(constants.ENHANCEMENT_VERSION_KEY)) {
            determineSvgSupport();
            detectEnhancementVersion();
        }
    }

    function init() {
        setInitialEnhancementVersion();
    }

    travi.namespace('enhancements.detection', {
        isSmallScreen: isSmallScreen,
        init: init
    });

    init();
}(travi));