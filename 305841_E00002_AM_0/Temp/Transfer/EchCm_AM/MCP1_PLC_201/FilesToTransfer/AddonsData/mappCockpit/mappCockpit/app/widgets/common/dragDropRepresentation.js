define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DragDropRepresentation = /** @class */ (function () {
        function DragDropRepresentation() {
            /**
             * Array with the icons (icon data as string instead of icon path because with path the drop icon is flickering) for the drag and drop element
             *
             * @type {Array<string>}
             * @memberof DragDropRepresentation
             */
            this.iconList = new Array();
            /**
             * Array with the text informations for the drag and drop element
             *
             * @type {Array<string>}
             * @memberof DragDropRepresentation
             */
            this.textList = new Array();
        }
        /**
         * Returns an element with the drag and drop representation
         *
         * @returns {string}
         * @memberof DragDropRepresentation
         */
        DragDropRepresentation.prototype.getDragDropElement = function () {
            // Add element container
            var iconRepresentation = "<div class='dragDropContainer'>";
            // Add icon container
            iconRepresentation += "<div class='dragDropIconContainer'>";
            // Add icons
            this.iconList.forEach(function (icon) {
                iconRepresentation += "<div class='dragDropIcon'>";
                iconRepresentation += icon;
                iconRepresentation += "</div>";
            });
            // Close icon container
            iconRepresentation += "</div>";
            // Add text container
            iconRepresentation += "<div class='dragDropTextContainer'>";
            // Add texts
            var top = 0;
            this.textList.forEach(function (text) {
                iconRepresentation += "<div class='dragDropText' style='top: " + top + "px;'>" + text + "</div>";
                top += 20;
            });
            // Close text container
            iconRepresentation += "</div>";
            // Close element container
            iconRepresentation += "</div>";
            return iconRepresentation;
        };
        /**
         * Clones the dragDrop representation
         *
         * @returns {DragDropRepresentation}
         * @memberof DragDropRepresentation
         */
        DragDropRepresentation.prototype.clone = function () {
            var clone = new DragDropRepresentation();
            this.iconList.forEach(function (icon) {
                clone.iconList.push(icon);
            });
            this.textList.forEach(function (text) {
                clone.textList.push(text);
            });
            return clone;
        };
        return DragDropRepresentation;
    }());
    exports.DragDropRepresentation = DragDropRepresentation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1lBQ0k7Ozs7O2VBS0c7WUFDRixhQUFRLEdBQWtCLElBQUksS0FBSyxFQUFVLENBQUM7WUFFOUM7Ozs7O2VBS0c7WUFDSCxhQUFRLEdBQWtCLElBQUksS0FBSyxFQUFVLENBQUM7UUFzRG5ELENBQUM7UUFwREk7Ozs7O1dBS0c7UUFDSCxtREFBa0IsR0FBbEI7WUFDRyx3QkFBd0I7WUFDeEIsSUFBSSxrQkFBa0IsR0FBRyxpQ0FBaUMsQ0FBQztZQUMzRCxxQkFBcUI7WUFDckIsa0JBQWtCLElBQUkscUNBQXFDLENBQUM7WUFDNUQsWUFBWTtZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDdEIsa0JBQWtCLElBQUksNEJBQTRCLENBQUM7Z0JBQ25ELGtCQUFrQixJQUFJLElBQUksQ0FBQztnQkFDM0Isa0JBQWtCLElBQUksUUFBUSxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBQ0gsdUJBQXVCO1lBQ3ZCLGtCQUFrQixJQUFJLFFBQVEsQ0FBQztZQUMvQixxQkFBcUI7WUFDckIsa0JBQWtCLElBQUkscUNBQXFDLENBQUM7WUFDNUQsWUFBWTtZQUNaLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDdEIsa0JBQWtCLElBQUksd0NBQXdDLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyxJQUFJLEdBQUcsUUFBUSxDQUFDO2dCQUNqRyxHQUFHLElBQUksRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDSCx1QkFBdUI7WUFDdkIsa0JBQWtCLElBQUksUUFBUSxDQUFDO1lBQy9CLDBCQUEwQjtZQUMxQixrQkFBa0IsSUFBSSxRQUFRLENBQUM7WUFFL0IsT0FBTyxrQkFBa0IsQ0FBQztRQUM3QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxzQ0FBSyxHQUFMO1lBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDdEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ3ZCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0YsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNOLDZCQUFDO0lBQUQsQ0FBQyxBQXJFRCxJQXFFQztJQXJFWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbntcclxuICAgIC8qKlxyXG4gICAgICogQXJyYXkgd2l0aCB0aGUgaWNvbnMgKGljb24gZGF0YSBhcyBzdHJpbmcgaW5zdGVhZCBvZiBpY29uIHBhdGggYmVjYXVzZSB3aXRoIHBhdGggdGhlIGRyb3AgaWNvbiBpcyBmbGlja2VyaW5nKSBmb3IgdGhlIGRyYWcgYW5kIGRyb3AgZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtBcnJheTxzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIERyYWdEcm9wUmVwcmVzZW50YXRpb25cclxuICAgICAqL1xyXG4gICAgIGljb25MaXN0OiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuXHJcbiAgICAgLyoqXHJcbiAgICAgICogQXJyYXkgd2l0aCB0aGUgdGV4dCBpbmZvcm1hdGlvbnMgZm9yIHRoZSBkcmFnIGFuZCBkcm9wIGVsZW1lbnRcclxuICAgICAgKlxyXG4gICAgICAqIEB0eXBlIHtBcnJheTxzdHJpbmc+fVxyXG4gICAgICAqIEBtZW1iZXJvZiBEcmFnRHJvcFJlcHJlc2VudGF0aW9uXHJcbiAgICAgICovXHJcbiAgICAgdGV4dExpc3Q6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG5cclxuICAgICAvKipcclxuICAgICAgKiBSZXR1cm5zIGFuIGVsZW1lbnQgd2l0aCB0aGUgZHJhZyBhbmQgZHJvcCByZXByZXNlbnRhdGlvblxyXG4gICAgICAqXHJcbiAgICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAgKiBAbWVtYmVyb2YgRHJhZ0Ryb3BSZXByZXNlbnRhdGlvblxyXG4gICAgICAqL1xyXG4gICAgIGdldERyYWdEcm9wRWxlbWVudCgpOnN0cmluZ3tcclxuICAgICAgICAvLyBBZGQgZWxlbWVudCBjb250YWluZXJcclxuICAgICAgICBsZXQgaWNvblJlcHJlc2VudGF0aW9uID0gYDxkaXYgY2xhc3M9J2RyYWdEcm9wQ29udGFpbmVyJz5gO1xyXG4gICAgICAgIC8vIEFkZCBpY29uIGNvbnRhaW5lclxyXG4gICAgICAgIGljb25SZXByZXNlbnRhdGlvbiArPSBgPGRpdiBjbGFzcz0nZHJhZ0Ryb3BJY29uQ29udGFpbmVyJz5gO1xyXG4gICAgICAgIC8vIEFkZCBpY29uc1xyXG4gICAgICAgIHRoaXMuaWNvbkxpc3QuZm9yRWFjaChpY29uID0+IHtcclxuICAgICAgICAgICAgaWNvblJlcHJlc2VudGF0aW9uICs9IGA8ZGl2IGNsYXNzPSdkcmFnRHJvcEljb24nPmA7XHJcbiAgICAgICAgICAgIGljb25SZXByZXNlbnRhdGlvbiArPSBpY29uO1xyXG4gICAgICAgICAgICBpY29uUmVwcmVzZW50YXRpb24gKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gQ2xvc2UgaWNvbiBjb250YWluZXJcclxuICAgICAgICBpY29uUmVwcmVzZW50YXRpb24gKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgLy8gQWRkIHRleHQgY29udGFpbmVyXHJcbiAgICAgICAgaWNvblJlcHJlc2VudGF0aW9uICs9IGA8ZGl2IGNsYXNzPSdkcmFnRHJvcFRleHRDb250YWluZXInPmA7XHJcbiAgICAgICAgLy8gQWRkIHRleHRzXHJcbiAgICAgICAgbGV0IHRvcCA9IDA7XHJcbiAgICAgICAgdGhpcy50ZXh0TGlzdC5mb3JFYWNoKHRleHQgPT57XHJcbiAgICAgICAgICAgIGljb25SZXByZXNlbnRhdGlvbiArPSBgPGRpdiBjbGFzcz0nZHJhZ0Ryb3BUZXh0JyBzdHlsZT0ndG9wOiBgICsgdG9wICsgYHB4Oyc+YCArIHRleHQgKyBgPC9kaXY+YDsgXHJcbiAgICAgICAgICAgIHRvcCArPSAyMDtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBDbG9zZSB0ZXh0IGNvbnRhaW5lclxyXG4gICAgICAgIGljb25SZXByZXNlbnRhdGlvbiArPSBgPC9kaXY+YDtcclxuICAgICAgICAvLyBDbG9zZSBlbGVtZW50IGNvbnRhaW5lclxyXG4gICAgICAgIGljb25SZXByZXNlbnRhdGlvbiArPSBgPC9kaXY+YDtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gaWNvblJlcHJlc2VudGF0aW9uO1xyXG4gICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgICogQ2xvbmVzIHRoZSBkcmFnRHJvcCByZXByZXNlbnRhdGlvblxyXG4gICAgICAqXHJcbiAgICAgICogQHJldHVybnMge0RyYWdEcm9wUmVwcmVzZW50YXRpb259XHJcbiAgICAgICogQG1lbWJlcm9mIERyYWdEcm9wUmVwcmVzZW50YXRpb25cclxuICAgICAgKi9cclxuICAgICBjbG9uZSgpOiBEcmFnRHJvcFJlcHJlc2VudGF0aW9ue1xyXG4gICAgICAgICBsZXQgY2xvbmUgPSBuZXcgRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbigpO1xyXG4gICAgICAgICB0aGlzLmljb25MaXN0LmZvckVhY2goaWNvbiA9PiB7XHJcbiAgICAgICAgICAgICBjbG9uZS5pY29uTGlzdC5wdXNoKGljb24pO1xyXG4gICAgICAgICB9KTtcclxuICAgICAgICAgXHJcbiAgICAgICAgIHRoaXMudGV4dExpc3QuZm9yRWFjaCh0ZXh0ID0+IHtcclxuICAgICAgICAgICAgY2xvbmUudGV4dExpc3QucHVzaCh0ZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAgcmV0dXJuIGNsb25lO1xyXG4gICAgIH1cclxufSJdfQ==