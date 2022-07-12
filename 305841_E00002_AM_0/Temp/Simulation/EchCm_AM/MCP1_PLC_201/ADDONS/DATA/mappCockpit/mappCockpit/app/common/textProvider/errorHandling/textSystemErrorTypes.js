define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * List of all errors that can occure in the textsystem.
     * The error types with defined error codes can occure in the productive return values.
     * For other error types "?Nul" can be returned in the productive return value.
     *
     * @export
     * @enum {number}
     */
    var TextSystemErrorTypes;
    (function (TextSystemErrorTypes) {
        TextSystemErrorTypes[TextSystemErrorTypes["EndlessRecursion"] = 1] = "EndlessRecursion";
        TextSystemErrorTypes[TextSystemErrorTypes["NoPassedArgumentlist"] = 2] = "NoPassedArgumentlist";
        TextSystemErrorTypes[TextSystemErrorTypes["InvalidIndexForArgumentList"] = 3] = "InvalidIndexForArgumentList";
        TextSystemErrorTypes[TextSystemErrorTypes["NoFormatterForInputArgumentFound"] = 4] = "NoFormatterForInputArgumentFound";
        TextSystemErrorTypes[TextSystemErrorTypes["RequestedTextNotFound"] = -2144327656] = "RequestedTextNotFound";
        TextSystemErrorTypes[TextSystemErrorTypes["ReadAccessToTextDatabaseFailed"] = -2144327660] = "ReadAccessToTextDatabaseFailed";
        TextSystemErrorTypes[TextSystemErrorTypes["CouldNotOpenTextDatabase"] = -2144327663] = "CouldNotOpenTextDatabase";
    })(TextSystemErrorTypes = exports.TextSystemErrorTypes || (exports.TextSystemErrorTypes = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFN5c3RlbUVycm9yVHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90ZXh0UHJvdmlkZXIvZXJyb3JIYW5kbGluZy90ZXh0U3lzdGVtRXJyb3JUeXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTs7Ozs7OztPQU9HO0lBQ0gsSUFBWSxvQkFRWDtJQVJELFdBQVksb0JBQW9CO1FBQzVCLHVGQUFvQixDQUFBO1FBQ3BCLCtGQUFvQixDQUFBO1FBQ3BCLDZHQUEyQixDQUFBO1FBQzNCLHVIQUFnQyxDQUFBO1FBQ2hDLDJHQUFtQyxDQUFBO1FBQ25DLDZIQUE0QyxDQUFBO1FBQzVDLGlIQUFzQyxDQUFBO0lBQzFDLENBQUMsRUFSVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQVEvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBMaXN0IG9mIGFsbCBlcnJvcnMgdGhhdCBjYW4gb2NjdXJlIGluIHRoZSB0ZXh0c3lzdGVtLlxyXG4gKiBUaGUgZXJyb3IgdHlwZXMgd2l0aCBkZWZpbmVkIGVycm9yIGNvZGVzIGNhbiBvY2N1cmUgaW4gdGhlIHByb2R1Y3RpdmUgcmV0dXJuIHZhbHVlcy5cclxuICogRm9yIG90aGVyIGVycm9yIHR5cGVzIFwiP051bFwiIGNhbiBiZSByZXR1cm5lZCBpbiB0aGUgcHJvZHVjdGl2ZSByZXR1cm4gdmFsdWUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmV4cG9ydCBlbnVtIFRleHRTeXN0ZW1FcnJvclR5cGVzIHtcclxuICAgIEVuZGxlc3NSZWN1cnNpb24gPSAxLFxyXG4gICAgTm9QYXNzZWRBcmd1bWVudGxpc3QsXHJcbiAgICBJbnZhbGlkSW5kZXhGb3JBcmd1bWVudExpc3QsXHJcbiAgICBOb0Zvcm1hdHRlckZvcklucHV0QXJndW1lbnRGb3VuZCxcclxuICAgIFJlcXVlc3RlZFRleHROb3RGb3VuZCA9IC0yMTQ0MzI3NjU2LFxyXG4gICAgUmVhZEFjY2Vzc1RvVGV4dERhdGFiYXNlRmFpbGVkID0gLTIxNDQzMjc2NjAsICAgICAgICAgICAgICAgXHJcbiAgICBDb3VsZE5vdE9wZW5UZXh0RGF0YWJhc2UgPSAtMjE0NDMyNzY2MyxcclxufSJdfQ==