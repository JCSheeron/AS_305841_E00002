define(function () {

    'use strict';

    /**
    * @class brease.objects.Response
    * @alternateClassName Response
    * @extends Object
    */
    /**
    * @property {Boolean} success
    */
    var Response = {
        fromXHR: function (responseText) {

            if (responseText !== '') {
                return _parseResponse(responseText);
            } else {
                return { success: false };
            }
        }
    };

    function _parseResponse(responseText) {

        try {
            var response = JSON.parse(responseText);
            if (response.Error || response.error) {
                response.success = false;
                if (response.error) {
                    response.Error = { Code: -1, Text: response.error };
                    delete response.error;
                }
                return response;
            } else {
                if (response.success === undefined) {
                    response.success = true;
                }
                return response;
            }
        } catch (e) {
            console.iatWarn('malformed data in server response!');
            return {
                success: false,
                Error: {
                    Code: -1,
                    Text: 'malformed data in server response'
                }
            };
        }
    }

    return Response;
});
