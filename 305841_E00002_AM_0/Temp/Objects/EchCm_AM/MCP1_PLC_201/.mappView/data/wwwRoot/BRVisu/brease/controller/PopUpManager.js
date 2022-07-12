define(['brease/core/Utils', 'brease/events/BreaseEvent'], function (Utils, BreaseEvent) {

    'use strict';

    /**
    * @class brease.controller.PopUpManager
    * Helper class for overlays, which derive from Window widget.
    * Attention: the calculation of the highest z-index only works for widgets, which derive from Window widget and have their DOM element outside the appContainer!
    * @singleton
    */
    var PopUpManager = {
        debounceTime: 200,
        init: function () {
            _updateDimensions();
            var debouncedUpdateDimensions = _.debounce(_updateDimensions, PopUpManager.debounceTime);
            document.body.addEventListener(BreaseEvent.APP_RESIZE, function (e) {
                if (e.detail && e.detail.immediate) {
                    debouncedUpdateDimensions.cancel();
                    _updateDimensions();
                } else {
                    debouncedUpdateDimensions();
                }
            });
            $(window).on('resize', debouncedUpdateDimensions);
        },

        /**
        * @method addWindow
        * @param {String} widgetId
        * add widget-id to list of opened windows
        */
        addWindow: function (widgetId, type) {
            if (!_windows[widgetId]) {
                _windows[widgetId] = {
                    id: widgetId,
                    type: type,
                    index: _index += 1
                };
            }
        },

        updateIndex: function (widgetId, index) {
            if (_windows[widgetId]) {
                _windows[widgetId].index = index;
            }
        },

        /**
        * @method getNumberOfWindowsOfType
        * @param {String} type supported types: 'MessageBox', 'DialogWindow'
        * @return {Integer} number of open windows of specified type
        */
        getNumberOfWindowsOfType: function (type) {
            var nr = 0;
            for (var widgetId in _windows) {

                if (_windows[widgetId] && _windows[widgetId].type === type) {
                    nr += 1;
                }
            }
            return nr;
        },

        /**
        * @method removeWindow
        * @param {String} widgetId
        * remove widget-id of list of opened windows
        */
        removeWindow: function (widgetId) {
            delete _windows[widgetId];
        },

        /**
        * @method overlays
        * @param {String} widgetId
        * get all opened windows, which have higher z-index
        */
        overlays: function (widgetId) {
            var overlays = [],
                index = 0;

            if (_windows[widgetId]) {
                index = _windows[widgetId].index;
                for (var id in _windows) {
                    if (_windows[id] && _windows[id].index > index) {
                        overlays.push(_windows[id].id);
                    }
                }
            }
            return overlays;
        },

        /**
        * @method getHighestZindex
        * Method to find highest used z-index.
        */
        getHighestZindex: function () {
            // A&P 606055 A DropDownBox in a Dialog opens behind the Dialog
            _setHighestZindex();
            _maxIndex += 1;
            return _maxIndex;
        },

        update: function () {
            _updateDimensions();
        },

        getDimensions: function () {
            return {
                winWidth: _dimensions.winWidth,
                winHeight: _dimensions.winHeight,
                appWidth: _dimensions.appWidth,
                appHeight: _dimensions.appHeight
            };
        }

    };

    var _maxIndex = -1,
        _windows = {},
        _index = 0,
        _dimensions = {};

    function _updateDimensions() {
        _dimensions = {
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
            appWidth: brease.appView.innerWidth(),
            appHeight: brease.appView.innerHeight()
        };
    }

    function _setHighestZindex() {
        _maxIndex = Utils.getHighestZindex(document.querySelectorAll('body > [class],body > [style],body > [id]'));
    }

    PopUpManager.init();

    return PopUpManager;

});
