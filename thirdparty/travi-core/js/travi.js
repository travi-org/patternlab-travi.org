(function (global) {
    'use strict';

    function putIn(object, namespace, provided) {
        var levels = namespace.split('.'),
            levelCount = levels.length,
            i;

        for (i = 0; i < levelCount; i += 1) {
            if (object[levels[i]] === undefined) {
                if (i === levelCount - 1) {
                    object[levels[i]] = provided;
                } else {
                    object[levels[i]] = {};
                }
            }

            object = object[levels[i]];
        }

        return object;
    }

    function getFrom(object, parts) {
        var part, subObject;

        if (parts.length === 1) {
            return object[parts[0]];
        }

        if (parts.length > 1) {
            part = parts.shift();
            subObject = object[part];

            if (subObject) {
                return getFrom(subObject, parts);
            }
        }
    }

    function getStyleSheet(sheetUrl) {
        var link = document.createElement('link');

        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', sheetUrl);

        document.getElementsByTagName('head')[0].appendChild(link);
    }

    function namespace(ns, provided) {
        return putIn(this, ns, provided || {});
    }

    global.travi = {
        getStyleSheet   : getStyleSheet,
        namespace       : namespace,
        putInObject     : putIn,
        getFromObject   : getFrom
    };
}(this));