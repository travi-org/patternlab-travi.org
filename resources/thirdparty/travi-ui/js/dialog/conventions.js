(function (travi) {
    'use strict';

    var events = travi.events,
        dialog = travi.ui.dialog.core;

    function enhanceLinkIntoDialog(e) {
        var $link = $(e.target).closest('a');
        e.preventDefault();

        dialog.loadFromUrl({
            url: $link.attr('href'),
            title: $link.text()
        });
    }

    function bindToApplicationEvents() {
        events.subscribe(travi.ui.dialog.events.keys.RESIZED, function () {
            dialog.recenter();
        });
    }

    function bindToDomEvents() {
        $('body').on('click', 'a.dialog-target', enhanceLinkIntoDialog);
    }

    function init() {
        bindToDomEvents();
        bindToApplicationEvents();
    }

    travi.register('ui.dialog.conventions', {
        init: init
    });
}(travi));