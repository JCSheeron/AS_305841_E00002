define(['brease/services/RuntimeService'], function (runtimeService) {

    'use strict';

    /**
    * @class brease.services.Opcua
    * @extends core.javascript.Object
    * Opcua service; available via brease.services.opcua
    *
    * Supported opcua standard data types: LocaleId, Boolean, Byte, SByte, DateTime, UtcTime, Number, Double, Duration, Float, Enumeration, IdType,
    * Integer, Int16, Int32, Int64, NamingRuleType, NodeClass, String, UInteger, UInt16, UInt32, UInt64, Structure
    * @singleton
    */
    var Opcua = {

        /**
        * @method readNodeHistory
        * Method to read history of an OPC UA node  
        * Example:
        *
        *       brease.services.opcua.readNodeHistory([{
        *           "nodeId": "NS6|String|::Program:var1",
        *           "unit": "MTS"
        *       }]).then(showResult);
        *
        * @param {NodeInfo[]} nodesReadInfo (required)
        * @param {TimeSpan} timeSpan (required)
        * @param {String} [serverAlias] Optional alias of the OPC-UA server; the default OPC-UA server is used, if the parameter is empty or not set.
        * @return {Promise}
        */
        readNodeHistory: function (nodesReadInfo, timeSpan, serverAlias) {
            var deferred = $.Deferred(),
                parameter = _addProperties('serverAlias', serverAlias),
                data = {
                    'nodesReadInfo': nodesReadInfo
                };
            if (timeSpan) {
                data.timeSpan = timeSpan;
            }

            runtimeService.opcuaReadNodeHistory(data, parameter, runtimeServiceCallback, { deferred: deferred });
            return deferred.promise();
        },

        /**
        * @method readHistoryCount
        * Method to read the number of available historical data of an OPC UA node in a defined time span  
        * Example:
        *
        *       brease.services.opcua.readHistoryCount("::Program:var1", {
        *               "startTime": "2016-01-01T01:01:01.001",
        *               "endTime": "2016-01-01T01:02:01.001"
        *           }).then(showResult);
        *
        * @param {String} nodeId (required)
        * @param {TimeSpan} timeSpan (required)
        * @param {String} [serverAlias] Optional alias of the OPC-UA server; the default OPC-UA server is used, if the parameter is empty or not set.
        * @return {Promise}
        */
        readHistoryCount: function (nodeId, timeSpan, serverAlias) {
            var deferred = $.Deferred(),
                parameter = _addProperties('serverAlias', serverAlias);

            runtimeService.opcuaReadHistoryCount({
                'nodeId': nodeId,
                'timeSpan': timeSpan
            }, parameter, runtimeServiceCallback, { deferred: deferred });
            return deferred.promise();
        },

        /**
        * @method readHistoryStart
        * Method to read the first (oldest) historical value of an OPC UA node  
        * Example:
        *
        *       brease.services.opcua.readHistoryStart("::Program:var1").then(showResult);
        *
        * @param {String} nodeId (required)
        * @param {String} [serverAlias] Optional alias of the OPC-UA server; the default OPC-UA server is used, if the parameter is empty or not set.
        * @return {Promise}
        */
        readHistoryStart: function (nodeId, serverAlias) {
            var deferred = $.Deferred(),
                parameter = _addProperties('serverAlias', serverAlias);
            runtimeService.opcuaReadHistoryStart({ 'nodeId': nodeId }, parameter, runtimeServiceCallback, { deferred: deferred });
            return deferred.promise();
        },

        /**
        * @method readHistoryEnd
        * Method to read the last (newest) historical value of an OPC UA node  
        * Example:
        *
        *       brease.services.opcua.readHistoryEnd("::Program:var1").then(showResult);
        *
        * @param {String} nodeId (required)
        * @param {String} [serverAlias] Optional alias of the OPC-UA server; the default OPC-UA server is used, if the parameter is empty or not set.
        * @return {Promise}
        */
        readHistoryEnd: function (nodeId, serverAlias) {
            var deferred = $.Deferred(),
                parameter = _addProperties('serverAlias', serverAlias);
            runtimeService.opcuaReadHistoryEnd({ 'nodeId': nodeId }, parameter, runtimeServiceCallback, { deferred: deferred });
            return deferred.promise();
        },

        /**
        * @method browse
        * Method to read all referenced nodes of an OPC UA node  
        * Example:
        *
        *       brease.services.opcua.browse("::Program:var1").then(showResult);
        *
        * @param {String} nodeId (required)
        * @param {String} [serverAlias] Optional alias of the OPC-UA server; the default OPC-UA server is used, if the parameter is empty or not set.
        * @return {Promise}
        */
        browse: function (nodeId, serverAlias) {
            var deferred = $.Deferred(),
                parameter = _addProperties('serverAlias', serverAlias);
            runtimeService.opcuaBrowse({ 'nodeId': nodeId }, parameter, runtimeServiceCallback, { deferred: deferred });
            return deferred.promise();
        },

        /**
        * @method read
        * Method to read all attributes of an OPC UA node  
        * Example:
        *
        *       brease.services.opcua.read([
        *           {
        *           "nodeId": "::Program:var1",
        *           "attributeId": 13
        *           }
        *       ]).then(showResult);
        *
        * @param {Object[]} nodesToRead (required)
        * @param {String} [serverAlias] Optional alias of the OPC-UA server; the default OPC-UA server is used, if the parameter is empty or not set.
        * @return {Promise}
        */
        read: function (nodes, serverAlias) {
            var deferred = $.Deferred(),
                parameter = _addProperties('serverAlias', serverAlias);
            runtimeService.opcuaRead({ 'nodesToRead': nodes }, parameter, runtimeServiceCallback, { deferred: deferred });
            return deferred.promise();
        },

        /**
        * @method callMethod
        * Method to call a method on OPC UA Server  
        * Example:
        *
        *       brease.services.opcua.callMethod("::Program:var1", "methodXY", {"arg1":10, "arg2":true}).then(showResult);
        *
        * @param {String} objectId (required) NodeId of object which provides the method
        * @param {String} methodId (required) NodeId of method
        * @param {Object} args arguments of method as key-value pairs
        * @param {String} [serverAlias] Optional alias of the OPC-UA server; the default OPC-UA server is used, if the parameter is empty or not set.
        * @return {Promise}
        */
        callMethod: function (objectId, methodId, args, serverAlias) {
            var deferred = $.Deferred(),
                parameter = _addProperties('serverAlias', serverAlias);
            runtimeService.opcuaCallMethod({ 'objectId': objectId, 'methodId': methodId, 'arguments': args }, parameter, runtimeServiceCallback, { deferred: deferred });
            return deferred.promise();
        }
    };

    function runtimeServiceCallback(result, callbackInfo) {
        callbackInfo.deferred.resolve(result);
    }

    function _addProperties(propName, propValue) {
        var obj;
        if (propValue !== undefined) {
            obj = {};
            obj[propName] = propValue;
        }
        return obj;
    }

    return Opcua;

});
