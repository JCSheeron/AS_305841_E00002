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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "../../../framework/state", "./cursorState", "../../../common/persistence/settings", "./settingIds", "./cursorType", "../../../framework/reflection/decorators/metaClassPropertyDecorator", "../../../framework/componentHub/common/commonTypes"], function (require, exports, state_1, cursorState_1, settings_1, settingIds_1, cursorType_1, Reflection, commonTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * holds cursor state objects
     * @singleton
     * @export
     * @class CursorStates
     */
    var CursorStates = /** @class */ (function (_super) {
        __extends(CursorStates, _super);
        /**
         * Creates an instance of CursorStates.
         * @memberof CursorStates
         */
        function CursorStates() {
            var _this = _super.call(this) || this;
            _this._type = "CursorStates"; // type of this class(normally the classname)
            // Set the persisting id where the CursorStates will be saved
            _this.id = "CursorStates"; // unique id of the instance
            // Create default cursor States
            var cursorState1 = new cursorState_1.CursorState(cursorType_1.CursorType.timeDomain);
            var cursorState2 = new cursorState_1.CursorState(cursorType_1.CursorType.timeDomain);
            var FFTcursorState1 = new cursorState_1.CursorState(cursorType_1.CursorType.frequencyDomain);
            var FFTcursorState2 = new cursorState_1.CursorState(cursorType_1.CursorType.frequencyDomain);
            _this._timeCursorStates = [cursorState1, cursorState2];
            _this._fftCursorStates = [FFTcursorState1, FFTcursorState2];
            _this._cursorStates = _this._timeCursorStates.concat(_this._fftCursorStates);
            // Select cursor 1 by default
            cursorState1.selected = true;
            _this.lastCursorTypeSelected = cursorType_1.CursorType.timeDomain;
            return _this;
        }
        /**
         * Disposes the object
         *
         * @memberof CursorStates
         */
        CursorStates.prototype.dispose = function () {
        };
        /**
         * Returns the current settings of this cursorStates object
         *
         * @returns {ISettings}
         * @memberof CursorStates
         */
        CursorStates.prototype.getSettings = function () {
            var settings = new settings_1.Settings(this._type), timePositions = Array(), timeActiveStates = Array(), fftPositions = Array(), fftActiveStates = Array();
            this._timeCursorStates.forEach(function (cursor) {
                timePositions.push(cursor.position);
                timeActiveStates.push(cursor.active);
            });
            this._fftCursorStates.forEach(function (cursor) {
                fftPositions.push(cursor.position);
                fftActiveStates.push(cursor.active);
            });
            //Persist position and active state
            settings.setValue(settingIds_1.SettingIds.TimeCursorPositions, timePositions);
            settings.setValue(settingIds_1.SettingIds.FftCursorPositions, fftPositions);
            settings.setValue(settingIds_1.SettingIds.TimeCursorActiveState, timeActiveStates);
            settings.setValue(settingIds_1.SettingIds.FftCursorActiveState, fftActiveStates);
            return settings;
        };
        /**
         * Sets the given settings to this cursorStates object
         *
         * @param {ISettings} settings
         * @memberof CursorStates
         */
        CursorStates.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings), timePositions = settingsObj.getValue(settingIds_1.SettingIds.TimeCursorPositions), fftPositions = settingsObj.getValue(settingIds_1.SettingIds.FftCursorPositions), timeActiveStates = settingsObj.getValue(settingIds_1.SettingIds.TimeCursorActiveState), fftActiveStates = settingsObj.getValue(settingIds_1.SettingIds.FftCursorActiveState);
            for (var i = 0; i < timePositions.length; i++) {
                this._timeCursorStates[i].position = timePositions[i];
                this._timeCursorStates[i].active = timeActiveStates[i];
            }
            for (var i = 0; i < fftPositions.length; i++) {
                this._fftCursorStates[i].position = fftPositions[i];
                this._fftCursorStates[i].active = fftActiveStates[i];
            }
            this._cursorStates = this._timeCursorStates.concat(this._fftCursorStates);
        };
        /**
         * Returns a list of all available cursor states
         *
         * @returns {Array<ICursorState>}
         * @memberof CursorStates
         */
        CursorStates.prototype.getStates = function () {
            return this._cursorStates;
        };
        /**
         * Returns a list of all available time cursor states
         *
         * @returns {Array<ICursorState>}
         * @memberof CursorStates
         */
        CursorStates.prototype.getTimeStates = function () {
            return this._timeCursorStates;
        };
        /**
         * Returns a list of all available time cursor states
         *
         * @returns {Array<ICursorState>}
         * @memberof CursorStates
         */
        CursorStates.prototype.getFrequencyStates = function () {
            return this._fftCursorStates;
        };
        /**
         * Sets the active flag for the given index
         *
         * @param {number} cursorIndex
         * @param {boolean} active
         * @memberof CursorStates
         */
        CursorStates.prototype.setActive = function (cursorIndex, active) {
            if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.timeDomain) {
                this._timeCursorStates[cursorIndex].active = active;
            }
            else if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.frequencyDomain) {
                this._fftCursorStates[cursorIndex].active = active;
            }
        };
        /**
         * Returns the active flag for the given index
         *
         * @param {number} cursorIndex
         * @returns {boolean}
         * @memberof CursorStates
         */
        CursorStates.prototype.getActive = function (cursorIndex) {
            if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.timeDomain) {
                return this._timeCursorStates[cursorIndex].active;
            }
            else if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.frequencyDomain) {
                return this._fftCursorStates[cursorIndex].active;
            }
            return false;
        };
        /**
         * Reset cursor states
         *
         * @param {CursorType} type
         * @memberof CursorStates
         */
        CursorStates.prototype.resetCursorStates = function (type) {
            if (type === cursorType_1.CursorType.timeDomain) {
                this.resetTimeCursorStates();
            }
            else if (type === cursorType_1.CursorType.frequencyDomain) {
                this.resetFqCursorStates();
            }
        };
        /**
         * Reset time cursor states
         *
         * @private
         * @memberof CursorStates
         */
        CursorStates.prototype.resetTimeCursorStates = function () {
            this._timeCursorStates.forEach(function (state) {
                state.active = false;
                state.hovered = false;
                state.position = undefined;
            });
        };
        /**
         * Reset fq cursor states
         *
         * @private
         * @memberof CursorStates
         */
        CursorStates.prototype.resetFqCursorStates = function () {
            this._fftCursorStates.forEach(function (state) {
                state.active = false;
                state.hovered = false;
                state.position = undefined;
            });
        };
        /**
         * Sets the type of cursor that has been selected
         *
         * @param {CursorType} type
         * @memberof CursorStates
         */
        CursorStates.prototype.setLastCursorTypeSelected = function (type) {
            this.lastCursorTypeSelected = type;
        };
        /**
         * Gets the type of cursor that has been selected
         *
         * @returns {CursorType}
         * @memberof CursorStates
         */
        CursorStates.prototype.getLastCursorTypeSelected = function () {
            return this.lastCursorTypeSelected;
        };
        /**
         * Set hovered flag for the cursor with the given index, and remove hovered flag from all other cursors
         * if hovered = false and cursorIndex = -1, hovered will be set to false at all cursors
         *
         * @param {number} cursorIndex
         * @param {boolean} hovered
         * @memberof CursorStates
         */
        CursorStates.prototype.setHovered = function (cursorIndex, cursorType, hovered) {
            if (cursorIndex >= 0 && cursorIndex < this._cursorStates.length) {
                if (cursorType == cursorType_1.CursorType.timeDomain) {
                    this._timeCursorStates[cursorIndex].hovered = hovered;
                }
                else if (cursorType == cursorType_1.CursorType.frequencyDomain) {
                    this._fftCursorStates[cursorIndex].hovered = hovered;
                }
                if (hovered == true) {
                    // set all other cursors to hovered false
                    this.setOtherCursorsToFalse(cursorIndex, cursorType, 'hovered');
                }
            }
            else if (cursorIndex == -1 && hovered == false) {
                // Set all cursor hovered flags to false
                this._cursorStates.forEach(function (cursorState) {
                    cursorState.hovered = false;
                });
            }
        };
        /**
         * Returns the hovered flag for the given index
         *
         * @param {number} cursorIndex
         * @returns {boolean}
         * @memberof CursorStates
         */
        CursorStates.prototype.getHovered = function (cursorIndex) {
            return this._cursorStates[cursorIndex].hovered;
        };
        /**
         * Returns the index of a current hovered cursor or -1 if no hovered cursor is available
         *
         * @returns {number}
         * @memberof CursorStates
         */
        CursorStates.prototype.getHoveredCursorIndex = function () {
            var hoveredCursorIndex = -1;
            for (var index = 0; index < this._timeCursorStates.length; index++) {
                if (this._timeCursorStates[index].hovered == true) {
                    hoveredCursorIndex = index;
                }
            }
            for (var index = 0; index < this._fftCursorStates.length; index++) {
                if (this._fftCursorStates[index].hovered == true) {
                    hoveredCursorIndex = index;
                }
            }
            return hoveredCursorIndex;
        };
        /**
         * Sets the position of the cursor with the given index
         *
         * @param {number} cursorIndex
         * @param {number} position
         * @memberof CursorStates
         */
        CursorStates.prototype.setPosition = function (cursorIndex, position) {
            if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.timeDomain) {
                this._timeCursorStates[cursorIndex].position = position;
            }
            else if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.frequencyDomain) {
                this._fftCursorStates[cursorIndex].position = position;
            }
        };
        /**
         * Returns the position of the cursor with the given index
         *
         * @param {number} cursorIndex
         * @returns {(number|undefined)}
         * @memberof CursorStates
         */
        CursorStates.prototype.getPosition = function (cursorIndex, cursorType) {
            if (cursorType == cursorType_1.CursorType.timeDomain) {
                return this._timeCursorStates[cursorIndex].position;
            }
            else {
                return this._fftCursorStates[cursorIndex].position;
            }
        };
        /**
         * Returns the index of the current selected cursor or -1 if no selected cursor is available
         *
         * @returns {number}
         * @memberof CursorStates
         */
        CursorStates.prototype.getSelectedCursorIndex = function () {
            var selectedCursorIndex = -1;
            for (var i = 0; i < this._timeCursorStates.length; i++) {
                if (this._timeCursorStates[i].selected == true) {
                    selectedCursorIndex = i;
                }
            }
            for (var i = 0; i < this._fftCursorStates.length; i++) {
                if (this._fftCursorStates[i].selected == true) {
                    selectedCursorIndex = i;
                }
            }
            return selectedCursorIndex;
        };
        /**
         * Sets selected flag of the cursor with the given index(if true all other cursors will be set to deselected)
         *
         * @param {number} cursorIndex
         * @param {boolean} selected
         * @memberof CursorStates
         */
        CursorStates.prototype.setSelected = function (cursorIndex, selected) {
            if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.frequencyDomain) {
                this._fftCursorStates[cursorIndex].selected = selected;
            }
            else if (this.getLastCursorTypeSelected() == cursorType_1.CursorType.timeDomain) {
                this._timeCursorStates[cursorIndex].selected = selected;
            }
            if (selected == true) {
                // set all other cursors to selected false
                this.setOtherCursorsToFalse(cursorIndex, this.getLastCursorTypeSelected(), 'selected');
            }
        };
        /**
         * Set the specified property to false for all the cursorStates except one
         *
         * @private
         * @param {number} cursorIndex
         * @param {CursorType} cursorType
         * @param {string} property
         * @memberof CursorStates
         */
        CursorStates.prototype.setOtherCursorsToFalse = function (cursorIndex, cursorType, property) {
            for (var i = 0; i < this._timeCursorStates.length; i++) {
                if (cursorType == cursorType_1.CursorType.timeDomain) {
                    this._fftCursorStates[i][property] = false;
                }
                else if (i != cursorIndex) {
                    this._fftCursorStates[i][property] = false;
                }
            }
            for (var i = 0; i < this._fftCursorStates.length; i++) {
                if (cursorType == cursorType_1.CursorType.frequencyDomain) {
                    this._timeCursorStates[i][property] = false;
                }
                else if (i != cursorIndex) {
                    this._timeCursorStates[i][property] = false;
                }
            }
        };
        CursorStates = __decorate([
            Reflection.metaClassProperty(Reflection.MetaClassProperty.persistable, true),
            Reflection.metaClassProperty(Reflection.MetaClassProperty.transferType, commonTypes_1.DataTransferType.byValue),
            Reflection.metaClassProperty(Reflection.MetaClassProperty.className, "CursorStates")
        ], CursorStates);
        return CursorStates;
    }(state_1.State));
    exports.CursorStates = CursorStates;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU3RhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFZQTs7Ozs7T0FLRztJQUlIO1FBQWtDLGdDQUFLO1FBbUJuQzs7O1dBR0c7UUFDSDtZQUFBLFlBQ0ksaUJBQU8sU0FlVjtZQTFCTyxXQUFLLEdBQVcsY0FBYyxDQUFDLENBQUMsNkNBQTZDO1lBRXJGLDZEQUE2RDtZQUN0RCxRQUFFLEdBQVcsY0FBYyxDQUFDLENBQUMsNEJBQTRCO1lBVTVELCtCQUErQjtZQUMvQixJQUFJLFlBQVksR0FBZ0IsSUFBSSx5QkFBVyxDQUFDLHVCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkUsSUFBSSxZQUFZLEdBQWdCLElBQUkseUJBQVcsQ0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksZUFBZSxHQUFnQixJQUFJLHlCQUFXLENBQUMsdUJBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMvRSxJQUFJLGVBQWUsR0FBZ0IsSUFBSSx5QkFBVyxDQUFDLHVCQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFL0UsS0FBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3RELEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUMzRCxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFMUUsNkJBQTZCO1lBQzdCLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzdCLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyx1QkFBVSxDQUFDLFVBQVUs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LEVBQUMsOEJBQWdCLENBQUMsT0FBTyxDQUFDO1lBQ2hHLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFDLGNBQWMsQ0FBQztXQUN2RSxZQUFZLENBOFl4QjtRQUFELG1CQUFDO0tBQUEsQUE5WUQsQ0FBa0MsYUFBSyxHQThZdEM7SUE5WVksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvc3RhdGVcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU3RhdGUgfSBmcm9tIFwiLi9jdXJzb3JTdGF0ZVwiO1xyXG5pbXBvcnQgeyBJQ3Vyc29yU3RhdGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jdXJzb3JTdGF0ZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zZXR0aW5nSWRzXCI7XHJcbmltcG9ydCB7IEN1cnNvclR5cGUgfSBmcm9tIFwiLi9jdXJzb3JUeXBlXCI7XHJcbmltcG9ydCAqIGFzIFJlZmxlY3Rpb24gIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcmVmbGVjdGlvbi9kZWNvcmF0b3JzL21ldGFDbGFzc1Byb3BlcnR5RGVjb3JhdG9yXCI7XHJcbmltcG9ydCB7IElQZXJzaXN0ZW5jeU9iamVjdCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9wZXJzaXN0ZW5jeU9iamVjdEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEYXRhVHJhbnNmZXJUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvY29tbW9uL2NvbW1vblR5cGVzXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIGhvbGRzIGN1cnNvciBzdGF0ZSBvYmplY3RzXHJcbiAqIEBzaW5nbGV0b25cclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ3Vyc29yU3RhdGVzXHJcbiAqL1xyXG5AUmVmbGVjdGlvbi5tZXRhQ2xhc3NQcm9wZXJ0eShSZWZsZWN0aW9uLk1ldGFDbGFzc1Byb3BlcnR5LnBlcnNpc3RhYmxlLHRydWUpICAgIFxyXG5AUmVmbGVjdGlvbi5tZXRhQ2xhc3NQcm9wZXJ0eShSZWZsZWN0aW9uLk1ldGFDbGFzc1Byb3BlcnR5LnRyYW5zZmVyVHlwZSxEYXRhVHJhbnNmZXJUeXBlLmJ5VmFsdWUpICBcclxuQFJlZmxlY3Rpb24ubWV0YUNsYXNzUHJvcGVydHkoUmVmbGVjdGlvbi5NZXRhQ2xhc3NQcm9wZXJ0eS5jbGFzc05hbWUsXCJDdXJzb3JTdGF0ZXNcIilcclxuZXhwb3J0IGNsYXNzIEN1cnNvclN0YXRlcyBleHRlbmRzIFN0YXRlIGltcGxlbWVudHMgSVBlcnNpc3RlbmN5T2JqZWN0IHtcclxuXHJcbiAgICAvLyBob2xkcyB0aW1lIGN1cnNvcnNcclxuICAgIHByaXZhdGUgX3RpbWVDdXJzb3JTdGF0ZXM6IEFycmF5PEN1cnNvclN0YXRlPjtcclxuXHJcbiAgICAvL2hvbGRzIGZmdCBjdXJzb3JzXHJcbiAgICBwcml2YXRlIF9mZnRDdXJzb3JTdGF0ZXM6IEFycmF5PEN1cnNvclN0YXRlPjtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgY3Vyc29yIHN0YXRlcyBpbiBhbiBhcnJheSBmb3IgY29udmVuaWVuY2UgYWNjZXNzXHJcbiAgICBwcml2YXRlIF9jdXJzb3JTdGF0ZXM6IEFycmF5PEN1cnNvclN0YXRlPjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgbGFzdEN1cnNvclR5cGVTZWxlY3RlZDtcclxuXHJcbiAgICBwcml2YXRlIF90eXBlOiBzdHJpbmcgPSBcIkN1cnNvclN0YXRlc1wiOyAvLyB0eXBlIG9mIHRoaXMgY2xhc3Mobm9ybWFsbHkgdGhlIGNsYXNzbmFtZSlcclxuXHJcbiAgICAvLyBTZXQgdGhlIHBlcnNpc3RpbmcgaWQgd2hlcmUgdGhlIEN1cnNvclN0YXRlcyB3aWxsIGJlIHNhdmVkXHJcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IFwiQ3Vyc29yU3RhdGVzXCI7IC8vIHVuaXF1ZSBpZCBvZiB0aGUgaW5zdGFuY2VcclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDdXJzb3JTdGF0ZXMuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IGN1cnNvciBTdGF0ZXNcclxuICAgICAgICBsZXQgY3Vyc29yU3RhdGUxOiBDdXJzb3JTdGF0ZSA9IG5ldyBDdXJzb3JTdGF0ZShDdXJzb3JUeXBlLnRpbWVEb21haW4pO1xyXG4gICAgICAgIGxldCBjdXJzb3JTdGF0ZTI6IEN1cnNvclN0YXRlID0gbmV3IEN1cnNvclN0YXRlKEN1cnNvclR5cGUudGltZURvbWFpbik7XHJcbiAgICAgICAgbGV0IEZGVGN1cnNvclN0YXRlMTogQ3Vyc29yU3RhdGUgPSBuZXcgQ3Vyc29yU3RhdGUoQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pO1xyXG4gICAgICAgIGxldCBGRlRjdXJzb3JTdGF0ZTI6IEN1cnNvclN0YXRlID0gbmV3IEN1cnNvclN0YXRlKEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlcyA9IFtjdXJzb3JTdGF0ZTEsIGN1cnNvclN0YXRlMl07XHJcbiAgICAgICAgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzID0gW0ZGVGN1cnNvclN0YXRlMSwgRkZUY3Vyc29yU3RhdGUyXTtcclxuICAgICAgICB0aGlzLl9jdXJzb3JTdGF0ZXMgPSB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzLmNvbmNhdCh0aGlzLl9mZnRDdXJzb3JTdGF0ZXMpO1xyXG5cclxuICAgICAgICAvLyBTZWxlY3QgY3Vyc29yIDEgYnkgZGVmYXVsdFxyXG4gICAgICAgIGN1cnNvclN0YXRlMS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sYXN0Q3Vyc29yVHlwZVNlbGVjdGVkID0gQ3Vyc29yVHlwZS50aW1lRG9tYWluO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHNldHRpbmdzIG9mIHRoaXMgY3Vyc29yU3RhdGVzIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtJU2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIGdldFNldHRpbmdzKCk6IElTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKHRoaXMuX3R5cGUpLFxyXG4gICAgICAgICAgICB0aW1lUG9zaXRpb25zID0gQXJyYXkoKSxcclxuICAgICAgICAgICAgdGltZUFjdGl2ZVN0YXRlcyA9IEFycmF5KCksXHJcbiAgICAgICAgICAgIGZmdFBvc2l0aW9ucyA9IEFycmF5KCksXHJcbiAgICAgICAgICAgIGZmdEFjdGl2ZVN0YXRlcyA9IEFycmF5KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXMuZm9yRWFjaCgoY3Vyc29yKSA9PiB7XHJcbiAgICAgICAgICAgIHRpbWVQb3NpdGlvbnMucHVzaChjdXJzb3IucG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aW1lQWN0aXZlU3RhdGVzLnB1c2goY3Vyc29yLmFjdGl2ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzLmZvckVhY2goKGN1cnNvcikgPT4ge1xyXG4gICAgICAgICAgICBmZnRQb3NpdGlvbnMucHVzaChjdXJzb3IucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBmZnRBY3RpdmVTdGF0ZXMucHVzaChjdXJzb3IuYWN0aXZlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9QZXJzaXN0IHBvc2l0aW9uIGFuZCBhY3RpdmUgc3RhdGVcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlRpbWVDdXJzb3JQb3NpdGlvbnMsIHRpbWVQb3NpdGlvbnMpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuRmZ0Q3Vyc29yUG9zaXRpb25zLCBmZnRQb3NpdGlvbnMpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuVGltZUN1cnNvckFjdGl2ZVN0YXRlLCB0aW1lQWN0aXZlU3RhdGVzKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLkZmdEN1cnNvckFjdGl2ZVN0YXRlLCBmZnRBY3RpdmVTdGF0ZXMpO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIHRvIHRoaXMgY3Vyc29yU3RhdGVzIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVNldHRpbmdzfSBzZXR0aW5nc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBzZXRTZXR0aW5ncyhzZXR0aW5nczogSVNldHRpbmdzKSB7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKSxcclxuICAgICAgICAgICAgdGltZVBvc2l0aW9ucyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuVGltZUN1cnNvclBvc2l0aW9ucyksXHJcbiAgICAgICAgICAgIGZmdFBvc2l0aW9ucyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuRmZ0Q3Vyc29yUG9zaXRpb25zKSxcclxuICAgICAgICAgICAgdGltZUFjdGl2ZVN0YXRlcyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuVGltZUN1cnNvckFjdGl2ZVN0YXRlKSxcclxuICAgICAgICAgICAgZmZ0QWN0aXZlU3RhdGVzID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5GZnRDdXJzb3JBY3RpdmVTdGF0ZSk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGltZVBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzW2ldLnBvc2l0aW9uID0gdGltZVBvc2l0aW9uc1tpXTtcclxuICAgICAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlc1tpXS5hY3RpdmUgPSB0aW1lQWN0aXZlU3RhdGVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZmdFBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbaV0ucG9zaXRpb24gPSBmZnRQb3NpdGlvbnNbaV07XHJcbiAgICAgICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tpXS5hY3RpdmUgPSBmZnRBY3RpdmVTdGF0ZXNbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jdXJzb3JTdGF0ZXMgPSB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzLmNvbmNhdCh0aGlzLl9mZnRDdXJzb3JTdGF0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIGF2YWlsYWJsZSBjdXJzb3Igc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElDdXJzb3JTdGF0ZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTdGF0ZXMoKTogQXJyYXk8SUN1cnNvclN0YXRlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclN0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBhdmFpbGFibGUgdGltZSBjdXJzb3Igc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElDdXJzb3JTdGF0ZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUaW1lU3RhdGVzKCk6IEFycmF5PElDdXJzb3JTdGF0ZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIGF2YWlsYWJsZSB0aW1lIGN1cnNvciBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SUN1cnNvclN0YXRlPn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEZyZXF1ZW5jeVN0YXRlcygpOiBBcnJheTxJQ3Vyc29yU3RhdGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGZsYWcgZm9yIHRoZSBnaXZlbiBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhY3RpdmVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEFjdGl2ZShjdXJzb3JJbmRleDogbnVtYmVyLCBhY3RpdmU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkgPT0gQ3Vyc29yVHlwZS50aW1lRG9tYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLmFjdGl2ZSA9IGFjdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkgPT0gQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzW2N1cnNvckluZGV4XS5hY3RpdmUgPSBhY3RpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgYWN0aXZlIGZsYWcgZm9yIHRoZSBnaXZlbiBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBY3RpdmUoY3Vyc29ySW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLmFjdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkgPT0gQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uYWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCBjdXJzb3Igc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JUeXBlfSB0eXBlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXNldEN1cnNvclN0YXRlcyh0eXBlOiBDdXJzb3JUeXBlKSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IEN1cnNvclR5cGUudGltZURvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0VGltZUN1cnNvclN0YXRlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0RnFDdXJzb3JTdGF0ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCB0aW1lIGN1cnNvciBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2V0VGltZUN1cnNvclN0YXRlcygpIHtcclxuICAgICAgICB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzLmZvckVhY2goKHN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGF0ZS5ob3ZlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXRlLnBvc2l0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCBmcSBjdXJzb3Igc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNldEZxQ3Vyc29yU3RhdGVzKCkge1xyXG4gICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlcy5mb3JFYWNoKChzdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICBzdGF0ZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3RhdGUuaG92ZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGF0ZS5wb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdHlwZSBvZiBjdXJzb3IgdGhhdCBoYXMgYmVlbiBzZWxlY3RlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yVHlwZX0gdHlwZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCh0eXBlOiBDdXJzb3JUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5sYXN0Q3Vyc29yVHlwZVNlbGVjdGVkID0gdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHR5cGUgb2YgY3Vyc29yIHRoYXQgaGFzIGJlZW4gc2VsZWN0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q3Vyc29yVHlwZX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKTogQ3Vyc29yVHlwZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGFzdEN1cnNvclR5cGVTZWxlY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBob3ZlcmVkIGZsYWcgZm9yIHRoZSBjdXJzb3Igd2l0aCB0aGUgZ2l2ZW4gaW5kZXgsIGFuZCByZW1vdmUgaG92ZXJlZCBmbGFnIGZyb20gYWxsIG90aGVyIGN1cnNvcnNcclxuICAgICAqIGlmIGhvdmVyZWQgPSBmYWxzZSBhbmQgY3Vyc29ySW5kZXggPSAtMSwgaG92ZXJlZCB3aWxsIGJlIHNldCB0byBmYWxzZSBhdCBhbGwgY3Vyc29yc1xyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaG92ZXJlZFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0SG92ZXJlZChjdXJzb3JJbmRleDogbnVtYmVyLCBjdXJzb3JUeXBlOiBDdXJzb3JUeXBlIHwgdW5kZWZpbmVkLCBob3ZlcmVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGN1cnNvckluZGV4ID49IDAgJiYgY3Vyc29ySW5kZXggPCB0aGlzLl9jdXJzb3JTdGF0ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3JUeXBlID09IEN1cnNvclR5cGUudGltZURvbWFpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uaG92ZXJlZCA9IGhvdmVyZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzW2N1cnNvckluZGV4XS5ob3ZlcmVkID0gaG92ZXJlZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdmVyZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0IGFsbCBvdGhlciBjdXJzb3JzIHRvIGhvdmVyZWQgZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0T3RoZXJDdXJzb3JzVG9GYWxzZShjdXJzb3JJbmRleCwgY3Vyc29yVHlwZSEsICdob3ZlcmVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3Vyc29ySW5kZXggPT0gLTEgJiYgaG92ZXJlZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvLyBTZXQgYWxsIGN1cnNvciBob3ZlcmVkIGZsYWdzIHRvIGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclN0YXRlcy5mb3JFYWNoKGN1cnNvclN0YXRlID0+IHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclN0YXRlLmhvdmVyZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaG92ZXJlZCBmbGFnIGZvciB0aGUgZ2l2ZW4gaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SG92ZXJlZChjdXJzb3JJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uaG92ZXJlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IG9mIGEgY3VycmVudCBob3ZlcmVkIGN1cnNvciBvciAtMSBpZiBubyBob3ZlcmVkIGN1cnNvciBpcyBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SG92ZXJlZEN1cnNvckluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGhvdmVyZWRDdXJzb3JJbmRleCA9IC0xO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdGltZUN1cnNvclN0YXRlc1tpbmRleF0uaG92ZXJlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBob3ZlcmVkQ3Vyc29ySW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX2ZmdEN1cnNvclN0YXRlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tpbmRleF0uaG92ZXJlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBob3ZlcmVkQ3Vyc29ySW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaG92ZXJlZEN1cnNvckluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnNvciB3aXRoIHRoZSBnaXZlbiBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBvc2l0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRQb3NpdGlvbihjdXJzb3JJbmRleDogbnVtYmVyLCBwb3NpdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCgpID09IEN1cnNvclR5cGUudGltZURvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzW2N1cnNvckluZGV4XS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSA9PSBDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnNvciB3aXRoIHRoZSBnaXZlbiBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBvc2l0aW9uKGN1cnNvckluZGV4OiBudW1iZXIsIGN1cnNvclR5cGU6IEN1cnNvclR5cGUpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmIChjdXJzb3JUeXBlID09IEN1cnNvclR5cGUudGltZURvbWFpbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGltZUN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0ucG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzW2N1cnNvckluZGV4XS5wb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBzZWxlY3RlZCBjdXJzb3Igb3IgLTEgaWYgbm8gc2VsZWN0ZWQgY3Vyc29yIGlzIGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZWxlY3RlZEN1cnNvckluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3Vyc29ySW5kZXggPSAtMTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90aW1lQ3Vyc29yU3RhdGVzW2ldLnNlbGVjdGVkID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3Vyc29ySW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbaV0uc2VsZWN0ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXJzb3JJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkQ3Vyc29ySW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHNlbGVjdGVkIGZsYWcgb2YgdGhlIGN1cnNvciB3aXRoIHRoZSBnaXZlbiBpbmRleChpZiB0cnVlIGFsbCBvdGhlciBjdXJzb3JzIHdpbGwgYmUgc2V0IHRvIGRlc2VsZWN0ZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZChjdXJzb3JJbmRleDogbnVtYmVyLCBzZWxlY3RlZDogYm9vbGVhbikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkgPT0gQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzW2N1cnNvckluZGV4XS5zZWxlY3RlZCA9IHNlbGVjdGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uc2VsZWN0ZWQgPSBzZWxlY3RlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3RlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIC8vIHNldCBhbGwgb3RoZXIgY3Vyc29ycyB0byBzZWxlY3RlZCBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnNldE90aGVyQ3Vyc29yc1RvRmFsc2UoY3Vyc29ySW5kZXgsIHRoaXMuZ2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCgpLCAnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eSB0byBmYWxzZSBmb3IgYWxsIHRoZSBjdXJzb3JTdGF0ZXMgZXhjZXB0IG9uZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yVHlwZX0gY3Vyc29yVHlwZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0T3RoZXJDdXJzb3JzVG9GYWxzZShjdXJzb3JJbmRleDogbnVtYmVyLCBjdXJzb3JUeXBlOiBDdXJzb3JUeXBlLCBwcm9wZXJ0eTogc3RyaW5nKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3JUeXBlID09IEN1cnNvclR5cGUudGltZURvbWFpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzW2ldW3Byb3BlcnR5XSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgIT0gY3Vyc29ySW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tpXVtwcm9wZXJ0eV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9mZnRDdXJzb3JTdGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGN1cnNvclR5cGUgPT0gQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbaV1bcHJvcGVydHldID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaSAhPSBjdXJzb3JJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlc1tpXVtwcm9wZXJ0eV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIl19