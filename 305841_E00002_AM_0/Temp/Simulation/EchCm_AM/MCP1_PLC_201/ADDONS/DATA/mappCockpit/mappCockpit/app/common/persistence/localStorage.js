define(["require", "exports", "./interfaces/storageInterface"], function (require, exports, storageInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LocalStorage = /** @class */ (function () {
        function LocalStorage() {
            this.eventNotification = new storageInterface_1.StorageEventNotification();
            this._location = "LocalStorageDefaultId";
        }
        /**
         * Defines an id for the location in the local storage
         *
         * @param {string} location
         * @memberof LocalStorage
         */
        LocalStorage.prototype.connectStorage = function (location) {
            this._location = location;
        };
        /**
         * load data from the local storage
         *
         * @returns {*}
         * @memberof LocalStorage
         */
        LocalStorage.prototype.loadData = function () {
            var data = {};
            var keys = Object.keys(localStorage);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var item = localStorage.getItem(key);
                if (item != undefined) {
                    data[key] = JSON.parse(item);
                }
            }
            this._data = data;
            /*let data = localStorage.getItem(this._location);
            if(data != undefined){
                let dataObject = JSON.parse(data);
                this._data =  dataObject;
            } */
        };
        /*retrieveData() : any{
            if(this._data != undefined){
                return this._data
            }
            else {
                console.log("data not defined");
            }
        }*/
        /**
         * Saves the data to local storage
         *
         * @param {*} data
         * @memberof LocalStorage
         */
        LocalStorage.prototype.saveData = function (key, data) {
            var dataString = JSON.stringify(data);
            var dataLength = dataString.length; // LocalStorage not working with data larger then round about 5.200.000 characters(differs from PC/Browser)
            try {
                localStorage.setItem(key, dataString);
            }
            catch (e) {
                console.error("Save data to local storage not possible! Maybe the data is too large(" + dataLength + " > 5200000 characters).");
            }
        };
        /**
         * Removes all data from local storage
         *
         * @memberof LocalStorage
         */
        LocalStorage.prototype.clear = function () {
            //check if there is an item in store
            if (localStorage.getItem(Object.keys(localStorage)[0])) {
                //clear the storage
                localStorage.clear();
            }
        };
        return LocalStorage;
    }());
    exports.LocalStorage = LocalStorage;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxTdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGVyc2lzdGVuY2UvbG9jYWxTdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBO1FBQUE7WUFFSSxzQkFBaUIsR0FBRyxJQUFJLDJDQUF3QixFQUFFLENBQUM7WUFHM0MsY0FBUyxHQUFVLHVCQUF1QixDQUFDO1FBNEV2RCxDQUFDO1FBMUVHOzs7OztXQUtHO1FBQ0gscUNBQWMsR0FBZCxVQUFlLFFBQWdCO1lBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzlCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILCtCQUFRLEdBQVI7WUFFSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7WUFDYixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBRXBDLEtBQWUsVUFBSSxFQUFKLGFBQUksRUFBSixrQkFBSSxFQUFKLElBQUksRUFBQztnQkFBaEIsSUFBSSxHQUFHLGFBQUE7Z0JBQ1AsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDcEMsSUFBRyxJQUFJLElBQUksU0FBUyxFQUFDO29CQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtpQkFDL0I7YUFDSjtZQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCOzs7O2dCQUlJO1FBQ1IsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFFSDs7Ozs7V0FLRztRQUNILCtCQUFRLEdBQVIsVUFBUyxHQUFXLEVBQUMsSUFBUztZQUMxQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQywyR0FBMkc7WUFDL0ksSUFBRztnQkFDQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUN6QztZQUNELE9BQU0sQ0FBQyxFQUFDO2dCQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUVBQXVFLEdBQUcsVUFBVSxHQUFHLHlCQUF5QixDQUFDLENBQUM7YUFDbkk7UUFDTCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILDRCQUFLLEdBQUw7WUFDSSxvQ0FBb0M7WUFDcEMsSUFBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDbkQsbUJBQW1CO2dCQUNuQixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDeEI7UUFDTCxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBakZELElBaUZDO0lBakZZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVN0b3JhZ2UsIFN0b3JhZ2VFdmVudE5vdGlmaWNhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvc3RvcmFnZUludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZSBpbXBsZW1lbnRzIElTdG9yYWdle1xyXG5cclxuICAgIGV2ZW50Tm90aWZpY2F0aW9uID0gbmV3IFN0b3JhZ2VFdmVudE5vdGlmaWNhdGlvbigpO1xyXG4gICBcclxuICAgIHByaXZhdGUgX2RhdGE7XHJcbiAgICBwcml2YXRlIF9sb2NhdGlvbjpzdHJpbmcgPSBcIkxvY2FsU3RvcmFnZURlZmF1bHRJZFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhbiBpZCBmb3IgdGhlIGxvY2F0aW9uIGluIHRoZSBsb2NhbCBzdG9yYWdlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgTG9jYWxTdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIGNvbm5lY3RTdG9yYWdlKGxvY2F0aW9uOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX2xvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICB9ICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGxvYWQgZGF0YSBmcm9tIHRoZSBsb2NhbCBzdG9yYWdlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTG9jYWxTdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIGxvYWREYXRhKCk6IGFueSB7XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0ge31cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSlcclxuXHJcbiAgICAgICAgZm9yKGxldCBrZXkgb2Yga2V5cyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KVxyXG4gICAgICAgICAgICBpZihpdGVtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSBKU09OLnBhcnNlKGl0ZW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgIC8qbGV0IGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9sb2NhdGlvbik7XHJcbiAgICAgICAgaWYoZGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgZGF0YU9iamVjdCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSAgZGF0YU9iamVjdDtcclxuICAgICAgICB9ICovICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qcmV0cmlldmVEYXRhKCkgOiBhbnl7XHJcbiAgICAgICAgaWYodGhpcy5fZGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhIG5vdCBkZWZpbmVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZXMgdGhlIGRhdGEgdG8gbG9jYWwgc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIExvY2FsU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICBzYXZlRGF0YShrZXk6IHN0cmluZyxkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgZGF0YVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgIGxldCBkYXRhTGVuZ3RoID0gZGF0YVN0cmluZy5sZW5ndGg7IC8vIExvY2FsU3RvcmFnZSBub3Qgd29ya2luZyB3aXRoIGRhdGEgbGFyZ2VyIHRoZW4gcm91bmQgYWJvdXQgNS4yMDAuMDAwIGNoYXJhY3RlcnMoZGlmZmVycyBmcm9tIFBDL0Jyb3dzZXIpXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIGRhdGFTdHJpbmcpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTYXZlIGRhdGEgdG8gbG9jYWwgc3RvcmFnZSBub3QgcG9zc2libGUhIE1heWJlIHRoZSBkYXRhIGlzIHRvbyBsYXJnZShcIiArIGRhdGFMZW5ndGggKyBcIiA+IDUyMDAwMDAgY2hhcmFjdGVycykuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIGRhdGEgZnJvbSBsb2NhbCBzdG9yYWdlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExvY2FsU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICBjbGVhcigpe1xyXG4gICAgICAgIC8vY2hlY2sgaWYgdGhlcmUgaXMgYW4gaXRlbSBpbiBzdG9yZVxyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSlbMF0pKSB7XHJcbiAgICAgICAgICAgIC8vY2xlYXIgdGhlIHN0b3JhZ2VcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19