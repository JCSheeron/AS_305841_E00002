define([
    'brease/core/Class'
], function (SuperClass) {

    'use strict';
    
    /**
     * @class widgets.brease.keyBoard.PluginProto
     * #Description
     * Plugin Prototype for keyboard extension
     * @extends Class
     * @aside guide creating_a_keyboard_plugin
     * @iatMeta category:Category
     * PlugIn
     */
    var Plugin = SuperClass.extend(function Plugin() {
            SuperClass.call(this);
        }),

        p = Plugin.prototype;

    /**
     * @method init
     * is called by the keyboard when the plugin is loaded
     * @param {widgets.brease.KeyBoard} keyboard keyboard object
     */
    p.init = function (keyboard) {
        this.keyboard = keyboard;
    };
    
    /**
     * @method show
     * is called by the keyboard when its opened
     */
    p.show = function () { };

    /**
     * @method hide
     * is called by the keyboard when its closed
     */
    p.hide = function () { };

    /**
     * @method onInput
     * is called by the keyboard when the input changes
     * @param {String} value keyboard value
     * @param {Integer} cursor cursor position
     */
    p.onInput = function () { };

    /**
     * @method onDelete
     * is called by the keyboard when a character is deleted with delete button
     * @param {String} value keyboard value
     * @param {Integer} cursor cursor position
     */
    p.onDelete = function () { };

    /**
     * @method dispose
     * is called by the keyboard gets disposed
     */
    p.dispose = function () { };

    return Plugin;
});
