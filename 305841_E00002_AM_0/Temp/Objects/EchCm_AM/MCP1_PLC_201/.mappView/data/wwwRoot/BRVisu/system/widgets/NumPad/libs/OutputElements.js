define(function () {

    'use strict';

    var OutputElements = function () {
        this.elements = [];
    };

    OutputElements.prototype.addElement = function (element) {
        if (this.elements.indexOf(element) === -1) {
            this.elements.push(element);
        }
    };

    OutputElements.prototype.changeListener = function (e) {
        this.walkElements('setValue', [e.detail.value]);
        this.walkElements('setValueAsString', [e.detail.strValue]);
    };

    OutputElements.prototype.validListener = function (e) {
        this.walkElements('setError', [!e.detail.valid]);
    };

    OutputElements.prototype.setValue = function (value) {
        this.walkElements('setValue', [value]);
    };

    OutputElements.prototype.setValueAsString = function (str) {
        this.walkElements('setValueAsString', [str]);
    };

    OutputElements.prototype.setConfig = function (config) {
        this.walkElements('setConfig', [config]);
    };

    OutputElements.prototype.update = function () {
        this.walkElements('update', []);
    };

    OutputElements.prototype.dispose = function () {
        this.walkElements('dispose', []);
    };

    OutputElements.prototype.walkElements = function (fn, args) {
        this.elements.forEach(function (element) {
            if (typeof element[fn] === 'function') {
                element[fn].apply(element, args);
            }
        });
    };

    return OutputElements;
});
