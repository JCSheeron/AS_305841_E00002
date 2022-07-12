'use strict';
var keyboardRestrictions = require('./keyboard_restrictions.json'), 
    elementCollection = new Map(),
    basicTypes = ['number', 'string', 'boolean', 'undefined'],
    pattern = /[a-z,A-Z]/g,
    type = '';
    
function iterateObject(o) { 
    Object.keys(o).forEach(function (key) {
        var isBaseDatatype = basicTypes.indexOf(typeof this[key]) > -1,
            isInstance = key === '$';
        type = (key && pattern.test(key)) ? key : type;
        //console.log(type, isBaseDatatype, this[key]);
        if (elementCollection.has(type)) {
            var oldValue = elementCollection.get(type);
            if (isInstance || isBaseDatatype) {
                elementCollection.set(type, oldValue + 1);
            }
            
        } else {
            elementCollection.set(type, 0);
        }
        if (this[key] && !isBaseDatatype && key !== '$') {
            iterateObject(this[key]);
        }
    }, o);
}
function checkRestrictions(restrictions, collection) {
    var result = { success: true, err: '' },
        restriction = '',
        count = 0,
        minOccurs = 0,
        maxOccurs = Infinity;
    for (restriction in restrictions) {
        count = collection.has(restriction) ? collection.get(restriction) : 0;
        minOccurs = restrictions[restriction].minOccurs !== undefined ? restrictions[restriction].minOccurs : 0;
        maxOccurs = restrictions[restriction].maxOccurs !== undefined ? restrictions[restriction].maxOccurs : Infinity;
        result.success = result.success && checkRestriction(count, minOccurs, maxOccurs);
        if (!result.success) {
            result.err = 'range error for number of instances of element "' + restriction + '" count:' + count + ', min:' + minOccurs + ', max:' + maxOccurs;
            return result; 
        }
    }
    return result;
}
function checkRestriction(count, min, max) {
    return count >= min && count <= max;
}
module.exports = {
    validate: function (xmlObj, keyboardType) {
        elementCollection = new Map();
        type = '';
        iterateObject(xmlObj);
        return checkRestrictions(keyboardRestrictions[keyboardType], elementCollection);
    }
}
;
