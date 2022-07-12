define(['brease/core/Utils'], function (Utils) {

    'use strict';

    /**
    * @class brease.datatype.Node
    * @extends Object
    * Value with unit for binding with OPC-UA nodes.  
    * <section>Example: var node = new Node(5, 'BAR', 0, 10);</section>
    */
    /**
    * @method constructor
    * Creates a new Node instance.
    * @param {Number} value
    * @param {String} unit
    * @param {Number} [minValue=null]
    * @param {Number} [maxValue=null]
    * @param {String} [id] id will be generated, if no one is defined.
    */

    /**
    * @property {Number} value
    */
    /**
    * @property {String} unit
    * Common code of unit of value.
    */
    /**
    * @property {Number} minValue (optional)
    */
    /**
    * @property {Number} maxValue (optional)
    */
    /**
    * @property {String} id (optional)
    */
    /**
    * @property {Number} time (optional)
    * Timestamp of last value change in fileTime format
    */

    var Node = function (value, unit, minValue, maxValue, id) {
            _count += 1;
            this.id = (id !== undefined) ? id + '' : 'brease_node_' + _count;
            Object.defineProperty(this, 'value', { 
                set: function (value) {
                    this._value = value;
                    this.time = Utils.fileTimeFromDate(new Date());
                },
                get: function () {
                    return this._value;
                } 
            });
            this.setUnit(unit);
            this.setValue(value);
            this.setMinValue(minValue);
            this.setMaxValue(maxValue);
        },
        _count = 0,
        p = Node.prototype;

    p.toJSON = function () {
        return {
            value: this.value,
            id: this.id,
            unit: (this.unit) ? this.unit : null,
            minValue: this.minValue,
            maxValue: this.maxValue,
            time: this.time
        };
    };
    
    /**
    * @method equals
    * @param {brease.datatype.Node} node
    * Checks if all node properties except time are equal to other node properties
    */
    p.equals = function (node) {
        return this.getId() === node.getId() &&
               this.getUnit() === node.getUnit() && 
               this.getMinValue() === node.getMinValue() &&
               this.getMaxValue() === node.getMaxValue() &&
               this.getValue() === node.getValue();
    };

    /**
    * @method setId
    * @param {String} id
    */
    p.setId = function (id) {
        if (id !== undefined) {
            this.id = id + '';
        }
    };

    /**
    * @method getId
    * @return {String}
    */
    p.getId = function () {
        return this.id;
    };

    /**
    * @method setUnit
    * @param {String} unit
    */
    p.setUnit = function (unit) {
        this.unit = (unit !== undefined && unit !== null) ? unit + '' : null;
    };

    /**
    * @method getUnit
    * @return {String}
    */
    p.getUnit = function () {
        return this.unit;
    };

    /**
    * @method setMinValue
    * @param {Number} minValue
    */
    p.setMinValue = function (minValue) {
        this.minValue = (Utils.isNumeric(minValue) && !Array.isArray(minValue)) ? Number(minValue) : null;
    };

    /**
    * @method getMinValue
    * @return {Number}
    */
    p.getMinValue = function () {
        return this.minValue;
    };

    /**
    * @method setMaxValue
    * @param {Number} maxValue
    */
    p.setMaxValue = function (maxValue) {
        this.maxValue = (Utils.isNumeric(maxValue) && !Array.isArray(maxValue)) ? Number(maxValue) : null;
    };

    /**
    * @method getMaxValue
    * @return {Number}
    */
    p.getMaxValue = function () {
        return this.maxValue;
    };

    /**
    * @method setValue
    * @param {Number} value
    */
    p.setValue = function (value) {
        this.value = (Utils.isNumeric(value) && !Array.isArray(value)) ? Number(value) : null;
    };

    /**
    * @method getValue
    * @return {Number}
    */
    p.getValue = function () {
        return this.value;
    };

    Node.json2Node = function (jsonNode) {

        if (Utils.isObject(jsonNode)) {
            var node = new Node(jsonNode.value,
                jsonNode.unit,
                jsonNode.minValue,
                jsonNode.maxValue,
                jsonNode.id);

            return node;
        } else {
            return null;
        }
    };

    return Node;

});
