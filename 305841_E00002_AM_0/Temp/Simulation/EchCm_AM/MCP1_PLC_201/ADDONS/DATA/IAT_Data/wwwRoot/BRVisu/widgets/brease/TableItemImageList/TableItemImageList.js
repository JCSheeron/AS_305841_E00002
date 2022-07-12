define([
    'widgets/brease/TableItemWidget/TableItemWidget',
    'brease/events/BreaseEvent'
], function (
    SuperClass, BreaseEvent
) {

    'use strict';

    /**
     * @class widgets.brease.TableItemImageList
     * @extends widgets.brease.TableItemWidget
     * @iatMeta studio:visible
     * true

     * @iatMeta category:Category
     * Data,Container
     * @iatMeta description:short
     * Provides an image list for the Table widget
     * @iatMeta description:de
     * Stellt dem Table Widget eine Liste an Bildern zur Verfuegung
     * @iatMeta description:en
     * Provides an image list for the Table widget
     */

    /**
     * @property {WidgetList} parents=["widgets.brease.Table"]
     * @inheritdoc  
     */

    /**
     * @cfg {DirectoryPath} imagePrefix=''
     * @iatStudioExposed
     * @iatCategory Appearance
     * Path to the images directory.
     */

    /**
     * @cfg {GraphicCollection} imageList (required)
     * @bindable
     * @iatStudioExposed
     * @iatCategory Appearance
     * List of image names located in the image path. (e.g. ['image1.png','image2.png']).
     * The array position defines the index for the image.
     */

    /**
     * @cfg {NumberArray1D} selectedIndex
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * @not_projectable
     * Define the image to be shown in one cell (Index of imageList).
     * Given as array of Integers.
     * The array size defines the number of cells.
     */

    /**
     * @cfg {Integer} selectedImageIndex=0
     * @bindable
     * @iatStudioExposed
     * @not_projectable
     * @readonly
     * @iatCategory Data
     * Returns the image index by clicking on a row / column.
     * Returns -1 if no selection is made or new values arrived.
     */

    var defaultSettings = {
            imagePrefix: '',
            imageList: [],
            selectedIndex: [],
            data: [],
            dataInitialized: false,
            fireDataInitEvent: false,
            dataType: 'String',
            selectedImageIndex: -1
        },

        WidgetClass = SuperClass.extend(function TableItemImageList() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseTableItemImageList');
        }
        SuperClass.prototype.init.call(this);

        if (brease.config.editMode) {
            this.settings.mockImagePrefix = 'widgets/brease/TableItemImageList/assets/';
            this.settings.mockImageList = ['ConnectionFail.svg'];
            this.settings.mockSelectedIndex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.updateImageListEditor();
            this.el.zIndex(this.el.zIndex() + 1);
        }
        this.currentSelection = -1;
        var widget = this;
        this.el.one(BreaseEvent.WIDGET_READY, function () {
            if (widget.settings.selectedIndex.length !== 0) {
                if (brease.config.editMode) {
                    widget.updateImageListEditor();
                } else {
                    widget.settings.data = widget._buildImageList(widget.settings.imagePrefix, widget.settings.imageList, widget.settings.selectedIndex);
                }
                widget.settings.fireDataInitEvent = true;
                widget.valueInitState.resolve();
            }
        });
    };

    p.updateImageListEditor = function () {
        var prefix, imList;
        if (this.settings.imageList[0] === '') {
            imList = this.settings.mockImageList;
        } else {
            if (this.settings.imagePrefix === '') {
                imList = this.settings.mockImageList;
            } else {
                imList = this.settings.imageList;
            }
        }

        if (this.settings.imagePrefix === '') {
            prefix = this.settings.mockImagePrefix;
        } else {
            if (this.settings.imageList[0] === '') {
                prefix = this.settings.mockImagePrefix;
            } else {
                prefix = this.settings.imagePrefix;
            }
        }

        for (var j = 0; j < 10; j += 1) {
            this.settings.mockSelectedIndex[j] = j % this.settings.imageList.length;
        }
        this.settings.selectedIndex = this.settings.mockSelectedIndex;
        this.settings.data = this._buildImageList(prefix, imList, this.settings.mockSelectedIndex);
    };

    /**
     * @method setImagePrefix
     * Sets imagePrefix
     * @param {DirectoryPath} imagePrefix
     */
    p.setImagePrefix = function (imagePrefix) {
        this.settings.imagePrefix = imagePrefix;
        
        if (brease.config.editMode) {
            this.updateImageListEditor();
            this._updateTable();
        }
    };

    /**
     * @method getImagePrefix 
     * Returns imagePrefix
     * @return {DirectoryPath}
     */
    p.getImagePrefix = function () {
        return this.settings.imagePrefix;
    };
    
    /**
     * @method setImageList
     * @iatStudioExposed
     * Sets imageList
     * @param {GraphicCollection} imageList
     */
    p.setImageList = function (imageList) {
        if (imageList !== null && imageList !== undefined) {
            this.settings.imageList = imageList;
            this.settings.data = this._buildImageList(this.settings.imagePrefix, this.settings.imageList, this.settings.selectedIndex);
            this.updateTableValues();
        } else {
            this.settings.imageList = [''];
        }

        if (brease.config.editMode) {
            this.updateImageListEditor();
            this._updateTable();
        }
    };

    /**
     * @method getImageList 
     * Returns imageList
     * @return {GraphicCollection}
     */
    p.getImageList = function () {
        return this.settings.imageList;
    };

    /**
     * @method setSelectedIndex
     * @iatStudioExposed
     * Sets selectedIndex
     * @param {NumberArray1D} selectedIndex
     */
    p.setSelectedIndex = function (selectedIndex) {
        
        if (selectedIndex !== undefined && selectedIndex !== null) {
            this.settings.selectedIndex = selectedIndex;
            this.settings.data = this._buildImageList(this.settings.imagePrefix, this.settings.imageList, this.settings.selectedIndex);
            this.updateTableValues();
            this._updateSelectedImageIndex(this.resetSelection());

            if (this.valueInitState.state() !== 'resolved') {
                this.valueInitState.resolve();
            }
        }

    };

    p.resetSelection = function () {
        this.currentSelection = -1;
        return this.currentSelection;
    };

    /**
     * @method getSelectedIndex 
     * Returns selectedIndex
     * @return {NumberArray1D}
     */
    p.getSelectedIndex = function () {
        return this.settings.selectedIndex;
    };

    /**
     * @method setSelectedImageIndex
     * Sets selectedImageIndex
     * @param {Integer} selectedImageIndex
     */
    p.setSelectedImageIndex = function (selectedImageIndex) {
        this.settings.selectedImageIndex = selectedImageIndex;
    };

    /**
     * @method getSelectedImageIndex 
     * Returns selectedImageIndex
     * @return {Integer}
     */
    p.getSelectedImageIndex = function () {
        return this.settings.selectedImageIndex;
    };

    /**
     * @method getItemConfig
     * Returns item config
     */
    p.getItemConfig = function () {
        var configObj = {};

        configObj.type = this.settings.dataType;
        configObj.input = false;
        configObj.inputConfig = {};
        configObj.inputConfig.inputStyle = 'default';
        configObj.inputConfig.validDataLength = 0;
        return configObj;
    };

    /**
     * @method updateTableValues
     * Invoke drawing function for cell values in the table
     */
    p.updateTableValues = function () {
        this.valueUpdateAvailable = true;
        if (this.settings.dataInitialized && this.isTableReady() && this.isVisible()) {
            this.initialTableReadyCall = true;
            // this.table._valueUpdateAvailable(this.elem.id);
            brease.callWidget(this.tableId, '_valueUpdateAvailable', this.elem.id);
        }
    };

    p._updateSelectedImageIndex = function (selection) {
        if (selection !== undefined && selection < this.settings.selectedIndex.length) {
            this.currentSelection = selection;
            /**
             * @event SelectedImageIndexChanged
             * @iatStudioExposed
             * Triggered when selectedImageIndex is changed (e.g. by click on a row with a different image)
             * @param {Integer} imageIndex
             */
            if (selection >= 0) {
                this.settings.selectedImageIndex = this.settings.selectedIndex[selection];
                
                var ev1 = this.createEvent('SelectedImageIndexChanged', { imageIndex: this.getSelectedImageIndex() });
                ev1.dispatch();

                this.sendValueChange({ selectedImageIndex: this.getSelectedImageIndex() });
            } else {

                var ev2 = this.createEvent('SelectedImageIndexChanged', { imageIndex: this.currentSelection });
                ev2.dispatch();

                this.sendValueChange({ selectedImageIndex: this.currentSelection });
            }
        }
    };

    /**
     * @method getItemType
     * This method will return the type of the widget. Necessary for the table 
     * to keep track of the newly added widgets in the editor
     * @returns {String} the type of the widget on the form widgets/brease/*
     */
    p.getItemType = function () {
        return 'widgets/brease/TableItemImageList';
    };

    p._buildImageList = function (imagePath, imageList, selectedIndex) {
        var data = [];
        
        // var h = (this.isTableReady()) ? this.table.getRowHeight() : 30;
        var h = (this.isTableReady()) ? brease.callWidget(this.tableId, 'getRowHeight') : 30;
        
        h = (this.settings.rowHeight !== 0) ? this.settings.rowHeight : h;

        $(selectedIndex).each(function (i) {
            if (imageList[selectedIndex[i]] !== undefined && imageList[selectedIndex[i]].length > 0) {
                data.push('<img src="' + imagePath + imageList[selectedIndex[i]] + '" style="max-width:100%; max-height:' + h + 'px;" /><span>' + imageList[selectedIndex[i]] + '</span>');
            } else {
                data.push('');
            }
        });
        return data;
    };

    return WidgetClass;
});
