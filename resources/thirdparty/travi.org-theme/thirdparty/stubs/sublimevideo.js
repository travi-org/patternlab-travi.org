var sublimevideo = (function () {
    'use strict';

    return {
        prepareAndPlay: function (videoId) {},
        load: $.noop,
        unprepare: function (videoId) {},
        onStop: function (callback) {},
        ready: function (callback) {
            callback();
        }
    };
}());
