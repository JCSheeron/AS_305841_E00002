define(['brease/config', 
    'brease/settings', 
    'brease/core/Utils', 
    'jquery', 
    'brease/events/VirtualEvents',
    'brease/events/jqueryEvents',
    'libs/lodash',
    'libs/polyfill',
    'brease/services/LoadedByBootstrapper'], 
function (config, settings, Utils) {

    'use strict';

    function _start(startMethod, startId, customConfig) {

        var mockType = document.getElementById('appContainer').getAttribute('data-mocked'),
            mocked = (mockType !== null),
            servicePath = mocked ? 'brease/helper/stubs/ServiceBridge' : 'brease/services/ServiceBridge',
            webSocketPath = mocked ? 'brease/helper/stubs/WebSocket' : 'brease/services/WebSocket';

        if (customConfig !== undefined) {
            $.extend(true, config, customConfig);
        }
        if (!config.detection) {
            config.detection = {
                mobile: false,
                ios: false
            };
        }

        Utils.defineProperty(config, 'debug', $('script[src="release/brease.js"]').length === 0);
        Utils.defineProperty(config, 'mocked', mocked);
        Utils.defineProperty(config, 'mockType', mockType);

        var appElem = document.getElementById('appContainer');
        window.brease = {
            config: config,
            settings: settings,
            appElem: appElem,
            appView: $(appElem)
        };

        require([servicePath, 
            webSocketPath, 
            'brease/services/RuntimeService', 
            'brease/core/libs/Extensions',
            'brease/events/BreaseEvent'], 
        function (serviceBridge, webSocket, runtimeService, Extensions, BreaseEvent) {

            BreaseEvent.init(brease.config.editMode);
            Extensions.console.initStorageLog(config.storageLog);
            Extensions.console.init(config);
            runtimeService.init(serviceBridge, webSocket);
            if (brease.config.debug === true) {
                var date = new Date();
                console.iatInfo('application start: ' + date.toLocaleDateString() + ', ' + date.toLocaleTimeString());
                if (mocked) {
                    console.iatInfo('server communication mocked: true');
                }
            }
            var files = ['brease/core/BaseWidget'];
            if (brease.config.editMode === true || brease.config.mocked === true) {
                files.push('brease/core/designer/BaseWidget/ClassExtension');
            }
            require(files, function (BaseWidget, BaseWidgetExtension) {
                if (BaseWidgetExtension) {
                    BaseWidgetExtension.extend(BaseWidget);
                }
                require(['brease/controller/BindingController', 
                    'brease/controller/ConnectionController',
                    'brease/controller/InfoController',
                    'brease/controller/ActionController',
                    'brease/controller/PageController', 
                    'brease/controller/OverlayController',
                    'brease/controller/UIController',
                    'brease/helper/NumberFormatter',
                    'brease/controller/EventController',
                    'brease/controller/WidgetController', 
                    'brease/model/VisuModel', 
                    'brease/controller/KeyboardManager'], 
                function (bindingController, connectionController, infoController, actionController, pageController, overlayController, uiController, NumberFormatter, eventController, widgetController, visuModel, keyboardManager) {
                    require(['brease/services/MeasurementSystem',
                        'brease/services/Language', 
                        'brease/services/Culture',
                        'brease/services/User', 
                        'brease/services/TextFormatter',
                        'brease/services/Logger', 
                        'brease/services/Configuration',
                        'brease/services/Opcua'], 
                    function (measurementSystem, language, culture, user, textFormatter, loggerService, configuration, opcua) {
                        files = ['brease/brease'];
                        if (brease.config.editMode === true || brease.config.mocked === true) {
                            files.push('brease/core/designer/Brease/ClassExtension');
                        }
                        require(files, function (brease, BreaseExtension) {
                            if (BreaseExtension) {
                                BreaseExtension.extend(brease);
                            }
                            brease.init(runtimeService, {
                                measurementSystem: measurementSystem,
                                language: language,
                                culture: culture,
                                user: user,
                                textFormatter: textFormatter,
                                loggerService: loggerService,
                                configuration: configuration,
                                opcua: opcua
                            }, {
                                bindingController: bindingController,
                                connectionController: connectionController,
                                infoController: infoController,
                                action: actionController,
                                visuModel: visuModel,
                                pageController: pageController,
                                overlayController: overlayController,
                                uiController: uiController,
                                widgetController: widgetController,
                                formatter: new NumberFormatter(),
                                eventController: eventController,
                                keyboardManager: keyboardManager
                            });
                            brease[startMethod](startId);
                        });
                    });
                });
            });
        });
    }

    /**
    * @class brease.application
    * @extends core.javascript.Object
    * Main application starter.  
    * Example of usage:
    * 
    *     <script>
    *         require(['brease/application'], function (application) {
    *             application.startVisu('myVisu');
    *         });
    *     </script>
    * 
    * @singleton
    */
    return {
        start: function (contentId, customConfig) {
            _start('startContent', contentId, customConfig);
        },
        /**
        * @method startVisu
        * Method to start visualization
        * @param {String} visuId
        * @param {Object} customConfig Optional global options
        */
        startVisu: function (visuId, customConfig) {
            _start('startVisu', visuId, customConfig);
        }
    };

});
