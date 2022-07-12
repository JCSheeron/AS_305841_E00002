define(['brease/services/libs/PasswordPolicies'],
    function (PasswordPolicies) {

        'use strict';
        
        /**
        * @class system.widgets.ChangePasswordDialog.libs.PolicyView
        */
        var PolicyView = function () {
                this.lines = {};
            },
            _textKeys = {
                alphanumeric: 'IAT/System/Dialog/POLICY_DESC_ALPHANUMERIC',
                mixedCase: 'IAT/System/Dialog/POLICY_DESC_MIXEDCASE',
                minLength: 'IAT/System/Dialog/POLICY_DESC_MINLENGTH',
                specialChar: 'IAT/System/Dialog/POLICY_DESC_SPECIALCHAR'
            },
            p = PolicyView.prototype;

        p.init = function (widgetElem, $contentBox) {
            var template,
                clone;

            if (widgetElem && typeof widgetElem.querySelector === 'function') {
                template = widgetElem.querySelector('#passwordPolicyTemplate');
            }
            if (template && template.content && typeof template.content.cloneNode === 'function') {
                clone = template.content.cloneNode(true); 
            }
            if ($contentBox && typeof $contentBox.append === 'function') {
                $contentBox.append(clone); 
                this.$policyBox = $contentBox.find('.policyBox');
            }
            this.viewPolicies();
        };

        /**
        * @method
        * @param {PasswordPolicies} policies
        */
        p.setPolicies = function (policies) {
            if (policies instanceof PasswordPolicies) {
                this.policies = policies;
                this.viewPolicies();
            }
        };

        p.viewPolicies = function () {
            if (this.policies && this.$policyBox) {
                this.$policyBox.find('.policyBoxHeader').text(brease.language.getText('IAT/System/Dialog/POLICY_HEADER'));
                for (var key in this.policies) {
                    //console.log('key:' + key);
                    this.lines[key] = this.$policyBox.find('.' + key);
                    if (key === 'minLength') {
                        var text = brease.language.getText(_textKeys[key]);
                        text = text.replace('{1}', '' + this.policies[key]);
                        this.lines[key].find('p').text(text);
                    } else {
                        this.lines[key].toggle(this.policies[key]);
                        this.lines[key].find('p').text(brease.language.getText(_textKeys[key]));
                    }
                }
            }
        };

        /**
        * @method applyValidationResult
        * @param {PoliciesResult} validationResult
        */
        p.applyValidationResult = function (validationResult) {
            //console.log(JSON.stringify(validationResult));
            for (var key in this.policies) {
                if (this.lines[key]) {
                    if (!validationResult[key]) {
                        this.lines[key].removeClass('success').addClass('fail');
                    } else {
                        this.lines[key].removeClass('fail').addClass('success');
                    } 
                }
            }
        };

        p.hide = function () {
            if (this.$policyBox) {
                this.$policyBox.hide(); 
            }
        };

        p.dispose = function () {
            this.$policyBox = undefined;
            this.lines = undefined;
        };

        return PolicyView;
    });
