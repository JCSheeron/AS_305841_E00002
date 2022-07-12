define(['system/widgets/ChangePasswordDialog/libs/Message',
    'brease/core/StringUtils', 
    'brease/services/libs/PasswordPolicies'],
function (Message, StringUtils, PasswordPolicies) {

    /**
    * @class system.widgets.ChangePasswordDialog.libs.Validator
    */

    'use strict';

    var Validator = function () {},
        p = Validator.prototype;

    /**
    * @method validate
    * Validate form fields. Form fields are provided in object form as string properties.  
    * Parameter testInputs defines which of the fields have to be validated.  
    * @param {String[]} testInputs
    * @param {Object} form
    * @param {String} form.userName
    * @param {String} form.oldPassword
    * @param {String} form.newPassword
    * @param {String} form.confirmPassword
    * @param {Integer} userNameMinLength
    * @return {Object}
    * @return {Boolean} return.isValid
    * @return {system.widgets.ChangePasswordDialog.libs.Message[]} return.arError Array of error messages.
    * @return {String[]} return.arInputs Names of fields which are not valid.
    * @return {PoliciesResult} return.policiesResult result of policy check of newPassword
    */
    p.validate = function (testInputs, form, userNameMinLength) {
        var instance = this,
            arError = [],
            arInputs = [],
            isValid = true,
            result;
        testInputs = (Array.isArray(testInputs)) ? testInputs : [];
        userNameMinLength = (userNameMinLength !== undefined) ? userNameMinLength : 1;
            
        testInputs.forEach(function (inputName) {
            result = _validate.call(instance, inputName, form, userNameMinLength);
            if (!result.isValid) {
                arError = arError.concat(result.messages);
                arInputs.push(inputName); 
            }
            isValid = isValid && result.isValid;
        }, this);
            
        var retVal = { 
            isValid: isValid,
            arError: arError,
            arInputs: arInputs
            
        };
        if (result && result.policiesResult) {
            retVal.policiesResult = result.policiesResult;
        }
        return retVal;
    };
    function _validate(inputName, form, userNameMinLength) {
        var result = {
                messages: []
            }, 
            isValid;

        switch (inputName) {
            case 'userName':
                isValid = StringUtils.testMinLength(form.userName, userNameMinLength);
                if (!isValid) {
                    result.message = new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_USERNAME_EMPTY'), Message.Type.ERROR);
                }
                break;
                
            case 'oldPassword':
                isValid = StringUtils.testMinLength(form.oldPassword, 1);
                if (!isValid) {
                    result.messages.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_OLDPASSWORD_EMPTY'), Message.Type.ERROR));
                }
                break;
                
            case 'confirmPassword':
                isValid = StringUtils.testEquality(form.confirmPassword, form.newPassword);
                if (!isValid) { 
                    result.messages.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_PASSWORDS_DIFFERENT'), Message.Type.ERROR));
                } 
                break;

            case 'newPassword':
                isValid = !StringUtils.testEquality(form.oldPassword, form.newPassword);
                if (!isValid) {
                    result.messages.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_NEWPASSWORD_NOTEQUAL_OLD'), Message.Type.ERROR)); 
                }
                if (this.policies) {
                    result.policiesResult = this.testPolicies(form.newPassword, this.policies);
                    isValid = isValid && Object.keys(result.policiesResult).reduce(function (acc, cur) {
                        return acc && result.policiesResult[cur];
                    }, true);
                    if (!isValid) {
                        result.messages.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_POLICIES_NOT_MET'), Message.Type.ERROR)); 
                    }
                } else {
                    isValid = isValid && StringUtils.testMinLength(form.newPassword, 1);
                    if (!isValid) {
                        result.messages.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_NEWPASSWORD_EMPTY'), Message.Type.ERROR)); 
                    }
                } 
                break;
        }
        result.isValid = isValid;
        return result;
    }
    /**
    * @method
    * @param {PasswordPolicies} policies
    */
    p.setPolicies = function (policies) {
        if (policies instanceof PasswordPolicies) {
            this.policies = policies;
        }
    };

    /**
    * @method
    * Test a string for password policies. Object "policies" indicates which policy has to be tested.  
    * @param {String} str
    * @param {PasswordPolicies} policies
    * @return {PoliciesResult}
    */
    p.testPolicies = function (str, policies) {
        var result = {
            alphanumeric: true,
            mixedCase: true,
            minLength: true,
            specialChar: true
        };
        
        if (policies.alphanumeric) {
            result.alphanumeric = StringUtils.containsNumericAndAlphanumeric(str);
        }
        
        if (policies.mixedCase) {
            result.mixedCase = StringUtils.containsMixedCase(str);
        }
        
        if (policies.minLength) {
            result.minLength = StringUtils.testMinLength(str, policies.minLength);
        }

        if (policies.specialChar) {
            result.specialChar = StringUtils.containsSpecial(str);
        }

        return result;
    };

    p.dispose = function () {
    };

    function _text(key) {
        return brease.language.getText(key);
    }

    return Validator;
});
