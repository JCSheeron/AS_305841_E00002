define([
    'ace/ace',
    'widgets/brease/common/libs/TextEditor/Commands',
    'brease/core/Utils',
    'ace/ext/language_tools',
    'ace/tooltip'
], function (ace, Commands, Utils, langTools, Tooltip) {

    /**
     * @class widgets.brease.common.libs.TextEditor
     */

    'use strict';

    var clipboardText = '';

    /**
     * @method constructor
     * Constructor that creates a new editor object and append it to element 
     * @param {Object} config settings for the TextEditor
     * @param {Object} config.element element in which the editor will be appended
     * @param {String} config.mode define the highlighting mode for the text
     * @param {String} config.theme define the styles to be used for the highlight elements
     * @param {Function} config.onModified callback to be called when the doc is modified
     * @param {Function} config.onToggleBreakPoint callback to be called when a user toggle a break point
     * @param {Boolean} config.disabled indicated if the editor is disabled by default
     * @param {Object} config.Keyboard module for keyboard
     * @param {Boolean} config.showLineNumber decides whether the gutter needs to be shown or not
     */
    function TextEditor(config) {
        //Obtain the settings fot the editor base on the provided and the defaults
        this.settings = _mergeOption(config);
        //Check if the element is a DOM element
        if (!(this.settings.element instanceof Element)) {
            return;
        }
        //Initialize the editor
        this._initAceElement(this.settings.element);
        this._createBoundFunctionCalls();
        this._addEventListenersKeyboard();
        this._addEventListenersDebug();

        if (!this.isEnabled()) {
            this.disableInteraction(true);
        }
        Commands.addCommands(this);
        //Configure the keyboard
        if (this.settings.keyboard) {
            this.boundOnKeyboardInput = this.onKeyboardInput.bind(this);
            this.keyboard = new config.Keyboard();
        }
    }

    /**
     * @method _initAceElement
     * @private
     * Creates and configure the ace instance
     * @param {Object} elem DOM element where to append the ace component
     */
    TextEditor.prototype._initAceElement = function (element) {
        this.editor = ace.edit(element);
        this.editor.setTheme('ace/theme/' + this.settings.theme);
        this.editor.session.setMode('ace/mode/' + this.settings.mode);
        this.editor.setShowPrintMargin(false);
        this.editor.setOption('hasCssTransforms', true);
        this.editor.setOption('enableBasicAutocompletion', this.settings.enableBasicAutocompletion);
        this.editor.renderer.setShowGutter(this.settings.showLineNumber);
        this.editor.setHighlightGutterLine(this.settings.highlightGutter);
        this.editor.on('change', this.settings.onModified);

        var list = this.settings.autocompletionList;
        this.tooltipAnnotation = '';
        this.tooltipTimeout = undefined;
        this.tooltip = new CustomToolTip(this.editor.container);
        this.gutter = this.editor.renderer.$gutter;
        
        this.staticWordCompleter = {
            // eslint-disable-next-line no-unused-vars
            getCompletions: function (editor, session, pos, prefix, callback) {
                var wordList = list;
                callback(null, wordList.map(function (word) {
                    return {
                        caption: word,
                        value: word,
                        meta: 'static'
                    };
                }));
        
            }
        };
        langTools.setCompleters([this.staticWordCompleter]);
    };

    TextEditor.prototype.mousestopped = function (e) {
        if (e.originalEvent.movementX === 0 && e.originalEvent.movementY === 0) {
            this.showTooltip(e, e.clientX, e.clientY);
        } else {
            this.hideTooltip();
        }
    };

    /**
     * @method _createBoundFunctionCalls
     * @private
     * Create bound functions
     */
    TextEditor.prototype._createBoundFunctionCalls = function () {
        if (this.boundOnFocus === undefined || this.boundOnBlur === undefined || this.boundOnGutterClick === undefined) {
            this.boundOnFocus = this.onFocus.bind(this);
            this.boundOnBlur = this.onBlur.bind(this);
            this.boundOnGutterClick = this.onGutterClick.bind(this);
        }
    };

    /**
     * @method _addEventListenersKeyboard
     * @private
     * Sets the event listeners for the keyboard
     */
    TextEditor.prototype._addEventListenersKeyboard = function () {
        this.editor.on('focus', this.boundOnFocus);
        this.editor.on('blur', this.boundOnBlur);
    };

    /**
     * @method _addEventListenersDebug
     * @private
     * Sets the event listeners for the breakpoints
     */
    TextEditor.prototype._addEventListenersDebug = function () {
        this.editor.on('guttermousedown', this.boundOnGutterClick);
    };

    /**
     * @method _removeEventListenersDebug
     * @private
     * Remove the event listeners for the breakpoints
     */
    TextEditor.prototype._removeEventListenersDebug = function () {
        this.editor.off('guttermousedown', this.boundOnGutterClick);
    };

    /**
     * @method setMode
     * Set mode for the highlighting (plain, cnc, ...)
     * @param {String} mode
     */
    TextEditor.prototype.setMode = function (mode) {
        this.settings.mode = mode;
        this.editor.session.setMode('ace/mode/' + this.settings.mode);
    };

    /**
     * @method getMode
     * Gets the actual configured mode
     * @return {String} mode
     */
    TextEditor.prototype.getMode = function () {
        return this.settings.mode;
    };

    /**
     * @method getKeyboard
     * Get if the virtual keyboard is enabled
     * @return {Boolean} keyboard is enabled
     */
    TextEditor.prototype.getKeyboard = function () {
        return this.settings.keyboard;
    };

    /**
     * @method setOnModified
     * Set onModified
     * @param {Function} onModified
     */
    TextEditor.prototype.setOnModified = function (onModified) {
        this.editor.off('change', this.settings.onModified);
        this.settings.onModified = onModified;
        this.editor.on('change', this.settings.onModified);
    };

    /**
     * @method getOnModified
     * Get onModified
     * @return {Function} onModified
     */
    TextEditor.prototype.getOnModified = function () {
        return this.settings.onModified;
    };

    /**
     * @method setClipboardText
     * Sets the clipboardText inside the TextEditor for all instances
     * @param {String} text
     */
    TextEditor.prototype.setClipboardText = function (text) {
        clipboardText = text;
    };

    /**
     * @method getClipboardText
     * Gets the clipboardText text inside the TextEditor
     * @return {String} clipboardText inside the TextEditor (same for all instances)
     */
    TextEditor.prototype.getClipboardText = function () {
        return clipboardText;
    };

    /**
     * @method setValue
     * Sets the new file in the textEditor
     * @param {String} value text to be displayed in the editor
     * @param {Boolean} cleanUndoHistory reset the stack of changes
     */
    TextEditor.prototype.setValue = function (value, cleanUndoHistory) {
        if (!this.editor) return;
        this.editor.setValue(value);
        this.editor.clearSelection();
        if (cleanUndoHistory === true) {
            this.editor.getSession().getUndoManager().reset();
        }
    };

    /**
     * @method setAutocompleteDictionary
     * Pass a callback function of the following structure:
     * where list is the additive dictionary to be used.
     * var staticWordCompleter = {
     *       getCompletions: function (editor, session, pos, prefix, callback) {
     *           var wordList = list;
     *           callback(null, wordList.map(function (word) {
     *               return {
     *                   caption: word,
     *                   value: word,
     *                   meta: 'static'
     *               };
     *           }));
     *   
     *       }
     *    };
     * @param {Object} callback
     */
    TextEditor.prototype.setAutocompleteDictionary = function (callback) {
        langTools.setCompleters([this.staticWordCompleter, callback]);
    };

    /**
     * @method getValue
     * Gets the actual value on the editor
     * @return {String} value text displayed on the editor
     */
    TextEditor.prototype.getValue = function () {
        return this.editor.getValue();
    };

    /**
     * @method getSelectedText
     * Gets the actual selected text
     * @return {String} actual selected text
     */
    TextEditor.prototype.getSelectedText = function () {
        return this.editor.getSelectedText();
    };

    /**
     * @method setShowLineNumber
     * Shows/Hide the lineNumber gutter
     * @param {Boolean} showLineNumber 
     */
    TextEditor.prototype.setShowLineNumber = function (showLineNumber) {
        this.settings.showLineNumber = showLineNumber;
        this.editor.renderer.setShowGutter(showLineNumber);
    };

    /**
     * @method getShowLineNumber
     * gets the actual state
     * @return {Boolean} showLineNumber 
     */
    TextEditor.prototype.getShowLineNumber = function () {
        return this.settings.showLineNumber;
    };

    /**
     * @method appendText
     * Append the text into a new line at the end of the file.
     * @param {String} text 
     */
    TextEditor.prototype.appendText = function (text) {
        var session = this.editor.session;
        session.insert({
            row: session.getLength(),
            column: 0
        }, '\n' + text);
    };

    /**
     * @method getNumberOfLines
     * gets the number of lines for the current document
     * @return {UInteger} numberOfLines 
     */
    TextEditor.prototype.getNumberOfLines = function () {
        return this.editor.session.getLength();
    };

    /**
     * @method disable
     * Disable the textEditor
     * @param {Boolean} dim defines if the editor should be gray out
     */
    TextEditor.prototype.disable = function (dim) {
        this.settings.disabled = true;
        this.disableInteraction(dim);
    };

    /**
     * @method enable
     * Enable the textEditor
     */
    TextEditor.prototype.enable = function () {
        this.settings.disabled = false;
        this.enableInteraction();
    };

    /**
     * @method disableInteraction
     * Disable user interaction with the editor
     * @param {Boolean} dim defines if the editor should be gray out
     * @param {Boolean} omitOption fo not use the predefined options
     */
    TextEditor.prototype.disableInteraction = function (dim, omitOption) {
        // searchBox.hide() calls editor.focus and trigger focus which will open keyboard (A&P 697590) 
        this.editor.off('focus', this.boundOnFocus);
        if (this.editor.searchBox !== undefined) {
            this.editor.searchBox.hide();
        }
        if (this.cover !== undefined) {
            this.cover.remove();
        }
        this.cover = document.createElement('div');
        this.editor.container.appendChild(this.cover);
        this.cover.style.cssText = 'position:absolute;' +
            'top:0;bottom:0;right:0;left:0;' +
            'background:rgba(150,150,150,' + (dim ? 0.5 : 0) + ');' +
            'z-index:100';
        this.editor.renderer.scrollBarH.element.style.zIndex = '101';
        this.editor.renderer.scrollBarV.element.style.zIndex = '101';
        this.editor.renderer.$gutter.style.zIndex = '101';
        this.editor.renderer.$cursorLayer.element.style.opacity = 0;
        if (omitOption !== true) {
            this.editor.setOptions({
                highlightActiveLine: false,
                highlightSelectedWord: false,
                readOnly: true,
                highlightGutterLine: false
            });
        }
        this.editor.off('blur', this.boundOnBlur);
    };

    /**
     * @method enableInteraction
     * Enable user interaction with the editor
     */
    TextEditor.prototype.enableInteraction = function () {
        if (this.cover !== undefined) {
            this.cover.remove();
        }
        this.editor.renderer.$cursorLayer.element.style.opacity = 1;
        this.editor.setOptions({
            highlightActiveLine: true,
            highlightSelectedWord: true,
            readOnly: false,
            highlightGutterLine: this.settings.highlightGutter
        });
        this._addEventListenersDebug();
        if (!this.settings.monitorMode) {
            this._addEventListenersKeyboard();
        }
    };

    /**
     * @method isEnabled
     * Gets the actual value for the enable
     * @return {Boolean}
     */
    TextEditor.prototype.isEnabled = function () {
        return !this.settings.disabled;
    };

    /**
     * @method resize
     * Update the size of the text editor
     */
    TextEditor.prototype.resize = function (force) {
        this.editor.resize(force);
    };

    /**
     * @method dispose
     * Dispose the editor
     */
    TextEditor.prototype.dispose = function () {
        if (this.editor !== undefined) {
            this.editor.off('change', this.settings.onModified);
            $(this.editor.container).children().off();
            this.editor.destroy();
        }
    };

    /**
     * @method onFocus
     * Event received when the textEditor comes into focus
     */
    TextEditor.prototype.onFocus = function () {
        if (this.settings.keyboard) {
            this.openKeyboard();
        }
    };

    /**
     * @method onSearchFocus
     * Event received when the textEditor comes into focus
     */
    TextEditor.prototype.onSearchFocus = function () {
        if (this.settings.keyboard) {
            this.openKeyboard();
        }
    };

    /**
     * @method onBlur
     * Event received when the textEditor lose focus
     */
    TextEditor.prototype.onBlur = function () {
        this.editor.clearSelection();
        if (this.settings.keyboard) {
            this.closeKeyboard();
        }
    };

    /**
     * @method onSearchBlur
     * Event received when the textEditor comes into focus
     */
    TextEditor.prototype.onSearchBlur = function () {
        if (this.settings.keyboard) {
            this.closeKeyboard();
        }
    };

    /**
     * @method onGutterClick
     * Event received when user click on the gutter
     * @param {Object} e data for the click event
     */
    TextEditor.prototype.onGutterClick = function (e) {
        var target = e.domEvent.target;
        if (target.className.indexOf('ace_gutter-cell') === -1) { return; }
        var row = e.getDocumentPosition().row;
        e.stop();
        this.settings.onToggleBreakPoint(row);
    };

    /**
     * @method onKeyboardInput
     * Event received from keyboard
     * @param {Object} e data for the keyboard event
     */
    TextEditor.prototype.onKeyboardInput = function (e) {
        var command = e.data.action,
            args = e.data.args;
        if (Commands.isValidCommand(command)) {
            this.editor.execCommand(command, args);
        } else if (command === 'close') {
            this.keyboard.removeCallback(this.boundOnKeyboardInput);
            this.editor.blur();
        }
    };

    /**
     * @method openKeyboard
     * Open the keyboard
     */
    TextEditor.prototype.openKeyboard = function () {
        if (this.keyboard !== undefined) {
            this.keyboard.show();
            this.keyboard.addCallback(this.boundOnKeyboardInput);
        }
    };

    /**
     * @method closeKeyboard
     * Close the keyboard
     */
    TextEditor.prototype.closeKeyboard = function () {
        if (this.keyboard !== undefined) {
            this.keyboard.hide();
            this.keyboard.removeCallback(this.boundOnKeyboardInput);
        }
    };

    /**
     * @method addListenersSearchBox
     * Start listening for focus/blur events on the searchBox
     */
    TextEditor.prototype.addListenersSearchBox = function () {
        if (!this.listenersAdded) {
            $(this.editor.container).find('.ace_search_field').on('focus', this.onSearchFocus.bind(this));
            $(this.editor.container).find('.ace_replace_field').on('focus', this.onSearchFocus.bind(this));
            $(this.editor.container).find('.ace_search_field').on('blur', this.onSearchBlur.bind(this));
            $(this.editor.container).find('.ace_replace_field').on('blur', this.onSearchBlur.bind(this));
            this.listenersAdded = true;
            //force a first call to open the keyboard
            this.openKeyboard();
        }
    };

    /**
     * @method disableMonitorMode
     * Disable the monitor mode
     */
    TextEditor.prototype.disableMonitorMode = function () {
        this.settings.monitorMode = false;
        $(this.editor.container).removeClass('ace-debugging');
        this.removeAllHighlightLines();
        this.editor.getSession().clearBreakpoints();
        if (this.isEnabled()) {
            this.enableInteraction();
        } else {
            this.disableInteraction(true);
        }
    };

    /**
     * @method enableMonitorMode
     * Enable the monitor mode
     */
    TextEditor.prototype.enableMonitorMode = function () {
        this.settings.monitorMode = true;
        $(this.editor.container).addClass('ace-debugging');
        this.disableInteraction(!this.isEnabled(), false);
    };

    /**
     * @method setBreakPointList
     * Sets the list of all breakpoints 
     * @param {Array} breakpoints
     */
    TextEditor.prototype.setBreakPointList = function (breakpoints) {
        if (breakpoints !== undefined) {
            this.editor.getSession().setBreakpoints(breakpoints);
        }
    };

    /**
     * @method clearBreakPointList
     * Clear breakpoint list
     */
    TextEditor.prototype.clearBreakPointList = function () {
        this.editor.getSession().clearBreakpoints();
    };

    /**
     * @method moveToLine
     * Sets the line to selected
     * @param {UInteger} line to mark as currentLine
     * @param {Boolean} endOfLine decides whether the cursor
     * should be displayed at the end of the line or at the begining
     */
    TextEditor.prototype.moveToLine = function (line, endOfLine) {
        var column = endOfLine ? Infinity : 0;
        this.editor.moveCursorTo(line, column);
        this.scrollToLine(line);
    };

    /**
     * @method scrollToLine
     * Scrolls to the line without moving the cursor
     * @param {UInteger} line to mark as line to scroll
     */
    TextEditor.prototype.scrollToLine = function (line) {
        if (!this.editor.isRowFullyVisible(line)) {
            this.editor.scrollToLine(line, false, true, function () { });
        }
    };

    /**
     * @method highlightLine
     * Highlight an specific line
     * @param {UInteger} line to be highlighted
     * @param {String} id of the line to be highlighted, it is also
     * used to define the class to be applied to this line
     * @param {Boolean} scrollTo indicates if the editor should 
     * also autoscroll into the highlighted line
     */
    TextEditor.prototype.highlightLine = function highlightLine(line, id, scrollTo) {
        var i = 0, lineAlreadyCreate = false;
        for (i = 0; i < this.settings.highlightedLines.length; i = i + 1) {
            if (this.settings.highlightedLines[i].id === id) {
                this.editor.session.removeMarker(this.settings.highlightedLines[i].marker.id);
                this.settings.highlightedLines[i].marker = this.editor.session.highlightLines(line, line, '', 0);
                lineAlreadyCreate = true;
                break;
            }
        }
        if (!lineAlreadyCreate) {
            var newLine = {
                id: id,
                marker: undefined
            };
            newLine.marker = this.editor.session.highlightLines(line, line, '', 0);
            this.settings.highlightedLines.push(newLine);
        }
        if (scrollTo) {
            this.scrollToLine(line);
        }
    };

    /**
     * @method removeAllHighlightLines
     * Remove all the highlight lines
     */
    TextEditor.prototype.removeAllHighlightLines = function removeAllHighlightLines() {
        var i = 0;
        for (i = 0; i < this.settings.highlightedLines.length; i = i + 1) {
            this.editor.session.removeMarker(this.settings.highlightedLines[i].marker.id);
        }
        this.settings.highlightedLines = [];
    };

    TextEditor.prototype.showTooltip = function (variableName, variableValue) {
        if (variableName.length === 0) return;
        var value;
        if (variableName && !variableValue) {
            value = 'No value available';
        } else if (variableName && variableValue) {
            value = 'value: ' + variableValue;
        }
        var annotation = { text: [variableName, value] };
        if (this.tooltipAnnotation === annotation) return;
        this.tooltipAnnotation = annotation.text.join('<br/>');

        this.tooltip.setHtml(this.tooltipAnnotation);
        this.tooltip.show();
        this.editor._signal('showGutterTooltip', this.tooltip);
        this.editor.on('mousewheel', this.hideTooltip);
    };

    TextEditor.prototype.getLine = function (row) {
        return this.editor.session.getLine(row);
    };

    TextEditor.prototype.getCursorInformation = function (e) {
        return this.editor.renderer.screenToTextCoordinates(e.clientX, e.clientY);
    };

    TextEditor.prototype.hideTooltip = function () {
        if (this.tooltipTimeout) this.tooltipTimeout = clearTimeout(this.tooltipTimeout);
        if (this.tooltipAnnotation) {
            this.tooltip.hide();
            this.tooltipAnnotation = null;
            this.editor._signal('hideGutterTooltip', this.tooltip);
            this.editor.removeEventListener('mousewheel', this.hideTooltip);
        }
    };

    TextEditor.prototype.moveTooltip = function (e) {
        var style = this.tooltip.getElement().style;
        style.left = (e.clientX + 10) + 'px';
        style.top = (e.clientY + 10) + 'px';
    };

    //Private
    function _mergeOption(config) {
        var configToMerge = config instanceof Object ? config : {};
        return {
            element: configToMerge.element,
            mode: Utils.isString(configToMerge.mode) ? configToMerge.mode : 'plain',
            theme: Utils.isString(configToMerge.theme) ? configToMerge.theme : 'brace',
            onModified: Utils.isFunction(configToMerge.onModified) ? configToMerge.onModified : function dummyOnModified() { },
            onToggleBreakPoint: Utils.isFunction(configToMerge.onToggleBreakPoint) ? configToMerge.onToggleBreakPoint : function () { },
            disabled: !!configToMerge.disabled,
            keyboard: Utils.isObject(configToMerge.Keyboard),
            showLineNumber: configToMerge.showLineNumber !== false,
            highlightGutter: configToMerge.highlightGutter !== false,
            enableBasicAutocompletion: (configToMerge.autocomplete === true),
            autocompletionList: (configToMerge.autocompletelist) ? configToMerge.autocompletelist : [],
            monitorMode: false,
            highlightedLines: []
        };
    }

    function CustomToolTip(parentNode) {
        Tooltip.Tooltip.call(this, parentNode);
    }

    return TextEditor;
});
