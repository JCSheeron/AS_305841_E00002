define(['brease/helper/Scroller', 'brease/enum/Enum', 'libs/iscroll-probe'], function (Scroller, Enum, IScroll) {
    
    'use strict';

    var ScrollManager = {

        ADD_TIMEOUT: 50,
        REFRESH_TIMEOUT: 50,
        FAIL_TIMEOUT: 1000,

        init: function (scrollHelper, failTimeout, addTimeout, refreshTimeout) {
            _scrollHelper = scrollHelper;
            if (failTimeout > 0) {
                this.FAIL_TIMEOUT = failTimeout;
            }
            if (addTimeout > 0) {
                this.ADD_TIMEOUT = addTimeout;
            }
            if (refreshTimeout > 0) {
                this.REFRESH_TIMEOUT = refreshTimeout;
            }
        },

        refresh: function (elemId) {
            var item = _getItem(elemId);

            if (item) {
                if (item.refreshTimer) {
                    window.clearTimeout(item.refreshTimer);
                }
                var elem = document.getElementById(elemId);

                if (elem) {
                    if (elem.firstChild && _isSuitableChild(elem.firstChild) && elem.firstChild.scrollHeight > 0) {
                        _refresh(elemId, elem.firstChild);
                    } else {
                        item.refreshTimer = window.setTimeout(ScrollManager.refresh.bind(ScrollManager, elemId), this.REFRESH_TIMEOUT);
                    }
                } else {
                    _clear(elemId);
                }
            }
        },

        remove: function (elemId) {
            var item = _getItem(elemId);

            if (item) {
                if (item.addTimer) {
                    window.clearTimeout(item.addTimer);
                }
                if (item.refreshTimer) {
                    window.clearTimeout(item.refreshTimer);
                }
                if (item.scroller !== undefined) {
                    item.scroller.destroy();
                    item.scroller = undefined;
                }
                _clear(elemId);
            }
        },

        add: function (elem) {

            if (ScrollManager.isSuitable(elem) === false) {
                console.iatWarn('element not suitable for adding a Scroller!');
            } else if (this.hasScroller(elem) === true) {
                console.iatWarn('element has already a Scroller!');
            } else {
                var item = _init(elem.id);

                if (item.addTimer) {
                    window.clearTimeout(item.addTimer);
                }
                if (_isReady(elem)) {
                    _addScroller(elem);
                } else {
                    if (Date.now() - item.startTime < this.FAIL_TIMEOUT) {
                        item.addTimer = window.setTimeout(this.add.bind(this, elem), this.ADD_TIMEOUT);
                    } else {
                        _timeout(elem);
                    }
                }
            }
        },

        hasScroller: function (elem) {
            return (_private[elem.id] !== undefined && _private[elem.id].scroller !== undefined);
        },

        getScroller: function (elem) {
            return (elem && elem.id && _private[elem.id]) ? _private[elem.id].scroller : undefined;
        },

        scrollTo: function (elemId, top, left) {
            if (_private[elemId] && _private[elemId].scroller) {
                _private[elemId].scroller.scrollTo(top, left);
            }
        },

        scrollToContent: function (areaelemid, top, left, duration) {
            if (_private[areaelemid] && _private[areaelemid].scroller) {
                _private[areaelemid].scroller.scrollTo(top, left, duration, IScroll.utils.ease.quadratic);
            }
        },

        getScrollPosition: function (areaElem) {
            if (ScrollManager.hasScroller(areaElem)) {
                return _private[areaElem.id].scroller.getComputedPosition();
            } else {
                console.iatWarn('getScrollPosition: area has no scroller');
                return undefined;
            }
        },

        isSuitable: function (elem) {
            return elem instanceof HTMLElement && elem.id !== undefined && elem.id !== '' && elem.firstChild instanceof HTMLElement;
        },
        
        scrollContent: function (contentId, position, duration) {
            var scrollDeferred = $.Deferred(),
                $content = $('[data-brease-contentid="' + contentId + '"]');
            if ($content.length === 1 && Enum.ScrollPosition.hasMember(position)) {
                var $area = $content.closest('[data-brease-areaid]');
                _activateScroll($area, position, $content, duration);
                scrollDeferred.resolve(true);
            } else if ($content.length === 0) {
                console.iatWarn('Content Id ' + contentId + ' is not defined!');
                scrollDeferred.resolve(false);
            } else if (!Enum.ScrollPosition.hasMember(position)) {
                console.iatWarn('Position value ' + position + ' is not allowed!');
                scrollDeferred.resolve(false);
            }
            return scrollDeferred.promise();
        }
    };

    function _activateScroll($area, position, $content, duration) {
        if (duration === undefined || isNaN(duration)) {
            duration = 0;
        } else {
            duration = parseInt(duration, 10);
        }

        var areaelem = $area[0],
            scrollPos = ScrollManager.getScrollPosition(areaelem),
            offsettop = $area.height() - $content.height(),
            offsetleft = $area.width() - $content.width(),
            offsetHoriz,
            offsetVert;

        if (Enum.ScrollPosition.TOP === position || Enum.ScrollPosition.BOTTOM === position) {
            offsetHoriz = scrollPos.x;
            if (Enum.ScrollPosition.TOP === position) {
                offsetVert = 0;
            } else if (Enum.ScrollPosition.BOTTOM === position) {
                offsetVert = offsettop;
            }
        } else if (Enum.ScrollPosition.LEFT === position || Enum.ScrollPosition.RIGHT === position) {
            offsetVert = scrollPos.y;
            if (Enum.ScrollPosition.LEFT === position) {
                offsetHoriz = 0;
            } else if (Enum.ScrollPosition.RIGHT === position) {
                offsetHoriz = offsetleft;
            }
        }
        ScrollManager.scrollToContent(areaelem.id, offsetHoriz, offsetVert, duration);

    }

    var _private = {},
        _scrollHelper = Scroller;

    function _isReady(elem) {
        return (elem.scrollHeight > 0 && elem.firstChild.scrollHeight > 0);
    }

    function _addScroller(elem) {
        _private[elem.id].scroller = _scrollHelper.addScrollbars(elem, { mouseWheel: true, tap: true, scrollX: true, scrollY: true }, true);
        _private[elem.id].addTimer = undefined;
    }

    function _timeout(elem) {
        _clear(elem.id);
        console.iatWarn('add scroller timed out: ' + elem.id);
    }

    function _clear(elemId) {
        _private[elemId] = undefined;
    }

    function _init(id) {
        if (!_private[id]) {
            _private[id] = {
                startTime: Date.now()
            };
        }
        return _private[id];
    }

    function _getItem(id) {
        return _private[id];
    }

    function _refresh(id, firstChild) {
        if (_private[id].scroller !== undefined) {
            _private[id].scroller.scroller = firstChild;
            _private[id].scroller.scrollerStyle = firstChild.style;
            _private[id].scroller.refresh();
        }
        _private[id].refreshTimer = undefined;
    }

    function _isSuitableChild(elem) {

        return elem.className.indexOf('systemContentLoader') !== -1 || elem.className.indexOf('breaseLayout') !== -1 || elem.className.indexOf('ScrollBox') !== -1;
    }

    return ScrollManager;

});
