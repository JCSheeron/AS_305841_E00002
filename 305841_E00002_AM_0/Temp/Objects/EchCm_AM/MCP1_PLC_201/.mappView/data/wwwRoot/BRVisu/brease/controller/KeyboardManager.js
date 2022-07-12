define([
    'brease/events/BreaseEvent',
    'system/widgets/KeyBoard/libs/LayoutSelector',
    'system/widgets/common/keyboards/KeyboardType',
    'brease/core/ClassUtils',
    'widgets/brease/NumPad/NumPad',
    'widgets/brease/KeyBoard/KeyBoard'],
function (BreaseEvent, LayoutSelector, KeyboardType, ClassUtils, BreaseNumPadClass) {

    'use strict';

    /**
        * @class brease.controller.KeyboardManager
        * @extends Object
        * @singleton
        */
    var controller = {

            /**
            * @method getKeyboard
            * Get widget instance of alphanumeric keyboard
            * @return {brease.objects.WidgetInstance}
            */
            getKeyboard: function () {
                return keyboardInstance;
            },
            /**
            * @method getLayoutSelector
            * Get instance of layout selector for alphanumeric keyboard
            * @return {HTMLElement}
            */
            getLayoutSelector: function () {
                return layoutSelector;
            },

            /**
            * @method getNumPad
            * Get widget instance of numeric keyboard
            * @return {brease.objects.WidgetInstance}
            */
            getNumPad: function () {
                return numPadInstance;
            },

            /**
            * @method isCurrentKeyboard
            * Check if your keyboard instance is the current one
            * @param {brease.objects.WidgetInstance} instance
            * @return {Boolean}
            */
            isCurrentKeyboard: function (instance) {
                return instance === keyboardInstance;
            },

            reset: function () {
                loader.initialized = false;
                if (numPadInstance) {
                    numPadInstance.dispose();
                    numPadInstance = null;
                }
                if (keyboardInstance) {
                    keyboardInstance.dispose();
                    keyboardInstance = null;
                }
            }

        }, displayNames = {},
        keyboardInstance, KeyboardClass, numPadInstance, NumPadClass, keyboardMapping, layoutSelector, currentKeyBoardClass;

    /*
    * @method _getClassPathFromConfig
    * Check if your keyboard instance is the current one
    * @param {KeyboardType} type
    * @return {String}
    */
    function _getClassPathFromConfig(type) {
        var classPath = '';
        if (brease.config && brease.config.virtualKeyboards) {
            var cObj = brease.config.virtualKeyboards[type];
            if (cObj) {
                var refId = cObj.refId;
                if (refId) {
                    classPath = ClassUtils.className2Path(refId, false, false);
                }
            }
        }
        return classPath;
    }
    
    function _getMappingFromConfig() {
        var mappings = {};
        if (brease.config && brease.config.virtualKeyboards && brease.config.virtualKeyboards[KeyboardType.ALPHANUMERIC] && brease.config.virtualKeyboards[KeyboardType.ALPHANUMERIC].mappings) {
            mappings = brease.config.virtualKeyboards[KeyboardType.ALPHANUMERIC].mappings;
        }

        return mappings;
    }

    function _instantiateNumPad(newNumPadClass) {

        var changedClass = NumPadClass !== newNumPadClass;
        NumPadClass = newNumPadClass;
        if (!numPadInstance || changedClass) {
            if (numPadInstance) {
                numPadInstance.dispose();
            }
            numPadInstance = new NumPadClass();
        }

    }

    function _instantiateKeyboard(newKeyboardClass) {
        var changedClass = KeyboardClass !== newKeyboardClass;
        KeyboardClass = newKeyboardClass;
        if (!keyboardInstance || changedClass) {
            if (keyboardInstance) {
                keyboardInstance.dispose();
            }
            keyboardInstance = new KeyboardClass();
        }

    }

    function loadDisplayNames(keyboardMapping) {
        var keyboards = [];
        for (var lang in keyboardMapping) {
            var mapping = keyboardMapping[lang];
            mapping.forEach(function (kbd) {
                if (keyboards.indexOf(kbd) === -1 && kbd !== 'widgets.brease.KeyBoard') {
                    keyboards.push(kbd);
                }
            });
        }
        if (brease.config && brease.config.virtualKeyboards && brease.config.virtualKeyboards[KeyboardType.ALPHANUMERIC]) {
            var defaultKeyboard = brease.config.virtualKeyboards[KeyboardType.ALPHANUMERIC].refId;
            if (defaultKeyboard !== 'widgets.brease.KeyBoard' && keyboards.indexOf(defaultKeyboard) === -1) {
                keyboards.push(defaultKeyboard);
            }
        }
        if (keyboards.length > 0) {
            require(keyboards.map(function (item) { return ClassUtils.className2Path(item, false, true) + '/designer/ClassInfo'; }), function () {
                for (var i = 0; i < arguments.length; i += 1) {
                    var meta = arguments[i].meta;
                    displayNames[meta.className] = (meta.keyboard && meta.keyboard.displayName) ? meta.keyboard.displayName : 'XX';
                }
                _onLanguageChanged({ detail: { currentLanguage: brease.language.getCurrentLanguage() } });
            });
        } else {
            _onLanguageChanged({ detail: { currentLanguage: brease.language.getCurrentLanguage() } });

        }
    }

    // used to retrieve the keyboard class path for a certain language when using 
    // a keyboard mapping
    function _getKeyBoardClassPathByLanguage(lang, index) {
        var classPath = '',
            customKeyBoardClassPath = _getClassPathFromConfig(KeyboardType.ALPHANUMERIC),
            selectorItems = {},
            _index = index !== undefined ? index : 0;

        if (keyboardMapping[lang] && keyboardMapping[lang][_index]) {
            classPath = ClassUtils.className2Path(keyboardMapping[lang][_index]);
            keyboardMapping[lang].forEach(function (item, idx) {
                selectorItems[ClassUtils.className2Path(item)] = { index: idx, displayName: displayNames[item] };
            }, selectorItems);
            layoutSelector.setCurrentLayout(classPath);
            layoutSelector.setItems(selectorItems);
        } else if (customKeyBoardClassPath) {
            classPath = customKeyBoardClassPath;
            var widgetType = ClassUtils.path2ClassName(classPath);
            layoutSelector.setCurrentLayout(classPath);
            selectorItems[customKeyBoardClassPath] = { index: 0, displayName: displayNames[widgetType] };
            layoutSelector.setItems(selectorItems);
        } else {
            layoutSelector.setCurrentLayout('');
            layoutSelector.setItems(selectorItems);
            layoutSelector.setButtonText('');
        }
        return classPath;
    }

    function _onLanguageChanged(e) {
        var currentLanguage = e.detail && (typeof e.detail.currentLanguage === 'string') ? e.detail.currentLanguage : '',
            newKeyBoardClassPath = _getKeyBoardClassPathByLanguage(currentLanguage);
        if (newKeyBoardClassPath) {
            _onLayoutChange(newKeyBoardClassPath);
        } else {
            _onLayoutChange('widgets/brease/KeyBoard/KeyBoard');
        }
    }

    var currentValue;
    // called when the layout is changed by using the layout selector inside a keyboard
    function _onLayoutChange(newKeyBoardClassPath) {
        currentValue = keyboardInstance && keyboardInstance.getValue ? keyboardInstance.getValue() : '';
        if (newKeyBoardClassPath && newKeyBoardClassPath !== currentKeyBoardClass) {
            require([newKeyBoardClassPath], function (CustomKeyboardClass) {
                layoutSelector.el.detach();
                _instantiateKeyboard(CustomKeyboardClass);
                // trigger keyboard changed event only if an existing keyboard was replaced
                if (currentKeyBoardClass !== undefined) {
                    document.body.removeEventListener(BreaseEvent.WIDGET_READY, _onKeyBoardReady);
                    document.body.addEventListener(BreaseEvent.WIDGET_READY, _onKeyBoardReady);
                }
                currentKeyBoardClass = newKeyBoardClassPath;
            }, function fail() { });
        }
    }

    function _onKeyBoardReady(e) {
        if (keyboardInstance.elem && keyboardInstance.elem.id === e.target.id) {
            document.body.dispatchEvent(new CustomEvent(BreaseEvent.SYSTEM_KEYBOARD_CHANGED, { detail: { currentValue: currentValue } }));
            document.body.removeEventListener(BreaseEvent.WIDGET_READY, _onKeyBoardReady);
        }
    }

    function _init() {
        layoutSelector = new LayoutSelector();
        layoutSelector.init(_onLayoutChange);
        var CustomNumPadClassPath = _getClassPathFromConfig(KeyboardType.NUMERIC);

        if (CustomNumPadClassPath) {
            require([CustomNumPadClassPath], function success(CustomNumPadClass) {
                _instantiateNumPad(CustomNumPadClass);
            }, function fail() { });
        } else {
            _instantiateNumPad(BreaseNumPadClass);
        }
        keyboardMapping = _getMappingFromConfig();
        loadDisplayNames(keyboardMapping);
    }

    var loader = {
        config: false,
        resources: false,
        initialized: false,
        init: function () {
            if (loader.config && loader.resources && !loader.initialized) {
                loader.initialized = true;
                document.body.addEventListener(BreaseEvent.LANGUAGE_CHANGED, _onLanguageChanged);
                _init.call(controller);
            }
        }
    };

    // initialize LayoutSelector after configuration and languages are loaded
    document.body.addEventListener(BreaseEvent.CONFIG_LOADED, function () {
        loader.config = true;
        loader.init();
    });
    brease.appElem.addEventListener(BreaseEvent.RESOURCES_LOADED, function () {
        loader.resources = true;
        loader.init();
    });

    return controller;
});
