define(['brease/controller/objects/Client',
    'brease/core/Utils',
    'brease/events/BreaseEvent',
    'brease/events/SocketEvent',
    'brease/events/SystemGestures',
    'brease/events/VirtualEvents',
    'brease/controller/libs/LogCode',
    'brease/services/libs/ServerCode',
    'brease/helper/Scroller',
    'brease/controller/PopUpManager',
    'brease/controller/ZoomManager',
    'brease/controller/FocusManager',
    'brease/helper/Messenger',
    'brease/helper/SystemMessage',
    'brease/config',
    'brease/settings'],
function (Client, Utils, BreaseEvent, SocketEvent, SystemGestures, VirtualEvents, LogCode, ServerCode, Scroller, popupManager, zoomManager, focusManager, Messenger, systemMessage, config, settings) {

    'use strict';

    var _runtimeService,
        _services = {},
        _controller = {},
        // populated with server information for client during startup 
        _serverInfo = {},

        /**
                * @class brease.brease
                * @extends core.javascript.Object
                * @alternateClassName brease
                * Main application controller.  
                * Available through global namespace (brease or window.brease).  
                * Example of usage:
                * 
                *     <script>
                *         brease.uiController.parse(widget.elem);
                *         console.log(brease.language.getCurrentLanguage());
                *     </script>
                *  
                * @singleton
                */

        Brease = function Brease() {

            Utils.defineProperty(this, 'config', config);
            Utils.defineProperty(this, 'services', {});
            this.messenger = new Messenger(systemMessage);

            _defineElements.call(this);
            _defineSettings.call(this);
            _prepareDOM.call(this);
        },

        p = Brease.prototype;

    /**
        * @method callWidget
        * Method to invoke methods of widgets (shortcut for {@link brease.controller.UIController#method-callWidget UIController.callWidget})
        * @param {String} id id of widget
        * @param {String} method name of method
        * @paramComment First two parameters are required, more are optional, dependent on the method invoked.
        * @return {ANY} returnValue return value of method. Data type depends on the method invoked.
        */
    Utils.defineProperty(p, 'callWidget', function callWidget() {
        return brease.uiController.callWidget.apply(brease.uiController, arguments);
    });
    Utils.defineProperty(p, 'setOptions', function setOptions() {
        brease.uiController.setOptions.apply(brease.uiController, arguments);
    });
    Utils.defineProperty(p, 'getOption', function getOption() {
        return brease.uiController.getOption.apply(brease.uiController, arguments);
    });
    Utils.defineProperty(p, 'setOptionsMapping', function setOptionsMapping() {
        brease.uiController.setOptionsMapping.apply(brease.uiController, arguments);
    });

    p.init = function (runtimeService, services, controller) {

        _runtimeService = runtimeService;
        Client.init(runtimeService);

        _defineServices.call(this, services);
        _defineControllers.call(this, controller);

        _initServices.call(this, runtimeService);
        _initControllers.call(this, runtimeService, systemMessage);

    };

    // start of brease with a visualization
    p.startVisu = function (visuId) {
        //console.log('%c1) brease.startVisu(visuId=' + visuId + ')', 'color:#cc00cc;');
        this.messenger.announce(Messenger.START_VISU, { visuId: visuId });
        config.visuId = visuId;
        config.contentId = undefined;
        this.appView.html('');// empty appContainer only for visus, not for "content start"
        _start.call(this);
    };

    // start of brease without a visualization, e.g. editor
    p.startContent = function (contentId) {
        //console.log('%c1) brease.startContent(contentId=' + contentId + ')', 'color:#cc00cc;');
        this.messenger.announce(Messenger.START_CONTENT, { contentId: contentId });
        config.contentId = contentId;
        config.visuId = undefined;
        _start.call(this);
    };

    p.getClientId = function () {
        return Client.id;
    };

    /**
    * @method dispatchResize
    * dispatch an APP_RESIZE event
    * @param {Object} [detail] optional detail for event
    * @param {Boolean} detail.immediate setting this to true invokes the popupmanager to update dimensions immediately
    */
    p.dispatchResize = function (detail) {
        /**
        * @event app_resize
        * Fired when application root element (=brease.appElem) resizes  
        * That means: either layout is changed or zoom=true and browser window resizes  
        * Attention: for watching browser resizes in all cases you have to use window.onresize
        * @param {String} type {@link brease.events.BreaseEvent#static-property-APP_RESIZE BreaseEvent.APP_RESIZE}
        * @param {HTMLElement} target document.body
        * @param {Object} [detail]
        */
        document.body.dispatchEvent(new CustomEvent(BreaseEvent.APP_RESIZE, { detail: detail }));
    };

    function _start() {

        Scroller.init(popupManager);

        /* START-ORDER NR 2 */
        /* service call registerClient has to be the first service call -> allocation of cookies */

        //console.log('%c2.) registerClient', 'color:#cc00cc;');
        _runtimeService.registerClient(config.visuId, _registerClientResponse);
    }

    function _defineElements() {

        /**
                * @property {HTMLElement} appElem
                * Reference to the root HTMLElement, namely document.getElementById('appContainer').
                * @readonly
                */
        Utils.defineProperty(this, 'appElem', document.getElementById('appContainer'));
        /**
                * @property {jQuery} appView
                * Reference to the jQuery object of root HTMLElement, namely $('#appContainer').
                * @readonly
                */
        Utils.defineProperty(this, 'appView', $(this.appElem));
        /**
                * @property {jQuery} bodyEl
                * Reference to the jQuery object of document.body, namely $(document.body).
                * @readonly
                */
        Utils.defineProperty(this, 'bodyEl', $(document.body));
        Utils.defineProperty(this, 'docEl', $(document));
    }

    function _prepareDOM() {
        Utils.addClass(document.body, 'system_brease_Scrollbar_style_default');
        Utils.addClass(document.body, 'system_brease_Body_style_default');
        Utils.addClass(document.body, 'system_brease_ModalDimmer_style_default');
    }

    function _defineSettings() {
        // values and doku from brease/settings
        Utils.defineProperty(this, 'settings', settings);
    }

    function _defineControllers(controller) {

        for (var c in controller) {
            _controller[c] = controller[c];
        }
        /**
                * @property {brease.helper.NumberFormatter} formatter
                * Reference to the actual instance of singleton NumberFormatter
                * @readonly
                */
        _definePublicMethod(this, 'formatter', _controller);
        _definePublicMethod(this, 'action', _controller);

        /**
                * @property {brease.controller.OverlayController} overlayController
                * Reference to the actual instance of singleton OverlayController
                * @readonly
                */
        _definePublicMethod(this, 'dialogController', _controller, 'overlayController');
        _definePublicMethod(this, 'overlayController', _controller);

        /**
                * @property {brease.controller.PageController} pageController
                * Reference to the actual instance of singleton PageController
                * @readonly
                */
        _definePublicMethod(this, 'pageController', _controller);

        /**
                * @property {brease.controller.UIController} uiController
                * Reference to the actual instance of singleton UIController
                * @readonly
                */
        _definePublicMethod(this, 'uiController', _controller);
        _definePublicMethod(this, 'keyboardManager', _controller);

        _definePublicMethod(this, 'focusManager', { focusManager: focusManager });
    }

    function _definePublicMethod(obj, prop, source, sourceProp) {
        Object.defineProperty(obj, prop, {
            get: function () { return source[sourceProp || prop]; },
            set: function () { },
            enumerable: true,
            configurable: true
        });
    }

    function _defineServices(services) {

        for (var c in services) {
            _services[c] = services[c];
        }
        /**
                * @property {Object} services
                * @readonly
                * @property {brease.services.MeasurementSystem} services.measurementSystem
                * Reference to the actual instance of singleton MeasurementSystem service
                
                * @property {brease.services.Language} services.language
                * Reference to the actual instance of singleton Language service
    
                * @property {brease.services.User} services.user
                * Reference to the actual instance of singleton user service
    
                * @property {brease.services.Culture} services.culture
                * Reference to the actual instance of singleton User service
    
                * @property {brease.services.TextFormatter} services.textFormatter
                * Reference to the actual instance of singleton textFormatter service
    
                * @property {brease.services.Logger} services.logger
                * Reference to the actual instance of singleton Logger service
    
                * @property {brease.services.Opcua} services.opcua
                * Reference to the actual instance of singleton Opcua service
                */
        _definePublicMethod(this, 'measurementSystem', _services);
        _definePublicMethod(this.services, 'measurementSystem', _services);
        _definePublicMethod(this, 'language', _services);
        _definePublicMethod(this.services, 'language', _services);
        _definePublicMethod(this, 'user', _services);
        _definePublicMethod(this.services, 'user', _services);
        _definePublicMethod(this, 'culture', _services);
        _definePublicMethod(this.services, 'culture', _services);
        _definePublicMethod(this, 'textFormatter', _services);
        _definePublicMethod(this.services, 'textFormatter', _services);
        _definePublicMethod(this, 'loggerService', _services);
        _definePublicMethod(this.services, 'logger', _services, 'loggerService');
        _definePublicMethod(this.services, 'opcua', _services);
    }

    function _initControllers(runtimeService, systemMessage) {

        _controller.bindingController.init(runtimeService);
        _controller.connectionController.init(runtimeService, systemMessage);
        _controller.infoController.init(runtimeService);

        this.action.init(runtimeService);
        this.pageController.init(runtimeService);
        this.uiController.init(_controller.bindingController, _controller.widgetController);
    }

    function _initServices(runtimeService) {

        this.measurementSystem.init(runtimeService);
        this.language.init(runtimeService);
        this.culture.init(runtimeService);
        this.user.init(runtimeService);
        this.textFormatter.init(runtimeService);
        this.loggerService.init(runtimeService);
        _services.configuration.init(runtimeService);
    }

    function _registerClientResponse(response) {

        //console.log('%cregisterClient.response(' + JSON.stringify(response) + ')', 'color:green;');

        if (response !== undefined && response.status !== undefined && response.status.code === ServerCode.SUCCESS) {
            brease.messenger.announce(Messenger.REGISTER_CLIENT_SUCCESS, { clientId: response.ClientId });
            Client.setId(response.ClientId);
            _startServices();

        } else {
            if (Client.isValid === undefined) {
                Client.setValid(false);
                brease.messenger.announce(Messenger.REGISTER_CLIENT_FAILED, { response: response, visuId: config.visuId });
            }
            window.setTimeout(function () {
                _runtimeService.registerClient(config.visuId, _registerClientResponse);
            }, 1000);
        }
    }

    function _startServices() {
        /* START-ORDER NR 3 */
        //console.log('%c3.) startServices', 'color:#cc00cc;');
        $.when(
            brease.language.isReady(),
            brease.measurementSystem.isReady(),
            brease.user.isReady(),
            brease.textFormatter.isReady()
        ).then(function () {
            _loadCulture();
        }, function (message) {
            brease.messenger.announce(Messenger.START_SERVICES_FAILED, { message: message, cookies: _cookieTest() });
        });
    }

    function _cookieTest() {
        try {
            document.cookie = 'testcookie=1; SameSite=Lax';
            var ret = document.cookie.indexOf('testcookie=') !== -1;
            document.cookie = 'testcookie=1; SameSite=Lax; expires=Thu, 01-Jan-1970 00:00:01 GMT';
            return ret;
        } catch (e) {
            return false;
        }
    }

    function _loadCulture() {

        brease.culture.isReady().then(function () {
            brease.messenger.announce(Messenger.START_SERVICES_SUCCESS, { clientId: Client.id });
            _loadVisuData();
        }, function (message) {
            brease.messenger.announce(Messenger.START_SERVICES_FAILED, { message: message });
        });
    }

    function _loadVisuData() {
        /* START-ORDER NR 4 */
        //A&P 464480: visuData (contains watchdog configuration) has to be loaded before socket connection
        //console.log('%c4.) _loadVisuData(visuId=' + brease.config.visuId + ')', 'color:#cc00cc;');
        if (config.visuId) {
            _controller.visuModel.loadVisuData(brease.config.visuId, brease.appElem.id).then(
                function (visuConfig) {
                    _loadConfigurations(visuConfig);
                },
                function (visuId) {
                    brease.messenger.announce(LogCode.VISU_NOT_FOUND, { visuId: visuId });
                    _loadConfigurations();
                }
            );
        } else {
            _loadConfigurations();
        }
    }

    function _loadConfigurations(visuConfig) {
        /* START-ORDER NR 5 */
        //console.log('%c5.) _loadConfigurations(visuId=' + brease.config.visuId + ')', 'color:#cc00cc;');
        $.when(
            _services.configuration.loadConfigurations(visuConfig),
            _getServerInfo()
        ).then(_startConfigDependent, function () {
            brease.messenger.announce(Messenger.CONFIGURATION_LOAD_ERROR);
            _startConfigDependent();
        });
    }

    function _getServerInfo() {
        var deferred = $.Deferred();
        _runtimeService.getAutoLogOut(function (response) {
            _serverInfo.autoLogOut = response.enabled;
            deferred.resolve();
        });
        return deferred.promise();
    }

    function _startConfigDependent() {
        /* all classes with dependency of configurations can be started here */
        SystemGestures.init();
        VirtualEvents.config();
        _controller.eventController.init(_runtimeService, _controller.bindingController);
        // set browser zoom after eventController.init, because body style is changed by Swipe.init (hammer)
        zoomManager.setBrowserZoom();
        if (brease.config.isKeyboardOperationEnabled()) {
            focusManager.start();
            document.body.classList.add('system_brease_Focus_style_default');
            document.body.classList.add('system_brease_ElementFocus_style_default');
            document.body.classList.add('system_brease_Selection_style_default');
        }
        _startSocket();
    }

    function _startSocket() {
        /* START-ORDER NR 6 */
        // A&P 454280: Snippets in Texts are not solved at visu startup
        /* socket connection has to be established befor the loading of user texts, 
                   in order that initial snippets can be solved (see A&P 454280) */

        //console.log('%c6.) startSocket', 'color:#cc00cc;');
        brease.messenger.announce(Messenger.SERVER_CONNECTION_START);

        // server sends SessionActivated event, when he is ready after socket start
        _runtimeService.addEventListener(SocketEvent.SESSION_ACTIVATED, _sessionActivatedHandler);
        $.when(
            _runtimeService.socketIsReady() // try to establish socket connection
        ).then(function () {
            //console.time('TIME FOR sessionActivated');
            //console.log('%cstartSocket.success', 'color:green;');
        }, function () {
            brease.messenger.announce(Messenger.SERVER_CONNECTION_ERROR);
        });
    }

    function _sessionActivatedHandler() {
        //console.timeEnd('TIME FOR sessionActivated');
        brease.messenger.announce(Messenger.SERVER_CONNECTION_SUCCESS);
        _controller.bindingController.startListen();
        _serviceTextLoad();
    }

    function _serviceTextLoad() {
        /* START-ORDER NR 7 */
        /* loading texts after socket connection -> see NR 6 */

        brease.messenger.announce(Messenger.TEXT_LOAD_START);
        //console.log('%c7.) loadTexts', 'color:#cc00cc;');
        //console.time('TIME FOR loadTexts');
        $.when(
            brease.language.loadAllTexts()
        ).then(function () {
            //console.timeEnd('TIME FOR loadTexts');
            //console.log('%cloadTexts.success', 'color:green;');
            brease.messenger.announce(Messenger.TEXT_LOAD_SUCCESS);
            _resourcesLoadedHandler();
        }, function () {
            brease.messenger.announce(Messenger.TEXT_LOAD_ERROR);
        });
    }

    function _resourcesLoadedHandler() {

        /**
                * @event resources_loaded
                * Fired when resources (languages, texts, cultures) are loaded   
                * @param {String} type {@link brease.events.BreaseEvent#static-property-RESOURCES_LOADED BreaseEvent.RESOURCES_LOADED}
                * @param {HTMLElement} target brease.appElem
                */
        brease.appElem.dispatchEvent(new CustomEvent(BreaseEvent.RESOURCES_LOADED));
        $.when(
            _startContentIsActivated(),
            brease.overlayController.init()
        ).then(function () {
            if (config.contentId !== undefined) {
                brease.appElem.addEventListener(BreaseEvent.CONTENT_PARSED, _appContainerParsedHandler);
                brease.uiController.parse(brease.appElem, false); // parse appContainer
            } else {
                _finishBreaseStart();
            }
        });
    }

    function _startContentIsActivated() {
        // if brease started with a contentId we have to activate this content, otherwise continue
        if (config.contentId !== undefined) {
            Client.setValid(true);
            return _controller.bindingController.activateContent(config.contentId); // activate and load subscriptions for main content
        } else {
            var deferred = $.Deferred();
            deferred.resolve();
            return deferred.promise();
        }
    }

    function _appContainerParsedHandler() {
        brease.appElem.removeEventListener(BreaseEvent.CONTENT_PARSED, _appContainerParsedHandler);
        _controller.bindingController.sendInitialValues(config.contentId, _finishBreaseStart);
    }

    function _finishBreaseStart() {
        // send client info after optional start content is ready
        _controller.infoController.start(_serverInfo.autoLogOut || config.visu.activityCount);
        if (config.visuId !== undefined) {
            brease.pageController.start(config.visuId, brease.appElem, config.ContentCaching);
        }
        /**
                * @event app_ready
                * Fired when application is ready  
                * That means: resources (languages, texts, cultures) loaded and optional main content is active and parsed  
                * @param {String} type {@link brease.events.BreaseEvent#static-property-APP_READY BreaseEvent.APP_READY}
                * @param {HTMLElement} target brease.appElem
                */
        brease.appElem.dispatchEvent(new CustomEvent(BreaseEvent.APP_READY, { bubbles: true }));
        /* START-ORDER NR 8 */
        //console.log('%c8.) startHeartbeat', 'color:#cc00cc;');
        _runtimeService.startHeartbeat();
        console.log('app ready');
    }

    var brease = new Brease();
    Utils.defineProperty(window, 'brease', brease);

    return brease;

});
