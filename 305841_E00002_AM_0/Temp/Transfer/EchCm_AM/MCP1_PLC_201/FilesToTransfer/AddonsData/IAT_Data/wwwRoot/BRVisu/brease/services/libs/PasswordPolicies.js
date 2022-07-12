define(['brease/core/Types'], function (Types) {

    'use strict';

    /**
    * @class brease.services.libs.PasswordPolicies
    * @alternateClassName PasswordPolicies
    * @extends Object
    */
    /**
    * @method constructor
    * Creates a new PasswordPolicies instance.
    * @param {Boolean} alphanumeric
    * @param {Boolean} mixedCase
    * @param {Integer} minLength
    * @param {Boolean} specialChar
    */
    /**
    * @property {Boolean} alphanumeric
    * Meaning: password has to contain alphanumeric and numeric characters.  
    * Alphanumeric characters are all standard ASCII characters: a-z and A-Z  
    * Numeric characters are 0-9  
    */
    /**
    * @property {Boolean} mixedCase
    * Meaning: password has to contain uppercase and lowercase characters.  
    * Only alphanumeric characters are taken into account.  
    */
    /**
    * @property {Integer} minLength
    * Meaning: password length has to be at least this number.  
    * Length is measured with standard JavaScript string length.  
    * That means that multi-byte characters have the length of their byte count.  
    * E.g. "abc".length = 3  
    * and  "𐍈𐍈𐍈".length = 6  
    */
    /**
    * @property {Boolean} specialChar
    * Meaning: password has to contain at least 1 special character.  
    * Special characters are all characters, which are not alphanumeric or numeric.  
    */
    var PasswordPolicies = function (alphanumeric, mixedCase, minLength, specialChar) {
        this.alphanumeric = alphanumeric === true;
        this.mixedCase = mixedCase === true;
        this.minLength = Types.parseValue(minLength, 'Integer', { min: 0, default: 1 }); 
        this.specialChar = specialChar === true;
    };

    /**
    * @method fromServerData
    * Convert server response object to a PasswordPolicies instance
    * @static
    * @param {Object} data server data
    * @param {Boolean} data.PasswordAlphanumeric
    * @param {Boolean} data.PasswordCase
    * @param {Integer} data.PasswordMinLength
    * @param {Boolean} data.PasswordSpecialChar
    * @return {PasswordPolicies}
    */
    PasswordPolicies.fromServerData = function (data) {
        if (data) {
            return new PasswordPolicies(data.PasswordAlphanumeric, data.PasswordCase, data.PasswordMinLength, data.PasswordSpecialChar);
        } else {
            return new PasswordPolicies();
        }
    };

    return PasswordPolicies;

});
