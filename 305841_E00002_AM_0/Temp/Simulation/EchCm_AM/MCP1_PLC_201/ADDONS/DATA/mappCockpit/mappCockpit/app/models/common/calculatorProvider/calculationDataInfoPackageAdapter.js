define(["require", "exports", "../../../common/packageConversion/enum/objectTypeEnum", "../../../common/persistence/settings", "../../../common/packageConversion/enum/additionalMetaKeys", "../../../common/packageConversion/enum/dataTypeEnum", "../../../common/packageConversion/mceConversionError", "./calculationDataInfoSettingIds", "../../../common/packageConversion/package", "../../../common/packageConversion/meta", "../../../common/packageConversion/enum/arrayTypeEnum"], function (require, exports, objectTypeEnum_1, settings_1, additionalMetaKeys_1, dataTypeEnum_1, mceConversionError_1, calculationDataInfoSettingIds_1, package_1, meta_1, arrayTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataIds;
    (function (DataIds) {
        DataIds["Type"] = "type";
        DataIds["InputDataIds"] = "inputDataIds";
        DataIds["InputDataValues"] = "inputDataValues";
        DataIds["UniqueId"] = "uniqueId";
    })(DataIds || (DataIds = {}));
    var CalculationDataPackageAdapter = /** @class */ (function () {
        function CalculationDataPackageAdapter() {
            //newest version of package format
            this.currentPackageVersion = 2;
            this.settingsType = "CalculationDataInfo";
            this.objectType = objectTypeEnum_1.ObjectType.CALCULATION;
        }
        CalculationDataPackageAdapter.prototype.packageToSetting = function (packageData, container) {
            var _a, _b, _c;
            var setting = new settings_1.Settings(this.settingsType);
            if (((_a = packageData === null || packageData === void 0 ? void 0 : packageData.meta) === null || _a === void 0 ? void 0 : _a.dataType) == dataTypeEnum_1.DataType.OBJECT && ((_b = packageData === null || packageData === void 0 ? void 0 : packageData.meta) === null || _b === void 0 ? void 0 : _b[additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE]) == this.objectType) {
                switch ((_c = packageData === null || packageData === void 0 ? void 0 : packageData.meta) === null || _c === void 0 ? void 0 : _c[additionalMetaKeys_1.AdditionalMetaKeys.VERSION]) {
                    case 1:
                        setting = this.packageV1ToSetting(packageData, container);
                        break;
                    case 2:
                        setting = this.packageV2ToSetting(packageData, container);
                        break;
                    default:
                        throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.UNSUPPORTED_VERSION, this.objectType);
                }
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.UNSUPPORTED_TYPE, this.objectType);
            }
            return setting;
        };
        CalculationDataPackageAdapter.prototype.packageV1ToSetting = function (packageData, container) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            var settings = new settings_1.Settings(this.settingsType);
            if (((_c = (_b = (_a = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _a === void 0 ? void 0 : _a[DataIds.Type]) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.dataType) == dataTypeEnum_1.DataType.STRING) {
                var newType = this.convertDisplayNameToId((_e = (_d = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _d === void 0 ? void 0 : _d[DataIds.Type]) === null || _e === void 0 ? void 0 : _e.data);
                settings.setValue(calculationDataInfoSettingIds_1.SettingIds.Type, newType);
                // Set default inputDataIds by type
                settings.setValue(calculationDataInfoSettingIds_1.SettingIds.InputDataIds, this.getInputDataIdsForType(newType));
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.Type);
            }
            if (((_h = (_g = (_f = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _f === void 0 ? void 0 : _f[DataIds.InputDataValues]) === null || _g === void 0 ? void 0 : _g.meta) === null || _h === void 0 ? void 0 : _h.dataType) == dataTypeEnum_1.DataType.ARRAY && ((_l = (_k = (_j = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _j === void 0 ? void 0 : _j[DataIds.InputDataValues]) === null || _k === void 0 ? void 0 : _k.meta) === null || _l === void 0 ? void 0 : _l[additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE]) == arrayTypeEnum_1.ArrayType.STRING) {
                settings.setValue(calculationDataInfoSettingIds_1.SettingIds.InputDataValues, (_o = (_m = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _m === void 0 ? void 0 : _m[DataIds.InputDataValues]) === null || _o === void 0 ? void 0 : _o.data);
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.InputDataValues);
            }
            if (((_r = (_q = (_p = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _p === void 0 ? void 0 : _p[DataIds.UniqueId]) === null || _q === void 0 ? void 0 : _q.meta) === null || _r === void 0 ? void 0 : _r.dataType) == dataTypeEnum_1.DataType.STRING) {
                settings.setValue(calculationDataInfoSettingIds_1.SettingIds.UniqueId, (_t = (_s = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _s === void 0 ? void 0 : _s[DataIds.UniqueId]) === null || _t === void 0 ? void 0 : _t.data);
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.UniqueId);
            }
            return settings;
        };
        /**
         * Converts the calculator type displayname(from old export format) to the id
         *
         * @private
         * @param {string} calculationType
         * @returns {string}
         * @memberof CalculationDataPackageAdapter
         */
        CalculationDataPackageAdapter.prototype.convertDisplayNameToId = function (calculationType) {
            switch (calculationType) {
                case "Absolute value |a|":
                    return "absolute value";
                case "Addition a+b":
                    return "add";
                case "Bitwise AND":
                    return "bitwise and";
                case "Atan2(a)":
                    return "atan2";
                case "Cos(a)":
                    return "cos";
                case "Differentiate dy/dt":
                    return "differentiate";
                case "Division a/b":
                    return "division";
                case "Equal to a = b":
                    return "equal to";
                case "Exponential a" + "\u207F":
                    return "exponentiation";
                case "FFT":
                    return "fft bilstein";
                case "Greater than a > b":
                    return "greater than";
                case "Less than a < b":
                    return "less than";
                case "Limit":
                    return "max min";
                case "LP Bessel":
                    return "lp bessel";
                case "LP Butterworth":
                    return "lp butterworth";
                case "Max (a,b)":
                    return "max";
                case "Min (a,b)":
                    return "min";
                case "Modulo":
                    return "modulo";
                case "Multiplication a*b":
                    return "multiplication";
                case "Bitwise NOT":
                    return "bitwise not";
                case "Bitwise OR":
                    return "bitwise or";
                case "Shift time axis":
                    return "shift time axis";
                case "Sin(a)":
                    return "sin";
                case "Square root √a":
                    return "square root ";
                case "Math expression":
                    return "stringmathjs";
                case "Subtraction a-b":
                    return "sub";
                case "Time stamp synchronization":
                    return "timeStampSync";
                case "Vector length √(a\u00B2 + b\u00B2)":
                    return "vector ";
                case "XY":
                    return "xy";
            }
            return "";
        };
        /**
         * Returns the default input ids of the given calculation type(only needed for old export without ids)
         *
         * @private
         * @param {string} calculationType
         * @returns {Array<string>}
         * @memberof CalculationDataPackageAdapter
         */
        CalculationDataPackageAdapter.prototype.getInputDataIdsForType = function (calculationType) {
            var inputDataIds = new Array();
            switch (calculationType) {
                case "absolute value":
                    inputDataIds.push("InputSignalA");
                    break;
                case "add":
                    inputDataIds.push("SummandA");
                    inputDataIds.push("SummandB");
                    break;
                case "bitwise and":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "atan2":
                    inputDataIds.push("InputSignalA");
                    break;
                case "cos":
                    inputDataIds.push("InputSignalA");
                    break;
                case "differentiate":
                    inputDataIds.push("InputSignal");
                    break;
                case "division":
                    inputDataIds.push("DividendA");
                    inputDataIds.push("DivisorB");
                    inputDataIds.push("DivisionByZero");
                    break;
                case "equal to":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "exponentiation":
                    inputDataIds.push("InputSignalA");
                    inputDataIds.push("ConstantValueN");
                    break;
                case "fft bilstein":
                    inputDataIds.push("InputSignal");
                    break;
                case "greater than":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "less than":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "max min":
                    inputDataIds.push("UpperLimit");
                    inputDataIds.push("LowerLimit");
                    inputDataIds.push("InputSignal");
                    break;
                case "lp bessel":
                    inputDataIds.push("Order");
                    inputDataIds.push("CutoffFrequency");
                    inputDataIds.push("InputSignal");
                    break;
                case "lp butterworth":
                    inputDataIds.push("Order");
                    inputDataIds.push("CutoffFrequency");
                    inputDataIds.push("InputSignal");
                    break;
                case "max":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "min":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "modulo":
                    inputDataIds.push("DividendA");
                    inputDataIds.push("DivisorB");
                    inputDataIds.push("DivisionByZero");
                    break;
                case "multiplication":
                    inputDataIds.push("MultiplicandA");
                    inputDataIds.push("MultiplierB");
                    break;
                case "bitwise not":
                    inputDataIds.push("InputSignal");
                    break;
                case "bitwise or":
                    inputDataIds.push("InputSignalOrConstantA");
                    inputDataIds.push("InputSignalOrConstantB");
                    break;
                case "shift time axis":
                    inputDataIds.push("InputSignalA");
                    inputDataIds.push("DelayTimeB");
                    break;
                case "sin":
                    inputDataIds.push("InputSignalA");
                    break;
                case "square root ":
                    inputDataIds.push("InputSignalA");
                    break;
                case "stringmathjs":
                    inputDataIds.push("CalculatingValues");
                    inputDataIds.push("CalculatingTime");
                    inputDataIds.push("InputSignalOrNumberA");
                    inputDataIds.push("InputSignalOrNumberB");
                    inputDataIds.push("InputSignalOrNumberC");
                    inputDataIds.push("InputSignalOrNumberD");
                    inputDataIds.push("InputSignalOrNumberE");
                    break;
                case "sub":
                    inputDataIds.push("MinuendA");
                    inputDataIds.push("SubtrahendB");
                    break;
                case "timeStampSync":
                    inputDataIds.push("InputSignalAToSynchronizeTimeStamps");
                    inputDataIds.push("InputSignalBWithReferenceTimeStamps");
                    break;
                case "vector ":
                    inputDataIds.push("InputSignalA");
                    inputDataIds.push("InputSignalB");
                    break;
                case "xy":
                    inputDataIds.push("XSignal");
                    inputDataIds.push("YSignal");
                    break;
            }
            return inputDataIds;
        };
        CalculationDataPackageAdapter.prototype.packageV2ToSetting = function (packageData, container) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
            var settings = new settings_1.Settings(this.settingsType);
            if (((_c = (_b = (_a = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _a === void 0 ? void 0 : _a[DataIds.Type]) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.dataType) == dataTypeEnum_1.DataType.STRING) {
                settings.setValue(calculationDataInfoSettingIds_1.SettingIds.Type, (_e = (_d = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _d === void 0 ? void 0 : _d[DataIds.Type]) === null || _e === void 0 ? void 0 : _e.data);
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.Type);
            }
            if (((_h = (_g = (_f = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _f === void 0 ? void 0 : _f[DataIds.InputDataIds]) === null || _g === void 0 ? void 0 : _g.meta) === null || _h === void 0 ? void 0 : _h.dataType) == dataTypeEnum_1.DataType.ARRAY && ((_l = (_k = (_j = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _j === void 0 ? void 0 : _j[DataIds.InputDataIds]) === null || _k === void 0 ? void 0 : _k.meta) === null || _l === void 0 ? void 0 : _l[additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE]) == arrayTypeEnum_1.ArrayType.STRING) {
                settings.setValue(calculationDataInfoSettingIds_1.SettingIds.InputDataIds, (_o = (_m = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _m === void 0 ? void 0 : _m[DataIds.InputDataIds]) === null || _o === void 0 ? void 0 : _o.data);
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.InputDataIds);
            }
            if (((_r = (_q = (_p = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _p === void 0 ? void 0 : _p[DataIds.InputDataValues]) === null || _q === void 0 ? void 0 : _q.meta) === null || _r === void 0 ? void 0 : _r.dataType) == dataTypeEnum_1.DataType.ARRAY && ((_u = (_t = (_s = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _s === void 0 ? void 0 : _s[DataIds.InputDataValues]) === null || _t === void 0 ? void 0 : _t.meta) === null || _u === void 0 ? void 0 : _u[additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE]) == arrayTypeEnum_1.ArrayType.STRING) {
                settings.setValue(calculationDataInfoSettingIds_1.SettingIds.InputDataValues, (_w = (_v = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _v === void 0 ? void 0 : _v[DataIds.InputDataValues]) === null || _w === void 0 ? void 0 : _w.data);
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.InputDataValues);
            }
            if (((_z = (_y = (_x = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _x === void 0 ? void 0 : _x[DataIds.UniqueId]) === null || _y === void 0 ? void 0 : _y.meta) === null || _z === void 0 ? void 0 : _z.dataType) == dataTypeEnum_1.DataType.STRING) {
                settings.setValue(calculationDataInfoSettingIds_1.SettingIds.UniqueId, (_1 = (_0 = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _0 === void 0 ? void 0 : _0[DataIds.UniqueId]) === null || _1 === void 0 ? void 0 : _1.data);
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.UniqueId);
            }
            return settings;
        };
        CalculationDataPackageAdapter.prototype.settingToPackage = function (settingsData) {
            var settings = settings_1.Settings.create(settingsData);
            var calculationDataInfoData = {};
            var packageStructure = {
                packages: new Array(),
                topLevelID: NaN
            };
            if (settings.type === this.settingsType) {
                var id = meta_1.Meta.createID();
                var packageVersion = this.currentPackageVersion;
                var inputDataIdsData = settings.getValue(calculationDataInfoSettingIds_1.SettingIds.InputDataIds);
                if (inputDataIdsData !== undefined) {
                    calculationDataInfoData[DataIds.InputDataIds] = new package_1.Package(new meta_1.Meta(dataTypeEnum_1.DataType.ARRAY, [{ key: additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE, value: arrayTypeEnum_1.ArrayType.STRING }]), inputDataIdsData);
                }
                else {
                    packageVersion = 1;
                    // for legacy compatibility => InputDataIds will be added automatically if package version 1 is used
                    //throw MceConversionError.createErrorByType(MceConversionErrorType.MISSING_DATA, SettingIds.InputDataIds);
                }
                var additionalMetaInfo = [{ key: additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE, value: this.objectType }, { key: additionalMetaKeys_1.AdditionalMetaKeys.ID, value: id }, { key: additionalMetaKeys_1.AdditionalMetaKeys.VERSION, value: packageVersion }];
                var calculationDataInfoMeta = new meta_1.Meta(dataTypeEnum_1.DataType.OBJECT, additionalMetaInfo);
                var typeData = settings.getValue(calculationDataInfoSettingIds_1.SettingIds.Type);
                if (typeData !== undefined) {
                    calculationDataInfoData[DataIds.Type] = new package_1.Package(new meta_1.Meta(dataTypeEnum_1.DataType.STRING), typeData);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, calculationDataInfoSettingIds_1.SettingIds.Type);
                }
                var inputDataValuesData = settings.getValue(calculationDataInfoSettingIds_1.SettingIds.InputDataValues);
                if (inputDataValuesData !== undefined) {
                    calculationDataInfoData[DataIds.InputDataValues] = new package_1.Package(new meta_1.Meta(dataTypeEnum_1.DataType.ARRAY, [{ key: additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE, value: arrayTypeEnum_1.ArrayType.STRING }]), inputDataValuesData);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, calculationDataInfoSettingIds_1.SettingIds.InputDataValues);
                }
                var uniqueIdData = settings.getValue(calculationDataInfoSettingIds_1.SettingIds.UniqueId);
                if (uniqueIdData !== undefined) {
                    calculationDataInfoData[DataIds.UniqueId] = new package_1.Package(new meta_1.Meta(dataTypeEnum_1.DataType.STRING), uniqueIdData);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, calculationDataInfoSettingIds_1.SettingIds.UniqueId);
                }
                var calculationDataInfoPackage = new package_1.Package(calculationDataInfoMeta, calculationDataInfoData);
                packageStructure.packages.push(calculationDataInfoPackage);
                packageStructure.topLevelID = id;
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.UNSUPPORTED_VERSION, this.settingsType);
            }
            return packageStructure;
        };
        return CalculationDataPackageAdapter;
    }());
    exports.CalculationDataPackageAdapter = CalculationDataPackageAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhSW5mb1BhY2thZ2VBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFJbmZvUGFja2FnZUFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZUEsSUFBSyxPQU1KO0lBTkQsV0FBSyxPQUFPO1FBQ1Isd0JBQWEsQ0FBQTtRQUNiLHdDQUE2QixDQUFBO1FBQzdCLDhDQUFtQyxDQUFBO1FBQ25DLGdDQUFxQixDQUFBO0lBRXpCLENBQUMsRUFOSSxPQUFPLEtBQVAsT0FBTyxRQU1YO0lBRUQ7UUFRSTtZQU5BLGtDQUFrQztZQUNqQiwwQkFBcUIsR0FBVyxDQUFDLENBQUM7WUFNL0MsSUFBSSxDQUFDLFlBQVksR0FBRyxxQkFBcUIsQ0FBQztZQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLDJCQUFVLENBQUMsV0FBVyxDQUFDO1FBQzdDLENBQUM7UUFDRCx3REFBZ0IsR0FBaEIsVUFBaUIsV0FBcUIsRUFBRSxTQUEwQjs7WUFFOUQsSUFBSSxPQUFPLEdBQWMsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUV6RCxJQUFHLE9BQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksMENBQUUsUUFBUSxLQUFJLHVCQUFRLENBQUMsTUFBTSxJQUFJLE9BQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksMENBQUcsdUNBQWtCLENBQUMsVUFBVSxNQUFLLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBRXhILGNBQU8sV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksMENBQUcsdUNBQWtCLENBQUMsT0FBTyxHQUFFO29CQUNuRCxLQUFLLENBQUM7d0JBQ0YsT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0Is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QTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBhY2thZ2VBZGFwdGVyLCBQYWNrYWdlQXJyYXlXaXRoVG9wTGV2ZWxJRCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vaW50ZXJmYWNlL3BhY2thZ2VBZGFwdGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vb2JqZWN0VHlwZUVudW1cIjtcclxuaW1wb3J0IHsgRXhwb3J0Q29udGFpbmVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9leHBvcnRDb250YWluZXJcIjtcclxuaW1wb3J0IHsgSVBhY2thZ2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2ludGVyZmFjZS9wYWNrYWdlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQWRkaXRpb25hbE1ldGFLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9lbnVtL2FkZGl0aW9uYWxNZXRhS2V5c1wiO1xyXG5pbXBvcnQgeyBEYXRhVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9kYXRhVHlwZUVudW1cIjtcclxuaW1wb3J0IHsgTWNlQ29udmVyc2lvbkVycm9yLCBNY2VDb252ZXJzaW9uRXJyb3JUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9tY2VDb252ZXJzaW9uRXJyb3JcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YUluZm9TZXR0aW5nSWRzXCI7XHJcbmltcG9ydCB7IFBhY2thZ2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL3BhY2thZ2VcIjtcclxuaW1wb3J0IHsgTWV0YSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vbWV0YVwiO1xyXG5pbXBvcnQgeyBBcnJheVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vYXJyYXlUeXBlRW51bVwiO1xyXG5cclxuXHJcbmVudW0gRGF0YUlkcyB7XHJcbiAgICBUeXBlID0gXCJ0eXBlXCIsXHJcbiAgICBJbnB1dERhdGFJZHMgPSBcImlucHV0RGF0YUlkc1wiLFxyXG4gICAgSW5wdXREYXRhVmFsdWVzID0gXCJpbnB1dERhdGFWYWx1ZXNcIixcclxuICAgIFVuaXF1ZUlkID0gXCJ1bmlxdWVJZFwiLFxyXG5cclxufVxyXG5cclxuY2xhc3MgQ2FsY3VsYXRpb25EYXRhUGFja2FnZUFkYXB0ZXIgaW1wbGVtZW50cyBJUGFja2FnZUFkYXB0ZXIge1xyXG5cclxuICAgIC8vbmV3ZXN0IHZlcnNpb24gb2YgcGFja2FnZSBmb3JtYXRcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY3VycmVudFBhY2thZ2VWZXJzaW9uOiBudW1iZXIgPSAyO1xyXG5cclxuICAgIHByaXZhdGUgc2V0dGluZ3NUeXBlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG9iamVjdFR5cGU6IE9iamVjdFR5cGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nc1R5cGUgPSBcIkNhbGN1bGF0aW9uRGF0YUluZm9cIjtcclxuICAgICAgICB0aGlzLm9iamVjdFR5cGUgPSBPYmplY3RUeXBlLkNBTENVTEFUSU9OO1xyXG4gICAgfVxyXG4gICAgcGFja2FnZVRvU2V0dGluZyhwYWNrYWdlRGF0YTogSVBhY2thZ2UsIGNvbnRhaW5lcjogRXhwb3J0Q29udGFpbmVyKTogSVNldHRpbmdzIHtcclxuXHJcbiAgICAgICAgbGV0IHNldHRpbmc6IElTZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyh0aGlzLnNldHRpbmdzVHlwZSk7XHJcblxyXG4gICAgICAgIGlmKHBhY2thZ2VEYXRhPy5tZXRhPy5kYXRhVHlwZSA9PSBEYXRhVHlwZS5PQkpFQ1QgJiYgcGFja2FnZURhdGE/Lm1ldGE/LltBZGRpdGlvbmFsTWV0YUtleXMuT0JKRUNUVFlQRV0gPT0gdGhpcy5vYmplY3RUeXBlKSB7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2gocGFja2FnZURhdGE/Lm1ldGE/LltBZGRpdGlvbmFsTWV0YUtleXMuVkVSU0lPTl0peyBcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nID0gdGhpcy5wYWNrYWdlVjFUb1NldHRpbmcocGFja2FnZURhdGEsIGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZyA9IHRoaXMucGFja2FnZVYyVG9TZXR0aW5nKHBhY2thZ2VEYXRhLCBjb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5VTlNVUFBPUlRFRF9WRVJTSU9OLCB0aGlzLm9iamVjdFR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuVU5TVVBQT1JURURfVFlQRSwgdGhpcy5vYmplY3RUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXR0aW5nO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBwcml2YXRlIHBhY2thZ2VWMVRvU2V0dGluZyhwYWNrYWdlRGF0YTogSVBhY2thZ2UsIGNvbnRhaW5lcjogRXhwb3J0Q29udGFpbmVyKTogSVNldHRpbmdzIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3ModGhpcy5zZXR0aW5nc1R5cGUpO1xyXG5cclxuICAgICAgICBpZihwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuVHlwZV0/Lm1ldGE/LmRhdGFUeXBlID09IERhdGFUeXBlLlNUUklORykge1xyXG4gICAgICAgICAgICBsZXQgbmV3VHlwZSA9IHRoaXMuY29udmVydERpc3BsYXlOYW1lVG9JZChwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuVHlwZV0/LmRhdGEpO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlR5cGUsIG5ld1R5cGUpO1xyXG4gICAgICAgICAgICAvLyBTZXQgZGVmYXVsdCBpbnB1dERhdGFJZHMgYnkgdHlwZVxyXG4gICAgICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLklucHV0RGF0YUlkcywgdGhpcy5nZXRJbnB1dERhdGFJZHNGb3JUeXBlKG5ld1R5cGUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIERhdGFJZHMuVHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuSW5wdXREYXRhVmFsdWVzXT8ubWV0YT8uZGF0YVR5cGUgPT0gRGF0YVR5cGUuQVJSQVkgJiYgcGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLklucHV0RGF0YVZhbHVlc10/Lm1ldGE/LltBZGRpdGlvbmFsTWV0YUtleXMuQVJSQVlUWVBFXSA9PSBBcnJheVR5cGUuU1RSSU5HKSB7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuSW5wdXREYXRhVmFsdWVzLCBwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuSW5wdXREYXRhVmFsdWVzXT8uZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCBEYXRhSWRzLklucHV0RGF0YVZhbHVlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5VbmlxdWVJZF0/Lm1ldGE/LmRhdGFUeXBlID09IERhdGFUeXBlLlNUUklORykge1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlVuaXF1ZUlkLCBwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuVW5pcXVlSWRdPy5kYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIERhdGFJZHMuVW5pcXVlSWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgdGhlIGNhbGN1bGF0b3IgdHlwZSBkaXNwbGF5bmFtZShmcm9tIG9sZCBleHBvcnQgZm9ybWF0KSB0byB0aGUgaWQgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYWxjdWxhdGlvblR5cGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRpb25EYXRhUGFja2FnZUFkYXB0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb252ZXJ0RGlzcGxheU5hbWVUb0lkKGNhbGN1bGF0aW9uVHlwZTogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHN3aXRjaChjYWxjdWxhdGlvblR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFwiQWJzb2x1dGUgdmFsdWUgfGF8XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJhYnNvbHV0ZSB2YWx1ZVwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiQWRkaXRpb24gYStiXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJhZGRcIjtcclxuICAgICAgICAgICAgY2FzZSBcIkJpdHdpc2UgQU5EXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJiaXR3aXNlIGFuZFwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiQXRhbjIoYSlcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImF0YW4yXCI7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgXCJDb3MoYSlcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImNvc1wiOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSBcIkRpZmZlcmVudGlhdGUgZHkvZHRcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImRpZmZlcmVudGlhdGVcIjsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIFwiRGl2aXNpb24gYS9iXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJkaXZpc2lvblwiOyAgICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSBcIkVxdWFsIHRvIGEgPSBiXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJlcXVhbCB0b1wiO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXhwb25lbnRpYWwgYVwiICsgXCJcXHUyMDdGXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJleHBvbmVudGlhdGlvblwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiRkZUXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJmZnQgYmlsc3RlaW5cIjtcclxuICAgICAgICAgICAgY2FzZSBcIkdyZWF0ZXIgdGhhbiBhID4gYlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZ3JlYXRlciB0aGFuXCI7XHJcbiAgICAgICAgICAgIGNhc2UgXCJMZXNzIHRoYW4gYSA8IGJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImxlc3MgdGhhblwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiTGltaXRcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm1heCBtaW5cIjtcclxuICAgICAgICAgICAgY2FzZSBcIkxQIEJlc3NlbFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibHAgYmVzc2VsXCI7XHJcbiAgICAgICAgICAgIGNhc2UgXCJMUCBCdXR0ZXJ3b3J0aFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibHAgYnV0dGVyd29ydGhcIjtcclxuICAgICAgICAgICAgY2FzZSBcIk1heCAoYSxiKVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibWF4XCI7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNaW4gKGEsYilcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm1pblwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiTW9kdWxvXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJtb2R1bG9cIjtcclxuICAgICAgICAgICAgY2FzZSBcIk11bHRpcGxpY2F0aW9uIGEqYlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibXVsdGlwbGljYXRpb25cIjtcclxuICAgICAgICAgICAgY2FzZSBcIkJpdHdpc2UgTk9UXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJiaXR3aXNlIG5vdFwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiQml0d2lzZSBPUlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiYml0d2lzZSBvclwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiU2hpZnQgdGltZSBheGlzXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzaGlmdCB0aW1lIGF4aXNcIjtcclxuICAgICAgICAgICAgY2FzZSBcIlNpbihhKVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic2luXCI7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTcXVhcmUgcm9vdCDiiJphXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzcXVhcmUgcm9vdCBcIjtcclxuICAgICAgICAgICAgY2FzZSBcIk1hdGggZXhwcmVzc2lvblwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nbWF0aGpzXCI7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTdWJ0cmFjdGlvbiBhLWJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInN1YlwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiVGltZSBzdGFtcCBzeW5jaHJvbml6YXRpb25cIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInRpbWVTdGFtcFN5bmNcIjtcclxuICAgICAgICAgICAgY2FzZSBcIlZlY3RvciBsZW5ndGgg4oiaKGFcXHUwMEIyICsgYlxcdTAwQjIpXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ2ZWN0b3IgXCI7XHJcbiAgICAgICAgICAgIGNhc2UgXCJYWVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwieHlcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGlucHV0IGlkcyBvZiB0aGUgZ2l2ZW4gY2FsY3VsYXRpb24gdHlwZShvbmx5IG5lZWRlZCBmb3Igb2xkIGV4cG9ydCB3aXRob3V0IGlkcylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNhbGN1bGF0aW9uVHlwZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRpb25EYXRhUGFja2FnZUFkYXB0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbnB1dERhdGFJZHNGb3JUeXBlKGNhbGN1bGF0aW9uVHlwZTogc3RyaW5nKTogQXJyYXk8c3RyaW5nPntcclxuICAgICAgICBsZXQgaW5wdXREYXRhSWRzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICBzd2l0Y2goY2FsY3VsYXRpb25UeXBlKXtcclxuICAgICAgICAgICAgY2FzZSBcImFic29sdXRlIHZhbHVlXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsQVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYWRkXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIlN1bW1hbmRBXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJTdW1tYW5kQlwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYml0d2lzZSBhbmRcIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxPckNvbnN0YW50QVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxPckNvbnN0YW50QlwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYXRhbjJcIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxBXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIFwiY29zXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsQVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSBcImRpZmZlcmVudGlhdGVcIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhazsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgXCJkaXZpc2lvblwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJEaXZpZGVuZEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIkRpdmlzb3JCXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJEaXZpc2lvbkJ5WmVyb1wiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSBcImVxdWFsIHRvXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImV4cG9uZW50aWF0aW9uXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsQVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiQ29uc3RhbnRWYWx1ZU5cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZmdCBiaWxzdGVpblwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZ3JlYXRlciB0aGFuXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImxlc3MgdGhhblwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbE9yQ29uc3RhbnRBXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbE9yQ29uc3RhbnRCXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtYXggbWluXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIlVwcGVyTGltaXRcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIkxvd2VyTGltaXRcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJscCBiZXNzZWxcIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiT3JkZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIkN1dG9mZkZyZXF1ZW5jeVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImxwIGJ1dHRlcndvcnRoXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIk9yZGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJDdXRvZmZGcmVxdWVuY3lcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtYXhcIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxPckNvbnN0YW50QVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxPckNvbnN0YW50QlwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibWluXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1vZHVsb1wiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJEaXZpZGVuZEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIkRpdmlzb3JCXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJEaXZpc2lvbkJ5WmVyb1wiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibXVsdGlwbGljYXRpb25cIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiTXVsdGlwbGljYW5kQVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiTXVsdGlwbGllckJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJpdHdpc2Ugbm90XCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJiaXR3aXNlIG9yXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JDb25zdGFudEJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNoaWZ0IHRpbWUgYXhpc1wiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbEFcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIkRlbGF5VGltZUJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNpblwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbEFcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNxdWFyZSByb290IFwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbEFcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN0cmluZ21hdGhqc1wiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJDYWxjdWxhdGluZ1ZhbHVlc1wiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiQ2FsY3VsYXRpbmdUaW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbE9yTnVtYmVyQVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxPck51bWJlckJcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsT3JOdW1iZXJDXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJJbnB1dFNpZ25hbE9yTnVtYmVyRFwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxPck51bWJlckVcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN1YlwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJNaW51ZW5kQVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiU3VidHJhaGVuZEJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInRpbWVTdGFtcFN5bmNcIjpcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxBVG9TeW5jaHJvbml6ZVRpbWVTdGFtcHNcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsQldpdGhSZWZlcmVuY2VUaW1lU3RhbXBzXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ2ZWN0b3IgXCI6XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChcIklucHV0U2lnbmFsQVwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YUlkcy5wdXNoKFwiSW5wdXRTaWduYWxCXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ4eVwiOlxyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJYU2lnbmFsXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhSWRzLnB1c2goXCJZU2lnbmFsXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnB1dERhdGFJZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYWNrYWdlVjJUb1NldHRpbmcocGFja2FnZURhdGE6IElQYWNrYWdlLCBjb250YWluZXI6IEV4cG9ydENvbnRhaW5lcik6IElTZXR0aW5ncyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKHRoaXMuc2V0dGluZ3NUeXBlKTtcclxuXHJcbiAgICAgICAgaWYocGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLlR5cGVdPy5tZXRhPy5kYXRhVHlwZSA9PSBEYXRhVHlwZS5TVFJJTkcpIHtcclxuICAgICAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5UeXBlLCBwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuVHlwZV0/LmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLk1JU1NJTkdfREFUQSwgRGF0YUlkcy5UeXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYocGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLklucHV0RGF0YUlkc10/Lm1ldGE/LmRhdGFUeXBlID09IERhdGFUeXBlLkFSUkFZICYmIHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5JbnB1dERhdGFJZHNdPy5tZXRhPy5bQWRkaXRpb25hbE1ldGFLZXlzLkFSUkFZVFlQRV0gPT0gQXJyYXlUeXBlLlNUUklORykge1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLklucHV0RGF0YUlkcywgcGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLklucHV0RGF0YUlkc10/LmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLk1JU1NJTkdfREFUQSwgRGF0YUlkcy5JbnB1dERhdGFJZHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYocGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLklucHV0RGF0YVZhbHVlc10/Lm1ldGE/LmRhdGFUeXBlID09IERhdGFUeXBlLkFSUkFZICYmIHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5JbnB1dERhdGFWYWx1ZXNdPy5tZXRhPy5bQWRkaXRpb25hbE1ldGFLZXlzLkFSUkFZVFlQRV0gPT0gQXJyYXlUeXBlLlNUUklORykge1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLklucHV0RGF0YVZhbHVlcywgcGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLklucHV0RGF0YVZhbHVlc10/LmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLk1JU1NJTkdfREFUQSwgRGF0YUlkcy5JbnB1dERhdGFWYWx1ZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZihwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuVW5pcXVlSWRdPy5tZXRhPy5kYXRhVHlwZSA9PSBEYXRhVHlwZS5TVFJJTkcpIHtcclxuICAgICAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5VbmlxdWVJZCwgcGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLlVuaXF1ZUlkXT8uZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCBEYXRhSWRzLlVuaXF1ZUlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBzZXR0aW5nVG9QYWNrYWdlKHNldHRpbmdzRGF0YTogSVNldHRpbmdzKTogUGFja2FnZUFycmF5V2l0aFRvcExldmVsSUQge1xyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gIFNldHRpbmdzLmNyZWF0ZShzZXR0aW5nc0RhdGEpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mb0RhdGE6IHsgW2luZGV4OiBzdHJpbmddOiAgSVBhY2thZ2UgfSAgPSB7fTtcclxuXHJcbiAgICAgICAgbGV0IHBhY2thZ2VTdHJ1Y3R1cmU6IFBhY2thZ2VBcnJheVdpdGhUb3BMZXZlbElEID0ge1xyXG4gICAgICAgICAgICBwYWNrYWdlczogbmV3IEFycmF5PElQYWNrYWdlPigpLFxyXG4gICAgICAgICAgICB0b3BMZXZlbElEOiBOYU5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZihzZXR0aW5ncy50eXBlID09PSB0aGlzLnNldHRpbmdzVHlwZSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGlkID0gTWV0YS5jcmVhdGVJRCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhY2thZ2VWZXJzaW9uID0gdGhpcy5jdXJyZW50UGFja2FnZVZlcnNpb247XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5wdXREYXRhSWRzRGF0YSA9IHNldHRpbmdzLmdldFZhbHVlKFNldHRpbmdJZHMuSW5wdXREYXRhSWRzKTtcclxuICAgICAgICAgICAgaWYoaW5wdXREYXRhSWRzRGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGFJbmZvRGF0YVtEYXRhSWRzLklucHV0RGF0YUlkc109IG5ldyBQYWNrYWdlKG5ldyBNZXRhKERhdGFUeXBlLkFSUkFZLCBbe2tleTogQWRkaXRpb25hbE1ldGFLZXlzLkFSUkFZVFlQRSwgdmFsdWU6IEFycmF5VHlwZS5TVFJJTkd9XSksIGlucHV0RGF0YUlkc0RhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFja2FnZVZlcnNpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yIGxlZ2FjeSBjb21wYXRpYmlsaXR5ID0+IElucHV0RGF0YUlkcyB3aWxsIGJlIGFkZGVkIGF1dG9tYXRpY2FsbHkgaWYgcGFja2FnZSB2ZXJzaW9uIDEgaXMgdXNlZFxyXG4gICAgICAgICAgICAgICAgLy90aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIFNldHRpbmdJZHMuSW5wdXREYXRhSWRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxNZXRhSW5mbyA9IFt7a2V5OiBBZGRpdGlvbmFsTWV0YUtleXMuT0JKRUNUVFlQRSwgdmFsdWU6IHRoaXMub2JqZWN0VHlwZX0sIHtrZXk6IEFkZGl0aW9uYWxNZXRhS2V5cy5JRCwgdmFsdWU6IGlkfSwge2tleTogQWRkaXRpb25hbE1ldGFLZXlzLlZFUlNJT04sIHZhbHVlOiBwYWNrYWdlVmVyc2lvbn1dXHJcbiAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbkRhdGFJbmZvTWV0YSA9IG5ldyBNZXRhKERhdGFUeXBlLk9CSkVDVCwgYWRkaXRpb25hbE1ldGFJbmZvKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0eXBlRGF0YSA9IHNldHRpbmdzLmdldFZhbHVlKFNldHRpbmdJZHMuVHlwZSk7XHJcbiAgICAgICAgICAgIGlmKHR5cGVEYXRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YUluZm9EYXRhW0RhdGFJZHMuVHlwZV09IG5ldyBQYWNrYWdlKG5ldyBNZXRhKERhdGFUeXBlLlNUUklORyksIHR5cGVEYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLk1JU1NJTkdfREFUQSwgU2V0dGluZ0lkcy5UeXBlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBsZXQgaW5wdXREYXRhVmFsdWVzRGF0YSA9IHNldHRpbmdzLmdldFZhbHVlKFNldHRpbmdJZHMuSW5wdXREYXRhVmFsdWVzKTtcclxuICAgICAgICAgICAgaWYoaW5wdXREYXRhVmFsdWVzRGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGFJbmZvRGF0YVtEYXRhSWRzLklucHV0RGF0YVZhbHVlc109IG5ldyBQYWNrYWdlKG5ldyBNZXRhKERhdGFUeXBlLkFSUkFZLCBbe2tleTogQWRkaXRpb25hbE1ldGFLZXlzLkFSUkFZVFlQRSwgdmFsdWU6IEFycmF5VHlwZS5TVFJJTkd9XSksIGlucHV0RGF0YVZhbHVlc0RhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCBTZXR0aW5nSWRzLklucHV0RGF0YVZhbHVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBsZXQgdW5pcXVlSWREYXRhID0gc2V0dGluZ3MuZ2V0VmFsdWUoU2V0dGluZ0lkcy5VbmlxdWVJZCk7XHJcbiAgICAgICAgICAgIGlmKHVuaXF1ZUlkRGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGFJbmZvRGF0YVtEYXRhSWRzLlVuaXF1ZUlkXSA9IG5ldyBQYWNrYWdlKG5ldyBNZXRhKERhdGFUeXBlLlNUUklORyksIHVuaXF1ZUlkRGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIFNldHRpbmdJZHMuVW5pcXVlSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm9QYWNrYWdlID0gbmV3IFBhY2thZ2UoY2FsY3VsYXRpb25EYXRhSW5mb01ldGEsIGNhbGN1bGF0aW9uRGF0YUluZm9EYXRhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhY2thZ2VTdHJ1Y3R1cmUucGFja2FnZXMucHVzaChjYWxjdWxhdGlvbkRhdGFJbmZvUGFja2FnZSk7XHJcbiAgICAgICAgICAgIHBhY2thZ2VTdHJ1Y3R1cmUudG9wTGV2ZWxJRCA9IGlkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLlVOU1VQUE9SVEVEX1ZFUlNJT04sIHRoaXMuc2V0dGluZ3NUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYWNrYWdlU3RydWN0dXJlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQYWNrYWdlQWRhcHRlciB9Il19