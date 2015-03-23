(function () {
    'use strict';

    var LIMIT_CLASS = 'at-limit',

        directions = {
            LEFT:  '-=',
            RIGHT: '+='
        },

        elements,
        visibleWidth;

    function updateLimits() {
        var $leftButton = $('button.slide-left'),
            $rightButton = $('button.slide-right'),
            scrollLeft = elements.$thumbs.scrollLeft(),
            maxScroll = elements.$thumbs.prop('scrollWidth') - visibleWidth;

        $leftButton.toggleClass(LIMIT_CLASS, (scrollLeft === 0));
        $rightButton.toggleClass(LIMIT_CLASS, (scrollLeft === maxScroll));
    }

    function scroll(direction) {
        elements.$thumbs.animate({
            scrollLeft: direction + visibleWidth
        }, 'slow', function () {
            updateLimits();
        });
    }

    function init() {
        elements = {
            $thumbs: $('#thumbs').bind('more-thumbs-loaded', updateLimits)
        };

        visibleWidth = elements.$thumbs.outerWidth();

        $('<button class="slide-right">')
            .insertAfter('#thumbs')
            .click(function () {
                scroll(directions.RIGHT);
            });
        $('<button class="slide-left">')
            .insertBefore('#thumbs')
            .click(function () {
                scroll(directions.LEFT);
            });
        updateLimits();
    }

    travi.namespace('photos.carousel', {
        init:       init,
        scroll:     scroll,
        directions: directions
    });

    $(init);
}());