/*jslint unparam: true */
(function (travi) {
    'use strict';

    var constants = travi.constants,
        templates = travi.templates,
        pagination = travi.ui.pagination,
        events = travi.events,

        TEMPLATE_NAME = 'update-item',

        $updateList;

    function requestAnnouncements(eventData) {
        $.getJSON(eventData.url, function (data) {
            var announcementsContainer = data.list,
                announcements = announcementsContainer.entities;

            $updateList.hide('blind', function () {
                $updateList.empty();
                templates.get(TEMPLATE_NAME).then(function () {
                    $updateList.append(templates.render(TEMPLATE_NAME, {
                        list: announcementsContainer,
                        updates: announcements
                    }));
                });

                $updateList.show('blind', function () {
                    var offset = parseInt(announcementsContainer.offset, 10) || 0,
                        limit = parseInt(announcementsContainer.limit, 10),
                        total = parseInt(announcementsContainer.totalEntities, 10);

                    events.publish(constants.get('PAGE_EVENT'), {
                        offset: offset,
                        nextOffset: offset + limit,
                        prevOffset: offset - limit,
                        total: total
                    });
                });
            });
        });
    }

    function init() {
        $updateList = $('ol.entityList');

        $('a.add-item').button({icons: {primary: 'ui-action-circle-plus'}});

        events.subscribe(pagination.events.NEXT_PAGE_REQUESTED, requestAnnouncements);
        events.subscribe(pagination.events.PREV_PAGE_REQUESTED, requestAnnouncements);
    }

    $(init);

    travi.register('ui.entityList.pagination', {
        init                    : init,
        constants               : constants,
        requestMoreAnnouncements: requestAnnouncements
    });
}(travi));