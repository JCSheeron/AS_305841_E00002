define(['brease/enum/Enum'], function (Enum) {
    'use strict';

    /**
    * @class brease.controller.libs.KeyActions
    * @extends Object
    * @singleton
    */
    const KEY = {
        'Enter': [Enum.KeyAction.Accept],
        'Escape': [Enum.KeyAction.Cancel, Enum.KeyAction.Close],
        'ArrowDown': [Enum.KeyAction.ScrollDown],
        'ArrowUp': [Enum.KeyAction.ScrollUp],
        'ArrowRight': [Enum.KeyAction.ScrollRight],
        'ArrowLeft': [Enum.KeyAction.ScrollLeft],
        'PageDown': [Enum.KeyAction.ScrollDownFast],
        'PageUp': [Enum.KeyAction.ScrollUpFast]
    };

    return {
        /**
        * @method getActionForKey
        * returns action with highest priority for a KeyboardEvent.key.
        * @param {String} key currently supported keys: 'Enter','Escape','ArrowDown','ArrowUp','PageDown','PageUp'
        * @return {brease.enum.KeyAction} returns action associated with the key. Returns undefined if there is no action for key
        */
        getActionForKey: function (key) {
            var actions = KEY[key];
            return actions !== undefined ? actions[0] : undefined;
        },

        /**
        * @method getActionsForKey
        * returns all actions assigned to KeyboardEvent.key.
        * This should be used if you expect a action which could be assigned to a key which has already a assigned action.
        * Check for your action with getActionsForKey(key).indexOf(Enum.KeyAction.Close) !== -1
        * @param {String} key currently supported keys: 'Escape'
        * @return {Array} returns all the actions associated with the key. Return empty array if there is no action for key.
        */
        getActionsForKey: function (key) {
            var actions = KEY[key];
            return actions !== undefined ? actions : [];
        }
    };
});
