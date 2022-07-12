define(['brease/core/Utils',
    'brease/enum/Enum',
    'brease/events/BreaseEvent'
], function (Utils, Enum, BreaseEvent) {

    'use strict';

    var BindingSync = {};

    BindingSync.setupPropertyOrder = function setupPropertyOrder(widget, propertiesConfig) {

        //Overwritte the setters adding the checks for the proper order
        function overwriteSetters() {
            
            //Get all the properties for which the setters should be overwritten
            var overwriteConfig = {};
            propertiesConfig.forEach(function (property, _index, _propertiesArray) {
                overwriteConfig[property.name] = {
                    name: property.name,
                    waitFor: property.waitFor
                };
                property.waitFor.forEach(function (property) {
                    if (!overwriteConfig.hasOwnProperty(property)) {
                        overwriteConfig[property] = {
                            name: property,
                            waitFor: []
                        };
                    }
                });
            });

            //Create default values and promises
            for (var key in overwriteConfig) {

                if (!overwriteConfig.hasOwnProperty(key)) {
                    continue;
                }

                var property = overwriteConfig[key];
                var methodName = Utils.setter(property.name);
                var widgetPrototype = Object.getPrototypeOf(widget);

                (function (methodName, property) {

                    //Overwritte setters
                    if (Utils.isFunction(widget[methodName])) {

                        widget[methodName] = function () {
                            //Set the method to called
                            widget[methodName].methodCalled = true;
                            //Check if the wait is done
                            if (widget[methodName].dependenciesResolved) {
                                widgetPrototype[methodName].apply(widget, arguments);
                            } else {
                                widget[methodName].bufferedCalls.push(arguments);
                            }
                            widget.dispatchEvent(new CustomEvent('BindingEvent'));
                        };

                        //Add listeners to wait for the other bindings
                        widget[methodName].bufferedCalls = [];
                        widget[methodName].inSync = false;
                        widget[methodName].waitDone = false;
                        widget[methodName].methodCalled = false;
                        widget[methodName].dependenciesResolved = _checkDependenciesResolved(widget, property);
                        widget[methodName].waitPromise = new Promise(function (resolve, _reject) {
                            widget.elem.addEventListener('BindingEvent', function checkWaitDone() {
                                if (!widget[methodName].waitDone) {
                                    widget[methodName].dependenciesResolved = _checkDependenciesResolved(widget, property);
                                    widget[methodName].waitDone = widget[methodName].dependenciesResolved && widget[methodName].methodCalled;
                                    if (widget[methodName].waitDone) {
                                        resolve();
                                        widget.elem.removeEventListener('BindingEvent', checkWaitDone);
                                        widget.dispatchEvent(new CustomEvent('BindingEvent'));
                                    }
                                }
                            });
                        }).then(function () {
                            widget[methodName].bufferedCalls.forEach(function (argumentsUsed) {
                                widgetPrototype[methodName].apply(widget, argumentsUsed);
                            });
                            widget[methodName].inSync = true;
                        });
                    }
                })(methodName, property);
            }
        }

        //Wait for widget ready
        if (widget.state >= Enum.WidgetState.INITIALIZED) {
            overwriteSetters();
        } else {
            new Promise(function (resolve) {
                widget.elem.addEventListener(BreaseEvent.WIDGET_INITIALIZED, function (event) {
                    if (event.target === widget.elem) {
                        resolve();
                    }
                });
            }).then(overwriteSetters);
        }

        return true;
    };

    function _checkDependenciesResolved(widget, property) {
        return property.waitFor.reduce(function (accumulatedValue, propertyName) {
            var hasBinding = widget.bindings !== undefined ? widget.bindings.hasOwnProperty(propertyName) : false;
            return accumulatedValue && (widget[Utils.setter(propertyName)].waitDone || !hasBinding);
        }, true);
    }

    return BindingSync;

});
