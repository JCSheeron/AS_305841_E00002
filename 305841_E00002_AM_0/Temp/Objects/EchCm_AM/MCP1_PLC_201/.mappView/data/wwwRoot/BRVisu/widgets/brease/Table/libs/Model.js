define([
    'brease/core/Class',
    'widgets/brease/common/libs/external/jquery.dataTables',
    'brease/enum/Enum',
    'brease/core/Types',
    'widgets/brease/common/libs/wfUtils/UtilsImage'
], function (
    SuperClass, dataTables, Enum, 
    Types, UtilsImage
) {

    'use strict';

    /**
     * @class widgets.brease.Table.libs.Model
     * @extends brease.core.Class
     */

    var Model = SuperClass.extend(function Model(widget) {
            SuperClass.call(this);
            this.widget = widget;
            this.settings = widget.settings;
            this.resetData();
        }, null),

        p = Model.prototype;
    /**
     * @method 
     * This method checks whether there is data in the model or not
     * @returns {Boolean}
     */
    p.getIsDatasetEmpty = function () {
        return this.originalData.length === 0 || !!this.originalData[0].empty;
    };

    /**
     * @method 
     * This method checks whether there is processed data in the model or not
     * @returns {Boolean}
     */
    p.getIsProcessedDatasetEmpty = function () {
        return this.processedData.length === 0 || !!this.processedData[0].empty;
    };

    /**
     * @method 
     * This method checks how many rows are available in the dataset
     * @returns {Integer}
     */
    p.getNumberOfRowsAvailable = function () {
        return this.processedData.length;
    };

    /**
     * @method 
     * This method will reset the data to default values, the reason
     * for this is so that the Database can flush the widget before
     * sending new data to the Table. Since the DB can sen different
     * length of arrays we need to start from scratch everytime,
     * for a regular OPCUA binding changing the size is not possible
     * so it's easier to just update the new array.
     */
    p.resetData = function () {
        this.displayedColumns = 0;
        //If the widget is dependent on the Database it's important 
        //that all possible items are available in the dataset so that
        //when the config starts removing columns it will remove from
        //the entire dataset, as the db can have a smaller dataset sometime
        //we must force the entire size to the Table again. A regular table
        //solves this by itself.
        this.datareset = true;
        this.processedData = (this.settings.standalone) ? [{ 'empty': true }] : _.fill(new Array(this.settings.itemFinalVisibility.length), []);
        this.originalData = (this.settings.standalone) ? [{ 'empty': true }] : _.fill(new Array(this.settings.itemFinalVisibility.length), []);
        // this.processedData =  [{ 'empty': true }];
        // this.originalData = [{ 'empty': true }];
    };

    /**
     * @method 
     * This method is only used when the database needs to update, to lower
     * the speed we remove all data but 10 rows, then the update frequency 
     * increases without having trouble with "ghost"-data thanks to the
     * OGBoundaries methods which screws up the intermediate data from the
     * database
     */
    p.shortenData = function () {
        for (var i = 0; i < this.originalData.length; i += 1) {
            this.originalData[i].splice(10);
        }
    };

    /**
     * @method 
     * This function sets unprocessed data to model
     * @param {Object} data
     */
    p.setData = function (data) {
        this.datareset = false;
        data = $.extend(true, [], data);
        this._processDataset(data);
    };

    /**
     * @method 
     * This function will return the preprocessed data as
     * to be used in the DataTable.
     * @returns {Object} data
     */
    p.getData = function () {
        // return (this.settings.dataOrientation === Enum.Direction.vertical) ? this.processedData : _.zip.apply(_, this.processedData);
        return this.processedData;
    };

    /**
     * @method 
     * This method should only be called by the Table when the widget is in
     * edit mode in the Editor. it will splice up the data so that it's
     * correct!
     * @param {Integer} index
     */
    p.removeData = function (index) {
        this.originalData.splice(index, 1);
    };

    p.getOriginalData = function () {
        return (this.settings.dataOrientation === Enum.Direction.vertical) ? this.originalData : _.zip.apply(_, this.originalData);
    };

    /**
     * @method 
     * This method will return all available rows positional values in an 
     * array.That means this function will return the last column!!
     * @returns {Integer[]}
     */
    p.getActualItemsInTable = function () {
        return this.actualItemsInTheTable;
    };

    /**
     * @method 
     * For horizontal tables we need to figure out how many columns, i.e. not items
     * for the Table to able to set up it's configuration.
     * @returns {Integer}
     */
    p.getColumnsInHorzTable = function () {
        return this.processedData[this.processedData.length - 1];
    };

    /**
     * @method 
     * This method will take the index we are looking for and return the index
     * in the cut out dataset. -1 if not found.
     * @param {Integer} actualIndex the row in the orignal dataset
     * @returns {Integer} the corresponding row in the cut out dataset
     */
    p.findIndexOfActualItem = function (actualItem) {
        return this.actualItemsInTheTable.indexOf(actualItem);
    };
    
    /**
     * @method 
     * This method will return the true item value from the positional value.
     * This method should be used in combination with the DataTable that cannot return
     * values outside of the scope of the rows in the table.
     * @param {Integer} idx the index of the value of
     * @param {Boolean} fromModel sometimes we want to check with the model in vertical mode, other times not.
     * @returns {Integer}
     */
    p.getActualItem = function (idx, fromModel) {
        var actItem = -1; 
        if (this.actualItemsInTheTable) {
            actItem = this.actualItemsInTheTable[idx]; 
        } else { 
            actItem = (fromModel) ? this.processedData[idx][this.processedData[idx].length - 1] : idx;
        }
        return actItem;
    };

    /**
     * @method 
     * Pass a value between 0 and total length - 1 and find out if that position is the last
     * item or not.
     * @param {Integer} idx current index
     * @returns {Boolean}
     */
    p.isLastItem = function (idx) {
        return (idx === (this.actualItemsInTheTable.length - 1));
    };

    /**
     * @method 
     * This method will return the number of items in the dataset
     * @returns {Integer}
     */
    p.getNumberOfItems = function () {
        return this.actualItemsInTheTable.length - 1;
    };

    /**
     * @method 
     * This method will update one item in the dataset with the data passed
     * to the function
     * @param {Object} data
     * @param {Integer} index
     */
    p.setDataItem = function (data, index) {
        this.datareset = false;
        data = $.extend(true, [], data);
        this._processOneItem(data, index);
    };

    /**
     * @method 
     * This method will set the value on a item in the original dataset
     * @param {Integer} item
     * @param {Integer} index
     * @param {String|Integer} data
     */
    p.setValue = function (item, index, data) {
        this.originalData[item][index] = data;
    };

    /**
     * @method 
     * This method will return the original data for one item
     * which can be used to update the individual item with newly
     * changed data.
     * @param {Integer} item the position of the item
     * @returns {Integer[]|String[]}
     */
    p.getOriginalItemData = function (item) {
        return this.originalData[item];
    };

    /**
     * @method 
     * This method will define the boundaries of the table and return an
     * object with the number of columns and rows currently available to
     * the Table
     * @returns {Object}
     */
    p.getTableDataBoundaries = function () {
        var vertical = (this.settings.dataOrientation === Enum.Direction.vertical),
            data = this.getData(),
            len = (data[0]) ? data[0].length : 0;
        return {
            rows: (vertical) ? data.length : this.settings.tableItemIds.length,
            columns: (vertical) ? this.settings.tableItemIds.length : len
        };
    };

    /**
     * @method 
     * This method will process a subset of the dataset available to the model
     * given by the index
     * @private
     * @param {Object} data
     * @param {Integer} index position in the dataset where the new data should be placed
     */
    p._processOneItem = function (data, index) {
        var maxDatasetLength = 0;

        for (var i = 0; i < data.length; i += 1) {
            if (this.settings.tableItemTypes[index] === 'widgets/brease/TableItem') {
                // This line serves to remove < and > tags from a string and replace them with &lt; and &gt;
                data[i] = this._removeHTMLTags(data[i]);
                data[i] = this._breakLine(data[i]);
            }
        }
        this.originalData[index] = $.extend(true, [], data);

        //Store data back to the processed data structure
        this.originalData.map(
            function (arr, idx) { 
                maxDatasetLength = (maxDatasetLength < arr.length) ? arr.length : maxDatasetLength; 
            });

        this._evenOutItemsWhenOneUpdated(maxDatasetLength);
    };

    /**
     * @method 
     * This method flattens all item lengths' so that they are the same size.
     * Only when one item has been processed
     * @private
     * @param {Integer} maxDatasetLength
     */
    p._evenOutItemsWhenOneUpdated = function (maxDatasetLength) {
        for (var i = 0; i < this.originalData.length; i += 1) {
            if (this.originalData[i] && this.originalData[i].length < maxDatasetLength) {
                var sub = _.fill(new Array(maxDatasetLength - this.originalData[i].length), '');
                this.originalData[i] = this.originalData[i].concat(sub);
            }
        }
    };

    /**
     * @method 
     * This method will process the entire dataset available to the model
     * @private
     * @param {Object} dataset
     */
    p._processDataset = function (dataset) {
        var settings = this.settings;
        var maxDatasetLength = 0;
        for (var i = 0; i < dataset.length; i += 1) {
            for (var j = 0; j < dataset[i].length; j += 1) {
                if (settings.tableItemTypes[i] === 'widgets/brease/TableItem') {
                    dataset[i][j] = this._removeHTMLTags(dataset[i][j]);
                }
                dataset[i][j] = this._breakLine(dataset[i][j]);
            }
            this.settings.tableItemLengths[i] = dataset[i].length;
            if (dataset[i].length > maxDatasetLength) {
                maxDatasetLength = dataset[i].length;
            }
        }

        this.originalData = dataset;

        this._evenOutAllItems(maxDatasetLength);
    };

    /**
     * @method 
     * This method flattens all item lengths' so that they are the same size.
     * @private
     * @param {Integer} maxDatasetLength
     */
    p._evenOutAllItems = function (maxDatasetLength) {

        for (var i = 0; i < this.originalData.length; i += 1) {
            if (this.originalData[i].length < maxDatasetLength) {
                var sub = _.fill(new Array(maxDatasetLength - this.originalData[i].length), '');
                this.originalData[i] = this.originalData[i].concat(sub);
            }
        }
    };

    /**
     * @method 
     * This method will add necessary boundaries to the dataset so we can keep track of which row/column
     * is which when we start slicing the data
     * @param {Object[]} dataset
     * @returns {Object[]}
     */
    p._addOGBoundaries = function (dataset) {
        if (dataset[0].empty || (!this.settings.standalone && this.datareset)) return;
        //If we are in horizontal mode we cannot depend on the columns to keep track of 
        //where we are so we have to add another row with indices for the columns aswell
        //to keep track of which column we currently are on
        //Either way to keep track of which row we actually are on after slicing data 
        //we have to add another column which represents the indices and hide this information
        dataset.map(function (val, idx) {
            //Sometime data doesnt arrive in the right order that means a table
            //can have data on column 1 and 4 but 2 and 3 are undefined which
            //can cause warnings in the logger, it doesnt stop the widget from
            //working because next time we get around the data will be there
            // if (!val) return; 
            val.push(idx);
        });
        var rowValues = [];
        dataset[0].map(function (val, idx) {
            rowValues.push(idx);
        });
        dataset.push(rowValues);
        return dataset;
    };

    /**
     * @method 
     * This method will take a tableConfiguration and slice the data accordingly to it.
     * @param {Object} conf the tableConfiguration 
     */
    p.sliceDataAccordingToTableConfig = function (conf) {
        if (this.originalData.includes(undefined)) return;

        var d = _.cloneDeep(this.originalData), dir = 'specColumns', dataOrientation = this.settings.dataOrientation,
            columnKeeper;
    
        d = this._addOGBoundaries(d);

        if (!d) return;
    
        if (dataOrientation === Enum.Direction.vertical) {
            d = _.zip.apply(_, d);
            dir = 'specRows';
            columnKeeper = d.splice(-1);
        }
        
        if (conf) {
            this._sliceDataFromDataset(d, conf, dir, dataOrientation);
        }
    
        d = this._repopulateDataset(d, columnKeeper, dataOrientation);
    
        this._removeTrackers(d);
        
    };

    /**
     * @method 
     * This method will remove data from the dataset according to the rules set in the
     * tableConfiguration, here passedon the conf variable.
     * @param {Object[]} d the dataset
     * @param {Object[]} conf the tableConfiguration
     * @param {String} dir the direction of the tableConfiguration can either be specColumns or specRows
     * @param {brease.enum.Direction} dO can either be horizontal or vertical as dictated by brease.enum.Direction
     * @returns {Object[]} the dataset
     */
    p._sliceDataFromDataset = function (d, conf, dir, dO) {
        conf[dir] = _.orderBy(conf[dir], ['index', 'from'], ['desc', 'desc']);
        conf[dir].forEach(function (c) {
            if (c.visible === false || c.visible === 'false') {
                var from, to;
                if (c.index !== undefined) {
                    from = c.index;
                    to = 1;
                }
                if (c.to !== undefined && c.from !== undefined) {
                    from = c.from;
                    to = (c.to - c.from + 1);
                }

                if (c.to !== undefined && c.from === undefined) {
                    to = c.to;
                    from = 0;
                }
                
                if (c.to === undefined && c.from !== undefined) {
                    to = d.length - 1;
                    from = c.from;
                }
                    
                if (dO === Enum.Direction.vertical) {
                    d.splice(from, to);
                } else {
                    d.map(function (col) { 
                        col.splice(from, to); 
                    });
                }
            }
        });
        return d;
    };

    /**
     * @method 
     * This method will readd the necessary boundaries removed before the slicing of data
     * @param {Object[]} d the dataset
     * @param {Boolean[]} ck the columnKeeper, keeps track of which column is which, should be readded as the last row in the table
     * @param {brease.enum.Direction} dO can either be horizontal or vertical as dictated by brease.enum.Direction
     * @returns {Object[]} the dataset
     */
    p._repopulateDataset = function (d, ck, dO) {
        var itemVis = this.settings.itemFinalVisibility, k = 0;
        if (dO === Enum.Direction.vertical) {
            d.push(ck[0]);
            for (k = itemVis.length - 1; k >= 0; k -= 1) {
                if (!itemVis[k]) {
                    d.map(function (col) { 
                        col.splice(k, 1); 
                    });
                }
            }
        } else {
            for (k = itemVis.length - 1; k >= 0; k -= 1) {
                if (!itemVis[k]) {
                    d.splice(k, 1);
                }
            }
        }

        return d;
    };

    /**
     * @method 
     * To explain this completely. The table contains one row and one column too much.
     * The reason for this is that the table must be able to keep track of which actual
     * column and row (or item) a given column belongs to after being cut out of the
     * original dataset. If we have 4 columns in the original data and we remove col
     * 1 then col 0 is now col 0, col 1 is gone, col 2 is now col 1 and col 3 is now
     * col 2. This will give us trouble when we try to add a disabled state to a col
     * or if we try to figure out which col we just clicked on. The DataTables will
     * give us one value, but it does not necssary correspond to the actual col
     * being pressed, therefore we need to keep track of which the real value is
     * by ourselves, and this is doen with the actualColumnsInTable and 
     * actualRowsInTable.
     * @private
     * @param {Object} d the dataset which we need to remove the trackers from
     */
    p._removeTrackers = function (d) {
        if (d === undefined) return;
        var theLastColumnData = [];
        if (this.settings.dataOrientation === Enum.Direction.horizontal) {
            d.forEach(function (row) {
                //See explanation for OGBoundaries!
                // if (!row) return;
                theLastColumnData.push(row.pop());
            });
        } else {
            theLastColumnData = d.pop();

        }

        this.actualItemsInTheTable = theLastColumnData;
        this.processedData = d;
    };

    /**
     * @method 
     * This method replaces breaklines (\n) with a self closing br tag 
     * @param {String} text string that needs to have a \n replaced with a br tag
     * @returns {String}
     */
    p._breakLine = function (text) {
        // Regexp for replacing \n to <br />
        // Source: http://stackoverflow.com/questions/5076466/javascript-replace-n-with-br
        if (this.settings.multiLine && text.length > 0 && typeof text === 'string') {
            return text.replace(/\\n/g, '<br />');
        } else {
            return text;
        }
        
    };

    /**
     * @method 
     * This method escapes all HTML tags so that a user cannot format code inside the table
     * @param {String} t string to be formatted
     * @returns {String} 
     */
    p._removeHTMLTags = function (t) {
        if (typeof t === 'string') {
            t = t.replace(/</g, '&lt;');
            t = t.replace(/>/g, '&gt;');
        }
        return t;
    };

    /**
     * @method sortDataHorizontally
     * This method takes data, transposes it and sorts it accordingly to the order passed on the colIndex.
     * It then re transposes it and stores the sorted data in the tableData to be used by the table.
     * OBS Only to be used in horizontal mode! (For vertical mode, the datatables can sort it by itself)
     * @param {Object} renderer reference to this class
     * @param {UInteger} colIndex the column index that is to be sorted
     * @param {String} order the order can either be asc or desc
     */
    p.sortDataHorizontally = function (colIndex, order) {
        //Only transpose if asc/desc ordering, else return original data setup
        if (order !== undefined) {
            //Transpose data to sort in vertical fashion
            this.unsortedData = $.extend(true, [], this.processedData);
            this.processedData = _.zip.apply(_, this.processedData);

            //Anon function to sort data
            this.processedData.sort(function (a, b) {
                if (a[colIndex] === b[colIndex]) {
                    return 0;
                } else if (isNaN(a[colIndex]) || isNaN(b[colIndex])) {
                    if (order === 'asc') {
                        return (a[colIndex] < b[colIndex]) ? -1 : 1;
                    } else {
                        return (a[colIndex] > b[colIndex]) ? -1 : 1;
                    }
                }
                if (order === 'asc') {
                    return a[colIndex] - b[colIndex];
                } else {
                    return b[colIndex] - a[colIndex];
                }
            });
            this.processedData = _.zip.apply(_, this.processedData);
        } else {
            this.processedData = $.extend(true, [], this.unsortedData);
            this.unsortedData = [];
        }
    };

    /**
     * @method getActualRowIndex
     * This method gets the row index of the model
     * @param {Integer} value index of the model rows
     * @returns {Integer} 
     */
    p.getActualRowIndex = function (value) {
        var data,
            newValue = -1;
        for (var i = 0; i < this.processedData.length; i += 1) {
            data = this.processedData[i];
            if (data[data.length - 1] === value) {
                newValue = i;
            }
        }
        return newValue;
    };

    return Model;
});
