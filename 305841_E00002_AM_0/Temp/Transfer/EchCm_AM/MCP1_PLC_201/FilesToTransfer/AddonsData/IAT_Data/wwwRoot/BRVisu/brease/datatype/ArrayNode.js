define(['brease/datatype/Node', 'brease/core/Utils'], function (Node, Utils) {

    'use strict';

    /**
    * @class brease.datatype.ArrayNode
    * @extends Object
    * Array of values with one unit for binding with arrays of OPC-UA nodes.  
    * <section>Example: var node = new ArrayNode([5,6,7,8,9], 'BAR', 0, 10); </section>
    */
    /**
    * @method constructor
    * Creates a new ArrayNode instance.
    * @param {Number[]} value
    * @param {String} unit
    * @param {Number} [minValue=null]
    * @param {Number} [maxValue=null]
    * @param {String} [id] id will be generated, if no one is defined.
    */

    /**
    * @property {Number[]} value (required)
    */
    /**
    * @property {String} unit (required)
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

    var ArrayNode = function ArrayNode(value, unit, minValue, maxValue, id) {
            _count += 1;
            this.id = (id !== undefined) ? id : 'brease_arrayNode_' + _count;
            this.setUnit(unit);
            this.setValue(value);
            this.setMinValue(minValue);
            this.setMaxValue(maxValue);
        },
        _count = 0,
        p = ArrayNode.prototype = new Node();

    /**
    * @method setValue
    * @param {Number[]} value
    */
    p.setValue = function (value) {
        if (Array.isArray(value) !== true) {
            console.warn('ArrayNode: value has to be of type Array:', value);
            this.value = [];
        } else {
            this.value = value;
        }
    };

    ArrayNode.json2ArrayNode = function (jsonArrayNode) {

        if (Utils.isObject(jsonArrayNode)) {
            var arrayNode = new ArrayNode(jsonArrayNode.value,
                jsonArrayNode.unit,
                jsonArrayNode.minValue,
                jsonArrayNode.maxValue,
                jsonArrayNode.id);

            return arrayNode;
        } else {
            return null;
        }
    };

    return ArrayNode;

});
