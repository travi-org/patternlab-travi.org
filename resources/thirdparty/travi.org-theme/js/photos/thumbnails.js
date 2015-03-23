(function (travi) {
    'use strict';

    var templates = travi.templates,
        templateName = 'thumbnail',

        nextLink,
        $thumbs;

    function addThumbnailsToList(data) {
        templates.render(templateName, data, function (rendered) {
            $thumbs.append(rendered).trigger('more-thumbs-loaded');
        });
    }

    function loadThumbs() {
        if (nextLink) {
            $.getJSON(nextLink, function (data) {
                addThumbnailsToList(data);

                if (data.total > data.nextOffset) {
                    nextLink = nextLink.replace(
                        /offset=[0-9]+/,
                        'offset=' + data.nextOffset
                    );

                    loadThumbs();
                }
            });
        }
    }

    function init() {
        $thumbs = $('#thumbs');

        nextLink = $('#thumbContainer').find('a.more').attr('href');
        loadThumbs();
    }

    travi.namespace('photos.thumbnails', {
        init: init
    });

    $(init);
}(travi));