(function (travi) {
    'use strict';

    var dialogEvents = travi.ui.dialog.events;

    function ensureResourceDefined(resource) {
        if (!resource) {
            throw {
                name: 'TraviUiEntityListUpdateFailure',
                message: 'Cannot update the entity-list because "resource" was not populated'
            };
        }
    }

    function requestResourceAndThen(resource, callback) {
        ensureResourceDefined(resource);

        $.ajax({
            url: resource,
            type: 'get',
            dataType: 'html',
            success: callback
        });
    }

    function addResourceToList(resource) {
        requestResourceAndThen(resource, function (html) {
            $('ol.entityList').append(html);

            $('p.empty-list-message').remove();
        });
    }

    function listIsEmpty($list) {
        return !$list.find('li').length;
    }

    function removeResourceFromList(resource) {
        $('li.entityBlock[travi-self="' + resource + '"]').remove();

        var $list = $('ol.entityList');

        if (listIsEmpty($list)) {
            $list.before('<p class="empty-list-message">' + $list.attr('travi-empty-state-message') + '</p>');
        }
    }

    function updateResourceInList(resource) {
        requestResourceAndThen(resource, function (html) {
            $('li.entityBlock[travi-self="' + resource + '"]').replaceWith(html);
        });
    }

    function wasRemove(key) {
        return 'remove-resource' === key;
    }

    function wasEdit(key) {
        return 'edit-resource' === key;
    }

    function init() {
        dialogEvents.form({
            created: function (eventData) {
                addResourceToList(eventData.resource);
            },
            success: function (eventData) {
                if (wasRemove(eventData.key)) {
                    ensureResourceDefined(eventData.resource);
                    removeResourceFromList(eventData.resource);
                } else if (wasEdit(eventData.key)) {
                    updateResourceInList(eventData.resource);
                }
            }
        });
    }

    travi.register('ui.entityList.updates', {
        init: init
    });
}(travi));