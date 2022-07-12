define([
    'brease/core/ContainerWidget',
    'brease/events/BreaseEvent',
    'brease/enum/Enum',
    'widgets/brease/Table/libs/Renderer',
    'widgets/brease/Table/libs/Model',
    'brease/core/Utils',
    'widgets/brease/Table/libs/Config',
    'widgets/brease/Table/libs/Dialogue',
    'widgets/brease/Table/libs/ConfigBuilder',
    'widgets/brease/common/BusyIndicatorHandler/libs/BusyIndicatorHandler',
    'brease/controller/libs/LogCode'
], function (
    SuperClass, BreaseEvent, Enum, Renderer, Model,
    Utils, TableConfig, TableDialogue, ConfigBuilder,
    BusyIndicatorHandler, LogCode
) {
    
    'use strict';

    /**
     * @class widgets.brease.Table
     * #Description
     * Widget to show data in a table 
     * @breaseNote 
     * @extends brease.core.ContainerWidget
     * @requires widgets.brease.BusyIndicator
     * @requires widgets.brease.TextInput
     * @requires widgets.brease.Label
     * @requires widgets.brease.NumericInput
     * @requires widgets.brease.CheckBox
     * @requires widgets.brease.DateTimeInput
     * @requires widgets.brease.Image
     * @requires widgets.brease.Rectangle
     * @requires widgets.brease.DropDownBox
     * @requires widgets.brease.GenericDialog
     * @iatMeta studio:isContainer
     * true
    
     * @iatMeta studio:license
     * licensed
     * @iatMeta category:Category
     * Data,Container
     * @iatMeta description:short
     * Darstellung von Daten in einer Tabelle
     * @iatMeta description:de
     * Darstellung von Daten in einer Tabelle
     * @iatMeta description:en
     * Displays data in a table
     */

    /**
     * @property {WidgetList} children=["widgets.brease.TableItem","widgets.brease.TableItemImageList","widgets.brease.TableItemDateTime"]
     * @inheritdoc  
     */

    var WidgetClass = SuperClass.extend(function Table() {
            SuperClass.apply(this, arguments);
        }, TableConfig),

        p = WidgetClass.prototype;
    p.init = function () {
        this.el.on(BreaseEvent.WIDGET_READY, this._bind('_widgetReadyHandler'));
            
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseTable container');
        }

        // this.internalData.timer = Date.now();
    
        if (!brease.config.editMode) {
            //We defer the widget ready event and call it first when all children are initialized
            //in the childrenInitializedHandler
            SuperClass.prototype.init.call(this, true);
        }
    
        this.settings.cellVisibility = [];
        this.settings.cellDisability = [];
        this.tableReadyRumble = false; 
        this.settings.tableEnableUpdated = false;
        this.settings.tableVisibleUpdated = false;

        if (brease.config.editMode === true) {
            this.widgetReady = new $.Deferred();
            this.tableReady = new $.Deferred();
    
            this._startInitialisation();
            this.addInitialClass('iatd-outline');
            SuperClass.prototype.init.call(this);
        }
    
        this.configBuilder = new ConfigBuilder(this);
        this.busyIndicatorHandler = new BusyIndicatorHandler(this);
        this.busyIndicatorHandler.createBusyIndicator();

        _scrollSynchronizationSetup(this);
    
        if (this.settings.dataOrientation === Enum.Direction.horizontal) {
            this.settings.rendererOptions.selectableItem = 'column';
        } else {
            this.settings.rendererOptions.selectableItem = 'row';
        }
        
        if (this.settings.dataOrientation === Enum.Direction.horizontal) {
            this.settings.headerBarSize = (this.settings.headerSize === 0) ? +this.settings.columnWidth : this.settings.headerSize;
        } else {
            this.settings.headerBarSize = (this.settings.headerSize === 0) ? +this.settings.rowHeight : this.settings.headerSize;
        }
            
        if (!this.settings.showScrollbars) {
            this.settings.rendererOptions.scroller.scrollbars = false;
        }
        this.initModel();
        this.initRenderer();
    
        if (!brease.config.editMode) {
            this.widgetReady = new $.Deferred();
            this.tableReady = new $.Deferred();
            if (Utils.isString(this.settings.tableConfiguration)) {
                this._parseTableConfiguration(this.settings.tableConfiguration);
            }
            this._startInitialisation();
            this.settings.filter = this.configBuilder.parseFilter(this.settings.filterConfiguration);
        }
    
    };

    p._initEditor = function () {
        var widget = this;
        require(['widgets/brease/Table/libs/EditorBehavior'], function (EditorBehavior) {
            widget.editorBehavior = new EditorBehavior(widget);
            widget.editorBehavior.initialize();
            widget.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_EDITOR_IF_READY, { bubbles: true }));
        });
    };

    p.initRenderer = function () {
        this.renderer = new Renderer(this, this.settings.rendererOptions);
    };
    p.initModel = function () {
        this.model = new Model(this);
    };

    p.widgetAddedHandler = function (e) {
        var children;
        if (this.settings.editor.first) {
            this.settings.editor.first = false;
            children = this.container.children('[data-brease-widget]');
        } else {
            children = this.container.children('.headerContainer').children('[data-brease-widget]');
            children.push(this.container.children('[data-brease-widget]')[0]);
        }

        for (var i = 0; i < children.length; i += 1) {
            this.settings.editor.editorItemOrder[i] = children[i].id;
            this.settings.tableItemIds[i] = children[i].id;
            this.settings.tableItemTypes[i] = $(children[i]).attr('data-brease-widget');
            if (this.tableReady) {
                brease.callWidget(children[i].id, 'setTableReady', this.elem.id, true);
            }
        }
        this.settings.editor.added += 1;

        //If all inital table items (and more) are initialized, we build the table 
        if (this.settings.editor.added >= this.settings.editor.editorItemOrder.length) {
            this.childrenInitializedInEditorHandler();
            this.editorBehavior.childrenAdded(e);
            
            $('#' + this.settings.tableItemIds[0]).parent().off('ItemSizeChanged', this._bind('updateChangeInEditor'));
            $('#' + this.settings.tableItemIds[0]).parent().on('ItemSizeChanged', this._bind('updateChangeInEditor'));
            $('#' + this.settings.tableItemIds[0]).parent().off('ItemSizeChanging', this._bind('updateTempSizeChangeEditor'));
            $('#' + this.settings.tableItemIds[0]).parent().on('ItemSizeChanging', this._bind('updateTempSizeChangeEditor'));
        }
        this.renderer.refreshScroller();
    };

    p.widgetRemovedHandler = function (e) {
        var index = this.settings.tableItemIds.indexOf(e.detail.widgetId);
        this.settings.tableItemIds.splice(index, 1);
        this.settings.tableItemTypes.splice(index, 1);
        this.settings.itemRowHeights.splice(index, 1);
        this.settings.itemColumnWidths.splice(index, 1);
        this.settings.itemVisibility.splice(index, 1);
        this.settings.itemEnableStates.splice(index, 1);
        this.settings.itemStyling.splice(index, 1);
        this.settings.itemConfigs.splice(index, 1);
        this.settings.headerTexts.splice(index, 1);
        this.settings.editor.editorItemOrder.splice(index, 1);
        this.settings.editor.added -= 1;
        this.model.removeData(index);

        //Get new data from the items left
        // this.childrenInitializedInEditorHandler();
        this.editorBehavior.childrenRemoved(index);
        this.renderer.refreshScroller();
    };  

    /**
     * @method
     * This function will update the entire table, it should be called by a TableItem
     * when the drag and drop handle is release, and release only.
     */
    p.updateChangeInEditor = function () {
        //this.renderer.updateEditor();
        this._showBusyIndicator();
        this.settings.editorFirst = true;
        this.childrenInitializedInEditorHandler();
        this.editorBehavior.childrenUpdated();
        this.renderer.refreshScroller();
    };

    /**
     * @method
     * This function is called by a TableItem while the widget is being repositioned,
     * as it will only update the entire width|height of the table and the corresponding
     * item being moved. This is a short cut to not burden the integrated browser with
     * redrawing the entire table every 300 ms or so which would make it slow.
     */
    p.updateTempSizeChangeEditor = function (e) {
        var index = this.settings.tableItemIds.indexOf(e.detail.id), totalSize = 0;

        var newSize = (this.settings.dataOrientation === Enum.Direction.vertical) ? e.detail.newColumnSize : e.detail.newRowSize;

        for (var i = 0; i < this.settings.tableItemIds.length; i += 1) {
            if (i !== index) {
                var interimSize = 0;
                if (this.settings.dataOrientation === Enum.Direction.vertical) {
                    interimSize = (this.settings.itemColumnWidths[i] !== 0) ? this.settings.itemColumnWidths[i] : this.settings.columnWidth;
                } else {
                    interimSize = (this.settings.itemRowHeights[i] !== 0) ? this.settings.itemRowHeights[i] : this.settings.rowHeight;
                }
                totalSize += parseInt(interimSize);
            } else {
                totalSize += parseInt(newSize);
            }
        }

        console.warn('We are updating', e.detail.id, newSize, totalSize);
        
        if (this.settings.dataOrientation === Enum.Direction.vertical) {
            this.elem.getElementsByTagName('table')[0].style.width = totalSize + 'px';
            this.elem.getElementsByClassName('headerContainer')[0].style.width = totalSize + 'px';
            this.elem.getElementsByTagName('col')[index].style.width = newSize + 'px';
            this.elem.getElementsByClassName('headerElement')[index].style.width = newSize + 'px';
        } else {
            this.elem.getElementsByClassName('headerContainer')[0].style.height = totalSize + 'px';
            this.elem.getElementsByTagName('tr')[index].style.height = newSize + 'px';
            this.elem.getElementsByClassName('headerElement')[index].style.height = newSize + 'px';
        }
    };

    /**
     * @method setStyle
     * This function sets the style of the widget by calling the superclass
     * and then processing this in the widget.
     * @iatStudioExposed
     * @param {StyleReference} value
     */
    p.setStyle = function (value) {
        SuperClass.prototype.setStyle.call(this, value);
        if (this.renderer) {
            this.renderer.processStyleChange();
        }
    };

    /**
     * @method
     * This method takes data and decides wether it should redraw the entire
     * table or just update the rows and DataTable model. An update is much
     * faster and cost effective however can only be done if data is the only
     * changing parameter. If anything else is changed the table has to be 
     * redrawn for the purpose of the underlaying model.
     */
    p.setTableData = function (init) {
        this.renderer.setFilter();
        if (init || !this.renderer.tableReady) {
            this.renderer.updateTable();        
        } else {
            this.renderer.updateTableDataOnly();
        }
    };

    /**
     * @method
     * Updates the data of a given row
     * @param {Object} data
     * @param {Integer} rowIndex
     */
    p.setRowData = function (data, rowIndex) {
        this.model.setDataItem(data, rowIndex);
        this.setTableData();
        // this.renderer.updateRow(data, rowIndex);
    };

    /**
     * @method
     * Updates the data of a given column
     * @param {Object} data
     * @param {Integer} columnIndex
     */
    p.setColumnData = function (data, columnIndex) {
        this.model.setDataItem(data, columnIndex);
        this.setTableData();
        // this.renderer.updateColumn(data, columnIndex);
    };

    /**
     * @method setRefreshRate
     * Sets refreshRate
     * @param {Integer} refreshRate
     */
    p.setRefreshRate = function (refreshRate) {
        this.settings.refreshRate = refreshRate;
    };

    /**
     * @method getRefreshRate 
     * Returns refreshRate
     * @return {Integer}
     */
    p.getRefreshRate = function () {
        return this.settings.refreshRate;
    };
    
    /**
     * @method setInitRefreshRate
     * Sets refreshRate
     * @param {Integer} initRefreshRate
     */
    p.setInitRefreshRate = function (initRefreshRate) {
        this.settings.initRefreshRate = initRefreshRate;
    };

    /**
     * @method getInitRefreshRate 
     * Returns refreshRate
     * @return {Integer}
     */
    p.getInitRefreshRate = function () {
        return this.settings.initRefreshRate;
    };

    /**
     * @method setStopRefreshAtScroll
     * Sets stopRefreshAtScroll
     * @param {Boolean} stopRefreshAtScroll
     */
    p.setStopRefreshAtScroll = function (stopRefreshAtScroll) {
        this.settings.stopRefreshAtScroll = stopRefreshAtScroll;
    };

    /**
     * @method getStopRefreshAtScroll 
     * Returns stopRefreshAtScroll
     * @return {Integer}
     */
    p.getStopRefreshAtScroll = function () {
        return this.settings.stopRefreshAtScroll;
    };

    /**
     * @method setRowHeight
     * Sets rowHeight
     * @param {Size} rowHeight
     */
    p.setRowHeight = function (rowHeight) {
        this.settings.rowHeight = rowHeight;
        this.settings.headerBarSize = (this.settings.headerSize === 0) ? (this.settings.dataOrientation === Enum.Direction.vertical) ? +this.settings.rowHeight : +this.settings.columnWidth : this.settings.headerSize;
        
        if (brease.config.editMode) {
            this.updateChangeInEditor();
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
     * Sets columnWidth
     * @param {Size} columnWidth
     */
    p.setColumnWidth = function (columnWidth) {
        this.settings.columnWidth = columnWidth;
        this.settings.headerBarSize = (this.settings.headerSize === 0) ? (this.settings.dataOrientation === Enum.Direction.vertical) ? +this.settings.rowHeight : +this.settings.columnWidth : this.settings.headerSize;

        if (brease.config.editMode) {
            this.updateChangeInEditor();
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

    /**
     * @method setDataOrientation
     * Sets dataOrientation
     * @param {brease.enum.Direction} dataOrientation
     */
    p.setDataOrientation = function (dataOrientation) {
        this.settings.dataOrientation = dataOrientation;

        if (dataOrientation === Enum.Direction.vertical) {
            this.el.find('.container').removeClass('horizontal').addClass('vertical');
            this.settings.rendererOptions.selectableItem = 'row';
            this.settings.headerBarSize = (this.settings.headerSize === 0) ? +this.settings.rowHeight : this.settings.headerSize;
        } else {
            this.el.find('.container').removeClass('vertical').addClass('horizontal');
            this.settings.rendererOptions.selectableItem = 'column';
            this.settings.headerBarSize = (this.settings.headerSize === 0) ? +this.settings.columnWidth : this.settings.headerSize;
        }

        if (brease.config.editMode) {
            for (var i = 0; i < this.settings.tableItemIds.length; i += 1) {
                brease.callWidget(this.settings.tableItemIds[i], 'setDataOrientation', dataOrientation);
            }
            this.updateChangeInEditor();
        }
    };

    /**
     * @method getDataOrientation 
     * Returns dataOrientation.
     * @return {brease.enum.Direction}
     */
    p.getDataOrientation = function () {
        return this.settings.dataOrientation;
    };

    /**
     * @method setOffsetRow
     * Sets offsetRow
     * @param {Integer} offsetRow
     */
    p.setOffsetRow = function (offsetRow) {
        this.settings.offsetRow = offsetRow;
        if (this.renderer.tableReady) {
            var rows = this.model.getTableDataBoundaries(this.renderer.displayedColumns).rows;
            if (offsetRow > rows - 1) {
                this.renderer.scrollHandler.calcScrollItemOffset();
                return;
            }
            this.offsetRowDeferID = _.defer(function (widget) {
                widget.omitScrollPositionSubmit = true;
                widget.renderer.scrollHandler.scrollToIndex(widget.settings.offsetRow, widget.settings.offsetColumn);
                if (widget.offsetColumnDeferID !== undefined) {
                    window.clearTimeout(widget.offsetColumnDeferID);
                } 
            }, this);
        }
    };

    /**
     * @method getOffsetRow 
     * Returns offsetRow.
     * @return {Integer}
     */
    p.getOffsetRow = function () {
        return this.settings.offsetRow;
    };

    /**
     * @method setOffsetColumn
     * Sets offsetColumn
     * @param {Integer} offsetColumn
     */
    p.setOffsetColumn = function (offsetColumn) {
        this.settings.offsetColumn = offsetColumn;
        if (this.renderer.tableReady) {
            var columns = this.model.getTableDataBoundaries(this.renderer.displayedColumns).columns;
            if (offsetColumn > columns - 1) {
                this.renderer.scrollHandler.calcScrollItemOffset();
                return;
            }
            this.offsetColumnDeferID = _.defer(function (widget) {
                widget.omitScrollPositionSubmit = true;
                widget.renderer.scrollHandler.scrollToIndex(widget.settings.offsetRow, widget.settings.offsetColumn);
                if (widget.offsetRowDeferID !== undefined) {
                    window.clearTimeout(widget.offsetRowDeferID);
                }
            }, this);
        }
    };

    /**
     * @method getOffsetColumn 
     * Returns offsetColumn.
     * @return {Integer}
     */
    p.getOffsetColumn = function () {
        return this.settings.offsetColumn;
    };

    /**
     * @method setSelectedRow
     * @iatStudioExposed
     * Sets selectedRow
     * @param {Integer} value
     */
    p.setSelectedRow = function (value) {
        // value = this.model.getActualRowIndex(value);
        this.settings.selectedRow = value;
        if (this.renderer.tableReady && this.settings.dataOrientation === 'vertical') {
            this.renderer.selectItem('row', value, true);
        }
    };

    /**
     * @method getSelectedRow
     * Returns selectedRow.
     * @return {Integer}
     */
    p.getSelectedRow = function () {
        return this.settings.selectedRow;
    };

    /**
     * @method setSelectedColumn
     * @iatStudioExposed
     * Sets selectedColumn
     * @param {Integer} value
     */
    p.setSelectedColumn = function (value) {
        this.settings.selectedColumn = value;
        if (this.renderer.tableReady && this.settings.dataOrientation === 'horizontal') {
            this.renderer.selectItem('column', value, true);
        }
    };

    /**
     * @method getSelectedColumn 
     * Returns selectedColumn.
     * @return {Integer}
     */
    p.getSelectedColumn = function () {
        return this.settings.selectedColumn;
    };

    /**
     * @method setTableConfiguration
     * Sets the tableConfiguration
     * @param {String} tableConfiguration
     */
    p.setTableConfiguration = function (tableConfiguration) {
        if (Utils.isObject(tableConfiguration)) {
            this.settings.tableConfiguration = tableConfiguration;
        } else if (Utils.isString(tableConfiguration)) {
            this._parseTableConfiguration(tableConfiguration);
            this._showBusyIndicator();
            this._updateTable();
        }
    };

    p._parseTableConfiguration = function (tc) {
        if (tc.length === 0) this.settings.tableConfiguration = [];
        try {
            this.settings.tableConfiguration = JSON.parse(tc.replace(/'/g, '"'));
        } catch (error) {
            this.settings.tableConfiguration = '';
            console.iatWarn(this.elem.id + ': TableConfiguration string "' + tc + '" is invalid!');
            this._createLogEntry(tc, 'tableConfiguration');
        }
    };

    /**
     * @method getTableConfiguration
     * Returns the tableConfiguration
     * @return {String} tableConfiguration
     */
    p.getTableConfiguration = function () {
        return this.settings.tableConfiguration;
    };

    /**
     * @method setFilterConfiguration
     * Returns the filterConfiguration
     * @param {String} filterConfiguration
     */
    p.setFilterConfiguration = function (filterConfiguration) {
        this.renderer.resetFilterReportFlag();
        this.settings.filterConfiguration = filterConfiguration;
        this.settings.filter = this.configBuilder.parseFilter(filterConfiguration);
        this._updateTable();
    };

    /**
     * @method getFilterConfiguration
     * Returns the filterConfiguration
     * @return {String} filterConfiguration
     */
    p.getFilterConfiguration = function () {
        return this.settings.filterConfiguration;
    };

    /**
     * @method setEllipsis
     * Sets ellipsis
     * @param {Boolean} ellipsis
     */
    p.setEllipsis = function (ellipsis) {
        this.settings.ellipsis = ellipsis;
        if (brease.config.editMode) {
            this.updateChangeInEditor();
        }
    };

    /**
     * @method getEllipsis 
     * Returns ellipsis.
     * @return {Boolean}
     */
    p.getEllipsis = function () {
        return this.settings.ellipsis;
    };

    /**
     * @method setUseTableStyling
     * Sets useTableStyling
     * @param {Boolean} useTableStyling
     */
    p.setUseTableStyling = function (useTableStyling) {
        this.settings.useTableStyling = useTableStyling;
        if (brease.config.editMode) {
            this.updateChangeInEditor();
        }
    };

    /**
     * @method getUseTableStyling 
     * Returns useTableStyling.
     * @return {Boolean}
     */
    p.getUseTableStyling = function () {
        return this.settings.useTableStyling;
    };

    /**
     * @method setShowSortingButton
     * Sets showSortingButton
     * @param {Boolean} showSortingButton
     */
    p.setShowSortingButton = function (showSortingButton) {
        this.settings.showSortingButton = showSortingButton;
        if (brease.config.editMode) {
            this.updateChangeInEditor();
        }
    };

    /**
     * @method getShowSortingButton 
     * Returns showSortingButton.
     * @return {Boolean}
     */
    p.getShowSortingButton = function () {
        return this.settings.showSortingButton;
    };

    /**
     * @method setMultiLine
     * Sets multiLine
     * @param {Boolean} multiLine
     */
    p.setMultiLine = function (multiLine) {
        this.settings.multiLine = multiLine;
        if (brease.config.editMode) {
            this.updateChangeInEditor();
        }
    };

    /**
     * @method getMultiLine 
     * Returns multiLine.
     * @return {Boolean}
     */
    p.getMultiLine = function () {
        return this.settings.multiLine;
    };
    
    /**
     * @method setHeaderSize
     * Sets headerSize
     * @param {UInteger} headerSize
     */
    p.setHeaderSize = function (headerSize) {
        this.settings.headerSize = headerSize;
        this.settings.headerBarSize = (headerSize === 0) ? (this.settings.dataOrientation === Enum.Direction.vertical) ? +this.settings.rowHeight : +this.settings.columnWidth : headerSize;
        if (brease.config.editMode) {
            this.updateChangeInEditor();
        }
    };

    /**
     * @method getHeaderSize 
     * Returns headerSize.
     * @return {UInteger}
     */
    p.getHeaderSize = function () {
        return this.settings.headerSize;
    };

    /**
     * @method setWordWrap
     * Sets wordWrap
     * @param {Boolean} wordWrap
     */
    p.setWordWrap = function (wordWrap) {
        this.settings.wordWrap = wordWrap;
        if (brease.config.editMode) {
            this.updateChangeInEditor();
        }
    };

    /**
     * @method getWordWrap 
     * Returns wordWrap.
     * @return {Boolean}
     */
    p.getWordWrap = function () {
        return this.settings.wordWrap;
    };

    /**
      * @method setSelection
      * Sets selection.
      * @param {Boolean} selection
      */
    p.setSelection = function (selection) {
        this.settings.selection = selection;
        if (brease.config.editMode) {
            this.updateChangeInEditor();
        }
    };

    /**
     * @method getSelection 
     * Returns selection.
     * @return {Boolean}
     */
    p.getSelection = function () {
        return this.settings.selection;
    };

    /**
     * @method setShowScrollbars
     * Sets showScrollbars
     * @param {Boolean} showScrollbars
     */
    p.setShowScrollbars = function (showScrollbars) {
        this.settings.showScrollbars = showScrollbars;
        this.settings.rendererOptions.scroller.scrollbars = showScrollbars;

        if (brease.config.editMode) {
            this.updateChangeInEditor();
        }
    };

    /**
     * @method getShowScrollbars 
     * Returns showScrollbars.
     * @return {Boolean}
     */
    p.getShowScrollbars = function () {
        return this.settings.showScrollbars;
    };

    /**
     * @method setShowHeader
     * Sets showHeader
     * @param {Boolean} showHeader
     */
    p.setShowHeader = function (showHeader) {
        this.settings.showHeader = showHeader;
        if (brease.config.editMode) {
            this.updateChangeInEditor();
        }
    };

    /**
     * @method getShowHeader 
     * Returns showHeader.
     * @return {Boolean}
     */
    p.getShowHeader = function () {
        return this.settings.showHeader;
    };

    /**
     * @method setMaxHeight
     * Sets maxHeight
     * @param {Integer} maxHeight
     */
    p.setMaxHeight = function (maxHeight) {
        this.settings.maxHeight = maxHeight;
    };

    /**
     * @method getMaxHeight 
     * Returns maxHeight.
     * @return {Integer}
     */
    p.getMaxHeight = function () {
        return this.settings.maxHeight;
    };

    /**
     * @method setScrollLinkYRefId
     * Sets scrollLinkYRefId
     * @param {String} scrollLinkYRefId
     */
    p.setScrollLinkYRefId = function (scrollLinkYRefId) {
        this.settings.scrollLinkYRefId = scrollLinkYRefId;

        if (brease.config.editMode) {
            this.updateChangeInEditor();
        }
    };

    /**
     * @method getScrollLinkYRefId
     * Returns scrollLinkYRefId.
     * @return {String}
     */
    p.getScrollLinkYRefId = function () {
        return this.settings.scrollLinkYRefId;

    };

    /**
     * @method setScrollLinkXRefId
     * Sets scrollLinkXRefId
     * @param {String} scrollLinkXRefId
     */
    p.setScrollLinkXRefId = function (scrollLinkXRefId) {
        this.settings.scrollLinkXRefId = scrollLinkXRefId;
        
        if (brease.config.editMode) {
            this.updateChangeInEditor();
        }
    };

    /**
     * @method getScrollLinkXRefId
     * Returns scrollLinkXRefId.
     * @return {String}
     */
    p.getScrollLinkXRefId = function () {
        return this.settings.scrollLinkXRefId;
    };

    /**
    * @method setBusyIndicatorDelay
    * Sets busyIndicatorDelay
    * @param {Integer} busyIndicatorDelay
    */
    p.setBusyIndicatorDelay = function (busyIndicatorDelay) {
        this.settings.busyIndicatorDelay = busyIndicatorDelay;
    };

    /**
    * @method getBusyIndicatorDelay
    * Returns busyIndicatorDelay
    * @param {Integer} busyIndicatorDelay
    */
    p.getBusyIndicatorDelay = function () {
        return this.settings.busyIndicatorDelay;
    };

    /**
     * @method scrollToHorizontal
     * @iatStudioExposed
     * Scroll to horizontal column
     * @param {UInteger} value
     */
    p.scrollToHorizontal = function (value) {
        if (this.renderer.tableReady) {
            var columns = this.model.getTableDataBoundaries(this.renderer.displayedColumns).columns;
            if (value !== undefined && value >= 0 && value < columns) {
                this.renderer.scrollHandler.scrollToIndex(-1, value);
            }
        }
    };

    /**
     * @method scrollToVertical
     * @iatStudioExposed
     * Scroll to vertical row
     * @param {UInteger} value
     */
    p.scrollToVertical = function (value) {
        if (this.renderer.tableReady) {
            var rows = this.model.getTableDataBoundaries(this.renderer.displayedColumns).rows;
            if (value !== undefined && value >= 0 && value < rows) {
                this.renderer.scrollHandler.scrollToIndex(value, -1);
            }
        }
    };

    /**
     * @method scrollPageDown
     * @iatStudioExposed
     * Scroll one page down
     */
    p.scrollPageDown = function () {
        if (this.renderer.tableReady) {
            this.renderer.scrollHandler.scrollPageDown();
        }
    };

    /**
     * @method scrollPageUp
     * @iatStudioExposed
     * Scroll one page up
     */
    p.scrollPageUp = function () {
        if (this.renderer.tableReady) {
            this.renderer.scrollHandler.scrollPageUp();
        }
    };

    /**
     * @method scrollPageLeft
     * @iatStudioExposed
     * Scroll one page left
     */
    p.scrollPageLeft = function () {
        if (this.renderer.tableReady) {
            this.renderer.scrollHandler.scrollPageLeft();
        }
    };

    /**
     * @method scrollPageRight
     * @iatStudioExposed
     * Scroll one page right
     */
    p.scrollPageRight = function () {
        if (this.renderer.tableReady) {
            this.renderer.scrollHandler.scrollPageRight();
        }
    };

    /**
     * @method scrollStepDown
     * @iatStudioExposed
     * Scroll one step down
     */
    p.scrollStepDown = function () {
        if (this.renderer.tableReady) {
            this.renderer.scrollHandler.scrollItemDown();
        }
    };

    /**
     * @method scrollStepUp
     * @iatStudioExposed
     * Scroll one step up
     */
    p.scrollStepUp = function () {
        if (this.renderer.tableReady) {
            this.renderer.scrollHandler.scrollItemUp();
        }
    };

    /**
     * @method scrollStepRight
     * @iatStudioExposed
     * Scroll one step right
     */
    p.scrollStepRight = function () {
        if (this.renderer) {
            this.renderer.scrollHandler.scrollItemRight();
        }
    };

    /**
     * @method scrollStepLeft
     * @iatStudioExposed
     * Scroll one step left
     */
    p.scrollStepLeft = function () {
        if (this.renderer.tableReady) {
            this.renderer.scrollHandler.scrollItemLeft();
        }
    };

    /**
     * @method setVerticalScroll
     * Scroll vertical to position
     * @param {Integer} position
     * Position in Y Direction
     * @param {String} origin
     * Original event widget ID
     */
    p.setVerticalScroll = function (position, redirectedBy) {
        if (this.settings.dataOrientation === Enum.Direction.vertical) {
            this.renderer.scrollHandler.scrollTo(position, 'Y', false);
        } else {
            this.renderer.scrollHandler.scrollTo(position, 'Y', true);
        }

        if (this.settings.scrollLinkYRefId !== undefined) {
            if (redirectedBy.indexOf(this.elem.id) === -1 && redirectedBy.indexOf(this.settings.scrollLinkYRefId) === -1) {
                redirectedBy.push(this.elem.id);
                brease.callWidget(this.settings.scrollLinkYRefId, 'setVerticalScroll', position, redirectedBy);
            } else {
                return false;
            }
        }
    };

    /**
     * @method setHorizontalScroll
     * Scroll horizontal to position
     * @param {Integer} position
     * Position in X Direction
     * @param {String} origin
     * Original event widget ID
     */
    p.setHorizontalScroll = function (position, redirectedBy) {
        if (this.settings.dataOrientation === Enum.Direction.vertical) {
            this.renderer.scrollHandler.scrollTo(position, 'X', true);
        } else {
            this.renderer.scrollHandler.scrollTo(position, 'X', false);
        }

        if (this.settings.scrollLinkXRefId !== undefined) {
            if (redirectedBy.indexOf(this.elem.id) === -1 && redirectedBy.indexOf(this.settings.scrollLinkXRefId) === -1) {
                redirectedBy.push(this.elem.id);
                brease.callWidget(this.settings.scrollLinkXRefId, 'setHorizontalScroll', position, redirectedBy);
            } else {
                return false;
            }
        }
    };

    /**
     * @method setRowVisibility
     * @iatStudioExposed
     * Set the visibility for a certain row.
     * @param {Integer} index
     * @param {Boolean} visible
     */
    p.setRowVisibility = function (index, visible) {
        _adjustTableConfiguration(this, 'row', index, visible);
        this._updateTable();
        this.submitTableConfiguration();
    };

    /**
     * @method setColumnVisibility
     * @iatStudioExposed
     * Set the visibility for a certain column.
     * @param {Integer} index
     * @param {Boolean} visible
     */
    p.setColumnVisibility = function (index, visible) {
        _adjustTableConfiguration(this, 'column', index, visible);
        this._updateTable();
        this.submitTableConfiguration();
    };

    /**
     * @method openConfiguration
     * Open the filter part of the configuration dialogue
     * @iatStudioExposed
     * @param {TableConfigurationType} type (Supported types: Filtering)
     */
    p.openConfiguration = function (type) {
        if (this.isDisabled) { return; }
        
        if (type === 'Filtering') {
            this.configDialogue = new TableDialogue(this);
            this.configDialogue.openFilter();
        // } else if (type === 'Configuration'){
        //     this.configDialogue = new TableDialogue(this);
        //     this.configDialogue.openConfig();
        } else {
            console.iatWarn('Unsupported configuration type!');
        }
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
    p._clickHandler = function (e) {
        this.renderer._itemSelectHandler(e);
        SuperClass.prototype._clickHandler.apply(this, arguments);
    };

    //-----------------------------------------------------------------
    p._startInitialisation = function () {
        var widget = this;
        this.winit = true;

        $.when(this.widgetReady.promise(), this.tableReady.promise()).then(function successHandler() {
            // widget.internalData.timer = Date.now() - widget.internalData.timer;
            // console.log('%c' + widget.elem.id + ': TableReady event dispatched. Upstart time: ' + widget.internalData.timer, 'color:red');

            if (Array.isArray(widget.settings.tableItemIds)) {
                widget.settings.tableItemIds.forEach(function (tableItemId) {
                    // Notify all TableItems to be ready
                    brease.callWidget(tableItemId, 'setTableReady', widget.elem.id, true);
                });
            }
        });

        // $.when(this.widgetReady.promise(), this.tableReady.promise()).then(function successHandler() {
        this.tableReady.then(function successHandler() {
            //Dispatch an event telling the Table is finished
            var ev = widget.createEvent('TableReady', {});
            ev.dispatch();
            if (!brease.config.preLoadingState) {
                widget._startTable();
            }
        });

        if (brease.config.editMode && this.settings.tableItemIds.length === 0) {
            return false;
        }

        this._childInitializationProgress();
    };

    p._widgetReadyHandler = function (e) {
        if (e.target.id === this.elem.id) {
            this.widgetReady.resolve();
        }
    };

    p._startTable = function () {
        this.tableReadyRumble = true;
        _fetchTableConfig(this, this.settings.tableItemIds);
        this.renderer.setInitData();
        this._showBusyIndicator();
        this.dataInitialization();
    };

    p._tableReadyCallback = function () {
        this.omitScrollPositionSubmit = false;
        var tableDataInfo = this.model.getTableDataBoundaries(this.renderer.displayedColumns);
        if ((this.settings.offsetColumn <= tableDataInfo.columns - 1) && (this.settings.offsetRow <= tableDataInfo.rows - 1)) {
            if ((this.settings.offsetColumn !== 0) && (this.settings.offsetRow !== 0)) {
                this.renderer.scrollHandler.scrollToIndex(this.settings.offsetRow, this.settings.offsetColumn);
            } else if ((this.settings.offsetColumn !== 0) && (this.settings.offsetRow === 0)) {
                this.renderer.scrollHandler.scrollToIndex(-1, this.settings.offsetColumn);
            } else if ((this.settings.offsetColumn === 0) && (this.settings.offsetRow !== 0)) {
                this.renderer.scrollHandler.scrollToIndex(this.settings.offsetRow, -1);
            }
        } else {
            this.renderer.scrollHandler.calcScrollItemOffset();
        }
        this.resolveTable();
    };

    p._rendererReadyCallback = function () {
        // this._dispatchReady();
    };

    /**
     * @method
     * We use this method to resolve the table. There are two scenarios in which we might need to resolve
     * the table status, it's if we either received the data necessary or if we didnt. In either case
     * we must resolve the table so that new data sent from the backend can propagate to the table
     */
    p.resolveTable = function () {
        // if (this.tableReady.state() !== 'resolved') {
        //     this.tableReady.resolve();
        // }
        if (this.widgetReady.state() !== 'resolved') {
            this._dispatchReady();
        }

        this.sizeChanged();
    };

    /**
     * @method
     * If the Table is placed inside a GroupBox and the TableConfig updates then we need to update
     * the GroupBox with information that the MaxHeight might need to be recalculated!
     * Call this in the callback of the reBuildCallback function of the Renderer and nowhere else!
     */
    p.sizeChanged = function () {
        var sizeChangedEv = this.createEvent('SizeChanged');
        /**
         * @event sizeChanged
         * Fired when the size of the widget changes
         */
        sizeChangedEv.dispatch();
    };

    p._selectionCallback = function (selection) {
        if (selection.rowIndex !== undefined) {
            this.settings.selectedRow = selection.rowIndex;
            this.sendValueChange({ selectedRow: selection.rowIndex });
        }
        if (selection.columnIndex !== undefined) {
            this.settings.selectedColumn = selection.columnIndex;
            this.sendValueChange({ selectedColumn: selection.columnIndex });
        }
        if (selection.rowIndex !== undefined && selection.columnIndex !== undefined) {
            if (this.settings.dataOrientation === Enum.Direction.vertical) {
                _updateImageIndex(this, selection.rowIndex);
            } else {
                _updateImageIndex(this, selection.columnIndex);
            }
        }

        if (this.settings.dataOrientation === Enum.Direction.vertical) {
            this._forwardClickEvent(selection.event, selection.columnIndex);
        } else {
            this._forwardClickEvent(selection.event, selection.rowIndex);
        }
    };

    p._drawCallback = function () {
        if (this.settings.tableItemIds.length > 0) {
            this._hideBusyIndicator();
        }
    };

    p._scrollCallback = function (scrollItemOffset) {

        this.settings.offsetRow = scrollItemOffset.row;
        this.settings.offsetColumn = scrollItemOffset.column;
        if (this.omitScrollPositionSubmit === false) {
            this.submitScrollOffset();
        } else {
            this.omitScrollPositionSubmit = false;
        }

    };

    p._headerClickCallback = function (e, indexOfChild) {
        this._forwardClickEvent(e, indexOfChild);
    };

    p._valueUpdateAvailable = function (tableItemId) {
        var redrawTable = false;
        var tableItemIndex = this.settings.tableItemIds.indexOf(tableItemId),
            data = this._getDataFromItem(tableItemId);

        var largestPrev = Math.max.apply(Math, this.settings.tableItemLengths);
        this.settings.tableItemLengths[tableItemIndex] = data.length;
        var largest = Math.max.apply(Math, this.settings.tableItemLengths);

        if (largestPrev !== largest) {
            redrawTable = true;
        } else {
            redrawTable = false;
        }

        //redraw is for stopping continuous updates of the table! Do not remove. If a filter has been set, then the table MUST redraw to update the internal model
        if ((redrawTable && this.winit === false) || 
            (this.winit === false && this.settings.filterConfiguration.length > 3) || 
            (this.winit === false && this.settings.showSortingButton)) {
            _fetchTableConfig(this, this.settings.tableItemIds);
            this._getData(this.settings.tableItemIds, tableItemIndex);
            this.setTableData(false);
        } else {
            brease.uiController.callWidget(tableItemId, 'valueUpdateApplied');
            if (this.settings.dataOrientation === Enum.Direction.horizontal) {
                this.setRowData(data, tableItemIndex);
            } else if (this.settings.dataOrientation === Enum.Direction.vertical) {
                this.setColumnData(data, tableItemIndex);
            }
        }
    };

    p._headerUpdateAvailable = function (tableItemId) {
        var tableItemIndex = this.settings.tableItemIds.indexOf(tableItemId),
            text = brease.uiController.callWidget(tableItemId, 'getHeaderText');

        brease.uiController.callWidget(tableItemId, 'headerUpdateApplied');
        this._showBusyIndicator();
        this.settings.headerTexts[tableItemIndex] = text;
        this.renderer.updateTexts();
    };

    // method introduced with CS 415941 (A&P 700095)
    // method removed with CS 426740 (A&P 713775) but called by TableItemWidget
    // CS 426740: method likely removed by mistake --> adding this back
    p._itemConfigUpdateAvailable = function (tableItemId) {
        if (typeof tableItemId !== 'string') {
            tableItemId = tableItemId.target.id;
        }
        if (brease.config.editMode) { return; }
        _fetchTableConfig(this, this.settings.tableItemIds);
    };

    p._itemSizeUpdateAvailable = function (tableItemId, type, origin) {
        var tableItemIndex = this.settings.tableItemIds.indexOf(tableItemId),
            size = 0;
        if (type === 'column') {
            size = brease.uiController.callWidget(tableItemId, 'getColumnWidth');
            brease.uiController.callWidget(tableItemId, 'itemSizeUpdateApplied');

            //We don't want to update table in editor if size is the same as this messes up the scrollbars
            //if (brease.config.editMode && this.settings.itemColumnWidths[tableItemIndex] === size) { return;}
            this.settings.itemColumnWidths[tableItemIndex] = size;
            this.renderer.updateColumnWidths();
        } else if (type === 'row') {
            size = brease.uiController.callWidget(tableItemId, 'getRowHeight');
            brease.uiController.callWidget(tableItemId, 'itemSizeUpdateApplied');
            this.settings.itemRowHeights[tableItemIndex] = size;
            this.renderer.updateRowHeights();
        }
        if (origin !== 'table') {
            this._updateTable();
        }
    };

    p._visibleUpdateAvailable = function (tableItemId) {
        if (typeof tableItemId !== 'string') {
            tableItemId = tableItemId.target.id;
        }
        if (brease.config.editMode) { return; }
        this.renderer.closeInputWidgets(tableItemId);
        this._visibleEnableAvailableHandler(tableItemId, 'isVisible', 'visibleUpdateApplied', 'itemVisibility', this.settings.tableVisibleUpdated);
    };

    p._enableUpdateAvailable = function (tableItemId) {
        this.renderer.closeInputWidgets(tableItemId);
        this._visibleEnableAvailableHandler(tableItemId, 'isEnabled', 'enableUpdateApplied', 'itemEnableStates', this.settings.tableEnableUpdated);
    };

    p._visibleEnableAvailableHandler = function (tableItemId, itemFunction, itemFunctionApplied, itemSettingState, tableUpdated) {
        this._showBusyIndicator();

        var tableItemIndex = this.settings.tableItemIds.indexOf(tableItemId),
            state = brease.uiController.callWidget(tableItemId, itemFunction);
        
        brease.uiController.callWidget(tableItemId, itemFunctionApplied);
        this.settings[itemSettingState][tableItemIndex] = state;

        if (!tableUpdated) {
            this._updateTable();
        }
    };

    p._formatUpdateAvailable = function (tableItemId) {
        var tableItemIndex = this.settings.tableItemIds.indexOf(tableItemId),
            format = brease.uiController.callWidget(tableItemId, 'getFormat');
        this.settings.itemConfigs[tableItemIndex].inputConfig.format = format;
    };

    p._forwardClickEvent = function (e, indexOfChild) {
        var id = _evaluateClickedChild(this, indexOfChild);
        brease.callWidget(id, '_clickHandler', e, { origin: id });
    };

    p.getInternalOrderState = function (indexOfChild) {
        return brease.callWidget(_evaluateClickedChild(this, indexOfChild), 'updateOrderState');
    };

    p.submitScrollOffset = function () {
        if (this.isDisabled === true) { return false; }
        this.sendValueChange({ offsetRow: this.settings.offsetRow });
        this.sendValueChange({ offsetColumn: this.settings.offsetColumn });
    };

    p.submitUserInput = function (itemIndex, data) {
        var tableItemId = this.settings.tableItemIds[itemIndex];

        brease.callWidget(tableItemId, 'submitChange', data);
        /**
         * @event ValueChanged
         * @iatStudioExposed
         * Triggered when any value in the table is changed
         */
        var ev = this.createEvent('ValueChanged', {});
        ev.dispatch();

        this.setTableData();
    };

    p.submitTableConfiguration = function () {
        this.sendValueChange({ tableConfiguration: JSON.stringify(this.getTableConfiguration()).replace(/"/g, '\'') });
    };

    p.submitFilterConfiguration = function () {
        this.settings.filterConfiguration = this.configBuilder.serializeFilter(this.settings.filter);
        this.sendValueChange({ filterConfiguration: this.settings.filterConfiguration });
    };

    p._childInitializationProgress = function () {
        _initChildren(this);
    };

    p.childrenInitializedHandler = function () {
        
        var widget = this;
        this.container.children('.breaseWidget').each(function () {
            if (this.tagName !== 'TABLE') {
                widget.settings.tableItemIds.push($(this).attr('id'));
                widget.settings.tableItemTypes.push($(this).attr('data-brease-widget'));
            }
        });

        // The dispatchReady event must be deferred so that the framework has
        // a chance to store the widget in it's list.
        // this._defer('_dispatchReady');
        if (!brease.config.preLoadingState) {
            if (this.tableReady.state() !== 'resolved') {
                this.tableReady.resolve();
            }
        } else {
            this.widgetReady.resolve();
            this._dispatchReady();
        }
    };

    p.childrenInitializedInEditorHandler = function () {
        this.renderer.setInitData();
        this._showBusyIndicator();

        this.dataInitDone(this.settings.editorFirst);
        this.settings.editorFirst = false;
    };

    p.dataInitialization = function () {
        var self = this,
            dataInitStates = [];

        for (var i = 0; i < this.settings.tableItemIds.length; i += 1) {
            dataInitStates[i] = new $.Deferred();
            dataInitStates[i].promise();
        }

        $.when.apply($, dataInitStates).then(function () {
            self.el.off('dataInitDone');
            self.dataInitDone();
            //Reference the scroller to the this.scroller object -> Triggered by the ContainerWidget
            self.scroller = self.renderer.scrollHandler.scrollerBody;
        });

        if (Array.isArray(this.settings.tableItemIds)) {
            this.settings.tableItemIds.forEach(function (tableItemId, index) {
                if (brease.callWidget(tableItemId, 'getDataInitState')) {
                    dataInitStates[index].resolve();
                } else {
                    self.el.one('dataInitDone', function (e) {
                        var tableItemTarget = e.target.id;
                        e.stopImmediatePropagation();
                        dataInitStates[_.indexOf(self.settings.tableItemIds, tableItemTarget)].resolve();
                    });
                }
            });
        }
    };

    p.dataUpdateData = function () {
        _fetchTableConfig(this, this.settings.tableItemIds);
        this._getData(this.settings.tableItemIds, undefined);
        this.setTableData(false);
    };

    p.dataInitDone = function (init) {
        init = (init === undefined) ? true : init;

        _fetchTableConfig(this, this.settings.tableItemIds);
        this._getData(this.settings.tableItemIds, undefined);
        this.winit = false;
        this.setTableData(init);
    };

    p.disable = function () {
        SuperClass.prototype.disable.apply(this, arguments);
        if (this.renderer) {
            this.renderer.disable();
        }
    };

    p.enable = function () {
        SuperClass.prototype.enable.apply(this, arguments);
        if (this.renderer) {
            this.renderer.enable();
        }
    };

    p._enableHandler = function (enableState) {
        this.settings.tableEnableUpdated = true;
        if (enableState === false) {
            this.renderer.closeInputWidgets();
        }
        SuperClass.prototype._enableHandler.apply(this, arguments);
    };

    p._visibleHandler = function () {
        this.settings.tableVisibleUpdated = true;
        SuperClass.prototype._visibleHandler.apply(this, arguments);
    };

    p.updateVisibility = function () {
        SuperClass.prototype.updateVisibility.apply(this, arguments);
        if (this.renderer) {
            this.renderer.setVisible();
        }
    };

    /**
     * @method
     * This function will either get data from all items associated with this Table
     * instance or it will get the data from the TableItem specified by the index.
     * This function will afterwards pass it on to the model to process it.
     * @param {String[]} tableItemIds 
     * @param {Integer} index 
     */
    p._getData = function (tableItemIds, index) {
        var dataset = [];
        if (tableItemIds.length !== 0) {
            if (index === undefined) {
                var widget = this;
                if (Array.isArray(tableItemIds)) {
                    tableItemIds.forEach(function (tableItemId) {
                        var tmp = widget._getDataFromItem(tableItemId);
                        dataset.push(tmp);
                    });
                }
                this.model.setData(dataset);
            } else {
                dataset = this._getDataFromItem(tableItemIds[index]);
                this.model.setDataItem(dataset, index);
            }
        }

    };

    /**
     * This method will call the TableItemWidget and get the data and at the same
     * time reset the semaphore in the widget so that it wont tell the Table that
     * there is newly available data when there isnt.
     * @param {String} tableItemId 
     * @returns {Integer[]|String[]}
     */
    p._getDataFromItem = function (tableItemId) {
        var data = brease.callWidget(tableItemId, 'getData');
        brease.uiController.callWidget(tableItemId, 'valueUpdateApplied');
        return data;
    };

    /**
     * @method
     * This method updates the renderer if the tableReady state is
     * resolved
     */
    p._updateTable = function () {
        if (!this.tableReadyRumble) return;
        this.renderer.updateTable();
    };

    p._showBusyIndicator = function () {
        this.busyIndicatorHandler.showBusyIndicator();
    };

    p._hideBusyIndicator = function () {
        this.busyIndicatorHandler.hideBusyIndicator();
    };

    p._scrollXYHandler = function (e) {
        e.stopImmediatePropagation();
        var redirectedBy = [this.elem.id];

        if (this.settings.scrollLinkYRefId !== undefined && this.settings.scrollLinkXRefId !== undefined) {
            brease.callWidget(this.settings.scrollLinkYRefId, 'setVerticalScroll', e.detail, redirectedBy);
            brease.callWidget(this.settings.scrollLinkXRefId, 'setHorizontalScroll', e.detail, redirectedBy);
        } else if (this.settings.scrollLinkYRefId !== undefined) {
            brease.callWidget(this.settings.scrollLinkYRefId, 'setVerticalScroll', e.detail, redirectedBy);
        } else if (this.settings.scrollLinkXRefId !== undefined) {
            brease.callWidget(this.settings.scrollLinkXRefId, 'setHorizontalScroll', e.detail, redirectedBy);
        }
    };

    p.dispose = function () {
        if (!brease.config.editMode) {
            window.clearTimeout(this.offsetRowDeferID);
            window.clearTimeout(this.offsetColumnDeferID);
        }
        this.elem.removeEventListener('ScrollXY', this._bind('_scrollXYHandler'));
        this.renderer.dispose();
        this.busyIndicatorHandler.dispose();
        SuperClass.prototype.dispose.apply(this, arguments);
    };
    
    p.suspend = function () {
        this.renderer.suspend();
        SuperClass.prototype.suspend.apply(this, arguments);
    };

    p.wake = function () {
        this.renderer.wake();
        SuperClass.prototype.wake.apply(this, arguments);
        if (this.internalData.preLoaded) {
            this.internalData.preLoaded = false;
            this.tableReady.resolve();
        }
    };
    /* **********INTERFACE FOR DATABASE***********/
    p.placedInDatabase = function () {
        this.settings.standalone = false;
    };

    p.sliceDatabaseData = function () {
        this.model.shortenData();
    };
    p.purgeDatabaseData = function () {
        this.model.resetData();
    };

    /* **********Private Methods***********/

    function _initChildren(widget) {
        var itemDefs = [];

        widget.el.find('[data-brease-widget]').each(function () {
            var children = this,
                id = children.id,
                d = $.Deferred();

            itemDefs.push(d);

            if (brease.uiController.getWidgetState(id) === Enum.WidgetState.READY) {
                d.resolve();
            } else {
                children.addEventListener(BreaseEvent.WIDGET_READY, function () {
                    d.resolve();
                });
            }
        });

        $.when.apply($, itemDefs).done(function () {
            widget.childrenInitializedHandler();
        });
    }

    function _fetchTableConfig(widget, tableItemIds) {
        widget.settings.itemVisibility = [];
        widget.settings.itemColumnWidths = [];
        widget.settings.itemRowHeights = [];
        widget.settings.headerTexts = [];
        widget.settings.itemConfigs = [];
        widget.settings.itemEnableStates = [];
        widget.settings.itemStyling = [];

        if (Array.isArray(tableItemIds)) {
            tableItemIds.forEach(function (tableItemId) {
                widget.settings.itemVisibility.push(brease.callWidget(tableItemId, 'isVisible'));
                brease.uiController.callWidget(tableItemId, 'visibleUpdateApplied');
                widget.settings.itemColumnWidths.push(brease.callWidget(tableItemId, 'getColumnWidth'));
                widget.settings.itemRowHeights.push(brease.callWidget(tableItemId, 'getRowHeight'));
                brease.uiController.callWidget(tableItemId, 'itemSizeUpdateApplied');
                widget.settings.headerTexts.push(brease.callWidget(tableItemId, 'getHeaderText'));
                brease.uiController.callWidget(tableItemId, 'headerUpdateApplied');
                widget.settings.itemConfigs.push(brease.callWidget(tableItemId, 'getItemConfig'));
                widget.settings.itemEnableStates.push(brease.callWidget(tableItemId, 'isEnabled'));
                brease.uiController.callWidget(tableItemId, 'enableUpdateApplied');
                widget.settings.itemStyling.push(brease.callWidget(tableItemId, 'getStyle'));
            }); 
        }
    }

    function _adjustTableConfiguration(widget, type, accordingIndex, visibility) {
        var elementToAccess = 'spec' + type.charAt(0).toUpperCase() + type.slice(1) + 's',
            found = false;

        if (widget.settings.tableConfiguration !== undefined && Utils.isObject(widget.settings.tableConfiguration)) {
            if (Array.isArray(widget.settings.tableConfiguration[elementToAccess])) {
                for (var i = 0; i < widget.settings.tableConfiguration[elementToAccess].length; i += 1) {
                    if (widget.settings.tableConfiguration[elementToAccess][i].index === accordingIndex) {
                        widget.settings.tableConfiguration[elementToAccess][i].visible = visibility;
                        found = true;
                    }
                }
                if (!found) {
                    widget.settings.tableConfiguration[elementToAccess].push({ index: accordingIndex, visible: visibility });
                }
            } else {
                widget.settings.tableConfiguration[elementToAccess] = [];
                widget.settings.tableConfiguration[elementToAccess].push({ index: accordingIndex, visible: visibility });
            }
        } else {
            widget.settings.tableConfiguration = { specRows: [], specColumns: [] };
            widget.settings.tableConfiguration[elementToAccess].push({ index: accordingIndex, visible: visibility });
        }
    }

    function _updateImageIndex(widget, selection) {

        if (Array.isArray(widget.settings.tableItemTypes)) {
            widget.settings.tableItemTypes.forEach(function (tableItemType, index) {
                if (tableItemType.includes('TableItemImageList')) {
                    brease.callWidget(widget.settings.tableItemIds[index], '_updateSelectedImageIndex', selection);
                }
            });
        }
    }

    function _evaluateClickedChild(widget, index) {
        return widget.settings.tableItemIds[index]; //Returns the ID of the corresponding child
    }

    function _scrollSynchronizationSetup(widget) {
        if (widget.settings.scrollLinkYRefId.length === 0) {
            widget.settings.scrollLinkYRefId = undefined;
        }

        if (widget.settings.scrollLinkXRefId.length === 0) {
            widget.settings.scrollLinkXRefId = undefined;
        }
        widget.elem.addEventListener('ScrollXY', widget._bind('_scrollXYHandler'));
    }
    
    /**
     * @method
     * This method will create a logger entry in the backend if something goes wrong.
     * @param {Number|String|Boolean} logValue the value that is incorrect
     * @param {String} logProperty the property that is failing
     */
    p._createLogEntry = function (logValue, logProperty) {
        var logArgs = ['Table', this.elem.id, logValue, logProperty];
        //create log entry
        var log = LogCode.getConfig(LogCode.CLIENT_INVALID_PROPERTY_VALUE);
        brease.loggerService.log(log.code, Enum.EventLoggerCustomer.BUR, log.verboseLevel, log.severity, logArgs);
    };

    return WidgetClass;
});
