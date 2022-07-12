define([
    'brease/core/BaseWidget',
    'brease/events/BreaseEvent',
    'brease/decorators/LanguageDependency', 
    'brease/core/Types'
], function (
    SuperClass, BreaseEvent, languageDependency, Types
) {
    
    'use strict';

    /**
     * @class widgets.brease.TableItemWidget
     * @extends brease.core.BaseWidget
     * @iatMeta studio:visible
     * false
     */

    /**
     * @cfg {String} text=''
     * @iatStudioExposed
     * @iatCategory Appearance
     * @bindable
     * @localizable
     * Heading for table column.  
     */

    /**
     * @cfg {UInteger} rowHeight=0
     * @iatStudioExposed
     * @iatCategory Appearance
     * @groupRefId CellSize
     * @groupOrder 1
     * @bindable
     * Can individually override rowHeight of Table if !== 0 when TableItem is a row.  
     */

    /**
     * @cfg {UInteger} columnWidth=0
     * @iatStudioExposed
     * @iatCategory Appearance
     * @groupRefId CellSize
     * @groupOrder 2
     * @bindable
     * Can individually override columnWidth of Table if !== 0 when TableItem is a column.  
     */

    /**
     * @cfg {String} tooltip=''
     * @iatStudioExposed
     * @hide
     */

    /**
     * @method showTooltip
     * @hide
     */

    /**
     * @cfg {Integer} tabIndex=-1
     * @hide
     */

    /**
    * @method focus
    * @hide
    */
   
    /**
    * @event FocusIn
    * @hide
    */

    /**
    * @event FocusOut
    * @hide
    */

    var defaultSettings = {
            text: '',
            rowHeight: 0,
            columnWidth: 0,
            dataInitialized: false,
            fireDataInitEvent: false,
            order: undefined
        },

        WidgetClass = SuperClass.extend(function TableItemWidget() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseTableItemWidget');
        }

        SuperClass.prototype.init.call(this);

        var widget = this;
        this.tableReady = false;
        this.valueInitState = new $.Deferred();
        $.when(this.valueInitState.promise()).then(function successHandler() {
            widget.settings.dataInitialized = true;
            if (widget.settings.fireDataInitEvent) {
                widget.dispatchEvent(new CustomEvent('dataInitDone', { bubbles: true, cancelable: true }));
                widget.settings.fireDataInitEvent = false;
            }
 
            if (widget.valueUpdateAvailable) {
                widget.updateTableValues();
            }

            widget.updateTableConfig();
        });

        this.tableReady = false;
        
        _textInit(this);

        this.visibleUpdateAvailable = false;
        this.headerUpdateAvailable = false;
        this.itemSizeUpdateAvailable = false;
        this.initialTableReadyCall = false;
    };

    /**
     * @event Click
     * Fired when element is clicked on.
     * @iatStudioExposed
     * @param {String} origin id of widget that triggered this event
     * @param {String} horizontalPos horizontal position of click in pixel i.e '10px'
     * @param {String} verticalPos vertical position of click in pixel i.e '10px'
     * @eventComment
     */
    p._clickHandler = function (e, additionalArguments) {
        if (this.isDisabled || (this.table && this.table.isDisabled)) {
            this._disabledClickHandler(e, additionalArguments);
        } else {
            //The superclass clickhandler contains private functions which cannot be called from here
            SuperClass.prototype._clickHandler.apply(this, arguments);
        }
    };

    p._updateTable = function () {
        if (this.isDisabled || !this.tableReady) { return; }
        var event = this.createEvent('TableItemChanged', {});
        event.dispatch();
    };

    /**
     * @method setStyle
     */

    p.enableUpdateApplied = function () {
        this.enableUpdateAvailable = false;
    };

    /**
     * Triggered by the BaseWidget everytime the widget changes the visibility
     * state, unlike the setVisible which is only triggered by the action itself
     */
    p._visibleHandler = function () {
        SuperClass.prototype._visibleHandler.apply(this, arguments);
        this.visibleUpdateAvailable = true;
        if (this.isTableReady()) {
            // this.table._visibleUpdateAvailable(this.elem.id);
            brease.callWidget(this.tableId, '_visibleUpdateAvailable', this.elem.id);
        }
        //Needed for visibleChanged Event 
        //BaseWidget will add or remove "remove" class => has no effect, because tableItem is display:none

        if (this.isTableReady() && this.isVisible() && this.valueUpdateAvailable) {
            this.updateTableValues();
        }
    };

    p.visibleUpdateApplied = function () {
        this.visibleUpdateAvailable = false;
    };

    /**
     * @method submitChange
     * This method will update the backend when the inputHandler has manipulated a value 
     * of the Table. The same item that is updating a value will not be called by the
     * backend, thus we must keep track of these ourselves.
     */
    p.submitChange = function () {
        //Override
    };

    /**
    * @method setText
    * @iatStudioExposed
    * Sets text
    * @param {String} value
    * @paramMeta value:localizable=true
    */
    p.setText = function (value) {
        if (brease.language.isKey(value) === false) {
            this.updateText(value);
            this.removeTextKey();
        } else {
            this.setTextKey(brease.language.parseKey(value), true);
        }

        if (brease.config.editMode) {
            this._updateTable();
        }
    };

    /**
     * @method getText 
     * Returns text.
     * @return {String}
     */
    p.getText = function () {
        return this.settings.text;
    };

    /**
     * @method getHeaderText
     * Returns the current header text
     * @return {String}
     */
    p.getHeaderText = function () {
        return this.settings.text;
    };

    /**
     * @method updateText
     * Updates the settings object and DOM element
     */
    p.updateText = function (text) {
        if (text !== null) {
            this.settings.text = Types.parseValue(text, 'String');
            this.updateTableHeader(this.settings.text);

        }
        
    };

    /**
     * @method setTextKey
     * Sets textkey
     * @param {String} key The new textkey
     */
    p.setTextKey = function (key, invoke) {

        if (key !== undefined) {
            this.settings.textkey = key;
            this.setLangDependency(true);
            if (invoke === true) {
                this.updateText(brease.language.getTextByKey(this.settings.textkey));
            }
        }
    };

    /**
     * @method removeTextKey
     * remove the textkey
     */
    p.removeTextKey = function () {
        this.settings.textkey = null;
        this.setLangDependency(false);
    };

    /**
     * @method getTextKey
     * Returns textkey
     */
    p.getTextKey = function () {
        return this.settings.textkey;
    };

    /**
     * @method setRowHeight
     * @iatStudioExposed
     * Sets rowHeight
     * @param {Size} value
     */
    p.setRowHeight = function (value) {
        if (value !== undefined) {
            this.settings.rowHeight = value;
            this.itemSizeUpdateAvailable = true;
            if (this.isTableReady()) {
                if (brease.config.editMode) {
                    this.itemUpdate(value, this.settings.columnWidth);
                } else {
                    // this.table._itemSizeUpdateAvailable(this.elem.id, 'row');
                    brease.callWidget(this.tableId, '_itemSizeUpdateAvailable', this.elem.id, 'row');
                }
            }
        }
    };

    /**
     * @method getRowHeight 
     * Returns rowHeight.
     * @return {Size}
     */
    p.getRowHeight = function () {
        return this.settings.rowHeight;
    };

    /**
     * @method setColumnWidth
     * @iatStudioExposed
     * Sets columnWidth
     * @param {Size} value
     */
    p.setColumnWidth = function (value) {
        if (value !== undefined) {
            this.settings.columnWidth = value;
            this.itemSizeUpdateAvailable = true;
            if (this.isTableReady()) {
                if (brease.config.editMode) {
                    this.itemUpdate(this.settings.rowHeight, value);
                } else {
                    // this.table._itemSizeUpdateAvailable(this.elem.id, 'column');
                    brease.callWidget(this.tableId, '_itemSizeUpdateAvailable', this.elem.id, 'column');
                }
            }
        }
    };

    /**
     * @method getColumnWidth 
     * Returns columnWidth.
     * @return {Size}
     */
    p.getColumnWidth = function () {
        return this.settings.columnWidth;
    };

    p.itemSizeUpdateApplied = function () {
        this.itemSizeUpdateAvailable = false;
    };
    /**
     * @method updateTableHeader
     * Invoke drawing function for headers in the table
     */
    p.updateTableHeader = function (text) {
        if (this.isTableReady()) {
            this.headerUpdateAvailable = true;
            // this.table._headerUpdateAvailable(this.elem.id, this.getHeaderText());
            brease.callWidget(this.tableId, '_headerUpdateAvailable', this.elem.id, this.getHeaderText());
        } else {
            this.settings.text = text;
        }
    };

    p.headerUpdateApplied = function () {
        this.headerUpdateAvailable = false;
    };

    /**
     * @method updateOrderState 
     * Returns the ordering of the TableItemWidget.
     * @return {String}
     */ 
    p.updateOrderState = function () {
        if (this.order === undefined) {
            this.order = 'desc';
        } else if (this.order === 'desc') {
            this.order = 'asc';
        } else if (this.order === 'asc') {
            this.order = undefined;
        }
        return this.order;
    };

    p.headerUpdateApplied = function () {
        this.headerUpdateAvailable = false;
    };

    p.setTableReady = function (tableId, flag) {
        this.tableId = tableId;
        this.table = brease.callWidget(this.tableId, 'widget');
        this.settings.dataOrientation = brease.callWidget(this.tableId, 'getDataOrientation');
        this.initUpdateTableValues();
        this.tableReady = flag;
    };

    p.langChangeHandler = function () {
        if (this.settings.textkey) {
            this.updateText(brease.language.getTextByKey(this.settings.textkey));
        }
    };

    p.initUpdateTableValues = function () {
        if (!this.initialTableReadyCall) {
            this.updateTableValues();
        }
    };

    /**
     * @method getDataInitState
     * Returns data initialization state
     */
    p.getDataInitState = function () {

        if (!this.settings.dataInitialized) {
            this.settings.fireDataInitEvent = true;
        }
        return this.settings.dataInitialized;
    };
    
    p.valueUpdateApplied = function () {
        this.valueUpdateAvailable = false;
    };

    /**
     * @method getData
     * Returns data (Interface Table -> TableItem)
     */
    p.getData = function () {
        return this.settings.data;
    };

    p.getDataUpdateState = function () {
        var updateState = {};

        updateState.valueUpdateAvailable = this.valueUpdateAvailable;
        updateState.visibleUpdateAvailable = this.visibleUpdateAvailable;
        updateState.headerUpdateAvailable = this.headerUpdateAvailable;
        updateState.itemSizeUpdateAvailable = this.itemSizeUpdateAvailable;
        updateState.enableUpdateAvailable = this.enableUpdateAvailable;

        return updateState;
    };

    /**
     * @method updateTableValues
     * Invoke drawing function for cell values in the table
     */
    p.updateTableValues = function () {
        //Has to be called in derived widget
    };
    
    /**
     * @method updateTableConfig
     * method to be called when the table should re-aquire the table config as it might have
     * been updated.
     */
    p.updateTableConfig = function () {
        if (this.isTableReady()) {
            brease.callWidget(this.tableId, '_itemConfigUpdateAvailable', this.elem.id);
        }
    };

    p._enableHandler = function () {
        SuperClass.prototype._enableHandler.apply(this, arguments);
        this.enableUpdateAvailable = true;
        if (this.isTableReady()) {
            brease.callWidget(this.tableId, '_enableUpdateAvailable', this.elem.id);
        }
    };

    p.dispose = function () {
        this.valueInitState = null;
        this.enableUpdateAvailable = null;
        this.enableUpdateApplied = null;
        this.visibleUpdateAvailable = null;
        this.visibleUpdateApplied = null;
        this.headerUpdateAvailable = null;
        this.itemSizeUpdateAvailable = null;
        this.tableReady = null;
        this.tableId = null;
        this.table = null;
 
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    function _textInit(widget) {

        if (widget.settings.text !== undefined) {
            if (brease.language.isKey(widget.settings.text) === false) {
                widget.setText(widget.settings.text);
            } else {
                widget.setTextKey(brease.language.parseKey(widget.settings.text), true);
            }
        }
    }

    // override method called in BaseWidget.init
    p._initEditor = function () {
        var widget = this;
        require(['widgets/brease/TableItemWidget/libs/EditorHandles'], function (EditorHandles) {
            var editorHandles = new EditorHandles(widget);

            widget.el.addClass('flex-item');

            widget.getHandles = function () {
                return editorHandles.getHandles();
            };
            widget.designer.getSelectionDecoratables = function () {
                return editorHandles.getSelectionDecoratables();
            };
            widget.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_EDITOR_IF_READY, { bubbles: true }));
        });
    };

    /**
     * @method
     * A check whether the table is present and ready to be interacted with
     * @returns {Boolean}
     */
    p.isTableReady = function () {
        return this.tableReady; // && !!this.table;
    };
    
    /**
     * @method setDataOrientation
     * Sets dataOrientation
     * @param {brease.enum.Direction} dataOrientation
     */
    p.setDataOrientation = function (dataOrientation) {
        this.settings.dataOrientation = dataOrientation;
    };
    
    /* Editor Size change */
    p.itemUpdate = function (newRowSize, newColumnSize) {
        //this.setColumnWidth(newWidth);
        var event = new CustomEvent('ItemSizeChanged', { detail: { id: this.elem.id, newRowSize: newRowSize, newColumnSize: newColumnSize }, bubbles: true, cancelable: true });
        // console.log('New header width: ', newWidth);

        this.dispatchEvent(event);
    };

    p.updateEditor = function (newRowSize, newColumnSize) {
        if (!this.tableReady) return;
        var event = new CustomEvent('ItemSizeChanging', { detail: { id: this.elem.id, newRowSize: newRowSize, newColumnSize: newColumnSize }, bubbles: true, cancelable: true });
        // console.log('New header width: ', newWidth);

        this.dispatchEvent(event);
    };

    return languageDependency.decorate(WidgetClass, false);
});
