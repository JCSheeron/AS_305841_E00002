define(['brease/events/EventDispatcher'], function (EventDispatcher) {

    'use strict';

    var Value = function () {
        this.settings = {};
        this.sign = 1;
        this.strValue = '';
    };

    Value.prototype = new EventDispatcher();

    Value.prototype.setConfig = function (config) {
        for (var key in config) {
            this.settings[key] = config[key];
        }
    };

    Value.prototype.changeListener = function (e) {
        this.initialSetValue(e.detail.value);
    };

    Value.prototype.initialSetValue = function (value) {
        this.value = undefined;
        this.setValue(value);
        this.outputIsInitialized = false;
    };

    Value.prototype.setValue = function (value) {
        _internalSetValue.call(this, value);
    };

    Value.prototype.getValue = function () {
        return this.value;
    };

    Value.prototype.getStringValue = function () {
        return this.strValue;
    };

    Value.prototype.actionListener = function (e) {
        _processAction.call(this, e.detail.action, e.detail.value);
    };

    /**
     * @method stripLeadingZeros
     * Strips leading zeros from a string representation of a number.  
     * Up to two leading zeros are supported.  
     * @param {String} str
     */
    Value.prototype.stripLeadingZeros = function (str) {
        str = '' + str;
        var dsp = this.settings.separators.dsp,
            sign = (str.indexOf('-') === 0) ? '-' : '',
            unsigned = str.substring((sign !== '') ? 1 : 0);

        // first strip leading duplicate zeros
        // (occurs if oldValue='0' and the user types '0' -> str='00')
        if (unsigned.indexOf('00') === 0) {
            unsigned = unsigned.substring(1);
        }

        // then strip leading zeros for numbers other than 0.xx (index of 0=0, index of dsp=1)
        // (occurs if e.g. oldValue='0' and the user types '6' -> str='06')
        if (unsigned.indexOf('0') === 0 && unsigned.indexOf(dsp) !== 1) {
            unsigned = unsigned.substring(1);
        }
        return sign + unsigned;
    };

    function _processAction(action, buttonValue) {

        switch (action) {

            case 'delete':
                _processDelete.call(this, this.strValue);
                break;
            case 'comma':
                _processComma.call(this, this.strValue);
                break;
            case 'sign':
                _processSign.call(this, this.strValue);
                break;
            case 'clear':
                _processClear.call(this);
                break;

            case 'value':
                _processValue.call(this, this.strValue, buttonValue);
                break;
        }
    }

    function _processDelete(actString) {
        if (actString === brease.settings.noValueString && this.outputIsInitialized === false) {
            _internalSetValue.call(this, 0);
        } else {
            _setValueAsString.call(this, actString.substring(0, actString.length - 1));
        }
    }

    function _processComma(actString) {
        if (this.outputIsInitialized === false) {
            actString = '0';
        }
        if (actString.indexOf(this.settings.separators.dsp) === -1) {
            _setValueAsString.call(this, actString + this.settings.separators.dsp);
        }
    }

    function _processSign(actString) {
        var newString;
        if (this.sign === -1) {
            newString = actString.replace('-', '');
            _setSign.call(this, 1);
        } else {
            newString = '-' + actString;
            _setSign.call(this, -1);
        }
        _setValueAsString.call(this, newString, true);
    }

    function _processClear() {
        _setValueAsString.call(this, '0');
    }

    function _processValue(actString, buttonValue) {
        if (!isNaN(buttonValue)) {
            if (this.outputIsInitialized === false) {
                _setValueAsString.call(this, ((actString.substring(0, 1) === '-') ? '-' : '') + buttonValue);
            } else {
                var newString = actString + buttonValue;
                var commaIndex = newString.indexOf(this.settings.separators.dsp),
                    nachKomma = (commaIndex !== -1) ? newString.substring(commaIndex + 1) : '';

                if (nachKomma.length <= this.settings.numberFormat.decimalPlaces) {
                    _setValueAsString.call(this, actString + buttonValue);
                }
            }
        }
    }

    function _internalSetValue(value) {
        var oldValue = this.value,
            oldStrValue = this.strValue;

        this.value = parseFloat(value);
        this.strValue = _format.call(this, this.value);
        if (this.value >= 0) {
            _setSign.call(this, 1);
        } else {
            _setSign.call(this, -1);
        }
        if (this.value !== oldValue || this.strValue !== oldStrValue) {
            /**
            * @event ValueChanged 
            * @param {Number} value  
            * @param {String} strValue  
            */
            this.dispatchEvent({
                type: 'ValueChanged',
                detail: {
                    'value': this.value,
                    'strValue': this.strValue
                }
            });
        }
    }

    function _setValueAsString(strValue, omitInit) {
        strValue = this.stripLeadingZeros(strValue);
        if (strValue === '') {
            strValue = '0';
        }
        if (strValue === '-') {
            strValue = '-0';
        }

        this.strValue = strValue;
        this.value = brease.formatter.parseFloat(this.strValue, this.settings.separators);

        if (this.strValue.substring(0, 1) === '-') {
            _setSign.call(this, -1);
        } else {
            _setSign.call(this, 1);
        }

        this.dispatchEvent({
            type: 'ValueChanged',
            detail: {
                'value': this.value,
                'strValue': this.strValue
            }
        });
        if (omitInit !== true) {
            this.outputIsInitialized = true;
        }
    }

    function _setSign(sign) {
        var oldSign = this.sign;
        this.sign = sign;
        if (this.sign !== oldSign) {
            /**
            * @event SignChanged 
            * @param {String} sign   
            */
            this.dispatchEvent({
                type: 'SignChanged',
                detail: {
                    'sign': this.sign
                }
            });
        }
    }

    function _format(value) {
        if (isNaN(value)) {
            return brease.settings.noValueString;
        } else {
            return brease.formatter.formatNumber(value, this.settings.numberFormat, this.settings.useDigitGrouping, this.settings.separators);
        }
    }

    return Value;
});
