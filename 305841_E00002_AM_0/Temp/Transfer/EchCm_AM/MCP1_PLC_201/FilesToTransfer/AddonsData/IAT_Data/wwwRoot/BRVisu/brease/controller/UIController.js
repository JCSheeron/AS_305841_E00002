define(['brease/controller/WidgetFactory',
    'brease/controller/WidgetParser',
    'brease/enum/Enum',
    'brease/core/Utils'],
function (_widgetFactory, _widgetParser, Enum, Utils) {
    'use strict';

    /**
    * @class brease.controller.UIController
    * @extends core.javascript.Object
    * Main ui controller; instance is available via brease.uiController
    * It provides methods to manipulate parts of the DOM, e.g. adding and removing widgets.
    * Example of usage:
    *
    *     <script>
    *         brease.uiController.dispose(document.getElementById('container'));
    *     </script>
    *
    * @singleton
    */
    var UIController = function UIController() { },
        p = UIController.prototype,
        _widgetController,
        _defineMethod = function (obj, methodName, method) {
            Utils.defineProperty(obj, methodName, method, true, false, (window.brease !== undefined && brease.config !== undefined && brease.config.mocked === true));
        };

    p.init = function init(bindingController, widgetController) {
        _widgetController = widgetController;
        this.bindingController = bindingController;
        this.widgetsController = {
            getWidget: _widgetController.getWidget,
            getWidgetsOfContent: _widgetController.getWidgetsOfContent,
            getState: _widgetController.getState,
            getSuspendedState: _widgetController.getSuspendedState
        };
        _widgetFactory.init(_widgetController);
    };

    _defineMethod(p, 'setOptions', function setOptions() {
        _widgetController.setOptions.apply(_widgetController, arguments);
    });

    /**
    * @method getOption
    * Method to get one option for a widget  
    * @param {String} widgetId
    * @param {String} propertyName
    * @return {core.datatype.ANY}
    */
    _defineMethod(p, 'getOption', function getOption(widgetId, propertyName) {
        var options = _widgetController.getOptions(widgetId, false);
        if (options) {
            var value = options[propertyName];
            if (Utils.isObject(value)) {
                return Utils.deepCopy(value);
            } else {
                return options[propertyName]; 
            }
        } else {
            return undefined;
        }
    });

    /**
    * @method setOptionsMapping
    * Method to add options for the inner widgets of a CompoundWidget
    * @param {String} coWiId id of the CompoundWidget
    * @param {String} coWiProp name of the property of the CompoundWidget
    * @param {brease.objects.Mapping[]} mappings mappings of inner widgets properties, e.g. [{id:'coWiIdΘLabel1',prop:'text'}]
    * @param {core.datatype.ANY} defaultValue
    */
    _defineMethod(p, 'setOptionsMapping', function setOptionsMapping(coWiId, coWiProp, mappings, defaultValue) {
        if (Array.isArray(mappings)) {
            var status = _widgetController.getState(coWiId),
                projectedValue;
            // in ContentEditor, the CompoundWidget is created before the inner widgets
            // therefore it exists already when setOptionsMapping is called
            if (status >= Enum.WidgetState.INITIALIZED) {
                projectedValue = this.callWidget(coWiId, 'getSettings')[coWiProp];
            } else {
                projectedValue = this.getOption(coWiId, coWiProp);
            }
            mappings.forEach(function (mapping) {
                if (mapping.id !== undefined && mapping.prop !== undefined) {
                    var options = {};
                    if (projectedValue !== undefined) {
                        options[mapping.prop] = projectedValue;
                    } else {
                        options[mapping.prop] = defaultValue;
                    }
                    _widgetController.setOptions(mapping.id, options);
                }
            });
        }
    });

    _defineMethod(p, 'allActive', function allActive() {
        return this.bindingController.allActive.apply(this.bindingController, arguments);
    });

    /**
    * @method loadValuesForContent
    * Method to cause server to send bound values for content with given contentId
    * @param {String} contentId
    */
    _defineMethod(p, 'loadValuesForContent', function loadValuesForContent(contentId, callback) {
        var self = this;
        $.when(
            this.bindingController.activateContent(contentId)
        ).then(function successHandler() {
            if (typeof callback === 'function') {
                callback();
            }
            self.bindingController.sendInitialValues(contentId);
        });
    });

    /**
    * @method loadValuesForVirtualContent
    * Method to cause server to send bound values for virtual content with given contentId
    * @param {String} contentId
    * @param {String} visuId
    */
    _defineMethod(p, 'loadValuesForVirtualContent', function loadValuesForVirtualContent(contentId, callback, visuId) {
        var self = this;
        $.when(
            this.bindingController.activateVirtualContent(contentId, visuId)
        ).then(function successHandler() {
            if (typeof callback === 'function') {
                callback();
            }
            self.bindingController.sendInitialValues(contentId);
        });
    });

    /**
    * @method getSubscriptionsForElement
    * Method to get subscriptions for widget
    * @param {String} widgetId
    * @return {Object}
    */
    _defineMethod(p, 'getSubscriptionsForElement', function getSubscriptionsForElement(widgetId) {
        return this.bindingController.getSubscriptionsForElement(widgetId);
    });

    /**
    * @method parse
    * Parse an HTML element (elem) and/or its innerHTML
    * That means: every HTML element within elem, which has a valid 'data-brease-widget' attribute, is converted to a widget
    * @param {HTMLElement} elem HTML element which has to be parsed
    * @param {Boolean} andSelf if true: include HTML element itself in parsing; if false, only innerHTML is parsed
    */
    _defineMethod(p, 'parse', function parse() {
        _widgetParser.parse.apply(_widgetParser, arguments);
    });

    /**
    * @method dispose
    * dispose an HTML element (elem) and/or its innerHTML
    * That means: every HTML element within elem, which has a valid 'data-brease-widget' attribute, is disposed
    * @param {HTMLElement} elem HTML element which has to be disposed
    * @param {Boolean} andSelf if true: include HTML element itself in disposing; if false, only innerHTML is disposed
    * @param {Function} callback
    */
    _defineMethod(p, 'dispose', function dispose() {
        _widgetController.dispose.apply(_widgetController, arguments);
    });
    
    /**
    * @method disposeInContent
    * @param {HTMLElement} target HTML element which contains content
    * @param {String} contentId
    * @param {Function} callback
    */
    _defineMethod(p, 'disposeInContent', function disposeInContent() {
        _widgetController.disposeInContent.apply(_widgetController, arguments);
    });

    _defineMethod(p, 'isWidgetCallable', function isWidgetCallable() {
        return _widgetController.isWidgetCallable.apply(_widgetController, arguments);
    });

    /**
    * @method setWidgetPropertyIndependentOfState
    * Method to set a widget property independent of the state of the widget.  
    * If the widget is not yet initialized, the property is set as an initial value and considered at widget creation.  
    * If no setterName is defined, the usual setterName is taken (e.g. 'value' -> 'setValue')
    * @param {String} widgetId
    * @param {String} propertyName
    * @param {ANY} value
    * @param {String} [setterName]
    */
    _defineMethod(p, 'setWidgetPropertyIndependentOfState', function setWidgetPropertyIndependentOfState(widgetId, propertyName, value, setterName) {
        setterName = setterName || Utils.setter(propertyName);
        if (brease.uiController.getWidgetState(widgetId) < Enum.WidgetState.INITIALIZED || brease.uiController.callWidget(widgetId, setterName, value) === null) {
            brease.uiController.addWidgetOption(widgetId, propertyName, value);
        }
    });

    /**
    * @method wake
    * @deprecated use wakeInContent instead
    */
    _defineMethod(p, 'wake', function wake() {
        _widgetController.wake.apply(_widgetController, arguments);
    });

    /**
    * @method suspend
    * @deprecated use suspendInContent instead
    */
    _defineMethod(p, 'suspend', function suspend() {
        _widgetController.suspend.apply(_widgetController, arguments);
    });

    /**
    * @method wakeInContent
    * @param {String} contentId
    * @param {Function} callback
    */
    _defineMethod(p, 'wakeInContent', function wakeInContent() {
        _widgetController.wakeInContent.apply(_widgetController, arguments);
    });
    
    /**
    * @method suspendInContent
    * @param {HTMLElement} target HTML element which contains content
    * @param {String} contentId
    * @param {Function} callback
    */
    _defineMethod(p, 'suspendInContent', function suspendInContent() {
        _widgetController.suspendInContent.apply(_widgetController, arguments);
    });

    /**
    * @method callWidget
    * invoke methods of widgets
    * @param {String} id id of widget
    * @param {String} method name of method
    * @paramComment First two parameters are required, more are optional, dependent on the method invoked.
    * @return {ANY} return value of the called widget method. Data type depends on the method invoked.
    */
    _defineMethod(p, 'callWidget', function callWidget() {
        return _widgetController.callWidget.apply(_widgetController, arguments);
    });

    /**
    * @method createWidgets
    * method for dynamic widget creation
    * @param {HTMLElement} target HTML element where created widget elements are appended
    * @param {WidgetConfig[]} arWidgets Array of config objects
    * @param {Boolean} [autoParse=true] If set to false, only HTML-tags are added to target, if set to true target will be parsed after HTML insertion.
    * @param {String} [contentId] Optional contentId where 'target' belongs to. Use null, if you want to use more arguments and don't want to determine a contentId.  
    * @param {String} [addBeforeSelector] If specified, widgets are inserted before the node document.querySelector(addBeforeSelector). This node has to be a child of 'target'.  
    */
    _defineMethod(p, 'createWidgets', function createWidgets() {
        _widgetFactory.createWidgets.apply(_widgetFactory, arguments);
    });

    /**
    * @method findWidgets
    * method to find widget elements in a container
    * @param {HTMLElement} container HTML element where to search
    * @param {Boolean} [andSelf=false] include container in result list
    * @param {brease.enum.WidgetState} [minimalState=Enum.WidgetState.INITIALIZED] minimal state of included widgets (>=) 
    */
    _defineMethod(p, 'findWidgets', function findWidgets() {
        return _widgetController.findWidgets.apply(_widgetController, arguments);
    });

    /**
    * @method walkWidgets
    * call a method for all widgets in a container
    * @param {HTMLElement} container HTML element which contains widgets
    * @param {Boolean} andSelf include container in widget list, if it is a widget
    * @param {String} methodName
    * @paramComment First three parameters are required, more are optional, dependent on the method invoked.
    */
    _defineMethod(p, 'walkWidgets', function walkWidgets() {
        _widgetController.walkWidgets.apply(_widgetController, arguments);
    });

    _defineMethod(p, 'addWidget', function addWidget(widget) {

        if (widget.elem && widget.elem.id) {
            _widgetController.addWidget(widget);
        } else {
            throw new SyntaxError("widget needs property 'elem' with id");
        }
    });

    /**
    * @method getWidgetState
    * method to get widget state
    * @param {String} id id of widget
    * @return {brease.enum.WidgetState}
    */
    _defineMethod(p, 'getWidgetState', function getWidgetState(id) {
        return _widgetController.getState(id);
    });

    /**
    * @method setWidgetState
    * method to set widget state
    * @param {String} id id of widget
    * @param {brease.enum.WidgetState} state
    */
    _defineMethod(p, 'setWidgetState', function setWidgetState(id, state) {
        _widgetController.setState(id, state);
    });

    _defineMethod(p, 'addWidgetOption', function addWidgetOption(id, key, value) {
        _widgetController.addOption(id, key, value);
    });

    /**
    * @method parentWidgetId
    * Returns id of parent widget.
    * @param {HTMLElement} elem
    * @return {String} Id of parent widget. If there exists no parent widget, method returns id of application container ("appContainer"). If elem is a widget itself, method returns id of elem.
    */
    _defineMethod(p, 'parentWidgetId', function parentWidgetId(elem) {

        if (Utils.hasClass(elem, 'breaseWidget')) {
            return elem.id;
        } else {
            var parentWidgets = $(elem).parents('.breaseWidget');
            if (parentWidgets.length > 0) {

                return parentWidgets[0].id;
            } else {
                return brease.appElem.id;
            }
        }
    });

    /**
    * @method createBindings
    * Method to create (dynamic) bindings for a content in a visu at runtime.  
    * The content and the visu have to be active. The target has to be of type "brease" (=widget).  
    * Created dynamic bindings are active, as long the related content is active.  
    * Example of usage:
    *
    *     <script>
    *       $.when(
    *         brease.uiController.createBindings("content_1", "Visu", [{
    *           "mode": "twoWay",
    *           "source": {
    *             "type": "variable",
    *             "refId": "var1",
    *             "attribute": "value"
    *           },
    *           "target": {
    *             "type": "brease",
    *             "refId": "content_1_NumericInput1",
    *             "attribute": "value"
    *          }}])
    *       ).then(function success(result) {
    *           
    *       }, function fail(responseStatus) {
    *           
    *       });
    *     </script>
    *
    * @param {String} contentId
    * @param {String} visuId
    * @param {Binding[]} bindings
    * @return {Promise}
    * On success the promise will be resolved with {@link brease.objects.ResponseStatus ResponseStatus[]}  
    * Every element of the ResponseStatus[] array is related to the element with the same index in the Binding[] array.  
    *    
    * On error the promise will be rejected with {@link brease.objects.ResponseStatus ResponseStatus}  
    */
    _defineMethod(p, 'createBindings', function createBindings() {
        return this.bindingController.createBindings.apply(this.bindingController, arguments);
    });

    /**
    * @method deleteBindings
    * Method to delete bindings for a content in a visu at runtime.  
    * As BindingTargets are unique, the combination of refId/attribute is used for addressing a binding.  
    * Omitting the optional attribute deletes all (dynamic) bindings of a target (widget).  
    * Example of usage:
    *
    *     <script>
    *       $.when(
    *         brease.uiController.deleteBindings("content_1", "Visu", [{
    *           "type": "brease",
    *           "refId": "content_1_NumericInput1",
    *           "attribute": "value" 
    *         }])
    *       ).then(function success(result) {
    *           
    *       }, function fail(responseStatus) {
    *           
    *       });
    *     </script>
    *
    * @param {String} contentId
    * @param {String} visuId
    * @param {BindingTarget[]} targets
    * @return {Promise}
    * On success the promise will be resolved with {@link brease.objects.ResponseStatus ResponseStatus[]}  
    * Every element of the ResponseStatus[] array is related to the element with the same index in the BindingTarget[] array.  
    *    
    * On error the promise will be rejected with {@link brease.objects.ResponseStatus ResponseStatus}  
    */
    _defineMethod(p, 'deleteBindings', function deleteBindings() {
        return this.bindingController.deleteBindings.apply(this.bindingController, arguments);
    });

    /**
    * @method isContentActive
    * Returns the state of a known content and false for unknown contents.
    * @param {ContentReference} contentId
    * @return {Boolean} 
    */
    _defineMethod(p, 'isContentActive', function isContentActive(contentId) {
        return this.bindingController.isContentActive(contentId);
    });

    return new UIController();
});
