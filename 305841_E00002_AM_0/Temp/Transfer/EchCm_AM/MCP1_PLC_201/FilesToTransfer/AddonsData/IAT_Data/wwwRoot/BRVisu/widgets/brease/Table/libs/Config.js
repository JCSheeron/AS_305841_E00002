define([
    'brease/enum/Enum'
], function (
    Enum
) {

    'use strict';   
    
    /**
     * @class widgets.brease.Table.libs.Config
     * @extends core.javascript.Object
     * @override widgets.brease.Table
     */
   
    /**
     * @cfg {UInteger} refreshRate=600
     * @iatStudioExposed
     * @iatCategory Behavior
     * Refresh rate of how often continuously updated variables are shown in the table.
     * Recommanded values for the T50:
     * 1000 cells: 1000 ms (with stopRefreshAtScroll = true)
     *  500 cells: 700 ms (with stopRefreshAtScroll = true)
     *  500 cells: 1000 ms (with stopRefreshAtScroll = false)
     * <250 cells: 400 ms (with stopRefreshAtScroll = true)
     */
   
    /**
     * @cfg {UInteger} initRefreshRate=0
     * @iatStudioExposed
     * @iatCategory Behavior
     * Refresh rate of the rebuild of the table, at init and changes for properties.
     * Needs to be increased the more items are used but also at the rate of which
     * properties are updated.
     */
   
    /**
     * @cfg {Boolean} stopRefreshAtScroll=false
     * @iatStudioExposed
     * @iatCategory Behavior
     * If set to true this parameter will stop the table from continuously updating the table while scrolling. This makes for a better
     * user experience, especially in the T50 and low end targets where it takes some time to reinstantiate all DOM elements - which
     * will interrupt the scrolling.
     */

    /**
     * @cfg {UInteger} headerSize=0
     * @iatStudioExposed
     * @iatCategory Appearance
     * Height of rows.  
     */
   
    /**
     * @cfg {Size} rowHeight=30
     * @iatStudioExposed
     * @iatCategory Appearance
     * @groupRefId CellSize
     * @groupOrder 1
     * Height of rows.  
     */

    /**
     * @cfg {Size} columnWidth=100
     * @iatStudioExposed
     * @iatCategory Appearance
     * @groupRefId CellSize
     * @groupOrder 2
     * Width of columns.  
     */

    /**
     * @cfg {brease.enum.Direction} dataOrientation='vertical'
     * @iatStudioExposed
     * @iatCategory Behavior
     * A dataset is either placed horizontally or vertically.  
     */

    /**
     * @cfg {Integer} offsetRow=0
     * @iatStudioExposed
     * @iatCategory Behavior
     * @bindable
     * @not_projectable
     * Index of first viewed row entry.  
     */

    /**
     * @cfg {Integer} offsetColumn=0
     * @iatStudioExposed
     * @iatCategory Behavior
     * @bindable
     * @not_projectable
     * Index of first viewed column entry.  
     */

    /**
     * @cfg {Integer} selectedRow=0
     * @iatStudioExposed
     * @iatCategory Data
     * @bindable
     * Index of selected row.  
     */

    /**
     * @cfg {Integer} selectedColumn=0
     * @iatStudioExposed
     * @iatCategory Data
     * @bindable
     * Index of selected column.  
     */

    /**
     * @cfg {Boolean} showScrollbars=true
     * @iatStudioExposed
     * @iatCategory Behavior
     * Show/Hide scrollbars  
     */

    /**
     * @cfg {Boolean} showHeader=true
     * @iatStudioExposed
     * @iatCategory Appearance
     * Show/Hide header  
     */

    /**
     * @cfg {Boolean} ellipsis=false
     * @iatStudioExposed
     * @iatCategory Behavior 
     * If true, overflow of text is symbolized with an ellipsis. This option has no effect, if wordWrap = true.
     */

    /**
     * @cfg {Boolean} useTableStyling=true
     * @iatStudioExposed
     * @iatCategory Appearance 
     * If false, styling can be set on the individual columns on their repsective TableItem/TableItemImageList.
     */

    /**
     * @cfg {Boolean} showSortingButton=false
     * @iatStudioExposed
     * @iatCategory Behavior
     * If true,  by clicking on a columns header will be availabe. The table will only sort on the 
     * currently selected header. The header can be sorted in descending order (one click), ascending order 
     * (one more click) or returned to normal state (one more click); given that you started in normal state.
     */

    /**
     * @cfg {Boolean} multiLine=false
     * @iatStudioExposed
     * @iatCategory Behavior
     * If true, more than one line is possible. Text will wrap when necessary (wordWrap=true) or at line breaks (\n). 
     * If false, text will never wrap to the next line. The text continues on the same line.  
     */

    /**
     * @cfg {Boolean} wordWrap=false
     * @iatStudioExposed
     * @iatCategory Behavior
     * If true, text will wrap when necessary. 
     */

    /**
     * @cfg {Boolean} selection=true
     * @iatStudioExposed
     * @iatCategory Behavior
     * If true, the user can select data entries. 
     */

    /**
     * @cfg {Integer} maxHeight=0
     * @iatStudioExposed
     * @iatCategory Appearance
     * Maximum height the Table can grow, when not set to zero
     */

    /**
     * @cfg {String} tableConfiguration=''
     * @iatStudioExposed
     * @iatCategory Data
     * @bindable
     * @not_projectable
     * Configuration for the visibility and/or disabling of table rows and columns.
     * Use it like: 
     * Visible:
     *    "{
     *    'specRows': [
     *        {'index':0,'visible': true},
     *        {'index':2,'visible': false},
     *        {'index':4,'visible': true}
     *                ],
     *    'specColumns':  [
     *       {'index':5, 'visible': true},
     *       {'index':8, 'visible': false},
     *       {'index':10,'visible': true}
     *       ]
     *   }"
     *
     * Disable:
     *    "{
     *    'specRows': [
     *        {'index':0,'disable': true},
     *        {'index':2,'disable': false},
     *        {'index':4,'disable': true}
     *                ],
     *    'specColumns':  [
     *       {'index':5, 'disable': true},
     *       {'index':8, 'disable': false},
     *       {'index':10,'disable': true}
     *      ]
     *   }"
     *  Both: 
     *    "{
     *   'specRows': [
     *        {'index':0,'visible': true, 'disable': true},
     *        {'index':2,'visible': true,'disable': false},
     *        {'index':4,'visible': false, 'disable': true}
     *       ],
     *    'specColumns':  [
     *       {'index':5, 'visible': true, 'disable': true},
     *       {'index':8, 'visible': true, 'disable': false},
     *       {'index':10,'visible': false, 'disable': true}
     *       ]
     *    }"
     */

    /**
     * @cfg {String} filterConfiguration=''
     * @iatStudioExposed
     * @iatCategory Data
     * @bindable
     * Configuration for filtering entires in the table
     */
    
    /**
     * @cfg {WidgetReference} scrollLinkYRefId=''
     * @iatStudioExposed
     * @iatCategory Behavior
     * @groupRefId ScrollSynchronization
     * Reference to a second Table widget that should be synchronized for vertical scrolling
     */
    
    /**
     * @cfg {WidgetReference} scrollLinkXRefId=''
     * @iatStudioExposed
     * @iatCategory Behavior
     * @groupRefId ScrollSynchronization
     * Reference to a second Table widget that should be synchronized for horizontal scrolling
     */
       
    /**
    * @cfg {Integer} busyIndicatorDelay=0
    * @iatStudioExposed
    * @iatCategory Behavior
    * delay time for busy indicator [ms]
    */

    return {
        editorFirst: true,
        refreshRate: 600,
        initRefreshRate: 0,
        stopRefreshAtScroll: false,
        width: 400,
        height: 300,
        maxHeight: 0,
        headerSize: 0,
        rowHeight: 30,
        columnWidth: 100,
        dataOrientation: Enum.Direction.vertical,
        order: '',
        permOrder: '',
        offsetRow: 0,
        offsetColumn: 0,
        selectedRow: 0,
        selectedColumn: 0,
        ellipsis: false,
        multiLine: false,
        wordWrap: false,
        selection: true,
        tableItemIds: [],
        /* eslint-disable no-multi-spaces */
        itemVisibility: [],                 //the actual tableItem's visibility states
        itemFinalVisibility: [],            //the combined value of the tableItem's visibility state and the tableconfiguration
        itemRowHeights: [],
        itemColumnWidths: [],
        itemStyling: [],
        itemConfigs: [],
        itemEnableStates: [],               //the actual tableItem's visibility states
        itemFinalEnableState: [],           //the combined value of the tableItem's enable state and the tableconfiguration
        /* eslint-enable no-multi-spaces */
        hiddenColumns: [],
        headerTexts: [],
        useTableStyling: true,
        showSortingButton: false,
        visibilityConfiguration: undefined,
        rendererOptions: {
            errorMode: 'throw',
            selectableItem: 'row',
            scroller: {
                scrollY: true,
                scrollX: true,
                bounce: false,
                momentum: true,
                scrollDuration: 100,
                pagingItemTolerance: 0.2,
                scrollbars: 'custom'
            },
            selectionCallbackFn: '_selectionCallback',
            scrollCallbackFn: '_scrollCallback',
            drawCallbackFn: '_drawCallback',
            rendererReadyCallbackFn: '_rendererReadyCallback',
            tableReadyCallbackFn: '_tableReadyCallback',
            headerClickCallbackFn: '_headerClickCallback'
        },
        editor: {
            first: true,
            added: 0,
            editorItemOrder: []
        },
        standalone: true, //WE need to update the table from the DB for certain functionality
        showScrollbars: true,
        showHeader: true,
        tableItemLengths: [],
        tableItemTypes: [],
        scrollLinkYRefId: '',
        scrollLinkXRefId: '',
        tableConfiguration: '[]',
        filterConfiguration: '',
        filter: [],
        cellVisibility: [],
        cellDisability: [],
        busyIndicatorDelay: 0
    };
});
