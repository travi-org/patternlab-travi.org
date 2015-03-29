travi.templates.preLoad('blogPreview', '/resources/templates/blogEntryPreview.tmpl');
(function (travi) {
    'use strict';

    var player,
        events,
        templates = travi.templates;

    function prepareAndPlayVideo($thumb) {
        player.prepare($thumb.data('mobile'), $thumb.data('standard'), $thumb.data('hd'), {
            width: $thumb.data('width'),
            height: $thumb.data('height')
        });
        player.play();
    }

    function displayImageInLightbox($thumb) {
        $thumb.closest('a').lightBox({
            imageLoading: '/resources/thirdparty/travi.org-theme/thirdparty/lightbox/images/lightbox-ico-loading.gif',
            imageBtnClose: '/resources/thirdparty/travi.org-theme/thirdparty/lightbox/images/lightbox-btn-close.gif',
            imageBtnPrev: '/resources/thirdparty/travi.org-theme/thirdparty/lightbox/images/lightbox-btn-prev.gif',
            imageBtnNext: '/resources/thirdparty/travi.org-theme/thirdparty/lightbox/images/lightbox-btn-next.gif',
            imageBlank: '/resources/thirdparty/travi.org-theme/thirdparty/lightbox/images/lightbox-blank.gif'
        }).click();
    }

    function thumbReferencesVideo($thumb) {
        return $thumb.data('mobile');
    }

    function thumbClickHandler(e) {
        e.preventDefault();
        var $thumb = $(e.target);

        if (thumbReferencesVideo($thumb)) {
            prepareAndPlayVideo($thumb);
        } else {
            displayImageInLightbox($thumb);
        }
    }

    function importDependencies() {
        player = travi.video.player;
        events = travi.events;
    }

    function loadBlogEntires() {
        $.ajax({
            url: '/entries',
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $('#blogList').find('dl').addClass('loading');
            },
            success: function (data) {
                templates.render('blogPreview', data, function (renderedTemplate) {
                    $('#blogList').find('dl').html(renderedTemplate);
                });
            },
            complete: function () {
                $('#blogList').find('dl').removeClass('loading');
            }
        });
    }

    function init() {
        var $updateList = $('.updateList dl');
        importDependencies();

        $('#thumbs').on('click', 'a', thumbClickHandler);

        events.subscribe(player.events.LIGHTBOX_CLOSED, function () {
            player.unload();
        });

        $updateList.equalizeBottoms().bind('announce-update', function () {
            $updateList.equalizeBottoms();
        });

        loadBlogEntires();
    }

    travi.org.register('home', {
        init: init
    }, [
        'travi.video.player',
        'travi.events'
    ]);
}(travi));
