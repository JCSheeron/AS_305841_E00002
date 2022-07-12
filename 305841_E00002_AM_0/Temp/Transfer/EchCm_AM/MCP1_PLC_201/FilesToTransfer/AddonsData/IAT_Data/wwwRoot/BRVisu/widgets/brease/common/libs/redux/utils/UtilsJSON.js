define(function () {

    'use strict';
    /**
    * @class widgets.brease.common.libs.redux.utils.UtilsJSON
    * @extends core.javascript.Object
    */

    var UtilsJSON = {};

    /**
     * @method 
     * This method will parse a string into a json object and return this.
     * If the string is incorrect json it will return an empty object
     * @param {String} jsonData string that should be converted into an object
     * @returns {Object}
     */
    UtilsJSON.convertJSONtoObject = function (jsonData) {
        jsonData = jsonData || {};
        if (typeof jsonData === 'string' && jsonData.length > 0) {
            try {
                return JSON.parse(jsonData.replace(/'/g, '"'));
            } catch (err) {
                console.iatWarn('JSON string erroneous');
                return {};
            }
        }
        return jsonData;
    };

    /**
     * @method 
     * This method will stringify a json object and return the string version of it.
     * If the object is incorrect json it will return an empty string
     * @param {Object} objectData string that should be converted into an object
     * @returns {String}
     */
    UtilsJSON.convertObjectToJSON = function (objectData) {
        objectData = objectData || '';
        if (typeof objectData === 'object' && objectData.length > 0) {
            try {
                return JSON.stringify(objectData);
            } catch (err) {
                console.iatWarn('JSON string erroneous');
                return '';
            }
        }
        return '';
    };

    return UtilsJSON;

});
