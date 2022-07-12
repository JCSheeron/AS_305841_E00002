define(function () {

    'use strict';

    /**
    * @class brease.services.TextFormatter
    * @extends core.javascript.Object
    * TextFormatter Service; available via brease.services.textFormatter  
    * Formatting Texts with a Formatstring and Arguments  
    *   
    * Example of usage:  
    * 
    *       <script>
    *           require(['brease', 'brease/events/BreaseEvent'], function (brease, BreaseEvent) {
    *               
    *               brease.services.textFormatter.format('text', [arguments]).then(        
    *                   successCallBackFunction,
    *                   errorCallBackFunction
    *               });
    *           });
    *       </script>
    * 
    * @singleton
    */
    var TextFormatter = {

        /*
        /* PUBLIC
        */

        init: function (runtimeService) {
            _runtimeService = runtimeService;
            return this;
        },

        isReady: function () {
            _deferred = $.Deferred();
            _deferred.resolve();
            return _deferred.promise();
        },

        /**
        * @method format
        * @async
        * Async function to format a string
        *
        *       brease.textFormatter.format('text', [args]).then(        
        *           function(text) {
        *               //Success Callback
        *           },
        *           function(text) {
        *               //Error Callback
        *           }
        *       });
        *
        * @param {String} text format string or textID
        * @param {Array} args 
        * @return {Promise}
        */
        format: function (text, args) {
            var _def = $.Deferred();
            _runtimeService.formatText(text, args, function (data) {
                _formatTextResponseHandler(data, _def);
            });
            return _def.promise();
        }
    };

    var _deferred,
        _runtimeService;

    function _formatTextResponseHandler(data, def) {

        if (data.success === true) {
            def.resolve(data.string);
        } else {
            def.reject(data.string);
        }

    }

    return TextFormatter;
});
