define(function () {

    'use strict';

    /**
    * @class brease.enum.EnumObject
    * @extends core.javascript.Function
    */
    /**
    * @method constructor
    * Creates a new EnumObject instance.  
    * ##Example
    *       var align = new EnumObject({
    *           center: 'c',
    *           left: 'l',
    *           right: 'r'
    *       });
    * @param {Object} valueObj A key/value object of members of the enum
    */
    var EnumObject = function EnumObject(valueObj) {

        for (var key in valueObj) {
            if (EnumObject.prototype[key]) {
                throw new SyntaxError("reserved key '" + key + "'");
            }
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: false,
                writable: false,
                value: valueObj[key]
            });
        }

    };

    /**
    * @method hasMember
    * Check if EnumObject contains member  
    * ##Example  
    *     var align = new EnumObject({ center: 'c', left: 'l', right: 'r' });  
    *     expect(align.hasMember('c')).toBeTruthy();  
    *     
    * @param {ANY} member the value of a member
    * @return {Boolean}
    */
    Object.defineProperty(EnumObject.prototype, 'hasMember', {
        value: function (obj) {
            return (this.getMembers().indexOf(obj) !== -1);
        },
        enumerable: false,
        configurable: false,
        writable: false
    });

    /**
    * @method getMembers  
    * Get all member values of an EnumObject  
    * ##Example  
    *     var align = new EnumObject({ center: 'c', left: 'l', right: 'r' });  
    *     expect(align.getMembers()).toEqual(["c", "l", "r"]);  
    *     
    * @return {Array}
    */
    Object.defineProperty(EnumObject.prototype, 'getMembers', {
        value: function () {
            var members = [];
            for (var member in this) {
                if (this.propertyIsEnumerable(member) && typeof this[member] !== 'function') {
                    members.push(this[member]);
                }
            }
            return members;
        },
        enumerable: false,
        configurable: false,
        writable: false
    });

    /**
    * @method getKeyForValue
    * Get the key for a member value  
    * ##Example  
    *     var align = new EnumObject({ center: 'c', left: 'l', right: 'r' });  
    *     expect(align.getKeyForValue('c')).toEqual('center');  
    *     
    * @param {ANY} value
    * @return {String}
    */
    Object.defineProperty(EnumObject.prototype, 'getKeyForValue', {
        value: function (value) {
            var key;
            for (var member in this) {
                if (this[member] === value) {
                    key = member;
                    break;
                }
            }
            return key;
        },
        enumerable: false,
        configurable: false,
        writable: false
    });

    return EnumObject;
});
