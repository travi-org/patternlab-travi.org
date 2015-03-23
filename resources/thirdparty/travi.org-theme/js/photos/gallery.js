/*global Reflection */

(function () {
    'use strict';

    var previewPane = travi.photos.previewPane;

    function init() {
        var $thumbs = $('#thumbs');

        $thumbs.on('click', 'li', function (e) {
            e.preventDefault();

            previewPane.switchPreviewImage($(e.target).closest('li').find('a'));
        });

        previewPane.switchPreviewImage($thumbs.find('li:first a'));
    }

    travi.namespace('photos.gallery', {
        init : init
    });

    $(init);
}());