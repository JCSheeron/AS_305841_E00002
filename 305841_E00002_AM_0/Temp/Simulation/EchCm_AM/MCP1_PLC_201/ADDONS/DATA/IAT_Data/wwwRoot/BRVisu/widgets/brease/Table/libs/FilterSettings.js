define([
    'brease/core/Class',
    'brease/core/Utils',
    'brease/events/BreaseEvent',
    'widgets/brease/GenericDialog/libs/models/dialogWidgetModel',
    'widgets/brease/Table/libs/DialogueTexts'
], function (
    SuperClass, Utils, BreaseEvent, DialogWidgetModel, Texts
) {
    'use strict';

    var FilterClass = SuperClass.extend(function FilterSettings(dialog, widget, lang) {
            this.lang = lang;
            this.dialog = dialog;
            this.widget = widget;
            this.currRow = 0;

            SuperClass.call(this);
        }, null),

        p = FilterClass.prototype;

    p.initialize = function () {
        this.config = {};
        this.config.rows = [];
        this.config.children = {
            delete_this_row: 0,
            column_picker: 1,
            operator: 2,
            add_next_row: 3,
            logic_op_next_row: 4,
            rect_separator: 5,
            comp_value: 6,
            
            left: {
                delete_this_row: 50,
                column_picker: 100,
                operator: 270,
                add_next_row: 10,
                logic_op_next_row: 5,
                rect_separator: 70,
                comp_value: 375
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

        if (this.widget.settings.filter.length !== 0) {
            this._initializeStoredDialogConfig();
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
        var row = this._createRow(this.currRow);      
        
        for (var i = 0; i < row.length; i += 1) {
            if (i !== this.config.children.logic_op_next_row || this.currRow !== 0) {
                this.dialog.addWidget(row[i]);
            }
        }
        
        $('#' + row[this.config.children.column_picker].id).on(BreaseEvent.WIDGET_READY, this._bind('_updateRowHandler'));
        $('#' + row[this.config.children.add_next_row].id).on(BreaseEvent.CLICK, this._bind('_addRowHandler'));
        $('#' + row[this.config.children.delete_this_row].id).on(BreaseEvent.CLICK, this._bind('_removeRow'));
                
        this.config.rows.push({ widgets: row });

        this.currRow += 1;
    };

    p._insertRow = function (clickedRow) {

        //Create a new row with positional value where this one is
        var row = this._createRow(clickedRow);
        
        //Instatiate logical operator from resting first row
        if (clickedRow === 0) {
            this.dialog.addWidget(this.config.rows[clickedRow].widgets[this.config.children.logic_op_next_row]);
        }

        //Move all the widgets to their new respective positions
        this._moveRow(clickedRow, false);
        
        //Instatiate new row
        for (var i = 0; i < row.length; i += 1) {
            if (i !== this.config.children.logic_op_next_row || clickedRow !== 0) {
                this.dialog.addWidget(row[i]);
            }
        }

        //Add event handlers to new row
        $('#' + row[this.config.children.column_picker].id).on(BreaseEvent.WIDGET_READY, this._bind('_updateRowHandler'));
        $('#' + row[this.config.children.add_next_row].id).on(BreaseEvent.CLICK, this._bind('_addRowHandler'));
        $('#' + row[this.config.children.delete_this_row].id).on(BreaseEvent.CLICK, this._bind('_removeRow'));

        //splice new row into position in row configuration
        this.config.rows.splice(clickedRow, 0, { widgets: row });
        
        //Increase currRow by one
        this.currRow += 1;
    };

    p._updateRowHandler = function (e) {
        var addedRow = this._getCurrentRow(e.delegateTarget.id, this.config.children.column_picker);
        if (addedRow === undefined) { return; }
        
        this._reColourNewObject(addedRow);

        $('#' + this.config.rows[addedRow].widgets[this.config.children.column_picker].id).off(BreaseEvent.WIDGET_READY, this._bind('_updateRowHandler'));
        $('#' + this.config.rows[addedRow].widgets[this.config.children.column_picker].id).on('SelectedIndexChanged', this._bind('_updateRow'));
    };

    p._updateRow = function (e) {
        var currRow = this._getCurrentRow(e.delegateTarget.id, this.config.children.column_picker);

        if (currRow === undefined) { return; }

        var currTop = this._getCurrTop(currRow);

        if (this.config.rows[currRow].widgets[this.config.children.comp_value]) {
            this.dialog.removeWidget(this.config.rows[currRow].widgets[this.config.children.comp_value]);
            this.config.rows[currRow].widgets.pop();
        }
        var row = [];
        row.push(this._getValueColumn(e.detail.selectedValue, this.config.children.left.comp_value, currTop, 220));
        for (var i = 0; i < row.length; i += 1) {
            this.dialog.addWidget(row[i]);
        }

        var dp = [];
        if (this.widget.settings.itemConfigs[e.detail.selectedIndex].type.includes('date') || this.widget.settings.itemConfigs[e.detail.selectedIndex].type.includes('number')) {
            dp = [{ 'value': 0, 'text': '<>' }, { 'value': 1, 'text': '==' }, { 'value': 2, 'text': '<' }, { 'value': 3, 'text': '<=' }, { 'value': 4, 'text': '>' }, { 'value': 5, 'text': '>=' }];
        } else {
            dp = [{ 'value': 0, 'text': '<>' }, { 'value': 1, 'text': '==' }, { 'value': 2, 'text': '<' }, { 'value': 3, 'text': '<=' }, { 'value': 4, 'text': '>' }, { 'value': 5, 'text': '>=' }, { 'value': 6, 'text': 'Contains' }, { 'value': 7, 'text': 'Does not contain' }];
        }
        brease.callWidget(this.config.rows[currRow].widgets[this.config.children.operator].id, 'setDataProvider', dp);
        
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
            $('#' + this.config.rows[clickedRow].widgets[this.config.children.column_picker].id).off('SelectedIndexChanged', this._bind('_updateRow'));
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

            //Inter filter operator has to be removed of the previous row
            if (clickedRow === 0 && this.config.rows[clickedRow + 1] !== undefined) {
                this.dialog.removeWidget(this.config.rows[clickedRow + 1].widgets[this.config.children.logic_op_next_row]);
                //this.config.rows[clickedRow + 1].widgets.splice(this.config.children.logic_op_next_row, 1);
            }
            
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

    p._widgetCollectStateBeforeClosing = function () {
        var listJsonObj = [];
        
        for (var i = 0; i < this.currRow; i += 1) {
            var jsonObj = {
                logical: '',
                logVal: 2,
                data: '',
                op: '',
                opVal: 0,
                comp: ''
            };
            if (i < this.currRow - 1) {
                var tL = this.getSelectedItemFromDataProvider(this.config.rows[i + 1].widgets[this.config.children.logic_op_next_row].id);
                jsonObj.logical = tL.text;
                jsonObj.logVal = parseInt(tL.value);
            }

            jsonObj.data = parseInt(brease.callWidget(this.config.rows[i].widgets[this.config.children.column_picker].id, 'getSelectedValue'));
            var tO = this.getSelectedItemFromDataProvider(this.config.rows[i].widgets[this.config.children.operator].id);
            jsonObj.op = tO.text;
            jsonObj.opVal = parseInt(tO.value);

            var firstRow = 0;
            if (this.config.rows[i].widgets.length === 9) {
                firstRow = 1;
            }
            jsonObj.comp = brease.callWidget(this.config.rows[i].widgets[this.config.children.comp_value - firstRow].id, 'getValue');
            
            listJsonObj.push(jsonObj);
        }
        
        if (this.config === undefined) {
            return this.widget.settings.filter;
        }
        
        return listJsonObj;

    };

    p.getSelectedItemFromDataProvider = function (id) {
        var item, dP = brease.callWidget(id, 'getDataProvider'), selectedIndex = brease.callWidget(id, 'getSelectedIndex');
        if (dP && selectedIndex > -1) {
            item = dP[selectedIndex];
        }
        return item;
    };

    p._reColourFirstLineSeparator = function () {
        $('#' + this.config.startWidgets[0].id).css('border-width', '0px 0px 2px 0px');
    };

    p._reColourNewObject = function (addedRow) {
        $('#' + this.config.rows[addedRow].widgets[this.config.children.rect_separator].id).css('border-width', '0px 0px 2px 0px');
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

    p._createRow = function (i) {
        var currSeparatorTop = this._getCurrSeparatorTop(i),
            currFilterLogicalTop = this._getCurrFilterLogicalTop(i),
            currTop = this._getCurrTop(i),
            row = [],
            randomNumber = Utils.uniqueID();
        var obj = {};
        if (this.widget.settings.filter.length > 0 && this.widget.settings.filter[i] !== undefined) {
            obj = this.widget.settings.filter[i];
        }
        //Main row 
        row.push(this._getImage('Button_Delete_' + randomNumber, 'widgets/brease/Table/assets/Delete.svg', this.config.children.left.delete_this_row, currTop));
        row.push(this._getDropDownColumn('Dropdown_ColumnPicker_' + randomNumber, this.config.children.left.column_picker, currTop, 150, obj.data));
        row.push(this._getDropDownOperator('Dropdown_Operator_' + randomNumber, this.config.children.left.operator, currTop, 85, this.widget.settings.itemConfigs[0].type, obj.opVal));
        
        //Move the new add button to the next row
        var oneRowOffset = currTop + this.config.loc.rowHeight;
        row.push(this._getImage('Button_Add_' + randomNumber, 'widgets/brease/Table/assets/Add.svg', this.config.children.left.add_next_row, oneRowOffset));
        
        //How to bind the next filter

        var logVal;
        if (i === 0 || _.isEmpty(obj)) {
            logVal = 0;
        } else {
            logVal = this.widget.settings.filter[i - 1].logVal;
        }
        row.push(this._getDropDown('Dropdown_Logical_Filter_' + randomNumber, [{ 'value': '0', 'text': Texts[this.lang].filter.and }, { 'value': '1', 'text': Texts[this.lang].filter.or }], 
            this.config.children.left.logic_op_next_row, currFilterLogicalTop, 60, this.config.loc.logicalOperatorHeight, logVal));
        row.push(this._getRect('Rect_Separator_' + randomNumber, this.config.children.left.rect_separator, currSeparatorTop, 600));
        
        //this row has to be last, so we can pop it later
        var data;
        if (obj.data !== undefined) {
            data = obj.data;
        } else {
            data = 0; //We take the first column
        }
        row.push(this._getValueColumn(data, this.config.children.left.comp_value, currTop, 220, obj.comp));
        
        return row;
    };

    p._initializeStoredDialogConfig = function () {

        for (var i = 0; i < this.widget.settings.filter.length; i += 1) {
            var row = this._createRow(i);

            for (var j = 0; j < row.length; j += 1) {
                if (j !== this.config.children.logic_op_next_row || this.currRow !== 0) {
                    this.dialog.addWidget(row[j]);
                }
            }

            this.config.rows.push({ widgets: row });
            
            this.currRow += 1;   

            $('#' + this.config.rows[i].widgets[this.config.children.column_picker].id).on(BreaseEvent.WIDGET_READY, this._bind('_updateRowHandler'));
            $('#' + this.config.rows[i].widgets[this.config.children.add_next_row].id).on(BreaseEvent.CLICK, this._bind('_addRowHandler'));
            $('#' + this.config.rows[i].widgets[this.config.children.delete_this_row].id).on(BreaseEvent.CLICK, this._bind('_removeRow'));
        }

    };

    p._initializeEmptyDialogConfig = function () {
        this.config.startWidgets = [];
        //So we can add the correct headerLabel class
        this.dialog.el.on(BreaseEvent.WIDGET_READY, this._bind('_addCorrectStyle'));
        // First add the header for the configuration dialogue
        this.config.startWidgets.push(this._getRect('filter_rect_header', 0, 50 + this.config.loc.offset, 600));
        this.config.startWidgets.push(this._getLabel('filter_label_column', Texts[this.lang].filter.col, 100, 20 + this.config.loc.offset, 100));
        this.config.startWidgets.push(this._getLabel('filter_label_operator', Texts[this.lang].filter.op, 270, 20 + this.config.loc.offset, 100));
        this.config.startWidgets.push(this._getLabel('filter_label_value', Texts[this.lang].filter.val, 375, 20 + this.config.loc.offset, 100));
        this.config.startWidgets.push(this._getImage('filter_button_add_0', 'widgets/brease/Table/assets/Add.svg', 10, 60 + this.config.loc.offset));

        for (var i = 0; i < this.config.startWidgets.length; i += 1) {
            this.dialog.addWidget(this.config.startWidgets[i]);
        }
        $('#' + this.config.startWidgets[4].id).on(BreaseEvent.CLICK, this._bind('_addRowHandler'));
    };

    p._addCorrectStyle = function (e) {
        var type = e.target['dataset'].breaseWidget.split('/')[2], cls;
        
        if (e.target.id.includes('filter_label')) {
            cls = 'widgets_brease_' + type + '_style_tableConfigurationDialogHeaderStyle';
            e.target.classList.add(cls);
        } else {
            cls = 'widgets_brease_' + type + '_style_tableConfigurationDialogStyle';
            e.target.classList.add(cls);
        }
    };
    
    p.removeEventListeners = function () {
        this.dialog.el.off(BreaseEvent.WIDGET_READY, this._bind('_addCorrectStyle'));
    };

    p._getValueColumn = function (selected, x, y, w, value) {
        var widget;
        var name = Utils.uniqueID('Value_' + this.currRow);
        if (this.widget.settings.itemConfigs[selected].type === 'date') {
            widget = this._getDateTimeInput('DateTimeInput_' + name, x, y, w, value, selected);
        } else if (this.widget.settings.itemConfigs[selected].type === 'string') {
            widget = this._getTextInput('TextInput_' + name, x, y, w, value);
        } else if (this.widget.settings.itemConfigs[selected].type === 'number' || this.widget.settings.itemConfigs[selected].type === 'nodeNumber') {
            widget = this._getNumericInput('NumericInput_' + name, x, y, w, selected, value);
        } else {
            widget = this._getTextInput('TextInput_' + name, x, y, w, 'not supported');
            widget.options.enable = false;
        }
        return widget;
    };

    p._getDropDownColumn = function (name, x, y, w, selectedIndex) {
        if (selectedIndex === undefined) {
            selectedIndex = 0;
        }

        var dropdown = new DialogWidgetModel();
        dropdown.name = name;
        dropdown.type = 'widgets/brease/DropDownBox';
        dropdown.x = x;
        dropdown.y = y;
        dropdown.width = w;
        dropdown.height = 30;
        dropdown.options = {
            'dataProvider': [],
            'selectedIndex': parseInt(selectedIndex),
            'listPosition': 'right',
            'fitHeight2Items': false
        };

        for (var j = 0; j < this.widget.settings.tableItemIds.length; j += 1) {
            dropdown.options.dataProvider.push({ 'value': j.toString(), 'text': this.widget.settings.headerTexts[j] });
        }

        dropdown.result = { method: 'getSelectedValue' };
        return dropdown;
    };

    p._getDropDownOperator = function (name, x, y, w, type, selectedIndex) {
        if (selectedIndex === undefined) {
            selectedIndex = 0;
        }
        var dropdown = new DialogWidgetModel();
        dropdown.name = name;
        dropdown.type = 'widgets/brease/DropDownBox';
        dropdown.x = x;
        dropdown.y = y;
        dropdown.width = w;
        dropdown.height = 30;

        dropdown.options = {
            'dataProvider':
            [{ 'value': 0, 'text': '<>' },
                { 'value': 1, 'text': '==' },
                { 'value': 2, 'text': '<' },
                { 'value': 3, 'text': '<=' },
                { 'value': 4, 'text': '>' },
                { 'value': 5, 'text': '>=' }],
            'selectedIndex': parseInt(selectedIndex),
            'listPosition': 'right',
            'fitHeight2Items': false
        };

        if (type !== 'date' || type !== 'number') {
            dropdown.options.dataProvider.push({ 'value': 6, 'text': 'Contains' }, { 'value': 7, 'text': 'Does not contain' });
        }

        dropdown.result = { 'method': 'getSelectedValue' };
        return dropdown;
    };

    p._getDropDown = function (name, dataProvider, x, y, w, h, selectedIndex, pos) {
        if (h === undefined) {
            h = 30;
        }

        if (selectedIndex === undefined) {
            selectedIndex = 0;
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
        dropdown.height = h;

        dropdown.options = {
            'dataProvider': dataProvider,
            'selectedIndex': parseInt(selectedIndex),
            'listPosition': pos,
            'fitHeight2Items': false
        };

        dropdown.result = { method: 'getSelectedValue' };
        return dropdown;
    };
    
    p._getDateTimeInput = function (name, x, y, w, value, selected) {
        var dateTimeInput = new DialogWidgetModel();
        dateTimeInput.name = name;
        dateTimeInput.type = 'widgets/brease/DateTimeInput';
        dateTimeInput.x = x;
        dateTimeInput.y = y;
        dateTimeInput.width = w;
        dateTimeInput.height = '30px';
        dateTimeInput.options = {
            'format': this.widget.settings.itemConfigs[selected].inputConfig.format
        };

        if (value !== undefined) {
            dateTimeInput.options.value = new Date(value).toISOString();
        } else {
            var dt = new Date(),
                year = dt.getFullYear().toString(),
                month = dt.getMonth(),
                da = dt.getDate().toString(),
                hour = dt.getHours(),
                min = dt.getMinutes(),
                sec = dt.getSeconds();
            month = ((month < 9) ? '0' : '') + (month + 1).toString();
            da = ((da < 10) ? '0' : '') + da.toString();
            hour = ((hour < 10) ? '0' : '') + hour.toString();
            min = ((min < 10) ? '0' : '') + min.toString();
            sec = ((sec < 10) ? '0' : '') + sec.toString();
            dateTimeInput.options.value = year + '-' +
                                            month + '-' + 
                                            da + 'T' + 
                                            hour + ':' +
                                            min + ':' +
                                            sec + '.000Z';
        }
        return dateTimeInput;
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

    p._getTextInput = function (name, x, y, w, value) {
        var textInput = new DialogWidgetModel();
        textInput.name = name;
        textInput.type = 'widgets/brease/TextInput';
        textInput.x = x;
        textInput.y = y;
        textInput.width = w;
        textInput.height = '30px';

        if (value !== undefined) {
            textInput.options.value = value;
        }

        return textInput;
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
        var tableItemId = this.widget.settings.tableItemIds && this.widget.settings.tableItemIds[selected] ? this.widget.settings.tableItemIds[selected] : '',
            minValue = brease.callWidget(tableItemId, 'getMinValue'),
            maxValue = brease.callWidget(tableItemId, 'getMaxValue'); 
        numericInput.options = {
            value: value,
            useDigitGrouping: this.widget.settings.itemConfigs[selected].inputConfig.useDigitGrouping,
            format: this.widget.settings.itemConfigs[selected].inputConfig.format,
            showUnits: this.widget.settings.itemConfigs[selected].inputConfig.showUnits,
            limitViolationPolicy: this.widget.settings.itemConfigs[selected].inputConfig.limitViolationPolicy,
            maxValue: maxValue !== null ? maxValue : 100,
            minValue: minValue !== null ? minValue : 0,
            unit: this.widget.settings.itemConfigs[selected].inputConfig.unit
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

    return FilterClass;
});
