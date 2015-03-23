/*global sublimevideo */
(function (travi) {
    'use strict';

    var templates = travi.templates,
        eventsModule = travi.events,

        events = {
            LIGHTBOX_CLOSED: 'lightbox-closed'
        };

    function play() {
        sublimevideo.prepareAndPlay('stagedVideo');
    }

    function prepare(mobile, standard, highDef, dimensions) {
        var templateName = 'videoStage';

        templates.render(
            templateName,
            {
                mobile: mobile,
                standard: standard,
                highDef: highDef,
                width: dimensions.width,
                height: dimensions.height
            },
            function (renderedTemplate) {
                $('body').append(renderedTemplate);
            }
        );
    }

    function unload() {
        var $stagedVideo = $('#stagedVideo');

        if ($stagedVideo.length) {
            sublimevideo.unprepare('stagedVideo');

            $('a.sublime').remove();
            $stagedVideo.remove();
        }
    }

    function init() {
        sublimevideo.load();
        sublimevideo.ready(function () {
            sublimevideo.onStop(function () {
                eventsModule.publish(events.LIGHTBOX_CLOSED);
            });
        });
    }

    travi.namespace('video.player', {
        init: init,
        prepare: prepare,
        play: play,
        unload: unload,
        events: events
    });

    $(init);
}(travi));
