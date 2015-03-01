(function (travi) {
    'use strict';

    var constants = travi.constants,
        eventsModule = travi.events,

        $paginationControls,
        $divider,

        events = {
            NEXT_PAGE_REQUESTED: 'next-page-requested',
            PREV_PAGE_REQUESTED: 'prev-page-requested'
        };

    constants.set('HIDDEN_CLASS', 'outOfRange');
    constants.set('PAGE_EVENT', 'page-loaded');

    function handleInteraction(e) {
        var $this = $(e.target),
            eventName;

        e.preventDefault();
        e.stopPropagation();

        if ($this.hasClass('more')) {
            eventName = events.NEXT_PAGE_REQUESTED;
        } else {
            eventName = events.PREV_PAGE_REQUESTED;
        }

        eventsModule.publish(eventName, {url: $this.attr('href')});
    }

    function updateOffset($link, newOffset) {
        $link.attr('href', $link.attr('href').replace(/offset=[\-\d]*/, 'offset=' + newOffset));
    }

    function updateLinkVisibility(eventData, $paginationControls) {
        var HIDDEN_CLASS = constants.get('HIDDEN_CLASS');

        $paginationControls.find('li').removeClass(HIDDEN_CLASS);

        if (eventData.offset === 0) {
            $paginationControls.find('a.prev').parent().addClass(HIDDEN_CLASS);
            $divider.addClass(HIDDEN_CLASS);
        }
        if (eventData.total < eventData.nextOffset) {
            $paginationControls.find('a.more').parent().addClass(HIDDEN_CLASS);
            $divider.addClass(HIDDEN_CLASS);
        }
    }

    function updateLinks(eventData) {
        var $moreLink = $('ul.pagination a.more[href^="/' + eventData.resource + '"]'),
            $prevLink = $('ul.pagination a.prev[href^="/' + eventData.resource + '"]');

        updateOffset($moreLink, eventData.nextOffset);
        updateOffset($prevLink, eventData.prevOffset);

        updateLinkVisibility(eventData, $moreLink.closest('ul.pagination'));
    }

    function init() {
        $paginationControls = $('ul.pagination');
        $divider = $paginationControls.find('li.pipeDivider');

        $paginationControls.find('a').click(handleInteraction);

        eventsModule.subscribe(constants.get('PAGE_EVENT'), updateLinks);
    }

    travi.register('ui.pagination', {
        init: init,
        events: events,
        constants: constants,
        update: updateLinks
    });
}(travi));