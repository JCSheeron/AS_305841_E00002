define(['brease/controller/FileManager', 
    'brease/controller/libs/FactoryUtils',
    'brease/controller/objects/WidgetItem', 
    'brease/core/Utils',
    'brease/events/BreaseEvent',
    'brease/enum/Enum', 
    'brease/controller/libs/Queue'],
function (fileManager, factoryUtils, WidgetItem, Utils, BreaseEvent, Enum, Queue) {

    'use strict';

    var parser = {

            init: function init(widgetController) {
                if (widgetController !== undefined) {
                    _widgetController = widgetController;
                }
            },

            start: function (queue) {
                queue.start(_createWidget).done(_createWidgetDoneHandler);
            },

            /**
                * @method parse
                * Analyze an HTMLElement and create widgets for all found widget elements.  
                * @param {HTMLElement/jQuery} target
                * @param {Boolean} andSelf include target in creation process
                * @param {String} [contentId] id of the parent content of target
                */
            parse: function parse(target, andSelf, contentId) {
                target = factoryUtils.getElem(target);
                //console.always('%c' + 'parse ' + ((target) ? target.id : 'undefined'), 'color:#00cccc');

                if (target !== null) {
                    var queue = Queue.getQueue(target, 'parse', true),
                        nodeList = target.querySelectorAll('[data-brease-widget]'),
                        widgetList = [], idList = [],
                        node, i, l = nodeList.length;

                    for (i = l - 1; i >= 0; i -= 1) {
                        node = nodeList[i];
                        node.id = factoryUtils.ensureElemId(node.id);

                        if (idList.indexOf(node.id) === -1) {
                            widgetList.push(node);
                            idList.push(node.id);
                        } else {
                            console.iatWarn('[parse] HTML element has duplicate id (' + node.id + ') and will be removed');
                            node.parentNode.removeChild(node);
                        }
                    }

                    contentId = factoryUtils.ensureContentId(contentId, target, _widgetController.getState(target.id));
                    for (i = 0, l = widgetList.length; i < l; i += 1) {
                        _addToQueue(widgetList[i], queue, contentId);
                    }
                    if (andSelf === true && target.getAttribute('data-brease-widget') !== null) {
                        _addToQueue(target, queue, contentId);
                    }
                    parser.start(queue);
                } else {
                    _warn('parse');
                }
            }

        },
        _private = {
        }, _widgetController;

    function _createWidgetDoneHandler(target) {
        target.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_PARSED));
    }

    /**
        * @method _createWidget
        * @private
        * create widgets  
        * @param {WidgetItem} widgetItem
        * @param {Queue} queue
        */
    function _createWidget(widgetItem, queue) {
        var options,
            widgetPath,
            state = _widgetController.getState(widgetItem.id);

        if (state < Enum.WidgetState.INITIALIZED) {
            if (_widgetController.optionsExist(widgetItem.id)) {
                //console.log('[' + widgetItem.id + ']options from brease.options');
                options = _widgetController.getOptions(widgetItem.id);
                widgetPath = fileManager.getPathByClass(options.className);
                if (options.parentContentId === undefined) {
                    _widgetController.addOption(widgetItem.id, 'parentContentId', widgetItem.parentContentId);
                }
            } else {
                //console.log('%c[' + widgetItem.id + ']options from data-brease-options', 'color:red;');
                options = Utils.parseElementData(widgetItem.elem, 'brease-options');
                widgetPath = fileManager.getPathByClass(widgetItem.elem.getAttribute('data-brease-widget'));
                if (options.parentContentId === undefined) {
                    options.parentContentId = widgetItem.parentContentId;
                }
                _widgetController.setOptions(widgetItem.id, options, true);
            }

            var loadMetaData = (brease.config.editMode === true || brease.config.mocked !== true) && brease.config.testMode !== true;

            fileManager.loadJSFiles(widgetPath, loadMetaData).done(function (WidgetClass) {
                //_private.loadWidgetFileSuccess(WidgetClass, widgetPath, widgetItem, queue);
                _defer({
                    method: 'loadWidgetFileSuccess', WidgetClass: WidgetClass, widgetPath: widgetPath, widgetItem: widgetItem, queue: queue
                });
            }).fail(function (message) {
                _loadWidgetFileFail(message, widgetPath, widgetItem, queue);
            });
        } else {
            console.iatInfo('createWidget:' + widgetItem.id + ' already initialized');
        }
    }

    function _addToQueue(node, queue, contentId) {

        var widgetState = _widgetController.getState(node.id);

        if (widgetState >= Enum.WidgetState.ABORTED && widgetState <= Enum.WidgetState.NON_EXISTENT) {
            // widget does not exist or had an unsuccessful creation process before => add to model and to queue
            _widgetController.addWithState(node.id, Enum.WidgetState.IN_PARSE_QUEUE);
            queue.add(new WidgetItem(node, Enum.WidgetState.IN_PARSE_QUEUE, contentId));

        } else if (widgetState < Enum.WidgetState.IN_PARSE_QUEUE) {
            // widget added by WidgetFactory => set state and add to queue
            _widgetController.setState(node.id, Enum.WidgetState.IN_PARSE_QUEUE);
            queue.add(new WidgetItem(node, Enum.WidgetState.IN_PARSE_QUEUE, contentId));

        } else {
            // widget already in parse queue or already created
            console.iatInfo('[parse] HTML element already parsed (id=' + node.id + '),state=' + widgetState);
        }
    }

    var _updatePending = false,
        _queue = [];

    function _defer(item) {
        _queue.push(item);

        if (_updatePending !== true) {
            _updatePending = true;
            window.requestAnimationFrame(_processDefered);
        }
    }

    function _processDefered() {
        for (var i = 0; i < _queue.length; i += 1) {
            var item = _queue[i];
            _private[item['method']].call(null, item['WidgetClass'], item['widgetPath'], item['widgetItem'], item['queue']);
        }
        _queue = [];
        _updatePending = false;
    }

    _private.loadWidgetFileSuccess = function (WidgetClass, widgetPath, widgetItem, queue) {

        if (widgetItem.state === Enum.WidgetState.IN_PARSE_QUEUE && queue.elem !== null) {
            try {

                var widget = new WidgetClass(widgetItem.elem, _widgetController.getOptions(widgetItem.id, true));
                widget.state = Enum.WidgetState.INITIALIZED;
                _widgetController.addWidget(widget);

                widget.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_INITIALIZED));
                if (widget.omitReadyEvent !== true) {
                    widget._defer('_dispatchReady');
                    //widget._dispatchReady();
                }
                queue.finishItem(widgetItem.id);
            } catch (e) {
                var m = 'script error for module ' + widgetPath.path;
                _widgetController.setState(widgetItem.id, Enum.WidgetState.FAILED);
                console.log(m + ' (' + e.message + ')');
                console.error(e.stack);
                brease.loggerService.log(Enum.EventLoggerId.CLIENT_SCRIPT_FAIL, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.ERROR, [], m);
                queue.finishItem(widgetItem.id);
            }
        }
    };

    function _loadWidgetFileFail(message, widgetPath, widgetItem, queue) {
        var m = 'load error for module ' + ((widgetPath && widgetPath.path) ? widgetPath.path : 'undefined') + '(' + message + ')';
        _widgetController.setState(widgetItem.id, Enum.WidgetState.FAILED);
        console.debug(m);
        brease.loggerService.log(Enum.EventLoggerId.CLIENT_MODULELOADER_FAIL, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.ERROR, [], m);
        queue.finishItem(widgetItem.id);
    }

    function _warn(fn, message) {
        var m = message || '[' + fn + '] target of wrong type';
        console.iatWarn(m);
        brease.loggerService.log(Enum.EventLoggerId.CLIENT_PARSE_ERROR, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.WARNING, [], m);
    }

    return parser;
});
