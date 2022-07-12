define(function () {

    'use strict';

    /**
    * @class system.widgets.ChangePasswordDialog.libs.PoliciesResult
    * @alternateClassName PoliciesResult
    * @extends Object
    */
    /**
    * @method constructor
    * Creates a new PoliciesResult instance.
    * @param {Boolean} alphanumeric
    * @param {Boolean} mixedCase
    * @param {Boolean} minLength
    * @param {Boolean} specialChar
    */
    /**
    * @property {Boolean} alphanumeric
    */
    /**
    * @property {Boolean} mixedCase
    */
    /**
    * @property {Boolean} minLength
    */
    /**
    * @property {Boolean} specialChar 
    */
    var PoliciesResult = function (alphanumeric, mixedCase, minLength, specialChar) {
        this.alphanumeric = alphanumeric;
        this.mixedCase = mixedCase;
        this.minLength = minLength; 
        this.specialChar = specialChar;
    };

    return PoliciesResult;

});
