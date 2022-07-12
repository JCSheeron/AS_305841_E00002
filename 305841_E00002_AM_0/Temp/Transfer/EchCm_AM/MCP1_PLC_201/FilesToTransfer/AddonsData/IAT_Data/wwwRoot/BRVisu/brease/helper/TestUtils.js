define(['brease/events/BreaseEvent',
    'brease/enum/Enum',
    'brease/core/Utils',
    'brease/controller/WidgetController',
    'brease/controller/PageController', 
    'brease/controller/BindingController', 
    'brease/controller/ActionController',
    'brease/controller/objects/Client',
    'brease/controller/libs/Utils',
    'brease/controller/libs/ContentHelper',
    'brease/controller/WidgetParser',
    'brease/controller/FileManager',
    'brease/model/BindingModel',
    'brease/services/RuntimeService',
    'brease/helper/stubs/ServiceBridge',
    'brease/helper/jasmine/MatcherFactory'],
function (BreaseEvent, 
    Enum,
    Utils,
    widgetController, 
    pageController, 
    bindingController, 
    actionController,
    client, 
    controllerUtils,
    contentHelper,
    widgetParser,
    fileManager,
    bindingModel,
    runtimeService, 
    serviceBridge,
    matcherFactory) {

    'use strict';
    
    var _lang = {}, 
        _mmsDeferred, _cultureDeferred;

    function switchLang(lang, config) {
        _lang.key = lang;
        _lang.start = Date.now();
        _lang.timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        _lang.deferred = $.Deferred();
        _lang.config = config;

        document.body.addEventListener(BreaseEvent.LANGUAGE_CHANGED, switchLangReadyHandler);
        if (brease.language.getCurrentLanguage() !== lang) {
            brease.language.switchLanguage(lang);
        } else {
            checkLangReady();
        }
        return _lang.deferred.promise();
    }

    function switchLangReadyHandler() {
        document.body.removeEventListener(BreaseEvent.LANGUAGE_CHANGED, switchLangReadyHandler);
        checkLangReady();
    }

    function checkLangReady() {
        var kbdEl = $('#breaseKeyBoard'),
            config = _lang.config,
            waitForAttribute = (config && config.waitFor === 'data-lang');
            
        if (brease.language.getCurrentLanguage() === _lang.key && (waitForAttribute !== true || kbdEl.attr('data-lang') === _lang.key)) {
            _lang.deferred.resolve(); 
        } else { 
            if (Date.now() - _lang.start < _lang.timeout) { 
                window.setTimeout(checkLangReady, 50); 
            } else {
                _lang.deferred.reject(); 
            }
        }
    }

    function switchMMS(mms) {
        _mmsDeferred = $.Deferred();
        document.body.addEventListener(BreaseEvent.MEASUREMENT_SYSTEM_CHANGED, switchMmsReadyHandler);
        if (brease.measurementSystem.getCurrentMeasurementSystem() !== mms) {
            brease.measurementSystem.switchMeasurementSystem(mms);
        } else {
            _mmsDeferred.resolve();
        }
        return _mmsDeferred.promise();
    }

    function switchMmsReadyHandler() {
        document.body.removeEventListener(BreaseEvent.MEASUREMENT_SYSTEM_CHANGED, switchMmsReadyHandler);
        _mmsDeferred.resolve();
    }

    function switchCulture(culture) {
        _cultureDeferred = $.Deferred();
        document.body.addEventListener(BreaseEvent.CULTURE_CHANGED, switchCultureReadyHandler);
        if (brease.culture.getCurrentCulture().key !== culture) {
            brease.culture.switchCulture(culture);
        } else {
            _cultureDeferred.resolve();
        }
        return _cultureDeferred.promise();
    }

    function switchCultureReadyHandler() {
        document.body.removeEventListener(BreaseEvent.CULTURE_CHANGED, switchCultureReadyHandler);
        _cultureDeferred.resolve();
    }

    function setConditions(conditions, callback, config) {
        var arConditions = [];
        if (conditions.lang !== undefined) {
            arConditions.push(switchLang(conditions.lang, config));
        }
        if (conditions.mms !== undefined) {
            arConditions.push(switchMMS(conditions.mms));
        }
        if (conditions.culture !== undefined) {
            arConditions.push(switchCulture(conditions.culture));
        }
        $.when.apply(null, arConditions).then(function () {
            callback();
        });
    }

    function runConditions(conditions, config) {

        return new Promise(function (resolve) {
            setConditions(conditions, resolve, config);
        });
    }
    /**
    * @class brease.helper.TestUtils
    * @extends core.javascript.Object
    * Helper class for unit tests
    * @singleton
    */

    var TestUtils = {

        specPath: function (widgetName, libPath, subLib) {
            return libPath + widgetName + '.' + ((subLib !== undefined) ? subLib : widgetName);
        },

        isSpy: function (fn) {
            return fn.isSpy === true || (fn.calls !== undefined && fn.and !== undefined);
        },

        /**
        * @method preConditions
        * method to set language and/or measurementSystem and/or culture before a testcase  
        * it can be used on different levels of testcase notation:  
        *    
        * e.g. inside of a "it" or "beforeAll" (ATTENTION: use return statement here):  
        * 
        *     beforeAll(function () {
        *         return TestUtils.preConditions('', { lang: 'de' }, { type: 'runs' });
        *     });
        * 
        * e.g. as an "it" inside of a "describe" (ATTENTION: use NO return statement here):  
        * 
        *     describe('describe block', function () {
        *         TestUtils.preConditions('with some description', { lang: 'de', culture: 'de' }, { type: 'it' });
        *     });
        * 
        * e.g. as standalone "describe" (ATTENTION: use NO return statement here):  
        * 
        *     TestUtils.preConditions('with some description', { mms: 'imperial' }, { type: 'describe' });
        * 
        * @param {String} description description when used as "describe" block or "it" block  
        * @param {Object} conditions contains conditions to be set
        * @param {String} [conditions.lang] if language should be set
        * @param {String} [conditions.mms] if measurementSystem should be set
        * @param {String} [conditions.culture] if culture should be set
        * @param {Object} config
        * @param {String} config.type configuration of the usecase: "describe", "it" or "runs"; this type must match the real use of preConditions to function proper
        * @param {String} config.waitFor can be set to "data-lang" for conditions.lang: in this case the promise is resolved when the attribute data-lang has the value of the new lang key in DOM of the keyboard
        */
        preConditions: function (title, conditions, config) {

            if (!config || config.type === 'describe') {
                describe(title, function () {
                    it('', function () {
                        return runConditions(conditions, config);
                    });
                }); 
            }
            if (config && config.type === 'it') {
                it(title, function () {
                    return runConditions(conditions, config);
                });
            }
            if (config && config.type === 'runs') {
                return runConditions(conditions, config);
            }
        },

        /**
        * @method logWithParent
        * write description of spec and description of parent suite (describe-block) to console
        * the returned method takes two arguments:
        *   the spec itself ('this' inside of it-block)
        *   config object
        * @param {Boolean} flag to enable or disable
        * @param {Object} parentConfig
        * @param {Color} parentConfig.color
        * @param {String} parentConfig.method of console to use
        * @return {Function}
        */
        logWithParent: function (flag, parentConfig) {
            if (flag) {
                parentConfig = parentConfig || {};
                parentConfig.method = (parentConfig.method) ? parentConfig.method : 'log';
                parentConfig.color = (parentConfig.color) ? parentConfig.color : '#999999';
                parentConfig.parent = (parentConfig.parent !== undefined) ? parentConfig.parent : true;
                return function (spec, config) {
                    if (spec && spec.suite) {
                        if (!config) {
                            config = {};
                        }
                        if (console[parentConfig.method]) {
                            console[parentConfig.method]('%c' + ((config.prefix) ? config.prefix : '') + ((parentConfig.parent) ? spec.suite.parentSuite.description + spec.suite.description : '') + spec.description + ((config.suffix) ? config.suffix : ''), 'color:' + parentConfig.color);
                        } else {
                            console.log('%c' + ((config.prefix) ? config.prefix : '') + ((parentConfig.parent) ? spec.suite.parentSuite.description + spec.suite.description : '') + spec.description + ((config.suffix) ? config.suffix : ''), 'color:' + parentConfig.color);
                        }
                    }
                };
            } else {
                return function () { };
            }
        },

        /**
        * @method log
        * write description of spec to console
        * the returned method takes two arguments:
        *   the spec itself ('this' inside of it-block)
        *   config object
        * @param {Boolean} flag to enable or disable 
        * @param {Color} color
        * @param {String} method of console to use
        * @return {Function}
        */
        log: function (flag, color, method) {
            if (flag) {
                return function (spec, config) {
                    if (spec) {
                        if (!config) {
                            config = {};
                        }
                        var message;
                        if (console[method]) {
                            message = '%c########### ' + ((config.prefix) ? config.prefix : '') + spec.description + ((config.suffix) ? config.suffix : '');
                            console[method](message, 'color:' + (color || '#999999'));
                        } else {
                            message = '%c########### ' + ((config.prefix) ? config.prefix : '') + spec.description + ((config.suffix) ? config.suffix : '');
                            console.log(message, 'color:' + (color || '#999999'));
                        }
                    }
                };
            } else {
                return function () { };
            }
        },

        logSuite: function (suite) {
            var prefix = (brease.config.jenkins === true) ? '\n[' : '[',
                suffix = (brease.config.jenkins === true) ? ']' : ']',
                message = '';

            if (suite && suite.spec && typeof suite.spec.replace === 'function') {
                message = suite.spec.replace(/\./g, '/');
            } else if (suite.name) {
                message = suite.name;
            }
            console.debug(prefix + message + suffix);
        },

        console: function (action, callThrough, config) {
            if (action === 'mock') {
                TestUtils.callThrough = callThrough;
                TestUtils.config = config || {};
                window.console = TestUtils.fakeConsole;
            } else {
                window.console = TestUtils.originalConsole;
            }
        },

        originalConsole: window.console,
        fakeConsole: {

            log: function () {
                if (TestUtils.callThrough || TestUtils.config.log === true) {
                    TestUtils.originalConsole.log.apply(TestUtils.originalConsole, arguments);
                }
            },
            warn: function () {
                if (TestUtils.callThrough || TestUtils.config.warn === true) {
                    TestUtils.originalConsole.warn.apply(TestUtils.originalConsole, arguments);
                }
            },
            debug: function () {
                if (TestUtils.callThrough || TestUtils.config.debug === true) {
                    TestUtils.originalConsole.debug.apply(TestUtils.originalConsole, arguments);
                }
            },
            error: function () {
                TestUtils.originalConsole.error.apply(TestUtils.originalConsole, arguments);
            },
            info: function () {
                if (TestUtils.callThrough || TestUtils.config.info === true) {
                    TestUtils.originalConsole.info.apply(TestUtils.originalConsole, arguments);
                }
            },
            trace: function () {
                if (TestUtils.callThrough || TestUtils.config.trace === true) {
                    TestUtils.originalConsole.trace.apply(TestUtils.originalConsole, arguments);
                }
            },
            time: function () {
                if (TestUtils.callThrough || TestUtils.config.time === true) {
                    TestUtils.originalConsole.time.apply(TestUtils.originalConsole, arguments);
                }
            },
            timeEnd: function () {
                if (TestUtils.callThrough || TestUtils.config.timeEnd === true) {
                    TestUtils.originalConsole.timeEnd.apply(TestUtils.originalConsole, arguments);
                }
            },
            iatWarn: function () {
                if (TestUtils.callThrough || TestUtils.config.iatWarn === true) {
                    TestUtils.originalConsole.iatWarn.apply(TestUtils.originalConsole, arguments);
                }
            },
            iatDebug: function () {
                if (TestUtils.callThrough || TestUtils.config.iatDebug === true) {
                    TestUtils.originalConsole.iatDebug.apply(TestUtils.originalConsole, arguments);
                }
            },
            iatDebugLog: function () {
                if (TestUtils.callThrough || TestUtils.config.iatDebugLog === true) {
                    TestUtils.originalConsole.iatDebug.apply(TestUtils.originalConsole, arguments);
                }
            },
            iatInfo: function () {
                if (TestUtils.callThrough || TestUtils.config.iatInfo === true) {
                    TestUtils.originalConsole.iatInfo.apply(TestUtils.originalConsole, arguments);
                }
            },
            dir: function () {
                TestUtils.originalConsole.dir.apply(TestUtils.originalConsole, arguments);
            },
            always: function () {
                TestUtils.originalConsole.log.apply(TestUtils.originalConsole, arguments);
            },
            alwaysWarn: function () {
                TestUtils.originalConsole.warn.apply(TestUtils.originalConsole, arguments);
            }
        },

        addMatchers: function (testcase, arType) {

            if (Array.isArray(arType)) {
                var matcher = {};
                arType.forEach(function (type) {
                    if (objMatcher[type]) {
                        matcher[type] = objMatcher[type];
                    }
                });
                matcherFactory.addMatchers(testcase, matcher);
            }
        },

        resetAppContainer: function () {
            brease.appView.css({
                width: 'initial',
                height: '1px',
                'min-height': '1px',
                position: 'absolute',
                transform: 'none',
                display: 'inline-block',
                top: '0px',
                left: '0px',
                'font-size': '12px',
                'z-index': 0
            });
        },

        resetFramework: function () {

            brease.config.editMode = false;
            brease.config.preLoadingState = false;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
            serviceBridge.testServices.reset();
            pageController.reset();
            widgetController.reset(true);
            bindingModel.reset();
            pageController.rootContainer = brease.appElem;
            pageController.init(runtimeService);
            bindingController.init(runtimeService);
            brease.uiController.bindingController = bindingController;
            actionController.init(runtimeService, contentHelper);
            client.init(runtimeService);
            client.setValid(true);
            TestUtils.resetAppContainer();
        },

        closeAllOverlays: function () {
            // eslint-disable-next-line no-unused-vars
            $('.breaseWindow').each(function (i, elem) {
                brease.callWidget(elem.id, 'onBeforeHide');
            });
        },

        /**
        * @method loadWidgetClass
        * Load a WidgetClass like it would be loaded at runtime (WidgetClass is then decorated with some meta info) 
        * @param {brease.objects.ClassName} className
        * @return {Promise}
        * On success the promise will be resolved with the {@link brease.core.WidgetClass WidgetClass} 
        */
        loadWidgetClass: function (className) {
            return new Promise(function (resolve, reject) {
                var widgetPath = fileManager.getPathByClass(className);
                fileManager.loadJSFiles(widgetPath, true).done(function (WidgetClass) {
                    resolve(WidgetClass);
                }).fail(function () {
                    reject();
                });
            });
        },

        /**
        * @method createWidgetsV3
        * create a bunch of widgets and wait for their ready events  
        * usable in different ways:  
        *
        *     beforeAll(function () { 
        *       return TestUtils.createWidgetsV3(widgets, targetId, brease.appElem, contentId);
        *     });
        * 
        * or       
        *     beforeAll(async function () { 
        *         widgets = await TestUtils.createWidgetsV3(widgets, targetId, brease.appElem, contentId);
        *     });                   
        *
        * or
        * 
        *     beforeAll(function () { 
        *        return TestUtils.createWidgetsV3(widgets, targetId, brease.appElem, contentId) 
        *        .then(function () {
        *           (do something with the newly created widgets)
        *        });
        *     });
        * 
        * or                          
        *
        *     beforeAll(function () { 
        *        return Promise.resolve().then(function () {
        *           (do something before widget creation)
        *        }).then(function () { 
        *           return TestUtils.createWidgetsV3(widgets, targetId, brease.appElem, contentId);
        *        });
        *     });
        *
        * @param {WidgetConfig[]} widgets
        * @param {String/HTMLElement/jQuery} target Either the id of the HTMLElement which should be created to contain the widgets,  
        * or id of an already existing target,  
        * or the target as HTMElement or jquery object.
        * @param {HTMLElement/jQuery/Selector} container Container where the target should be appended (can be null, if target already exists)
        * @param {String} [contentId] contentId for widget creation
        * @param {Object} [objCss] css for the HTMLElement which contains the widgets.
        * @return {Promise} Object with widget instances with key=widgetId and value=instance
        */
        createWidgetsV3: function (widgets, target, container, contentId, objCss) {

            return new Promise(function (resolve, reject) {
                var callback = jasmine.createSpy(), 
                    creationTarget, $target,
                    widgetIds = widgets.map(function (item) { return item.id; });

                if (Utils.isString(target)) {
                    $target = $('#' + target);
                } else {
                    $target = target.jquery !== undefined ? target : $(target);
                }

                if ($target.length === 0) {
                    $target = $('<div id="' + target.toString() + '" style="height:0px; overflow:hidden;" />').appendTo(container);
                }
                if (objCss) {
                    $target.css(objCss);    
                }
                creationTarget = $target[0];
                
                var listener = function (e) {
                    if (widgetIds.indexOf(e.target.id) !== -1) {
                        callback();
                        if (callback.calls.count() === widgets.length) {
                            creationTarget.removeEventListener(BreaseEvent.WIDGET_READY, listener, true);
                            let widgetInstances = {};
                            widgetIds.forEach(id => {
                                widgetInstances[id] = brease.callWidget(id, 'widget');
                            });
                            resolve(widgetInstances);
                        }
                    }
                };
                creationTarget.addEventListener(BreaseEvent.WIDGET_READY, listener, true);
                try {
                    if (contentId !== undefined) {
                        brease.uiController.createWidgets(creationTarget, widgets.slice(0), true, contentId); 
                    } else {
                        brease.uiController.createWidgets(creationTarget, widgets.slice(0), true); 
                    }
                } catch (e) {
                    console.error('%c' + e, 'color: red');
                    reject(e);
                }
            });
        },

        /**
        * @method createWidget
        * create single widget
        *  
        *     beforeAll(async function () { 
        *         widget = await TestUtils.createWidgetsV3(widgetConfig, targetId, brease.appElem, contentId);
        *     });                   
        *
        * @param {WidgetConfig} widgetConfig
        * @param {String} targetId Either the id of the HTMLElement which should be created to contain the widgets, or id of an already existing target.
        * @param {HTMLElement/jQuery/Selector} container Container where the target should be appended (can be null, if target already exists)
        * @param {String} [contentId] contentId for widget creation
        * @param {Object} [targetConfig] height and width of the HTMLElement which contains the widgets.
        * @param {Integer} targetConfig.height
        * @param {Integer} targetConfig.width
        * @return {Promise} Object with widget instances with key=widgetId and value=instance
        */
        createWidget: function (widgetConfig, targetId, container, contentId, targetConfig) {
            return new Promise(function (resolve) {
                TestUtils.createWidgetsV3([widgetConfig], targetId, container, contentId, targetConfig).then((widgets) => {
                    resolve(widgets[widgetConfig.id]);
                });
            });
        },

        /**
        * @method addContent
        * add a content html file and create widgets in it and wait for their ready events  
        * usable in two different ways:  
        *
        * TestUtils.addContent(...).then(function () {
        *   (do something with the newly created widgets)
        * });
        *
        * or standalone as async/await:  
        *
        * beforeAll(async function () {
        * await TestUtils.addContent(...);
        * });
        *
        * @param {String} url
        * @param {String} targetId Either the id of the HTMLElement which should be created to contain the widgets, or id of an already existing target.
        * @param {HTMLElement/jQuery/Selector} container Container where the target should be appended (can be null, if target already exists)
        * @param {String} contentId contentId for widget creation
        * @param {Object} targetConfig height and width of the HTMLElement which contains the widgets.
        * @return {Promise}
        */
        addContent: function (url, targetId, container, contentId, targetConfig) {
            var callback = jasmine.createSpy(), 
                target, 
                html,
                widgetIds = [];

            return new Promise(function (resolve) {
                var $target = $('#' + targetId);
                if ($target.length > 0) {
                    target = $target[0];
                } else {
                    target = $('<div id="' + targetId + '" style="height:0px; overflow:hidden;" />').appendTo(container)[0];
                    if (targetConfig) {
                        $(target).css({ height: targetConfig.height, width: targetConfig.width });    
                    }
                }
                brease.pageController.loadHTML(url).done(function (loadedHtml) {
                    html = loadedHtml;
                    resolve();
                });
            })
                .then(function () {
                    return new Promise(function (resolve) {
                        controllerUtils.appendHTML(target, html);
                        $(target).find('[data-brease-widget]').each(function () {
                            widgetIds.push(this.id);
                        });

                        target.addEventListener(BreaseEvent.WIDGET_READY, function (e) {
                            if (widgetIds.indexOf(e.target.id) !== -1) {
                                callback();
                            }
                            if (callback.calls.count() >= widgetIds.length) {
                                resolve();
                            }
                        }, true);
                        widgetParser.parse(target, false, contentId);
                    });
                });
        },

        widgetsReady: function (arWidgetIds) {
            var widgetIds = new Set(arWidgetIds);

            widgetIds.forEach(function (widgetId) {
                if (brease.uiController.getWidgetState(widgetId) === Enum.WidgetState.READY) {
                    widgetIds.delete(widgetId);
                }
            });

            return new Promise(function (resolve) {
                var readyHandler = function (e) {
                    if (widgetIds.has(e.target.id)) {
                        widgetIds.delete(e.target.id);
                        check();
                    }
                };

                var check = function () {
                    if (widgetIds.size === 0) {
                        document.body.removeEventListener(BreaseEvent.WIDGET_READY, readyHandler);
                        resolve();
                    }
                };
                document.body.addEventListener(BreaseEvent.WIDGET_READY, readyHandler);
                check();
            });
        },

        /*
        * deferStub
        * util to spy on a _.defer call and fullfil it on demand  
        * only one call is supported simultaneously  
        * 
        * spyOn(_, 'defer').andCallFake(TestUtils.deferStub.call);
        * 
        * TestUtils.deferStub.release();
        */
        deferStub: {
            id: 0,
            _call: function () {
                this.fn = arguments[0];
                this.args = Array.prototype.slice.call(arguments, 1);
            },
            _release: function () {
                if (typeof this.fn === 'function') {
                    this.fn.apply(this.fn, this.args);
                }
                this.fn = undefined;
                this.args = undefined;
            }
        },

        /**
        * @method
        * Find all css class names of an HTMLElement which contain a specified string.  
        * @param {HTMLElement} elem
        * @param {String} str
        * @return {String[]}
        */
        findStyleClasses: function (elem, str) {
            var stylePattern = new RegExp('.*' + str + '.*');
            return Array.from(elem.classList).filter(function (cl) {
                return stylePattern.test(cl);
            });
        },

        /**
         * Creates a promise which resolves after timeout.
         * @param {Integer} t timeout in ms
         * @returns {Promise}
         */
        promisedTimeout: function (t) {
            return new Promise(function (resolve) {
                window.setTimeout(resolve, t);
            });
        },

        /**
         * Creates a promise for a spyOn. Initially the condition is set to calls.count()===1.  
         * If the promise should be used a second time, the condition can be changed via setCallCondition.  
         * E.g.
         * 
         *    var promisedSpy = TestUtils.promisedSpyOn(wut.renderer, 'refreshScroller');
         *    wut.setMpLink(telegram);
         *    await promisedSpy.promise;
         *    ...
         *    promisedSpy.setCallCondition(2);
         *    wut.setMpLink(update);
         *    await promisedSpy.promise;
         * 
         * @param {Object} context object on which should be spied
         * @param {String} methodName name of method on which should be spied on
         * @param {Integer} [callCount] number of calls, after which the promise should resolve
         * @param {Boolean} [callThrough] 
         * @return {Object}
         * @return {Promise} return.promise
         * @return {Object} return.spy
         * @return {Function} return.setCallCondition
         */
        promisedSpyOn: function (context, methodName, callCount = 1, callThrough = false) {

            var obj = {
                _callFake: function () {
                    obj.spy.apply(obj.spy, arguments);
                    if (obj.spy.calls.count() === obj.callCount) {
                        obj.resolve();
                    }
                },
                setCallCondition: function (n) {
                    obj.callCount = n;
                    obj.promise = new Promise(function (resolve) {
                        obj.resolve = resolve;
                    });
                },
                _init: function (context, methodName, callCount) {
                    obj.callCount = callCount;
                    obj.methodName = methodName;
                    obj.spy = jasmine.createSpy();
                    obj.promise = new Promise(function (resolve) {
                        obj.resolve = resolve;
                        if (callThrough) {
                            TestUtils.addSpyStrategy('callThroughAndThen');
                            TestUtils.spyOnCallThroughAndThen(context, methodName, obj._callFake.bind(obj));
                        } else {
                            spyOn(context, methodName).and.callFake(obj._callFake.bind(obj));
                        }
                    });
                }
            };
            obj._init(context, methodName, callCount);

            return obj;
        },

        /**
        * Creates a promise which resolves after two requestAnimationFrame.  
        * Also usable with an optional callback function 
        * 
        * await TestUtils.asyncAnimationFrame()
        *
        * or with callback:  
        *
        * TestUtils.asyncAnimationFrame(callback)
        *
        * @param {Function} [callback]
        * @returns {Promise}
        */
        asyncAnimationFrame: function (callback) {
            return new Promise(function (resolve) {
                var fn = function () {
                    window.requestAnimationFrame(function () {
                        if (typeof callback === 'function') {
                            callback();
                        }
                        resolve();
                    });
                };
                window.requestAnimationFrame(fn);
            });
        },

        /**
         * Create a promise for a event which resolves when the event is fired or timeout occurs.
         * @param {HTMLElement} elem Event target
         * @param {String} event Event type
         * @param {Object} options additional options for special cases
         * @param {Integer} option.timeout (optional) Resolve timeout if event is not fired. 3000 if not configured
         * @param {Function} option.resolveOn (optional) Return true in the provided event handler if the promise should be resolved
         * @param {Boolean} option.capture (optional) Set to true if the event handler should be triggerd on capture phase
         * @returns {Promise} resolves with event argument.
         */
        promisedEvent: function (elem, event, { timeout = 3000, capture = false, resolveOn = () => true } = {}) {
            let eventHandler, timeoutId;
            return new Promise((resolve, reject) => {
                if (elem === undefined || event === undefined) {
                    reject(new Error('promisedEvent elem or event is undefined!'));
                }
                eventHandler = function (e) {
                    if (resolveOn(e)) {
                        elem.removeEventListener(event, eventHandler, capture);
                        window.clearTimeout(timeoutId);
                        resolve(e);
                    }
                };
                elem.addEventListener(event, eventHandler, capture);
                timeoutId = window.setTimeout(() => {
                    elem.removeEventListener(event, eventHandler, capture);
                    reject(new Error(`promisedEvent ${event} not fired within ${timeout}ms`));
                }, timeout);
            });
        },

        contentsActivated: function (arContentId) {
            
            return new Promise(function (resolve) {
                var activatedSpy = jasmine.createSpy(), 
                    listener = function (e) {
                        if (arContentId.indexOf(e.detail.contentId) !== -1) {
                            activatedSpy();
                            if (activatedSpy.calls.count() === arContentId.length) {
                                document.body.removeEventListener(BreaseEvent.CONTENT_ACTIVATED, listener);
                                resolve();
                            }
                        }
                    };
                document.body.addEventListener(BreaseEvent.CONTENT_ACTIVATED, listener);
                arContentId.forEach(function (contentId) {
                    bindingController.activateContent(contentId);
                });
            });
        },

        contentsDeactivated: function (arContentId) {
            
            return new Promise(function (resolve) {
                var activatedSpy = jasmine.createSpy(), 
                    listener = function (e) {
                        if (arContentId.indexOf(e.detail.contentId) !== -1) {
                            activatedSpy();
                            if (activatedSpy.calls.count() === arContentId.length) {
                                document.body.removeEventListener(BreaseEvent.CONTENT_DEACTIVATED, listener);
                                resolve();
                            }
                        }
                    };
                document.body.addEventListener(BreaseEvent.CONTENT_DEACTIVATED, listener);
                arContentId.forEach(function (contentId) {
                    bindingController.deactivateContent(contentId);
                });
            });
        },

        /**
         * @method
         * This method replaces the polling waitsFor from jasmine 1.3
         * @param {*} condition 
         * @param {Integer} interval the interval at which the function is being called at
         * @param {Integer} timeout the timeout of the function, where the function fails and error message + derscription message is printed
         * @param {String} description error message if function fails
         */
        pollAndWait: function (condition, interval, timeout, description) {
            description = Utils.isString(description) ? description : (Utils.isString(interval) ? interval : (Utils.isString(timeout) ? timeout : ''));
            interval = (isNaN(interval)) ? 10 : parseInt(interval, 10);
            timeout = (isNaN(timeout)) ? 3000 : parseInt(timeout, 10);
            // console.alwaysWarn('description:' + description);
            // console.alwaysWarn('interval:' + interval);
            // console.alwaysWarn('timeout:' + timeout);
            return new Promise(function (resolve, reject) {
                var iv = window.setInterval(function () {
                    if (condition()) {
                        window.clearInterval(iv);
                        window.clearTimeout(to);
                        resolve();
                    }
                }, interval);
                var to = window.setTimeout(function () {
                    window.clearInterval(iv);
                    console.alwaysWarn('pollAndWait timed out' + ((description) ? '(' + description + ')' : ''));
                    reject(new Error('timeout'));
                }, timeout);
            });
        },
        
        /**
         * @method
         * This method adds some predefined spyStrategies.  
         * Against the docu of jasmine, it's not possible to add the strategy in a beforeAll. It's mandatory to use a beforeEach.
         * 
         *     beforeEach(function () {
         *        TestUtils.addSpyStrategy('callThroughAndThen');
         *     });
         * 
         * @param {String} strategyName predefined name of the strategy
         */
        addSpyStrategy: function (strategyName) {
            if (strategyName === 'callThroughAndThen') {
                jasmine.addSpyStrategy('callThroughAndThen', function (context, spy, thenFn) {
                    return function () {
                        var result = spy.and.originalFn.apply(context, spy.calls.mostRecent().args);
                        if (typeof spy.thenFn === 'function') {
                            spy.thenFn.apply(null, arguments);
                            spy.thenFn = undefined;
                        } else {
                            thenFn.apply(null, arguments);
                        }
                        return result;
                    };
                });
            }
        },
        /**
         * @method
         * shortcut for the spy strategy callThroughAndThen  
         * returns the spy  
         * e.g.
         * 
         *     return new Promise(function (resolve) {
         *          TestUtils.spyOnCallThroughAndThen(ScrollHelperStub, 'addScrollbars', resolve);
         *          ScrollManager.add($el[0]);
         *      })
         * 
         * or reset the then-function:
         * 
         *     return new Promise(function (resolve) {
         *                   spy = TestUtils.spyOnCallThroughAndThen(wut.renderer, 'redraw', resolve);
         *                   wut._editorStyleChanged();
         *               })
         *                   .then(function () {
         *                       return new Promise(function (resolve) {
         *                           spy.thenFn = resolve; // overwrite the initial then-function to call 'resolve' of second promise
         *                           
         *                       });
         *                   });
         * 
         * @param {Object} context object on which should be spied
         * @param {String} methodName name of method on which should be spied on
         * @param {Function} thenFn function which should be called after the spy
         * @return {Function}
         */
        spyOnCallThroughAndThen: function (context, methodName, thenFn) {
            var spy = spyOn(context, methodName);
            spy.and.callThroughAndThen(context, spy, thenFn);
            spy.thenFn = thenFn;
            return spy;
        },

        asyncSpyOn: function (context, method, config) {
            return new Promise(function (resolve) {
                if (TestUtils.isSpy(context[method])) {
                    var spy = context[method];
                    spy.calls.reset();
                    if (config && config.callThrough) {
                        spy.and.callFake(function () {
                            spy.and.originalFn.apply(context, spy.calls.mostRecent().args);
                            resolve();
                        });
                    } else {
                        spy.and.callFake(resolve);
                    }
                } else {
                    if (config && config.callThrough) {
                        TestUtils.spyOnCallThroughAndThen(context, method, resolve);
                    } else {
                        spyOn(context, method).and.callFake(resolve);
                    }
                }
            });
        },
        injectCSS: controllerUtils.injectCSS
    };
    TestUtils.deferStub.call = TestUtils.deferStub._call.bind(TestUtils.deferStub);
    TestUtils.deferStub.release = TestUtils.deferStub._release.bind(TestUtils.deferStub);

    // returns the index at which an element in the array of strings first occurs or -1 if it does not occur.
    function arraysHaveSameMembers(x, y) {
        var equal = Array.isArray(x) && Array.isArray(y) && x.length === y.length;
        for (var i = 0; i < x.length; i += 1) {
            equal = equal && (y.indexOf(x[i]) !== -1);
        }
        return equal;
    }

    var _customMatcher = {
        toEqualArray: function (actual, expected) {
            return {
                pass: arraysHaveSameMembers(actual, expected),
                message: 'Expected ' + JSON.stringify(actual) + ' to equal ' + JSON.stringify(expected) + '.'
            };
        },
        toEqualDefinedProperties: function (actual, expected) {
            var keys1 = Object.keys(actual).filter(function valueIsDefined(key) {
                    return actual[key] !== undefined;
                }),
                keys2 = Object.keys(expected).filter(function valueIsDefined(key) {
                    return expected[key] !== undefined;
                });
            if (!arraysHaveSameMembers(keys1, keys2)) {
                return {
                    pass: false,
                    message: 'Objects do not have the same properties:\nactual:' + JSON.stringify(actual) + '\nexpected:' + JSON.stringify(expected)
                };
            }
            for (var i = 0; i < keys1.length; i += 1) {
                if (actual[keys1[i]] !== expected[keys1[i]]) {
                    return {
                        pass: false,
                        message: 'Objects have different property ' + keys1[i]
                    };
                }
            }
            return {
                pass: true
            };
        }
    };

    var objMatcher = {};

    for (var matcherName in _customMatcher) {
        objMatcher[matcherName] = matcherFactory.createMatcher(_customMatcher[matcherName]);
    }

    return TestUtils;

});
