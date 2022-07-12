define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /**
    * @class brease.designer.BaseWidget.ClassExtension
    * @embeddedClass
    * @virtualNote 
    * Functionality of BaseWidget, available in editMode only. Available through the designer object of a widget instance.
    *
    *       var parentWidget = brease.callWidget('someWidgetId1', 'widget');
    *       var childWidget = brease.callWidget('someWidgetId1', 'widget');
    *
    *       parentWidget.designer.allowsChild(childWidget);
    *       childWidget.designer.isAllowedIn(parentWidget);
    *       
    */

    /**
    * @method allowsChild
    * Check if a widget allows another widget as child.  
    * Parent is the widget instance, where the method is called.  
    * Child is the widget given as parameter.  
    * @param {WidgetInstance} child
    * @return {Boolean}
    */

    /**
    * @method isAllowedIn
    * Check if a widget allows another widget as parent.  
    * Child is the widget instance, where the method is called.  
    * Parent is the widget given as parameter.  
    * @param {WidgetInstance} parent
    * @return {Boolean}
    */

    /**
    * @method isAllowedInContent
    * Check if a widget is allowed to be added to the content directly.
    * @return {Boolean}
    */

    /**
    * @method isRotatable
    * Check if a widget is rotatable.
    * @return {Boolean}
    */

    /**
    * @method isMovable
    * Check if a widget is movable.
    * @return {Boolean}
    */

    /**
    * @method isResizable
    * Check if a widget is resizable.
    * @return {Boolean}
    */

    /**
    * @method getHandles
    * Get editorHandles of a widget.
    * @return {Boolean}
    */
    var ClassExtension = {
        extend: function (WidgetClass) {
            if (WidgetClass.name === 'BaseWidget') {

                staticExtend(WidgetClass);

                var p = WidgetClass.prototype;

                p.isRotatable = function () { return true; };
                p.isMovable = function () { return true; };
                p.isResizable = function () { return true; };
                p.getHandles = function () { return []; };

                var oldInit = p.init;

                p.init = function () {
                    var self = this,
                        meta = self.constructor.meta;
                    this.designer = {
                        isRotatable: function () {
                            return self.isRotatable.apply(self, arguments);
                        },
                        isMovable: function () {
                            return self.isMovable.apply(self, arguments);
                        },
                        isResizable: function () {
                            return self.isResizable.apply(self, arguments);
                        },
                        // defines if a change of width should also change height and vice versa
                        isSquare: function () {
                            return false;
                        },
                        getHandles: function () {
                            return self.getHandles.apply(self, arguments);
                        },
                        // called if a property should be changed via property grid
                        // should return properties which need to be changed
                        // returns always width and height for square widgets (isSquare()) if any is changed
                        trySetProperty: function (name, value) {
                            var changeset = {};
                            changeset[name] = value;
                            if (self.designer.isSquare()) {
                                if (name === 'height') changeset['width'] = value;
                                if (name === 'width') changeset['height'] = value;
                            }
                            return changeset;
                        }
                    };

                    Object.defineProperty(this.designer, 'allowsChild', { 
                        enumerable: true,
                        configurable: false,
                        writable: false,
                        value: function (child) {

                            if (!Utils.isWidget(child)) {
                                throw new SyntaxError('argument has to be of type WidgetInstance');
                            }
                            var allowedChildren = meta.children,
                                inheritance = child.constructor.meta.inheritance;

                            if (allowedChildren.indexOf('*') !== -1) {
                                return true;
                            } else {
                                var allowed = false;
                                for (var i = 0; i < inheritance.length; i += 1) {
                                    if (allowedChildren.indexOf(inheritance[i]) !== -1) {
                                        allowed = true;
                                        break;
                                    }
                                }
                                return allowed;
                            }
                        } 
                    });
                    
                    Object.defineProperty(this.designer, 'isAllowedIn', { 
                        enumerable: true,
                        configurable: false,
                        writable: false,
                        value: function (parent) {
                            if (!Utils.isWidget(parent)) {
                                throw new SyntaxError('argument has to be of type WidgetInstance');
                            }
                            var allowedParents = meta.parents,
                                requestedParent = parent.constructor.meta.className;

                            if (Array.isArray(allowedParents)) {
                                return allowedParents.indexOf('*') !== -1 || allowedParents.indexOf(requestedParent) !== -1;
                            } else {
                                console.warn('isAllowedIn: meta data of widget instance missing!');
                                return false;
                            }
                        }
                    });
                    
                    Object.defineProperty(this.designer, 'isAllowedInContent', { 
                        enumerable: true,
                        configurable: false,
                        writable: false,
                        value: function () {

                            var allowedParents = meta.parents,
                                requestedParent = 'system.brease.Content';

                            if (Array.isArray(allowedParents)) {
                                return allowedParents.indexOf('*') !== -1 || allowedParents.indexOf(requestedParent) !== -1;
                            } else {
                                console.warn('isAllowedInContent: meta data of widget instance missing!');
                                return false;
                            }
                        }
                    });

                    oldInit.apply(this, arguments);
                };
            }
        }
    };

    function staticExtend(WidgetClass) {
        WidgetClass.static.getInitialProperties = function (x, y) {
            return {
                left: x,
                top: y
            };
        };
    }

    return ClassExtension;

});
