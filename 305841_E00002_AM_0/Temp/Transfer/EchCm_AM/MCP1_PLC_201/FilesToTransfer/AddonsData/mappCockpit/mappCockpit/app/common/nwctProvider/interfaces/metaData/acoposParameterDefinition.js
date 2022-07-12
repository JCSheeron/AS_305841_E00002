define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AcoposParameterDefinition = /** @class */ (function () {
        /**
         * Creates an instance of AcoposParameterDefinition.
         * @param {number} id
         * @param {string} constName
         * @param {string} typ
         * @memberof AcoposParameterDefinition
         */
        function AcoposParameterDefinition(id, constName, typ) {
            this.id = id;
            this.const = constName;
            this.typ = typ;
        }
        /**
         * Creates a new parameter definition
         *
         * @static
         * @param {number} id -1 if not defined
         * @param {string} constName
         * @param {string} typ
         * @returns {IAcoposParameterDefinition}
         * @memberof AcoposParameterDefinition
         */
        AcoposParameterDefinition.create = function (id, constName, typ) {
            return new AcoposParameterDefinition(id, constName, typ);
        };
        return AcoposParameterDefinition;
    }());
    exports.AcoposParameterDefinition = AcoposParameterDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL253Y3RQcm92aWRlci9pbnRlcmZhY2VzL21ldGFEYXRhL2Fjb3Bvc1BhcmFtZXRlckRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7UUFXSTs7Ozs7O1dBTUc7UUFDSCxtQ0FBb0IsRUFBVSxFQUFFLFNBQWlCLEVBQUUsR0FBVztZQUMxRCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDVyxnQ0FBTSxHQUFwQixVQUFxQixFQUFVLEVBQUUsU0FBaUIsRUFBRSxHQUFXO1lBQzNELE9BQU8sSUFBSSx5QkFBeUIsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFDTCxnQ0FBQztJQUFELENBQUMsQUFyQ0QsSUFxQ0M7SUFyQ1ksOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb24gfSBmcm9tIFwiLi9hY29wb3NQYXJhbWV0ZXJEZWZpbml0aW9uSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElCaXREZWZpbml0aW9uSW5mbyB9IGZyb20gXCIuL2JpdERlZmluaXRpb25JbmZvSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElWYWx1ZURlZmluaXRpb24gfSBmcm9tIFwiLi92YWx1ZURlZmluaXRpb25JbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY29wb3NQYXJhbWV0ZXJEZWZpbml0aW9uIGltcGxlbWVudHMgSUFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb257XHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgY29uc3Q6IHN0cmluZztcclxuICAgIHR5cDogc3RyaW5nO1xyXG4gICAgcGdfaWRzOiBudW1iZXJbXSB8IHVuZGVmaW5lZDtcclxuICAgIGF0dHI6IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xyXG4gICAgdW5pdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgYml0czogSUJpdERlZmluaXRpb25JbmZvW10gfCB1bmRlZmluZWQ7XHJcbiAgICB2YWx1ZXM6IElWYWx1ZURlZmluaXRpb25bXSB8IHVuZGVmaW5lZDtcclxuICAgIGZvcm1hdHRlcjogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQWNvcG9zUGFyYW1ldGVyRGVmaW5pdGlvbi5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnN0TmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cFxyXG4gICAgICogQG1lbWJlcm9mIEFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLCBjb25zdE5hbWU6IHN0cmluZywgdHlwOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmNvbnN0ID0gY29uc3ROYW1lO1xyXG4gICAgICAgIHRoaXMudHlwID0gdHlwO1xyXG4gICAgfSAgICBcclxuICAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBwYXJhbWV0ZXIgZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtMSBpZiBub3QgZGVmaW5lZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnN0TmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cFxyXG4gICAgICogQHJldHVybnMge0lBY29wb3NQYXJhbWV0ZXJEZWZpbml0aW9ufVxyXG4gICAgICogQG1lbWJlcm9mIEFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoaWQ6IG51bWJlciwgY29uc3ROYW1lOiBzdHJpbmcsIHR5cDogc3RyaW5nKTogSUFjb3Bvc1BhcmFtZXRlckRlZmluaXRpb257XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBY29wb3NQYXJhbWV0ZXJEZWZpbml0aW9uKGlkLCBjb25zdE5hbWUsIHR5cCk7XHJcbiAgICB9XHJcbn0iXX0=