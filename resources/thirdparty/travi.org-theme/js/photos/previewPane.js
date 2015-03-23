/*global Reflection*/

(function () {
    'use strict';

    var player = travi.video.player,
        templates = travi.templates,

        elements = {},

        $previewLoader = $('<img>').load(function () {
            $('body').trigger('previewLoaded');
        }),

        previewPaneInitialized = new $.Deferred();

    function playVideo(e) {
        e.preventDefault();
        e.stopPropagation();

        player.play();
    }

    function prepareVideo() {
        player.prepare(
            $previewLoader.data('mobile'),
            $previewLoader.data('standard'),
            $previewLoader.data('high-def'),
            {
                width: $previewLoader.data('width'),
                height: $previewLoader.data('height')
            }
        );
        elements.$preview.click(playVideo);
    }

    function showPreview() {
        elements.$preview.attr('src', $previewLoader.data('previewSrc')).show()
            .closest('a').attr('href', $previewLoader.data('originalSrc'));

        elements.$preview.off('click');
        if ('video' === $previewLoader.data('medium')) {
            prepareVideo();
            elements.$previewContainer.removeClass('image');
            elements.$previewContainer.addClass('video');
        } else {
            elements.$previewContainer.removeClass('video');
            elements.$previewContainer.addClass('image');
        }
    }

    function initPreviewPane() {
        templates.render('previewPane', {}, function (renderedTemplate) {
            $('div.section').append(renderedTemplate);
            $('#play-button').click(playVideo);

            elements = {
                $preview: $('#preview_pos'),
                $previewContainer: $('#imageContainer'),
                $loadingIndicator: $('#preview_loading')
            };

            elements.$previewContainer.find('a').lightBox();
            elements.$preview.load(function (e) {
                elements.$loadingIndicator.hide();
                Reflection.add(e.target);
                elements.$previewContainer.height('auto').height(
                    elements.$previewContainer.height()
                );

                $('#play-button').position({
                    my: 'center',
                    at: 'center',
                    of: elements.$preview
                });
            });

            previewPaneInitialized.resolve();
        });
    }

    function switchPreviewImage($link) {
        var originalSrc = $link.attr('href'),
            $targetThumb = $link.find('img'),
            previewSrc = $targetThumb.data('preview'),
            mobile = $targetThumb.data('mobile'),
            standard = $targetThumb.data('standard'),
            hd = $targetThumb.data('high-def');

        if (mobile) {
            originalSrc = mobile;
            $previewLoader
                .data('medium', 'video')
                .data('mobile', mobile)
                .data('standard', standard)
                .data('high-def', hd)
                .data('width', $targetThumb.data('width'))
                .data('height', $targetThumb.data('height'));
        } else {
            $previewLoader
                .data('medium', 'image')
                .removeData('high-def')
                .removeData('standard')
                .removeData('mobile')
                .removeData('width')
                .removeData('height');
        }

        $.when(previewPaneInitialized).then(function () {
            elements.$previewContainer.height(elements.$previewContainer.height());
            elements.$preview.hide();
            Reflection.remove(elements.$preview.get(0));
            player.unload();
            elements.$loadingIndicator.show();
        });

        $previewLoader.attr('src', previewSrc)
            .data('previewSrc', previewSrc)
            .data('originalSrc', originalSrc);
    }

    function init() {
        $('body').bind('previewLoaded', showPreview);

        initPreviewPane();
    }

    travi.namespace('photos.previewPane', {
        init:               init,
        switchPreviewImage: switchPreviewImage
    });

    $(init);
}());