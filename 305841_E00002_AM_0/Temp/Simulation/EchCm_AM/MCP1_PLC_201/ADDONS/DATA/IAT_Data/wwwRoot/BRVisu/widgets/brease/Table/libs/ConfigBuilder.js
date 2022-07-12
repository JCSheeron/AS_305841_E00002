define(function () {
    'use strict';
    function ConfigBuilder(widget) {
        this.widget = widget;
    }

    var p = ConfigBuilder.prototype;

    p.parseFilter = function (filter, id) {
        if (filter === undefined || filter === '' || filter === null) { return []; }
        var t = this._parseJSON(filter.replace(/'/g, '"'), 'filter', id);
        if (t === undefined || t.length === 0) { return []; }
        var jsonObj = {}, jsonList = [];

        var i;
        for (i = 0; i < t.length; i += 1) {
            jsonObj.opVal = _convertOp(t[i].conditionType);
            jsonObj.data = t[i].columnPosition;
            jsonObj.comp = t[i].value;
            jsonObj.logVal = _convertLogVal(t[i].logicalOperator);
            jsonObj.logical = t[i].logicalOperator;

            jsonList.push($.extend(true, {}, jsonObj));
        }
        jsonList[i - 1].logical = '';
        return jsonList;
    };

    p.serializeFilter = function (json) {
        if (json === undefined || json === '') { return []; }
        var filter = {}, filterList = [];

        for (var i = 0; i < json.length; i += 1) {
            filter.logicalOperator = _deconvertLogVal(json[i].logVal);
            filter.value = json[i].comp;
            filter.conditionType = _deconvertOp(json[i].opVal);
            filter.columnPosition = json[i].data;
            
            filterList.push($.extend(true, {}, filter));
        }

        return JSON.stringify(filterList);
    };

    p._parseJSON = function (json, type, id) {
        try {
            return JSON.parse(json);
        } catch (err) {
            console.warn('The json for the', type, 'configuration in the', id, 'is invalid');
            this.widget._createLogEntry(json, type + 'Configuration');
        }
    };

    function _convertLogVal(logicalOperator) {
        var retVal;
        switch (logicalOperator) {
            case 'and': 
                retVal = 0;
                break;
                
            case 'or': 
                retVal = 1;
                break;
        }
        return retVal;
    }

    function _deconvertLogVal(logicalOperator) {
        var retVal;
        switch (logicalOperator) {
            case 0: 
                retVal = 'and';
                break;
                
            case 1: 
                retVal = 'or';
                break;
        }
        return retVal;
    }

    function _convertOp(operator) {
        var retVal;
        switch (operator) {
            case '<>': retVal = 0; break; 
            case '==': retVal = 1; break;
            case '<': retVal = 2; break;
            case '<=': retVal = 3; break;
            case '>': retVal = 4; break;
            case '>=': retVal = 5; break;
            case 'Contains': retVal = 6; break;
            case 'Does not contain': retVal = 7; break;
        }
        return retVal;
    }

    function _deconvertOp(operator) {
        var retVal;
        switch (operator) {
            case 0: retVal = '<>'; break;
            case 1: retVal = '=='; break;
            case 2: retVal = '<'; break;
            case 3: retVal = '<='; break;
            case 4: retVal = '>'; break;
            case 5: retVal = '>='; break;
            case 6: retVal = 'Contains'; break;
            case 7: retVal = 'Does not contain'; break;
        }
        return retVal;
    }

    return ConfigBuilder;
});
