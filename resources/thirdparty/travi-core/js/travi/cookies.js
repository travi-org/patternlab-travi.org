(function (travi) {
    'use strict';

    function getNameAndValueFromPair(pair) {
        var nameAndValue = pair.split('=');

        return {
            name: nameAndValue[0],
            value: nameAndValue[1]
        };
    }

    function getNameFromPair(pair) {
        return getNameAndValueFromPair(pair).name;
    }

    function getValueFromCookie(pair) {
        return getNameAndValueFromPair(pair).value;
    }

    function trimLeadingSpaces(pair) {
        while (pair.charAt(0) === ' ') {
            pair = pair.substring(1, pair.length);
        }

        return pair;
    }

    function getCookie(name) {
        var i, qty, currentPair,
            cookies = document.cookie.split(';');

        qty = cookies.length;
        for (i = 0; i < qty; i = i + 1) {
            currentPair = trimLeadingSpaces(cookies[i]);

            if (name === getNameFromPair(currentPair)) {
                return currentPair;
            }
        }

        return undefined;
    }

    function getCookies() {
        return document.cookie.split(';');
    }

    function exists(name) {
        return getCookie(name) !== undefined;
    }

    function getDateNowAdjustedByDays(days) {
        var date = new Date();

        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

        return date;
    }

    function valueOf(name) {
        return getValueFromCookie(getCookie(name));
    }

    function buildExpiresRelativeToNow(days) {
        var date = getDateNowAdjustedByDays(days);

        return '; expires=' + date.toGMTString();
    }

    function create(name, value, days) {
        var expires;

        if (days) {
            expires = buildExpiresRelativeToNow(days);
        } else {
            expires = '';
        }

        document.cookie = name + '=' + value + expires + '; path=/';
    }

    function remove(name) {
        create(name, '', -1);
    }

    function clearAll() {
        var cookies = getCookies(),
            qty,
            i;

        qty = cookies.length;
        for (i = 0; i < qty; i = i + 1) {
            remove(getNameFromPair(cookies[i]));
        }
    }

    travi.namespace('cookies', {
        exists: exists,
        create: create,
        remove: remove,
        clearAll: clearAll,
        value: valueOf
    });
}(travi));
