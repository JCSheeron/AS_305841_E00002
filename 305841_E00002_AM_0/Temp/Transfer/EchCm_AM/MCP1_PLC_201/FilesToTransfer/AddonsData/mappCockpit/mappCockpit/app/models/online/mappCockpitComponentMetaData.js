define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * provides the meta data container for a component
     *
     * @class MappCockpitComponentMetaData
     */
    var MappCockpitComponentMetaData = /** @class */ (function () {
        function MappCockpitComponentMetaData() {
        }
        /**
         * retrieves meta items specified by the item property name
         *
         * @static
         * @param {*} metInfo
         * @param {string} requestedMetaItemPropertyNames
         * @returns {*}
         * @memberof MappCockpitComponentMetaData
         */
        MappCockpitComponentMetaData.filterMetaItems = function (metInfo, requestedMetaItemPropertyNames, filterCallback) {
            if (filterCallback === void 0) { filterCallback = null; }
            var filteredMetaItems = [];
            // get the specefied meta item types in a flat list
            var flattenedMetaItems = MappCockpitComponentMetaData.getFlattendedMetaItems(metInfo);
            // retrieve the meta items with matching item type
            requestedMetaItemPropertyNames.forEach(function (requestedMetaItemPropertyName) {
                filteredMetaItems = MappCockpitComponentMetaData.filterMetaItemsByItemType(flattenedMetaItems, requestedMetaItemPropertyName, filteredMetaItems);
            });
            // return the found items and filter them if a filter callback is defined
            return filterCallback === null ? filteredMetaItems : filteredMetaItems.filter(function (metaItem) { return filterCallback(metaItem); });
        };
        /**
         * filters the meta items by the specified item type
         *
         * @private
         * @static
         * @param {any[]} flattenedMetaItems
         * @param {string} requestedMetaItemPropertyName
         * @param {any[]} metaItems
         * @returns
         * @memberof MappCockpitComponentMetaData
         */
        MappCockpitComponentMetaData.filterMetaItemsByItemType = function (flattenedMetaItems, requestedMetaItemPropertyName, metaItems) {
            // filter items with matching item type
            var metaItemTypeSet = flattenedMetaItems.filter(function (metaItem) { return metaItem.hasOwnProperty(requestedMetaItemPropertyName); });
            // get the item objets
            var typedMetaItems = metaItemTypeSet.map(function (metaItem) { return metaItem[requestedMetaItemPropertyName]; });
            // add meta item set with specified type
            metaItems = metaItems.length === 0 ? typedMetaItems : metaItems.concat(typedMetaItems);
            // if (metaItems.length === 0) {
            //     metaItems = metaItemsSet;
            // }else{
            //     metaItems = metaItems.concat(metaItemsSet); 
            // }
            return metaItems;
        };
        /**
         * gets the meta items contained in the structure as flat list
         *
         * @private
         * @static
         * @param {*} metaInfo
         * @returns
         * @memberof MappCockpitComponentMetaData
         */
        MappCockpitComponentMetaData.getFlattendedMetaItems = function (metaInfo) {
            var flattendeMetaItems = [];
            this.parseMetaItemObject(metaInfo, function (metaItem) {
                flattendeMetaItems.push(metaItem);
            });
            return flattendeMetaItems;
        };
        /**
         * parses the meta item object deep and calls the callback method for every found child item to filter them for special types.
         *
         * @static
         * @param {*} metaItem
         * @param {*} iterationCallback
         * @returns {*}
         * @memberof MappCockpitComponentMetaData
         */
        MappCockpitComponentMetaData.parseMetaItemObject = function (metaItem, iterationCallback) {
            var _this = this;
            // get the objects property keys and filter object types only.
            var metaItemPropertyKeys = Object.keys(metaItem).filter(function (key) { return metaItem[key] instanceof Object; });
            metaItemPropertyKeys.forEach(function (metaItemPropertyKey) {
                // get the meta item property value
                var metaItemPropertyObject = metaItem[metaItemPropertyKey];
                // if its an object, parse deeper
                if (metaItemPropertyObject instanceof Object) {
                    // call the iteration callback for filtering ...
                    iterationCallback(metaItemPropertyObject);
                    // parse deeper ...
                    _this.parseMetaItemObject(metaItemPropertyObject, iterationCallback);
                }
            });
        };
        return MappCockpitComponentMetaData;
    }());
    exports.MappCockpitComponentMetaData = MappCockpitComponentMetaData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBOzs7O09BSUc7SUFDSDtRQUFBO1FBc0dBLENBQUM7UUFwR0c7Ozs7Ozs7O1dBUUc7UUFDSSw0Q0FBZSxHQUF0QixVQUF1QixPQUFZLEVBQUUsOEJBQXdDLEVBQUUsY0FBMEI7WUFBMUIsK0JBQUEsRUFBQSxxQkFBMEI7WUFFckcsSUFBSSxpQkFBaUIsR0FBVSxFQUFFLENBQUM7WUFFbEMsbURBQW1EO1lBQ25ELElBQUksa0JBQWtCLEdBQWUsNEJBQTRCLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFbEcsa0RBQWtEO1lBQ2xELDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxVQUFDLDZCQUE2QjtnQkFDakUsaUJBQWlCLEdBQUcsNEJBQTRCLENBQUMseUJBQXlCLENBQUMsa0JBQWtCLEVBQUUsNkJBQTZCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtZQUNwSixDQUFDLENBQUMsQ0FBQztZQUdILHlFQUF5RTtZQUN6RSxPQUFPLGNBQWMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFRLElBQU8sT0FBTyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNySSxDQUFDO1FBR0Q7Ozs7Ozs7Ozs7V0FVRztRQUNZLHNEQUF5QixHQUF4QyxVQUF5QyxrQkFBeUIsRUFBRSw2QkFBcUMsRUFBRSxTQUFnQjtZQUN2SCx1Q0FBdUM7WUFDdkMsSUFBSSxlQUFlLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFVBQUMsUUFBUSxJQUFPLE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEksc0JBQXNCO1lBQ3RCLElBQUksY0FBYyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFRLElBQU8sT0FBTyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVHLHdDQUF3QztZQUN4QyxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUV2RixnQ0FBZ0M7WUFDaEMsZ0NBQWdDO1lBQ2hDLFNBQVM7WUFDVCxtREFBbUQ7WUFDbkQsSUFBSTtZQUVKLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNZLG1EQUFzQixHQUFyQyxVQUFzQyxRQUFhO1lBQy9DLElBQUksa0JBQWtCLEdBQWUsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsVUFBQyxRQUFRO2dCQUN4QyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLGtCQUFrQixDQUFDO1FBQzlCLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLGdEQUFtQixHQUExQixVQUEyQixRQUFhLEVBQUUsaUJBQWlCO1lBQTNELGlCQWdCQztZQWRHLDhEQUE4RDtZQUM5RCxJQUFJLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxJQUFPLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLE1BQU0sQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdHLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFBLG1CQUFtQjtnQkFDNUMsbUNBQW1DO2dCQUNuQyxJQUFJLHNCQUFzQixHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUMzRCxpQ0FBaUM7Z0JBQ2pDLElBQUksc0JBQXNCLFlBQVksTUFBTSxFQUFFO29CQUMxQyxnREFBZ0Q7b0JBQ2hELGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQzFDLG1CQUFtQjtvQkFDbkIsS0FBSSxDQUFDLG1CQUFtQixDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLENBQUM7aUJBQ3ZFO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBR0wsbUNBQUM7SUFBRCxDQUFDLEFBdEdELElBc0dDO0lBRU8sb0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKlxyXG4gKiBwcm92aWRlcyB0aGUgbWV0YSBkYXRhIGNvbnRhaW5lciBmb3IgYSBjb21wb25lbnRcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGFcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIG1ldGEgaXRlbXMgc3BlY2lmaWVkIGJ5IHRoZSBpdGVtIHByb3BlcnR5IG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldEluZm9cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRNZXRhSXRlbVByb3BlcnR5TmFtZXNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGFcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZpbHRlck1ldGFJdGVtcyhtZXRJbmZvOiBhbnksIHJlcXVlc3RlZE1ldGFJdGVtUHJvcGVydHlOYW1lczogc3RyaW5nW10sIGZpbHRlckNhbGxiYWNrOiBhbnkgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIGxldCBmaWx0ZXJlZE1ldGFJdGVtczogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBzcGVjZWZpZWQgbWV0YSBpdGVtIHR5cGVzIGluIGEgZmxhdCBsaXN0XHJcbiAgICAgICAgbGV0IGZsYXR0ZW5lZE1ldGFJdGVtczogQXJyYXk8YW55PiA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZ2V0RmxhdHRlbmRlZE1ldGFJdGVtcyhtZXRJbmZvKTtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIG1ldGEgaXRlbXMgd2l0aCBtYXRjaGluZyBpdGVtIHR5cGVcclxuICAgICAgICByZXF1ZXN0ZWRNZXRhSXRlbVByb3BlcnR5TmFtZXMuZm9yRWFjaCgocmVxdWVzdGVkTWV0YUl0ZW1Qcm9wZXJ0eU5hbWUpPT57IFxyXG4gICAgICAgICAgICBmaWx0ZXJlZE1ldGFJdGVtcyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zQnlJdGVtVHlwZShmbGF0dGVuZWRNZXRhSXRlbXMsIHJlcXVlc3RlZE1ldGFJdGVtUHJvcGVydHlOYW1lLCBmaWx0ZXJlZE1ldGFJdGVtcylcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vIHJldHVybiB0aGUgZm91bmQgaXRlbXMgYW5kIGZpbHRlciB0aGVtIGlmIGEgZmlsdGVyIGNhbGxiYWNrIGlzIGRlZmluZWRcclxuICAgICAgICByZXR1cm4gZmlsdGVyQ2FsbGJhY2sgPT09IG51bGwgPyBmaWx0ZXJlZE1ldGFJdGVtcyA6IGZpbHRlcmVkTWV0YUl0ZW1zLmZpbHRlcigobWV0YUl0ZW0pID0+IHsgcmV0dXJuIGZpbHRlckNhbGxiYWNrKG1ldGFJdGVtKSB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBmaWx0ZXJzIHRoZSBtZXRhIGl0ZW1zIGJ5IHRoZSBzcGVjaWZpZWQgaXRlbSB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7YW55W119IGZsYXR0ZW5lZE1ldGFJdGVtc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZE1ldGFJdGVtUHJvcGVydHlOYW1lXHJcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBtZXRhSXRlbXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBmaWx0ZXJNZXRhSXRlbXNCeUl0ZW1UeXBlKGZsYXR0ZW5lZE1ldGFJdGVtczogYW55W10sIHJlcXVlc3RlZE1ldGFJdGVtUHJvcGVydHlOYW1lOiBzdHJpbmcsIG1ldGFJdGVtczogYW55W10pIHtcclxuICAgICAgICAvLyBmaWx0ZXIgaXRlbXMgd2l0aCBtYXRjaGluZyBpdGVtIHR5cGVcclxuICAgICAgICBsZXQgbWV0YUl0ZW1UeXBlU2V0ID0gZmxhdHRlbmVkTWV0YUl0ZW1zLmZpbHRlcigobWV0YUl0ZW0pID0+IHsgcmV0dXJuIG1ldGFJdGVtLmhhc093blByb3BlcnR5KHJlcXVlc3RlZE1ldGFJdGVtUHJvcGVydHlOYW1lKTsgfSk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBpdGVtIG9iamV0c1xyXG4gICAgICAgIGxldCB0eXBlZE1ldGFJdGVtcyA9IG1ldGFJdGVtVHlwZVNldC5tYXAoKG1ldGFJdGVtKSA9PiB7IHJldHVybiBtZXRhSXRlbVtyZXF1ZXN0ZWRNZXRhSXRlbVByb3BlcnR5TmFtZV07IH0pO1xyXG4gICAgICAgIC8vIGFkZCBtZXRhIGl0ZW0gc2V0IHdpdGggc3BlY2lmaWVkIHR5cGVcclxuICAgICAgICBtZXRhSXRlbXMgPSBtZXRhSXRlbXMubGVuZ3RoID09PSAwID8gdHlwZWRNZXRhSXRlbXMgOiBtZXRhSXRlbXMuY29uY2F0KHR5cGVkTWV0YUl0ZW1zKTtcclxuXHJcbiAgICAgICAgLy8gaWYgKG1ldGFJdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAvLyAgICAgbWV0YUl0ZW1zID0gbWV0YUl0ZW1zU2V0O1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICBtZXRhSXRlbXMgPSBtZXRhSXRlbXMuY29uY2F0KG1ldGFJdGVtc1NldCk7IFxyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1ldGFJdGVtcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIG1ldGEgaXRlbXMgY29udGFpbmVkIGluIHRoZSBzdHJ1Y3R1cmUgYXMgZmxhdCBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gbWV0YUluZm9cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRGbGF0dGVuZGVkTWV0YUl0ZW1zKG1ldGFJbmZvOiBhbnkpOiBBcnJheTxhbnk+IHtcclxuICAgICAgICBsZXQgZmxhdHRlbmRlTWV0YUl0ZW1zOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAgICAgdGhpcy5wYXJzZU1ldGFJdGVtT2JqZWN0KG1ldGFJbmZvLCAobWV0YUl0ZW0pID0+IHtcclxuICAgICAgICAgICAgZmxhdHRlbmRlTWV0YUl0ZW1zLnB1c2gobWV0YUl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmbGF0dGVuZGVNZXRhSXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwYXJzZXMgdGhlIG1ldGEgaXRlbSBvYmplY3QgZGVlcCBhbmQgY2FsbHMgdGhlIGNhbGxiYWNrIG1ldGhvZCBmb3IgZXZlcnkgZm91bmQgY2hpbGQgaXRlbSB0byBmaWx0ZXIgdGhlbSBmb3Igc3BlY2lhbCB0eXBlcy5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGFJdGVtXHJcbiAgICAgKiBAcGFyYW0geyp9IGl0ZXJhdGlvbkNhbGxiYWNrXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBwYXJzZU1ldGFJdGVtT2JqZWN0KG1ldGFJdGVtOiBhbnksIGl0ZXJhdGlvbkNhbGxiYWNrKTogYW55IHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBvYmplY3RzIHByb3BlcnR5IGtleXMgYW5kIGZpbHRlciBvYmplY3QgdHlwZXMgb25seS5cclxuICAgICAgICBsZXQgbWV0YUl0ZW1Qcm9wZXJ0eUtleXMgPSBPYmplY3Qua2V5cyhtZXRhSXRlbSkuZmlsdGVyKChrZXkpID0+IHsgcmV0dXJuIG1ldGFJdGVtW2tleV0gaW5zdGFuY2VvZiBPYmplY3QgfSk7XHJcblxyXG4gICAgICAgIG1ldGFJdGVtUHJvcGVydHlLZXlzLmZvckVhY2gobWV0YUl0ZW1Qcm9wZXJ0eUtleSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgbWV0YSBpdGVtIHByb3BlcnR5IHZhbHVlXHJcbiAgICAgICAgICAgIGxldCBtZXRhSXRlbVByb3BlcnR5T2JqZWN0ID0gbWV0YUl0ZW1bbWV0YUl0ZW1Qcm9wZXJ0eUtleV07XHJcbiAgICAgICAgICAgIC8vIGlmIGl0cyBhbiBvYmplY3QsIHBhcnNlIGRlZXBlclxyXG4gICAgICAgICAgICBpZiAobWV0YUl0ZW1Qcm9wZXJ0eU9iamVjdCBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgaXRlcmF0aW9uIGNhbGxiYWNrIGZvciBmaWx0ZXJpbmcgLi4uXHJcbiAgICAgICAgICAgICAgICBpdGVyYXRpb25DYWxsYmFjayhtZXRhSXRlbVByb3BlcnR5T2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIC8vIHBhcnNlIGRlZXBlciAuLi5cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VNZXRhSXRlbU9iamVjdChtZXRhSXRlbVByb3BlcnR5T2JqZWN0LCBpdGVyYXRpb25DYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGF9OyJdfQ==