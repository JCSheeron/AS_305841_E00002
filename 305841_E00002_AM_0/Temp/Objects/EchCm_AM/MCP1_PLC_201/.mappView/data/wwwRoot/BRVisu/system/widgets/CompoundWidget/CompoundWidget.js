define(['brease/core/BaseWidget', 'brease/events/BreaseEvent', 'brease/enum/Enum', 'brease/core/Utils', 'brease/controller/libs/Utils'], function (SuperClass, BreaseEvent, Enum, Utils, controllerUtils) {

    'use strict';

    /**
    * @class system.widgets.CompoundWidget
    * @abstract
    * Base class for all Compound-Widgets. 
    * It should not usually be necessary to use this widget directly, because there are provided subclasses  
    * which implement specialized widget use cases which cover application needs.  
    * @extends brease.core.BaseWidget
    * @iatMeta category:Category
    * System
    * @iatMeta studio:visible
    * false
    * @iatMeta description:short
    * CompoundWidget
    * @iatMeta description:de
    * CompoundWidget
    * @iatMeta description:en
    * CompoundWidget
    */

    /**
    * @cfg {Boolean} focusable=false
    * The CompoundWidget itself will not be added to the focus chain.
    * Child widgets derive the tabIndex from its parent but the parent widget itself is not focusable.
    */
    /**
    * @cfg {Integer} tabIndex=0
    * @iatStudioExposed
    * @iatCategory Behavior 
    */
    /**
    * @cfg {StyleReference} style
    * @hide
    */
    /**
    * @cfg {Boolean} omitClass
    * @hide
    */
    /**
    * @method setStyle
    * @hide
    */
    var defaultSettings = {
            tabIndex: 0,
            focusable: false,
            addContent: brease.config.editMode
        },

        WidgetClass = SuperClass.extend(function CompoundWidget() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;
    WidgetClass.static.delimiter = 'Θ';

    p.init = function () {
        this.data = {};
        this.addInitialClass('classCompoundWidget');
        if (this.settings.addContent === true) {
            addContentCSS.call(this);
            addContentHTML.call(this);
        } else {
            this.contentAdded(false);
        }
    };

    p.contentAdded = function (dispatchReady) {
        SuperClass.prototype.init.call(this);
        if (dispatchReady === true) {
            this._dispatchReady();
        }
        this.setInitialValues();
    };

    p.setInitialValues = function () {
        // override in derived compound widgets
    };

    p.initMapping = function (mapping) {
        this.settings.idPrefix = this.elem.id + WidgetClass.static.delimiter;
        var self = this,
            converted = {};
        for (var key in mapping) {
            if (mapping[key] === 'all') {
                converted[key] = 'all';
            } else {
                var newObj = {};
                for (var widgetId in mapping[key]) {
                    newObj[self.settings.idPrefix + widgetId] = mapping[key][widgetId];
                }
                converted[key] = newObj;
            }
        }
        this.propertyMapping = converted;
    };

    p.selectChildren = function (level) {
        if (this.children === undefined || this.children.length === 0) {
            // Attention: this only works if widget elements are direct children in DOM
            this.directChildren = this.el.find('>[data-brease-widget]');
            this.children = this.el.find('[data-brease-widget]');
        }
        if (level === 'direct') {
            return this.directChildren;
        } else {
            return this.children;
        }
    };

    p.disable = function () {
        SuperClass.prototype.disable.apply(this, arguments);
        if (this.initialized !== true) {
            var enabled = !this.isDisabled;
            if (brease.config.editMode === false) {
                this.selectChildren('direct').each(function () {
                    var widgetId = this.id;
                    brease.uiController.setWidgetPropertyIndependentOfState(widgetId, 'parentEnableState', enabled);
                });
            }
        }
    };

    p._enableHandler = function () {
        SuperClass.prototype._enableHandler.apply(this, arguments);
        var enabled = !this.isDisabled;

        if (brease.config.editMode === false) {
            this.selectChildren('direct').each(function () {
                var widgetId = this.id;
                brease.uiController.setWidgetPropertyIndependentOfState(widgetId, 'parentEnableState', enabled);
            });
        }
    };

    p.setChildProps = function (propName, value) {
        if (value !== undefined && value !== null) {
            var mapping = this.propertyMapping[propName];

            if (mapping) {
                this.selectChildren().each(function () {
                    var property = (mapping === 'all') ? propName : mapping[this.id];
                    if (property !== undefined) {
                        if (property.indexOf(',') !== -1) {
                            var props = property.split(',');
                            for (var i = 0; i < props.length; i += 1) {
                                setProperty(this.id, props[i], value);
                            }
                        } else {
                            setProperty(this.id, property, value);
                        }
                    }
                });
            }
        }
    };

    function setProperty(widgetId, property, value) {
        if (brease.uiController.getWidgetState(widgetId) < Enum.WidgetState.INITIALIZED || widgetSetProperty(widgetId, property, value) === null) {
            brease.uiController.addWidgetOption(widgetId, property, value);
        }
    }

    function widgetSetProperty(widgetId, property, value) {
        var args = [widgetId, getSetter(property), value],
            key = getKey(property);
        if (key !== undefined) {
            args.push(key);
        }
        args.push({
            origin: 'cowi',
            attribute: property,
            value: value
        });

        return brease.uiController.callWidget.apply(brease.uiController, args);
    }

    function getSetter(property) {
        if (property === 'permissionOperate' || property === 'permissionView') {
            return '_setPermission';
        } else {
            return Utils.setter(property);
        }
    }

    function getKey(property) {
        if (property === 'permissionOperate') {
            return 'operate';
        } else if (property === 'permissionView') {
            return 'view';
        } else {
            return undefined;
        }
    }

    p.updateVisibility = function () {
        var visible = this.isVisible();
        SuperClass.prototype.updateVisibility.apply(this, arguments);
        // visibility is potentially changed in SuperClass
        if (visible !== this.isVisible()) {
            visible = this.isVisible();

            if (brease.config.editMode === false) {
                this.selectChildren('direct').each(function () {
                    var widgetId = this.id;
                    brease.uiController.setWidgetPropertyIndependentOfState(widgetId, 'parentVisibleState', visible);
                });
            }
        }
    };

    function addOverlay() {
        var zIndex = Utils.getHighestZindex(this.selectChildren('direct'));
        $('<div style="position:absolute;width:100%;height:100%; background-color:rgba(255,0,0,0); z-index:' + (zIndex + 1) + ';"></div>').appendTo(this.elem);
        this.elem.removeEventListener(BreaseEvent.CONTENT_PARSED, this._bind(addOverlay));
    }

    function addContentHTML() {
        var self = this;
        require(['text!' + self.settings.className + '/content/widgets.html'], function (content) {
            content = content.replace(/\{COWI_ID\}/g, self.elem.id);
            content = content.substring(5, content.length - 6);
            controllerUtils.appendHTML(self.elem, content);
            self.elem.addEventListener(BreaseEvent.CONTENT_PARSED, self._bind(addOverlay));
            brease.uiController.parse(self.elem, false, self.settings.parentContentId);
            self.contentAdded(true);
        });
    }

    function addContentCSS() {
        if (this.constructor.static.contentCSS) {
            controllerUtils.injectCSS(this.constructor.static.contentCSS.replace(/\{ID_PREFIX\}/g, this.settings.idPrefix));
        }
    }

    return WidgetClass;

});
