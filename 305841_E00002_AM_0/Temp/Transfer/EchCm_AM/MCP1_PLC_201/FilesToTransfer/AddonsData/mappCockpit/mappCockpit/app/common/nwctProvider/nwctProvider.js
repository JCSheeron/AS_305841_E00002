var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../../libs/dataparsing/Nwct", "../../libs/dataparsing/kaitai-struct/KaitaiStream", "./objParser/nwctRoot", "./enrichment/nwctPreProcess", "./nwctEntry", "../../framework/events", "./nwctTextProvider"], function (require, exports, NwctBinParser, KaitaiStream, nwctRoot_1, nwctPreProcess_1, nwctEntry_1, events_1, nwctTextProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NamespacesLoaded = /** @class */ (function (_super) {
        __extends(NamespacesLoaded, _super);
        function NamespacesLoaded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return NamespacesLoaded;
    }(events_1.TypedEvent));
    ;
    /**
     * this class allows to retrieve nwct data from a single snapshot
     *
     * @export
     * @class NwctProvider
     */
    var NwctProvider = /** @class */ (function () {
        /**
         * Creates an instance of NwctProvider
         * @param {ArrayBuffer} binaryData
         * @memberof NwctProvider
         */
        function NwctProvider(binaryData, nwctMetaDataProvider) {
            var _this = this;
            /**
             * Holds the nwct entries
             *
             * @private
             * @type {INwctEntry[]}
             * @memberof NwctProvider
             */
            this._entries = new Array();
            /**
             * Handler for the namespaces loaded event from the nwctTextProvider
             *
             * @private
             * @memberof NwctProvider
             */
            this._namespacesLoadedHandler = function (sender, args) { return _this.onNamespacesLoaded(sender, args); };
            /**
             * Holds the last bit mask values for the available nodes
             * key   ...... networktype + networkInterfaceIndex + nodeNumber + datagramType + ncObjectType + channelNumber + parId
             * value ...... 7 -> 00000111
             *
             * @private
             * @memberof NwctProvider
             */
            this._lastBitMaskValue = new Map();
            /**
             * Event will be raised after loading of namespaces was finished
             *
             * @memberof NwctProvider
             */
            this.eventNamespacesLoaded = new NamespacesLoaded();
            this._input = binaryData;
            this._nwctMetaDataProvider = nwctMetaDataProvider;
        }
        Object.defineProperty(NwctProvider.prototype, "nwctTextProvider", {
            get: function () {
                return this._nwctTextProvider;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Loads the needed namespace into textProvider
         *
         * @param {Array<string>} namespaces
         * @memberof NwctProvider
         */
        NwctProvider.prototype.loadTextSystemNamespaces = function (namespaces) {
            this._nwctTextProvider = new nwctTextProvider_1.NwctTextProvider();
            this._nwctTextProvider.eventNamespacesLoaded.attach(this._namespacesLoadedHandler);
            this._nwctTextProvider.loadNamespaces(namespaces);
        };
        Object.defineProperty(NwctProvider.prototype, "entries", {
            /**
             * Retruns a list with the entries
             *
             * @readonly
             * @type {Array<INwctEntry>}
             * @memberof NwctProvider
             */
            get: function () {
                if (this._entries.length === 0) {
                    this.retrieveData();
                }
                return this._entries;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raised when the namespaces loading is finished
         *
         * @private
         * @param {NwctTextProvider} sender
         * @param {*} args
         * @memberof NwctProvider
         */
        NwctProvider.prototype.onNamespacesLoaded = function (sender, args) {
            sender.eventNamespacesLoaded.detach(this._namespacesLoadedHandler);
            this.eventNamespacesLoaded.raise(this, undefined);
        };
        /**
         * Deconde the binary ring buffer to an untyped object (NwctBinParser)
         *
         * @private
         * @param {*} binaryData
         * @returns {NwctBinParser} This return value contains the parsed binary data
         * @memberof NwctProvider
         */
        NwctProvider.prototype.retrieveData = function () {
            var _this = this;
            // create a KaitaiStream and pass the binary data
            var kaitaiStream = new KaitaiStream(this._input);
            // pass the structure declaration and encode the binary data
            var untypedObject = new NwctBinParser(kaitaiStream);
            // set the type secure root object to access the nwct data
            var typedEntries = new nwctRoot_1.NwctRoot(untypedObject);
            // resolve:
            // - links between config entries and data entries
            // - links between requests and responses
            var processor = new nwctPreProcess_1.NwctPreProcess(typedEntries);
            // Reset _lastBitMaskValue data
            this._lastBitMaskValue = new Map();
            // reacre new array of entries and push all converted entries into the array
            this._entries = new Array();
            processor.dataEntries.wDataEntries.forEach(function (wDataEntry) {
                var entry = new nwctEntry_1.NwctEntry(wDataEntry, _this._nwctMetaDataProvider, _this._nwctTextProvider);
                if (entry.isBitPattern) {
                    entry.lastBitPatternValue = _this.getLastBitPatternValue(entry);
                }
                _this._entries.push(entry);
            });
        };
        /**
         * Returns the last bit mask value for the given node(networktype + networkInterfaceIndex + nodeNumber + datagramType + ncObjectType + channelNumber + parId)
         * if available, else undefined
         *
         * @private
         * @param {NwctEntry} entry
         * @returns {(number|undefined)}
         * @memberof NwctProvider
         */
        NwctProvider.prototype.getLastBitPatternValue = function (entry) {
            var key = entry.nwctConfigEntry.networkType.value.toString() + entry.nwctConfigEntry.networkInterfaceIndex.value.toString() + entry.nodeNumber.toString() +
                entry.nwctConfigEntry.datagramType.value.toString() + entry.ncObjectType.toString() + entry.channelNumber.toString() + entry.parId.toString();
            var lastBitMaskValue = undefined;
            if (this._lastBitMaskValue.has(key)) {
                // value for key available -> return old available value and set new one
                lastBitMaskValue = this._lastBitMaskValue.get(key);
                this._lastBitMaskValue.set(key, entry.bitPatternNumber);
            }
            else {
                // no value available -> only set the current value
                this._lastBitMaskValue.set(key, entry.bitPatternNumber);
            }
            return lastBitMaskValue;
        };
        return NwctProvider;
    }());
    exports.NwctProvider = NwctProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibndjdFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbndjdFByb3ZpZGVyL253Y3RQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBK0Isb0NBQTZCO1FBQTVEOztRQUE4RCxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQUFDLEFBQS9ELENBQStCLG1CQUFVLEdBQXNCO0lBQUEsQ0FBQztJQUVoRTs7Ozs7T0FLRztJQUNIO1FBb0VJOzs7O1dBSUc7UUFDSCxzQkFBbUIsVUFBd0IsRUFBRSxvQkFBMEM7WUFBdkYsaUJBR0M7WUFqRUQ7Ozs7OztlQU1HO1lBQ0ssYUFBUSxHQUF1QixJQUFJLEtBQUssRUFBYyxDQUFDO1lBRS9EOzs7OztlQUtHO1lBQ0ssNkJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBckMsQ0FBcUMsQ0FBQztZQXlCekY7Ozs7Ozs7ZUFPRztZQUNLLHNCQUFpQixHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1lBRXREOzs7O2VBSUc7WUFDSSwwQkFBcUIsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFRbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7WUFDekIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLG9CQUFvQixDQUFDO1FBQ3RELENBQUM7UUF2Q0Qsc0JBQVcsMENBQWdCO2lCQUEzQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNsQyxDQUFDOzs7V0FBQTtRQXVDRDs7Ozs7V0FLRztRQUNJLCtDQUF3QixHQUEvQixVQUFnQyxVQUF5QjtZQUNyRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxtQ0FBZ0IsRUFBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDbkYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBU0Esc0JBQVcsaUNBQU87WUFQbkI7Ozs7OztlQU1HO2lCQUNGO2dCQUNHLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFDO29CQUMxQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3ZCO2dCQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN6QixDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7O1dBT0c7UUFDSyx5Q0FBa0IsR0FBMUIsVUFBMkIsTUFBd0IsRUFBRSxJQUFTO1lBQzFELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDbkUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxtQ0FBWSxHQUFwQjtZQUFBLGlCQTJCQztZQTFCRyxpREFBaUQ7WUFDakQsSUFBSSxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWpELDREQUE0RDtZQUM1RCxJQUFJLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVwRCwwREFBMEQ7WUFDMUQsSUFBSSxZQUFZLEdBQUcsSUFBSSxtQkFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRS9DLFdBQVc7WUFDWCxrREFBa0Q7WUFDbEQseUNBQXlDO1lBQ3pDLElBQUksU0FBUyxHQUFJLElBQUksK0JBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVsRCwrQkFBK0I7WUFDL0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1lBRW5ELDRFQUE0RTtZQUM1RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7WUFDeEMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUEsVUFBVTtnQkFDakQsSUFBSSxLQUFLLEdBQUcsSUFBSSxxQkFBUyxDQUFDLFVBQVUsRUFBRyxLQUFJLENBQUMscUJBQXFCLEVBQUUsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzNGLElBQUcsS0FBSyxDQUFDLFlBQVksRUFBQztvQkFDbEIsS0FBSyxDQUFDLG1CQUFtQixHQUFHLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEU7Z0JBQ0QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSyw2Q0FBc0IsR0FBOUIsVUFBK0IsS0FBZ0I7WUFDM0MsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLGVBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMsZUFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQy9JLEtBQUssQ0FBQyxlQUFnQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFM0osSUFBSSxnQkFBZ0IsR0FBcUIsU0FBUyxDQUFDO1lBQ25ELElBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQztnQkFDL0Isd0VBQXdFO2dCQUN4RSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUMzRDtpQkFDRztnQkFDQSxtREFBbUQ7Z0JBQ25ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBcExELElBb0xDO0lBcExZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTndjdEJpblBhcnNlciBmcm9tIFwiLi4vLi4vbGlicy9kYXRhcGFyc2luZy9Od2N0XCI7XHJcbmltcG9ydCAqIGFzIEthaXRhaVN0cmVhbSBmcm9tIFwiLi4vLi4vbGlicy9kYXRhcGFyc2luZy9rYWl0YWktc3RydWN0L0thaXRhaVN0cmVhbVwiO1xyXG5pbXBvcnQgeyBOd2N0Um9vdCB9IGZyb20gXCIuL29ialBhcnNlci9ud2N0Um9vdFwiO1xyXG5pbXBvcnQgeyBOd2N0UHJlUHJvY2VzcyB9IGZyb20gXCIuL2VucmljaG1lbnQvbndjdFByZVByb2Nlc3NcIjtcclxuaW1wb3J0IHsgTndjdEVudHJ5IH0gZnJvbSBcIi4vbndjdEVudHJ5XCI7XHJcbmltcG9ydCB7IE53Y3RNZXRhRGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4vbndjdE1ldGFEYXRhUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IE53Y3RUZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi9ud2N0VGV4dFByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IElOd2N0RW50cnkgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL253Y3RFbnRyeUludGVyZmFjZVwiO1xyXG5cclxuY2xhc3MgTmFtZXNwYWNlc0xvYWRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TndjdFByb3ZpZGVyLCBhbnk+eyB9O1xyXG5cclxuLyoqXHJcbiAqIHRoaXMgY2xhc3MgYWxsb3dzIHRvIHJldHJpZXZlIG53Y3QgZGF0YSBmcm9tIGEgc2luZ2xlIHNuYXBzaG90XHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIE53Y3RQcm92aWRlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE53Y3RQcm92aWRlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgbndjdCBpbnB1dCBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0FycmF5QnVmZmVyfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9pbnB1dCA6IEFycmF5QnVmZmVyOyAvLyBpbmNvbW1pbmcgYmluYXJ5IGRhdGFcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgbndjdCBlbnRyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtJTndjdEVudHJ5W119XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2VudHJpZXMgOiBBcnJheTxJTndjdEVudHJ5PiA9IG5ldyBBcnJheTxJTndjdEVudHJ5PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlciBmb3IgdGhlIG5hbWVzcGFjZXMgbG9hZGVkIGV2ZW50IGZyb20gdGhlIG53Y3RUZXh0UHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9uYW1lc3BhY2VzTG9hZGVkSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpPT50aGlzLm9uTmFtZXNwYWNlc0xvYWRlZChzZW5kZXIsIGFyZ3MpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIG53Y3RUZXh0UHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhOd2N0VGV4dFByb3ZpZGVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX253Y3RUZXh0UHJvdmlkZXI6IE53Y3RUZXh0UHJvdmlkZXJ8dW5kZWZpbmVkO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgbndjdFRleHRQcm92aWRlcigpOiBOd2N0VGV4dFByb3ZpZGVyfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbndjdFRleHRQcm92aWRlcjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgbndjdE1ldGFEYXRhUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge053Y3RNZXRhRGF0YVByb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9ud2N0TWV0YURhdGFQcm92aWRlcjogTndjdE1ldGFEYXRhUHJvdmlkZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgbGFzdCBiaXQgbWFzayB2YWx1ZXMgZm9yIHRoZSBhdmFpbGFibGUgbm9kZXNcclxuICAgICAqIGtleSAgIC4uLi4uLiBuZXR3b3JrdHlwZSArIG5ldHdvcmtJbnRlcmZhY2VJbmRleCArIG5vZGVOdW1iZXIgKyBkYXRhZ3JhbVR5cGUgKyBuY09iamVjdFR5cGUgKyBjaGFubmVsTnVtYmVyICsgcGFySWRcclxuICAgICAqIHZhbHVlIC4uLi4uLiA3IC0+IDAwMDAwMTExXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfbGFzdEJpdE1hc2tWYWx1ZSA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudCB3aWxsIGJlIHJhaXNlZCBhZnRlciBsb2FkaW5nIG9mIG5hbWVzcGFjZXMgd2FzIGZpbmlzaGVkXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXZlbnROYW1lc3BhY2VzTG9hZGVkID0gbmV3IE5hbWVzcGFjZXNMb2FkZWQoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTndjdFByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBiaW5hcnlEYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihiaW5hcnlEYXRhIDogQXJyYXlCdWZmZXIsIG53Y3RNZXRhRGF0YVByb3ZpZGVyOiBOd2N0TWV0YURhdGFQcm92aWRlcil7XHJcbiAgICAgICAgdGhpcy5faW5wdXQgPSBiaW5hcnlEYXRhO1xyXG4gICAgICAgIHRoaXMuX253Y3RNZXRhRGF0YVByb3ZpZGVyID0gbndjdE1ldGFEYXRhUHJvdmlkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgbmVlZGVkIG5hbWVzcGFjZSBpbnRvIHRleHRQcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gbmFtZXNwYWNlc1xyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZFRleHRTeXN0ZW1OYW1lc3BhY2VzKG5hbWVzcGFjZXM6IEFycmF5PHN0cmluZz4pe1xyXG4gICAgICAgIHRoaXMuX253Y3RUZXh0UHJvdmlkZXIgPSBuZXcgTndjdFRleHRQcm92aWRlcigpO1xyXG4gICAgICAgIHRoaXMuX253Y3RUZXh0UHJvdmlkZXIuZXZlbnROYW1lc3BhY2VzTG9hZGVkLmF0dGFjaCh0aGlzLl9uYW1lc3BhY2VzTG9hZGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fbndjdFRleHRQcm92aWRlci5sb2FkTmFtZXNwYWNlcyhuYW1lc3BhY2VzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRydW5zIGEgbGlzdCB3aXRoIHRoZSBlbnRyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8SU53Y3RFbnRyeT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTndjdFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgZ2V0IGVudHJpZXMoKSA6IEFycmF5PElOd2N0RW50cnk+e1xyXG4gICAgICAgIGlmKHRoaXMuX2VudHJpZXMubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5yZXRyaWV2ZURhdGEoKTsgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudHJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZWQgd2hlbiB0aGUgbmFtZXNwYWNlcyBsb2FkaW5nIGlzIGZpbmlzaGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TndjdFRleHRQcm92aWRlcn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBOd2N0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbk5hbWVzcGFjZXNMb2FkZWQoc2VuZGVyOiBOd2N0VGV4dFByb3ZpZGVyLCBhcmdzOiBhbnkpIHtcclxuICAgICAgICBzZW5kZXIuZXZlbnROYW1lc3BhY2VzTG9hZGVkLmRldGFjaCh0aGlzLl9uYW1lc3BhY2VzTG9hZGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5ldmVudE5hbWVzcGFjZXNMb2FkZWQucmFpc2UodGhpcywgdW5kZWZpbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlY29uZGUgdGhlIGJpbmFyeSByaW5nIGJ1ZmZlciB0byBhbiB1bnR5cGVkIG9iamVjdCAoTndjdEJpblBhcnNlcilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBiaW5hcnlEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7TndjdEJpblBhcnNlcn0gVGhpcyByZXR1cm4gdmFsdWUgY29udGFpbnMgdGhlIHBhcnNlZCBiaW5hcnkgZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIE53Y3RQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJldHJpZXZlRGF0YSgpOiBOd2N0QmluUGFyc2Vye1xyXG4gICAgICAgIC8vIGNyZWF0ZSBhIEthaXRhaVN0cmVhbSBhbmQgcGFzcyB0aGUgYmluYXJ5IGRhdGFcclxuICAgICAgICBsZXQga2FpdGFpU3RyZWFtID0gbmV3IEthaXRhaVN0cmVhbSh0aGlzLl9pbnB1dCk7XHJcblxyXG4gICAgICAgIC8vIHBhc3MgdGhlIHN0cnVjdHVyZSBkZWNsYXJhdGlvbiBhbmQgZW5jb2RlIHRoZSBiaW5hcnkgZGF0YVxyXG4gICAgICAgIGxldCB1bnR5cGVkT2JqZWN0ID0gbmV3IE53Y3RCaW5QYXJzZXIoa2FpdGFpU3RyZWFtKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSB0eXBlIHNlY3VyZSByb290IG9iamVjdCB0byBhY2Nlc3MgdGhlIG53Y3QgZGF0YVxyXG4gICAgICAgIGxldCB0eXBlZEVudHJpZXMgPSBuZXcgTndjdFJvb3QodW50eXBlZE9iamVjdCk7XHJcblxyXG4gICAgICAgIC8vIHJlc29sdmU6XHJcbiAgICAgICAgLy8gLSBsaW5rcyBiZXR3ZWVuIGNvbmZpZyBlbnRyaWVzIGFuZCBkYXRhIGVudHJpZXNcclxuICAgICAgICAvLyAtIGxpbmtzIGJldHdlZW4gcmVxdWVzdHMgYW5kIHJlc3BvbnNlc1xyXG4gICAgICAgIGxldCBwcm9jZXNzb3IgPSAgbmV3IE53Y3RQcmVQcm9jZXNzKHR5cGVkRW50cmllcyk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IF9sYXN0Qml0TWFza1ZhbHVlIGRhdGFcclxuICAgICAgICB0aGlzLl9sYXN0Qml0TWFza1ZhbHVlID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcclxuXHJcbiAgICAgICAgLy8gcmVhY3JlIG5ldyBhcnJheSBvZiBlbnRyaWVzIGFuZCBwdXNoIGFsbCBjb252ZXJ0ZWQgZW50cmllcyBpbnRvIHRoZSBhcnJheVxyXG4gICAgICAgIHRoaXMuX2VudHJpZXMgPSBuZXcgQXJyYXk8SU53Y3RFbnRyeT4oKTtcclxuICAgICAgICBwcm9jZXNzb3IuZGF0YUVudHJpZXMud0RhdGFFbnRyaWVzLmZvckVhY2god0RhdGFFbnRyeSA9PntcclxuICAgICAgICAgICAgbGV0IGVudHJ5ID0gbmV3IE53Y3RFbnRyeSh3RGF0YUVudHJ5LCAgdGhpcy5fbndjdE1ldGFEYXRhUHJvdmlkZXIsIHRoaXMuX253Y3RUZXh0UHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBpZihlbnRyeS5pc0JpdFBhdHRlcm4pe1xyXG4gICAgICAgICAgICAgICAgZW50cnkubGFzdEJpdFBhdHRlcm5WYWx1ZSA9IHRoaXMuZ2V0TGFzdEJpdFBhdHRlcm5WYWx1ZShlbnRyeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZW50cmllcy5wdXNoKGVudHJ5KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBsYXN0IGJpdCBtYXNrIHZhbHVlIGZvciB0aGUgZ2l2ZW4gbm9kZShuZXR3b3JrdHlwZSArIG5ldHdvcmtJbnRlcmZhY2VJbmRleCArIG5vZGVOdW1iZXIgKyBkYXRhZ3JhbVR5cGUgKyBuY09iamVjdFR5cGUgKyBjaGFubmVsTnVtYmVyICsgcGFySWQpXHJcbiAgICAgKiBpZiBhdmFpbGFibGUsIGVsc2UgdW5kZWZpbmVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TndjdEVudHJ5fSBlbnRyeVxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBOd2N0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRMYXN0Qml0UGF0dGVyblZhbHVlKGVudHJ5OiBOd2N0RW50cnkpOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBrZXkgPSBlbnRyeS5ud2N0Q29uZmlnRW50cnkhLm5ldHdvcmtUeXBlLnZhbHVlLnRvU3RyaW5nKCkgKyBlbnRyeS5ud2N0Q29uZmlnRW50cnkhLm5ldHdvcmtJbnRlcmZhY2VJbmRleC52YWx1ZS50b1N0cmluZygpICsgZW50cnkubm9kZU51bWJlci50b1N0cmluZygpICtcclxuICAgICAgICAgICAgICAgICAgICBlbnRyeS5ud2N0Q29uZmlnRW50cnkhLmRhdGFncmFtVHlwZS52YWx1ZS50b1N0cmluZygpICsgZW50cnkubmNPYmplY3RUeXBlLnRvU3RyaW5nKCkgKyBlbnRyeS5jaGFubmVsTnVtYmVyLnRvU3RyaW5nKCkgKyBlbnRyeS5wYXJJZC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICBsZXQgbGFzdEJpdE1hc2tWYWx1ZTogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBpZih0aGlzLl9sYXN0Qml0TWFza1ZhbHVlLmhhcyhrZXkpKXtcclxuICAgICAgICAgICAgLy8gdmFsdWUgZm9yIGtleSBhdmFpbGFibGUgLT4gcmV0dXJuIG9sZCBhdmFpbGFibGUgdmFsdWUgYW5kIHNldCBuZXcgb25lXHJcbiAgICAgICAgICAgIGxhc3RCaXRNYXNrVmFsdWUgPSB0aGlzLl9sYXN0Qml0TWFza1ZhbHVlLmdldChrZXkpO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0Qml0TWFza1ZhbHVlLnNldChrZXksIGVudHJ5LmJpdFBhdHRlcm5OdW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBubyB2YWx1ZSBhdmFpbGFibGUgLT4gb25seSBzZXQgdGhlIGN1cnJlbnQgdmFsdWVcclxuICAgICAgICAgICAgdGhpcy5fbGFzdEJpdE1hc2tWYWx1ZS5zZXQoa2V5LCBlbnRyeS5iaXRQYXR0ZXJuTnVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhc3RCaXRNYXNrVmFsdWU7XHJcbiAgICB9XHJcbn1cclxuIl19