
(function () {

    var createElement = function () {
        if (typeof document.createElement !== 'function') {
            return document.createElement(arguments[0]);
        } else {
            return document.createElement.apply(document, arguments);
        }
    };

    var isEventSupported = (function () {

        var needsFallback = !('onblur' in document.documentElement);

        function isEventSupportedInner(eventName, element) {

            var isSupported;
            if (!eventName) { return false; }
            if (!element || typeof element === 'string') {
                element = createElement(element || 'div');
            }
            eventName = 'on' + eventName;
            isSupported = eventName in element;
            
            if (!isSupported && needsFallback) {
                if (!element.setAttribute) {
                    element = createElement('div');
                }
                if (element.setAttribute && element.removeAttribute) {
                    element.setAttribute(eventName, '');
                    isSupported = typeof element[eventName] === 'function';

                    if (element[eventName] !== undefined) {
                        element[eventName] = undefined;
                    }
                    element.removeAttribute(eventName);
                }
            }

            return isSupported;
        }
        return isEventSupportedInner;
    })();

    function injectElementWithStyles(rule, callback, nodes, testnames) {
        var mod = 'brease';
        var style;
        var ret;
        var node;
        var div = createElement('div');
        var body = document.body;

        if (parseInt(nodes, 10)) {
            while (nodes--) {
                node = createElement('div');
                node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                div.appendChild(node);
            }
        }
        style = ['&#173;', '<style id="s', mod, '">', rule, '</style>'].join('');
        div.id = mod;
        (!body.fake ? div : body).innerHTML += style;
        body.appendChild(div);

        ret = callback(div, rule);
        
        div.parentNode.removeChild(div);

        return !!ret;

    }

    var hasEvent = isEventSupported;
    var testStyles = injectElementWithStyles;

    window.featureTest = {

        dataAttributes: function () {
            return (document.getElementById('result').getAttribute('data-test') === 'test');
        },

        defineProperty: function () {
            return typeof Object.defineProperty === 'function';
        },

        json: function () {
            return 'JSON' in window && 'parse' in JSON && 'stringify' in JSON;
        },

        cookies: function () {
            try {
                // Create cookie
                document.cookie = 'cookietest=1';
                var ret = document.cookie.indexOf('cookietest=') !== -1;
                // Delete cookie
                document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
                return ret;
            } catch (e) {
                return false;
            }
        },

        hashchange: function () {
            if (hasEvent('hashchange', window) === false) {
                return false;
            }

            // documentMode logic from YUI to filter out IE8 Compat Mode
            //   which false positives.
            return (document.documentMode === undefined || document.documentMode > 7);
        },

        xhr2: function () {
            return 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest();
        },

        unicode: function () {
            var bool;
            var missingGlyph = createElement('span');
            var star = document.createElement('span');

            testStyles('#brease{font-family:Arial,sans;font-size:300em;}', function (node) {

                missingGlyph.innerHTML = '&#5987';
                star.innerHTML = '&#9734';

                node.appendChild(missingGlyph);
                node.appendChild(star);

                bool = 'offsetWidth' in missingGlyph && missingGlyph.offsetWidth !== star.offsetWidth;
            });

            return bool;
        },

        websockets: function () {
            return 'WebSocket' in window && window.WebSocket.CLOSING === 2;
        },

        video: function () {
            var elem = createElement('video');
            return !!elem.canPlayType;
        },

        performance: function () {
            return 'performance' in window && 'now' in performance;
        }

    };
}());
