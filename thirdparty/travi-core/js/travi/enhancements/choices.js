travi.templates.preLoad('chooseEnhancement', '/resources/thirdparty/travi-core/templates/enhancementVersion.tmpl');

(function (travi) {
    'use strict';

    var cookies = travi.cookies,
        templates = travi.templates,
        browserProxy = travi.browserProxy,

        constants = travi.enhancements.constants.get(),
        persist = travi.enhancements.persist;

    function resetVersion() {
        cookies.remove(constants.ENHANCEMENT_VERSION_KEY);
        browserProxy.refresh();
    }

    function configureVersionToggle(choice, sizeVersion) {
        $('#' + choice + 'Version').click(function () {
            persist.update(sizeVersion);
        });
    }

    function configureLargeVersionToggle() {
        configureVersionToggle(constants.LARGE_SCREEN_CHOICE, constants.LARGE_COOKIE_VALUE);
    }

    function configureSmallVersionToggle() {
        configureVersionToggle(constants.SMALL_SCREEN_CHOICE, constants.SMALL_COOKIE_VALUE);
    }

    function configureVersionToggles() {
        configureLargeVersionToggle();
        configureSmallVersionToggle();

        $('#detectVersion').click(resetVersion);
    }

    function addVersionTogglesToDom(alternateEnhancement, alternateEnhancementText, alternateCommonName) {
        templates.render('chooseEnhancement', {
            alternateEnhancement: alternateEnhancement,
            alternateEnhancementText: alternateEnhancementText,
            alternateCommonName: alternateCommonName
        }, function (renderedTemplate) {
            $('footer').append(renderedTemplate);
            configureVersionToggles();
        });
    }

    function addLinksToChooseVersion() {
        var currentEnhancement = cookies.value(constants.ENHANCEMENT_VERSION_KEY),
            alternateEnhancement,
            alternateEnhancementText,
            alternateCommonName;

        if (currentEnhancement === constants.SMALL_COOKIE_VALUE) {
            alternateEnhancement = constants.LARGE_SCREEN_CHOICE;
            alternateEnhancementText = 'large screen';
            alternateCommonName = 'desktop';

        } else if (currentEnhancement === constants.LARGE_COOKIE_VALUE) {
            alternateEnhancement = constants.SMALL_SCREEN_CHOICE;
            alternateEnhancementText = 'small screen';
            alternateCommonName = 'mobile';
        }

        addVersionTogglesToDom(alternateEnhancement, alternateEnhancementText, alternateCommonName);
    }

    function init() {
        addLinksToChooseVersion();
    }

    travi.namespace('enhancements.choices', {
        init: init
    });

    init();
}(travi));