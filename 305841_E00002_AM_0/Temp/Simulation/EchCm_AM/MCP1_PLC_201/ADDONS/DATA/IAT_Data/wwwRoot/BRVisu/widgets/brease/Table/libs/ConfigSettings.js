define([
    'brease/core/Class',
    'brease/core/Utils',
    'brease/events/BreaseEvent',
    'widgets/brease/GenericDialog/libs/models/dialogWidgetModel',
    'widgets/brease/Table/libs/DialogueTexts'
], function (
    SuperClass, Utils, BreaseEvent, 
    DialogWidgetModel, Texts
) {
    'use strict';

    var ConfigClass = SuperClass.extend(function ConfigSettings(dialog, widget, lang) {
            this.lang = lang;
            this.dialog = dialog;
            this.widget = widget;
            this.currRow = 0;

            SuperClass.call(this);
        }, null),

        p = ConfigClass.prototype;

    p.initialize = function () {
        this.config = {};
        this.config.rows = [];
        this.config.children = {
            delete_this_row: 0,
            dir: 1,
            enable: 2,
            visible: 3,
            add_next_row: 4,
            rect_separator: 5,
            from: 6,
            to: 7,
            
            left: {
                delete_this_row: 50,
                dir: 100,
                add_next_row: 10,
                from: 220,
                to: 275,
                visible: 380,
                disabled: 480
            }
        };
        this.config.loc = {
            offset: 0,
            widgetHeight: 30,
            widgetOffset: 12,
            logicalOperatorHeight: 20,
            currSeparatorTopOffset: 110,
            filterlogicalTopOffset: 100

        };
        this.config.loc.rowHeight = this.config.loc.widgetHeight + 3 * this.config.loc.widgetOffset;

        this._initializeEmptyDialogConfig();

        if (this.widget.settings.tableConfiguration.specRows !== undefined || this.widget.settings.tableConfiguration.specColumns !== undefined) {
            this._differentitateBetweenStoredTypes();
        }
        return this.config;
    };

    p._getCurrSeparatorTop = function (row) {
        return this.config.loc.currSeparatorTopOffset + (row * this.config.loc.rowHeight) + this.config.loc.offset;
    };
    p._getCurrFilterLogicalTop = function (row) {
        return this.config.loc.filterlogicalTopOffset + ((row - 1) * this.config.loc.rowHeight) + this.config.loc.offset;
    };

    p._getCurrTop = function (row) {
        return 60 + (row * (this.config.loc.rowHeight)) + this.config.loc.offset;
    };

    p._getOneRowOffset = function (currTop) {
        return currTop + this.config.loc.rowHeight;
    };
    
    p._addRow = function () {
        var row = this._createRow(this.currRow, 0, {});      
        
        for (var i = 0; i < row.length; i += 1) {
            if (i !== this.config.children.logic_op_next_row || this.currRow !== 0) {
                this.dialog.addWidget(row[i]);
            }
        }
        
        $('#' + row[this.config.children.dir].id).on(BreaseEvent.WIDGET_READY, this._bind('_updateRowHandler'));
        $('#' + row[this.config.children.add_next_row].id).on(BreaseEvent.CLICK, this._bind('_addRowHandler'));
        $('#' + row[this.config.children.delete_this_row].id).on(BreaseEvent.CLICK, this._bind('_removeRow'));
                
        this.config.rows.push({ widgets: row });

        this.currRow += 1;
    };

    p._insertRow = function (clickedRow) {

        //Create a new row with positional value where this one is
        var row = this._createRow(clickedRow, 0, {});
        
        //Move all the widgets to their new respective positions
        this._moveRow(clickedRow, false);
        
        //Instatiate new row
        for (var i = 0; i < row.length; i += 1) {
            if (i !== this.config.children.logic_op_next_row || clickedRow !== 0) {
                this.dialog.addWidget(row[i]);
            }
        }

        //Add event handlers to new row
        $('#' + row[this.config.children.dir].id).on(BreaseEvent.WIDGET_READY, this._bind('_updateRowHandler'));
        $('#' + row[this.config.children.add_next_row].id).on(BreaseEvent.CLICK, this._bind('_addRowHandler'));
        $('#' + row[this.config.children.delete_this_row].id).on(BreaseEvent.CLICK, this._bind('_removeRow'));

        //splice new row into position in row configuration
        this.config.rows.splice(clickedRow, 0, { widgets: row });
        
        //Increase currRow by one
        this.currRow += 1;
    };

    p._updateRowHandler = function (e) {
        var addedRow = this._getCurrentRow(e.delegateTarget.id, this.config.children.dir);
        if (addedRow === undefined) { return; }
        
        this._reColourNewObject(addedRow);

        $('#' + this.config.rows[addedRow].widgets[this.config.children.dir].id).off(BreaseEvent.WIDGET_READY, this._bind('_updateRowHandler'));
        $('#' + this.config.rows[addedRow].widgets[this.config.children.dir].id).on('SelectedIndexChanged', this._bind('_updateRow'));
    };

    p._updateRow = function (e) {
        var currRow = this._getCurrentRow(e.delegateTarget.id, this.config.children.dir);

        if (currRow === undefined) { return; }

        var currTop = this._getCurrTop(currRow);

        if (this.config.rows[currRow].widgets[this.config.children.to]) {
            this.dialog.removeWidget(this.config.rows[currRow].widgets[this.config.children.to]);
            this.dialog.removeWidget(this.config.rows[currRow].widgets[this.config.children.from]);
            this.config.rows[currRow].widgets.pop();
            this.config.rows[currRow].widgets.pop();
        }
        var row = this._addRange(currTop, {}, e.detail.selectedValue);
        for (var i = 0; i < row.length; i += 1) {
            this.dialog.addWidget(row[i]);
        }
        this.config.rows[currRow].widgets = this.config.rows[currRow].widgets.concat(row);
    };

    p._addRowHandler = function (e) {
        //In preparation for insertion of row
        var clickedRow = this._getCurrentRow(e.delegateTarget.id, this.config.children.add_next_row);
        if (clickedRow === this.currRow) {
            this._addRow();
        } else {
            this._insertRow(clickedRow);
        }
    };

    p._removeRow = function (e) {
        var clickedRow = this._getCurrentRow(e.delegateTarget.id, this.config.children.delete_this_row);
        if (this.config.rows[clickedRow].widgets[this.config.children.delete_this_row].id === e.delegateTarget.id) {
            e.stopPropagation();
            $('#' + this.config.rows[clickedRow].widgets[this.config.children.delete_this_row].id).off(BreaseEvent.CLICK, this._bind('_removeRow'));
            $('#' + this.config.rows[clickedRow].widgets[this.config.children.dir].id).off('SelectedIndexChanged', this._bind('_updateRow'));
            $('#' + this.config.rows[clickedRow].widgets[this.config.children.add_next_row].id).off(BreaseEvent.CLICK, this._bind('_addRowHandler'));

            for (var i = 0; i < this.config.rows[clickedRow].widgets.length - 1; i += 1) {
                this.dialog.removeWidget(this.config.rows[clickedRow].widgets[i + 1]);
            }
            
            //Finally set a timer to remove the Delete Image with a timer so that the 
            //event can dispatch first before removing widget
            var self = this;
            setTimeout(function () { 
                self.dialog.removeWidget(self.config.rows[clickedRow].widgets[self.config.children.delete_this_row]);
                self.config.rows.splice(clickedRow, 1);
                self.currRow -= 1;
            }, 0);
           
            //Move all the widgets to their new respective positions
            this._moveRow(clickedRow, true, true);
        }
    };

    p._moveRow = function (clickedRow, moveUp, remove) {
        var initalRow = clickedRow + ((remove !== undefined || remove === true) ? 1 : 0);
        for (var j = initalRow; j < this.config.rows.length; j += 1) {
            for (var k = 0; k < this.config.rows[j].widgets.length; k += 1) {
                if (moveUp) {
                    // move rowHeight px per row north bound
                    $('#' + this.config.rows[j].widgets[k].id).css('top', parseInt($('#' + this.config.rows[j].widgets[k].id).css('top')) - this.config.loc.rowHeight);
                } else {
                    // move rowHeight px per row south bound
                    $('#' + this.config.rows[j].widgets[k].id).css('top', parseInt($('#' + this.config.rows[j].widgets[k].id).css('top')) + this.config.loc.rowHeight);
                }
            }
        }
    };

    p._widgetCollectStateBeforeClosing = function (e) {
        var finalObj = {},
            specRows = [],
            specColumns = [];
        
        for (var i = 0; i < this.currRow; i += 1) {
            
            var direction = brease.callWidget(this.config.rows[i].widgets[this.config.children.dir].id, 'getSelectedValue');

            var from = brease.callWidget(this.config.rows[i].widgets[this.config.children.from].id, 'getSelectedValue'),
                to = brease.callWidget(this.config.rows[i].widgets[this.config.children.to].id, 'getSelectedValue'),
                vis = brease.callWidget(this.config.rows[i].widgets[this.config.children.visible].id, 'getSelectedValue') === 0,
                dis = brease.callWidget(this.config.rows[i].widgets[this.config.children.enable].id, 'getSelectedValue') !== 0,
                json = {};

            if (to === 'index') {
                json.index = from - 1;
            } else {
                json.from = from - 1;
                json.to = to - 1;
            }

            json.visible = vis;
            json.disable = dis;

            if (direction === 0) {
                specRows.push(json);
            } else {
                specColumns.push(json);
            }
        }

        if (specRows.length > 0) {
            finalObj.specRows = specRows;
        }

        if (specColumns.length > 0) {
            finalObj.specColumns = specColumns;
        }

        if (this.config === undefined) {
            return this.widget.settings.tableConfiguration;
        }
        
        return finalObj;

    };

    p._reColourFirstLineSeparator = function () {
        $('#' + this.config.startWidgets[0].id).css('border-width', '0px 0px 2px 0px').css('background-color', 'rgba(0,0,0,0');
    };

    p._reColourNewObject = function (addedRow) {
        $('#' + this.config.rows[addedRow].widgets[this.config.children.rect_separator].id).css('border-width', '0px 0px 2px 0px').css('background-color', 'rgba(0,0,0,0');
    };

    p._getCurrentRow = function (pressedId, widgetPos) {
        if (pressedId.includes('button_add_0')) {
            return 0;
        }

        for (var j = 0; j < this.config.rows.length; j += 1) {
            if (pressedId === this.config.rows[j].widgets[widgetPos].id) {
                if (this.config.children.add_next_row === widgetPos) {
                    //The add button belongs to the next row but is added with previous row.
                    return j + 1;
                } else {
                    return j;
                }
            }
        }
        return undefined;
    };

    p._createRow = function (i, dir, data) {
        var currSeparatorTop = this._getCurrSeparatorTop(i),
            currTop = this._getCurrTop(i),
            row = [],
            randomNumber = Utils.uniqueID();
        var obj = {};
        if (data.length > 0 && data[i] !== undefined) {
            obj = data[i];
        }
        //Main row 
        row.push(this._getImage('Button_Delete_' + randomNumber, 'widgets/brease/Table/assets/Delete.svg', this.config.children.left.delete_this_row, currTop));
        row.push(this._getDropDown('Dropdown_Row_' + randomNumber, [{ 'value': 0, 'text': Texts[this.lang].tabconf.row }, { 'value': 1, 'text': Texts[this.lang].tabconf.col }], this.config.children.left.dir, currTop, 100, dir));
        row.push(this._getDropDown('Dropdown_Disable_' + randomNumber, [{ 'value': 0, 'text': Texts[this.lang].tabconf.enab }, { 'value': 1, 'text': Texts[this.lang].tabconf.dis }], this.config.children.left.disabled, currTop, 100, obj['disable'] ? 1 : 0));
        row.push(this._getDropDown('Dropdown_Visible_' + randomNumber, [{ 'value': 0, 'text': Texts[this.lang].tabconf.vis }, { 'value': 1, 'text': Texts[this.lang].tabconf.inv }], this.config.children.left.visible, currTop, 100, obj['visible'] ? 0 : 1));
        
        //Move the new add button to the next row
        var oneRowOffset = currTop + this.config.loc.rowHeight;
        row.push(this._getImage('Button_Add_' + randomNumber, 'widgets/brease/Table/assets/Add.svg', this.config.children.left.add_next_row, oneRowOffset));
        row.push(this._getRect('Rect_Separator_' + randomNumber, this.config.children.left.rect_separator, currSeparatorTop, 600));

        row = row.concat(this._addRange(currTop, obj, dir));
               
        return row;
    };

    p._differentitateBetweenStoredTypes = function () {
        if (this.widget.settings.tableConfiguration.specRows !== undefined) {
            this._initializeStoredDialogConfig(this.widget.settings.tableConfiguration.specRows, 0);
        }

        if (this.widget.settings.tableConfiguration.specColumns !== undefined) {
            this._initializeStoredDialogConfig(this.widget.settings.tableConfiguration.specColumns, 1);
        }
    };

    p._initializeStoredDialogConfig = function (data, dir) {
        for (var i = 0; i < data.length; i += 1) {
            var row = this._createRow(i, dir, data);

            for (var j = 0; j < row.length; j += 1) {
                if (j !== this.config.children.logic_op_next_row || this.currRow !== 0) {
                    this.dialog.addWidget(row[j]);
                }
            }

            this.config.rows.push({ widgets: row });
            
            this.currRow += 1;   

            $('#' + this.config.rows[i].widgets[this.config.children.dir].id).on(BreaseEvent.WIDGET_READY, this._bind('_updateRowHandler'));
            $('#' + this.config.rows[i].widgets[this.config.children.add_next_row].id).on(BreaseEvent.CLICK, this._bind('_addRowHandler'));
            $('#' + this.config.rows[i].widgets[this.config.children.delete_this_row].id).on(BreaseEvent.CLICK, this._bind('_removeRow'));
        }
               
    };

    p._initializeEmptyDialogConfig = function () {
        this.config.startWidgets = [];
        // First add the header for the configuration dialogue
        this.config.startWidgets.push(this._getRect('tabconf_rect_header', 0, 50 + this.config.loc.offset, 600));
        this.config.startWidgets.push(this._getLabel('tabconf_label_dir', Texts[this.lang].tabconf.dir, 100, 20 + this.config.loc.offset, 100));
        this.config.startWidgets.push(this._getLabel('tabconf_label_to', Texts[this.lang].tabconf.from, this.config.children.left.from, 20 + this.config.loc.offset, 100));
        this.config.startWidgets.push(this._getLabel('tabconf_label_from', Texts[this.lang].tabconf.to, this.config.children.left.to, 20 + this.config.loc.offset, 100));
        this.config.startWidgets.push(this._getLabel('tabconf_label_impose', Texts[this.lang].tabconf.impose, this.config.children.left.visible, 20 + this.config.loc.offset, 100));
        this.config.startWidgets.push(this._getImage('tabconf_button_add_0', 'widgets/brease/Table/assets/Add.svg', 10, 60 + this.config.loc.offset));

        for (var i = 0; i < this.config.startWidgets.length; i += 1) {
            this.dialog.addWidget(this.config.startWidgets[i]);
        }

        $('#' + this.config.startWidgets[5].id).on(BreaseEvent.CLICK, this._bind('_addRowHandler'));

    };

    p._addRange = function (currTop, obj, dir) {
        var randomNumber = Utils.uniqueID(),
            row = [];
        //Add these last so they can be popped.
        row.push(this._getRange('Dropdown_From_' + randomNumber, this.config.children.left.from, currTop, 50, obj, dir, 'from'));
        row.push(this._getRange('Dropdown_To_' + randomNumber, this.config.children.left.to, currTop, 80, obj, dir, 'to'));

        return row;
    };

    p._getRange = function (name, x, y, w, value, dir, type) {
        var widget, selected, dataProvider = [];

        if (type === 'to') {
            dataProvider.push({ 'value': 'index', 'text': 'index' });
            selected = 'index';
        }

        if (value['index'] !== undefined && type !== 'to') {
            selected = value['index'];
        } else if (value['to'] !== undefined && type === 'to') {
            selected = value['to'];
        } else if (value['from'] !== undefined && type === 'from') {
            selected = value['from'];
        } else if (type === 'from') {
            selected = 0;
        }
        var range = (dir === 0) ? this.widget.settings.originTableData.length : this.widget.settings.originTableData[0].length;

        for (var j = 0; j < range; j += 1) {
            dataProvider.push({ 'value': j, 'text': j.toString() });
        }

        widget = this._getDropDown(name, dataProvider, x, y, w, selected + 1);

        return widget;
    };

    p._getDropDown = function (name, dataProvider, x, y, w, selectedValue, pos) {

        if (selectedValue === undefined) {
            selectedValue = 0;
        }

        if (pos === undefined) {
            pos = 'right';
        }

        var dropdown = new DialogWidgetModel();
        dropdown.name = name;
        dropdown.type = 'widgets/brease/DropDownBox';
        dropdown.x = x;
        dropdown.y = y;
        dropdown.width = w;
        dropdown.height = 30;

        dropdown.options = {
            'dataProvider': dataProvider,
            'selectedValue': selectedValue,
            'listPosition': pos,
            'fitHeight2Items': false
        };

        dropdown.result = { method: 'getSelectedValue' };
        return dropdown;
    };

    p._getLabel = function (name, text, x, y, w) {
        var label = new DialogWidgetModel();
        label.name = name;
        label.type = 'widgets/brease/Label';
        label.x = x;
        label.y = y;
        label.width = w;
        label.height = '30px';

        label.options = {
            'text': text
        };

        return label;
    };

    p._getNumericInput = function (name, x, y, w, selected, value) {
        if (value === undefined) {
            value = 0;
        }

        var numericInput = new DialogWidgetModel();
        numericInput.name = name;
        numericInput.type = 'widgets/brease/NumericInput';
        numericInput.x = x;
        numericInput.y = y;
        numericInput.width = w;
        numericInput.height = '30px';

        numericInput.options = {
            value: value,
            useDigitGrouping: this.widget.settings.itemConfigs[selected].inputConfig.useDigitGrouping,
            format: this.widget.settings.itemConfigs[selected].inputConfig.format,
            showUnits: this.widget.settings.itemConfigs[selected].inputConfig.showUnits,
            limitViolationPolicy: this.widget.settings.itemConfigs[selected].inputConfig.limitViolationPolicy
        };

        return numericInput;
    };

    p._getImage = function (name, img, x, y) {
        var image = new DialogWidgetModel();
        image.name = name;
        image.type = 'widgets/brease/Image';
        image.x = x;
        image.y = y;
        image.width = '30px';
        image.height = '30px';

        image.options = {
            image: img
        };

        return image;
    };

    p._getRect = function (name, x, y, w) {
        var rect = new DialogWidgetModel();
        rect.name = name;
        rect.type = 'widgets/brease/Rectangle';
        rect.x = x;
        rect.y = y;
        rect.width = w;
        rect.height = '2px';

        rect.options = {
            'borderWidth': '0px 0px 1px 0px'
        };

        return rect;
    };

    return ConfigClass;
});
