define(['brease/controller/FileManager', 
    'brease/events/BreaseEvent', 
    'brease/enum/Enum',
    'brease/controller/libs/FactoryUtils',
    'brease/controller/libs/Queue', 
    'brease/controller/WidgetParser', 
    'brease/controller/objects/WidgetItem'],
function (fileManager, BreaseEvent, Enum, factoryUtils, Queue, widgetParser, WidgetItem) {

    'use strict';

    var factory = {

            init: function init(widgetsController) {
                if (widgetsController !== undefined) {
                    _widgetsController = widgetsController;
                }
                widgetParser.init(widgetsController);
            },

            /**
                * @method createWidgets
                * @param {HTMLElement/jQuery}
                * @param {WidgetConfig[]}
                * @param {Boolean} [autoParse=true]
                * @param {String} [contentId]
                * @param {String} [addBeforeSelector]  
                */
            createWidgets: function createWidgets(target, arWidgets, autoParse, contentId, addBeforeSelector) {
                target = factoryUtils.getElem(target);
                //console.always('%c' + 'createWidgets(l=' + arWidgets.length + ',target=' + ((target) ? target.id : 'undefined') + ',content=' + contentId + ')', 'color:#cc00cc');

                if (target !== null) {
                    var queue = Queue.getQueue(target, 'create', true);
                    queue.pending = true;
                    queue.autoParse = (autoParse !== false);
                    contentId = factoryUtils.ensureContentId(contentId, target, _widgetsController.getState(target.id));
                    queue.add(arWidgets.filter(_stateFilter).reverse().map(_convertToQueueItem.bind(null, contentId, addBeforeSelector)));

                    fileManager.loadHTMLFiles(arWidgets, queue.id, [queue]).done(_startLoadQueue).fail(_startLoadQueue);

                } else {
                    _warn('createWidgets');
                }
            }

        },
        _widgetsController;

    function _startLoadQueue(queue) {
        if (queue.pending === true) {
            queue.pending = false;
            queue.start(_loadHTML, [queue.autoParse]).done(_loadHTMLDoneHandler);
        }
    }

    //***************//
    //*** PRIVATE ***//
    //***************//

    function _loadHTMLDoneHandler(target, items, autoParse) {
        target.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_READY));

        var parseItems = [];
        items.forEach(function (item) {
            if (item.node) {
                _widgetsController.setState(item.node.id, Enum.WidgetState.IN_PARSE_QUEUE);
                parseItems.push(new WidgetItem(item.node, Enum.WidgetState.IN_PARSE_QUEUE, item.widgetInfo.options.parentContentId));
            }
        });

        if (autoParse === true) {
            var parseQueue = Queue.getQueue(target, 'parse', true);
            parseQueue.add(parseItems);
            widgetParser.start(parseQueue);
        }
    }

    function _loadHTML(item, queue) {
        var widgetInfo = item.widgetInfo,
            widgetType = widgetInfo.className;

        if (!widgetType) {
            _failItem(item, queue, widgetInfo.id, '_loadHTML', '[loadHTML] no class name given for widget creation; element[id=' + ((widgetInfo.id) ? widgetInfo.id : 'undefined') + '] not created!');
        }

        var html = fileManager.getHTMLByType(widgetType);
        if (!html) {
            _failItem(item, queue, widgetInfo.id, '_loadHTML', '[loadHTML] unknown class (' + widgetType + ') name given for widget creation; element[id=' + ((widgetInfo.id) ? widgetInfo.id : 'undefined') + '] not created!');
        }

        var id = widgetInfo.id,
            content = widgetInfo.content,
            options = (widgetInfo.options) ? widgetInfo.options : {};

        var className = fileManager.getPathByType(widgetType, 'class');

        _widgetsController.setOptions(id, options, false, true);
        _widgetsController.addOption(id, 'className', className);

        if (item.state === Enum.WidgetState.IN_QUEUE && queue.elem !== null) {
            _succeedItem(item, queue, id, className, widgetInfo, html, content, options);
        }
    }

    function _succeedItem(item, queue, id, className, widgetInfo, html, content, options) {
        var newNode = factoryUtils.createNode(html, id, options, className, widgetInfo.HTMLAttributes, content);
        if (options.styleClassAdded) {
            _widgetsController.addOption(id, 'styleClassAdded', true);
        }
        var added = false;
        if (widgetInfo.addBeforeSelector) {
            // A&P 686170: undo the deleting of an axis of a chart -> referenceNode is not a child of target (queue.elem)
            var referenceNode = document.querySelector(widgetInfo.addBeforeSelector);
            if (referenceNode) {
                referenceNode.parentNode.insertBefore(newNode, referenceNode);
                added = true;
            }
        }
        if (!added) {
            queue.elem.appendChild(newNode);
        }
        if (containsWidgets(content, newNode)) {
            widgetParser.parse(newNode, false, item.widgetInfo.options.parentContentId);
        }
        item.state = Enum.WidgetState.INITIALIZED;
        item.node = newNode;
        queue.finishItem(widgetInfo.id);
    }

    /**
     * Checks if widget content config or widget node contains any further widgets to parse
     * @param {Object} content Widget content config
     * @param {Object} node Widget html element 
     */
    function containsWidgets(content, node) {
        var contentHasWidgets = content && content.html && content.html.indexOf('data-brease-widget=') !== -1;
        return contentHasWidgets || node.querySelector('[data-brease-widget]') !== null;
    }

    function _failItem(item, queue, id, fn, message) {
        _warn(fn, message);
        item.state = Enum.WidgetState.FAILED;
        queue.finishItem(id);
    }

    /**
        * @method _convertToQueueItem
        * @param {String} contentId
        * @param {String} addBeforeSelector
        * @param {WidgetConfig} widgetConfig
        */
    function _convertToQueueItem(contentId, addBeforeSelector, widgetConfig) {
        if (contentId) {
            if (widgetConfig.options) {
                widgetConfig.options.parentContentId = contentId;
                widgetConfig.options._dynamicallyCreated = true;
            } else {
                widgetConfig.options = {
                    parentContentId: contentId,
                    _dynamicallyCreated: true
                };
            }
        }
        if (addBeforeSelector) {
            widgetConfig.addBeforeSelector = addBeforeSelector;
        }
        widgetConfig.id = factoryUtils.ensureElemId(widgetConfig.id);
        return {
            state: Enum.WidgetState.IN_QUEUE,
            widgetInfo: widgetConfig,
            id: widgetConfig.id
        };
    }

    /**
        * @method _stateFilter
        * @param {WidgetConfig} widgetConfig
        */
    function _stateFilter(widgetConfig) {
        var success = _widgetsController.getState(widgetConfig.id) <= Enum.WidgetState.IN_QUEUE;
        if (!success) {
            console.iatWarn('filtered out:' + widgetConfig.id);
        }
        return success;
    }

    function _warn(fn, message) {
        var m = message || '[' + fn + '] target of wrong type';
        console.iatWarn(m);
        brease.loggerService.log(Enum.EventLoggerId.CLIENT_PARSE_ERROR, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.WARNING, [], m);
    }

    return factory;
});
