(function () {

    'use strict';

    var BASETYPE = {
        Boolean: 'Boolean',
        Integer: 'Integer',
        Number: 'Number',
        Object: 'Object',
        String: 'String',
        Array: 'Array'
    };

    function DataType(baseType, name, fullName) {
        this.name = name;
        this.baseType = baseType;
        this.fullName = fullName || name;
    }

    var DataTypes = {};
    [
        [BASETYPE.Boolean, 'Boolean'],
        [BASETYPE.Boolean, 'XSBoolean'],

        [BASETYPE.Integer, 'Integer'],
        [BASETYPE.Integer, 'UInteger'],
        [BASETYPE.Integer, 'Time'],
        [BASETYPE.Integer, 'Index'],
        [BASETYPE.Integer, 'IntervalType'],
        [BASETYPE.Integer, 'Dependency', 'brease.enum.Dependency'],
        [BASETYPE.Integer, 'EventLoggerCustomer', 'brease.enum.EventLoggerCustomer'],
        [BASETYPE.Integer, 'EventLoggerFacility', 'brease.enum.EventLoggerFacility'],
        [BASETYPE.Integer, 'EventLoggerId', 'brease.enum.EventLoggerId'],
        [BASETYPE.Integer, 'EventLoggerSeverity', 'brease.enum.EventLoggerSeverity'],
        [BASETYPE.Integer, 'EventLoggerVerboseLevel', 'brease.enum.EventLoggerVerboseLevel'],
        [BASETYPE.Integer, 'mcProgramPhase', 'brease.enum.mcProgramPhase'],
        [BASETYPE.Integer, 'MpUserXError', 'brease.enum.MpUserXError'],
        [BASETYPE.Integer, 'PlcOpenGroupState', 'brease.enum.PlcOpenGroupState'],

        [BASETYPE.Number, 'Number'],
        [BASETYPE.Number, 'Double'],
        [BASETYPE.Number, 'Percentage'],
        [BASETYPE.Number, 'Opacity'],
        [BASETYPE.Number, 'UNumber'],
        [BASETYPE.Number, 'MessageBoxState', 'brease.enum.MessageBoxState'],
        [BASETYPE.Number, 'WidgetState', 'brease.enum.WidgetState'],

        // data types that are noted in JSON notation in xsd (therefore e.g. 'RoleCollection' or 'Array')
        [BASETYPE.Object, 'Array'],
        [BASETYPE.Object, 'ArrayNode', 'brease.datatype.ArrayNode'],
        [BASETYPE.Object, 'ContentCollection'],
        [BASETYPE.Object, 'GraphicCollection'],
        [BASETYPE.Object, 'ItemCollection'],
        [BASETYPE.Object, 'MeasurementSystemFormat', 'brease.config.MeasurementSystemFormat'],
        [BASETYPE.Object, 'MeasurementSystemUnit', 'brease.config.MeasurementSystemUnit'],
        [BASETYPE.Object, 'MpComIdentReference', 'brease.datatype.MpComIdentReference'],
        [BASETYPE.Object, 'MpComIdentType', 'brease.datatype.MpComIdentType'],
        [BASETYPE.Object, 'Node', 'brease.datatype.Node'],
        [BASETYPE.Object, 'Notification', 'brease.datatype.Notification'],
        [BASETYPE.Object, 'Object'],
        [BASETYPE.Object, 'RoleCollection'],
        [BASETYPE.Object, 'StepItemStyleReferenceCollection'],

        [BASETYPE.String, 'String'],
        [BASETYPE.String, 'DateTime'],
        [BASETYPE.String, 'IntegerList'],
        [BASETYPE.String, 'StringList'],
        [BASETYPE.String, 'Color'],
        [BASETYPE.String, 'ColorList'],
        [BASETYPE.String, 'ColorCollection'],
        [BASETYPE.String, 'PixelVal'],
        [BASETYPE.String, 'StrictPixelVal'],
        [BASETYPE.String, 'StrictSignedPixelVal'],
        [BASETYPE.String, 'PixelValCollection'],
        [BASETYPE.String, 'Size'],
        [BASETYPE.String, 'Margin'],
        [BASETYPE.String, 'Padding'],
        [BASETYPE.String, 'Rotation'],
        [BASETYPE.String, 'ImagePath'],
        [BASETYPE.String, 'FilePath'],
        [BASETYPE.String, 'ImageSize'],
        [BASETYPE.String, 'FontName'],
        [BASETYPE.String, 'Gradient'],
        [BASETYPE.String, 'Shadow'],
        [BASETYPE.String, 'BorderStyle'],
        [BASETYPE.String, 'LineCap'],
        [BASETYPE.String, 'WritingMode'],
        [BASETYPE.String, 'WidgetReference'],
        [BASETYPE.String, 'ImageType'],
        [BASETYPE.String, 'StepItemSource'],
        [BASETYPE.String, 'RegEx'],
        [BASETYPE.String, 'DirectoryPath'],
        [BASETYPE.String, 'PageReference'],
        [BASETYPE.String, 'ThemeReference'],
        [BASETYPE.String, 'DialogReference'],
        [BASETYPE.String, 'NavigationReference'],
        [BASETYPE.String, 'StyleReference'],
        [BASETYPE.String, 'AreaReference'],
        [BASETYPE.String, 'ContentReference'],
        [BASETYPE.String, 'PropertyCollectionReference'],
        [BASETYPE.String, 'LayoutReference'],
        [BASETYPE.String, 'PdfPath'],
        [BASETYPE.String, 'VideoPath'],
        [BASETYPE.String, 'ZoomType'],
        [BASETYPE.String, 'Expression'],
        [BASETYPE.String, 'AutoSize'],
        [BASETYPE.String, 'HPos'],
        [BASETYPE.String, 'VPos'],
        [BASETYPE.String, 'AlarmHistoryItemType', 'brease.enum.AlarmHistoryItemType'],
        [BASETYPE.String, 'AlarmListItemType', 'brease.enum.AlarmListItemType'],
        [BASETYPE.String, 'AuditListItemType', 'brease.enum.AuditListItemType'],
        [BASETYPE.String, 'AutoRaise', 'brease.enum.AutoRaise'],
        [BASETYPE.String, 'BackgroundPosition', 'brease.enum.BackgroundPosition'],
        [BASETYPE.String, 'CachePolicy', 'brease.enum.CachePolicy'],
        [BASETYPE.String, 'ChartInterpolationType', 'brease.enum.ChartInterpolationType'],
        [BASETYPE.String, 'ChartType', 'brease.enum.ChartType'],
        [BASETYPE.String, 'ChartZoomType', 'brease.enum.ChartZoomType'],
        [BASETYPE.String, 'ChildPositioning', 'brease.enum.ChildPositioning'],
        [BASETYPE.String, 'CropToParent', 'brease.enum.CropToParent'],
        [BASETYPE.String, 'CrossAlign', 'brease.enum.CrossAlign'],
        [BASETYPE.String, 'DialogMode', 'brease.enum.DialogMode'],
        [BASETYPE.String, 'Direction', 'brease.enum.Direction'],
        [BASETYPE.String, 'DropDownDisplaySettings', 'brease.enum.DropDownDisplaySettings'],
        [BASETYPE.String, 'ErrorCorrectionLevel', 'brease.enum.ErrorCorrectionLevel'],
        [BASETYPE.String, 'Floating', 'brease.enum.Floating'],
        [BASETYPE.String, 'GraphType', 'brease.enum.GraphType'],
        [BASETYPE.String, 'HorizontalAlign', 'brease.enum.HorizontalAlign'],
        [BASETYPE.String, 'HorizontalPosition', 'brease.enum.HorizontalPosition'],
        [BASETYPE.String, 'ImageAlign', 'brease.enum.ImageAlign'],
        [BASETYPE.String, 'ImagePosition', 'brease.enum.ImagePosition'],
        [BASETYPE.String, 'IMEMode', 'brease.enum.IMEMode'],
        [BASETYPE.String, 'InputType', 'brease.enum.InputType'],
        [BASETYPE.String, 'InterpolationType', 'brease.enum.InterpolationType'],
        [BASETYPE.String, 'LabelPosition', 'brease.enum.LabelPosition'],
        [BASETYPE.String, 'LimitViolationPolicy', 'brease.enum.LimitViolationPolicy'],
        [BASETYPE.String, 'LoadPolicy', 'brease.enum.LoadPolicy'],
        [BASETYPE.String, 'MainAlign', 'brease.enum.MainAlign'],
        [BASETYPE.String, 'MappTableConfigurationType', 'brease.datatype.MappTableConfigurationType'],
        [BASETYPE.String, 'MeasurementSystem', 'brease.enum.MeasurementSystem'],
        [BASETYPE.String, 'MessageBoxIcon', 'brease.enum.MessageBoxIcon'],
        [BASETYPE.String, 'MessageBoxType', 'brease.enum.MessageBoxType'],
        [BASETYPE.String, 'NoSelectionPolicy', 'brease.enum.NoSelectionPolicy'],
        [BASETYPE.String, 'Orientation', 'brease.enum.Orientation'],
        [BASETYPE.String, 'PointOfOrigin', 'brease.enum.PointOfOrigin'],
        [BASETYPE.String, 'Position', 'brease.enum.Position'],
        [BASETYPE.String, 'PromptType', 'brease.enum.PromptType'],
        [BASETYPE.String, 'RangeMode', 'brease.enum.RangeMode'],
        [BASETYPE.String, 'RenderingPolicy', 'brease.enum.RenderingPolicy'],
        [BASETYPE.String, 'ScrollDirection', 'brease.enum.ScrollDirection'],
        [BASETYPE.String, 'SelectMode', 'brease.enum.SelectMode'],
        [BASETYPE.String, 'ShowData', 'brease.enum.ShowData'],
        [BASETYPE.String, 'SizeMode', 'brease.enum.SizeMode'],
        [BASETYPE.String, 'SortDirection', 'brease.enum.SortDirection'],
        [BASETYPE.String, 'SortFunction', 'brease.enum.SortFunction'],
        [BASETYPE.String, 'TableConfigurationType', 'brease.datatype.TableConfigurationType'],
        [BASETYPE.String, 'TabPosition', 'brease.enum.TabPosition'],
        [BASETYPE.String, 'TextAlign', 'brease.enum.TextAlign'],
        [BASETYPE.String, 'TextAlignmentAll', 'brease.enum.TextAlignmentAll'],
        [BASETYPE.String, 'TickStyle', 'brease.enum.TickStyle'],
        [BASETYPE.String, 'UserListItemType', 'brease.enum.UserListItemType'],
        [BASETYPE.String, 'VerticalAlign', 'brease.enum.VerticalAlign'],
        [BASETYPE.String, 'VerticalPosition', 'brease.enum.VerticalPosition'],
        [BASETYPE.String, 'VideoPlayerPreload', 'brease.enum.VideoPlayerPreload'],
        [BASETYPE.String, 'XAxisOrientation', 'brease.enum.XAxisOrientation'],
        [BASETYPE.String, 'YAxisOrientation', 'brease.enum.YAxisOrientation'],

        // data types that are noted on an element basis in xsd (therefore not 'RoleCollection' or 'Array')
        [BASETYPE.Array, 'NumberArray1D'],
        [BASETYPE.Array, 'BooleanArray1D'],
        [BASETYPE.Array, 'StringArray1D'],
        [BASETYPE.Array, 'DateTimeArray1D']

    ].forEach(function (item) {
        DataTypes[item[1]] = new DataType(item[0], item[1], item[2]);
        if (item[2]) {
            DataTypes[item[2]] = new DataType(item[0], item[1], item[2]);
        }
    });

    module.exports = {

        isInteger: function (type) {
            var datatype = DataTypes[type];
            return (datatype !== undefined && datatype.baseType === BASETYPE.Integer);
        },

        isNumber: function (type) {
            var datatype = DataTypes[type];
            return (datatype !== undefined && datatype.baseType === BASETYPE.Number);
        },

        isBoolean: function (type) {
            var datatype = DataTypes[type];
            return (datatype !== undefined && datatype.baseType === BASETYPE.Boolean);
        },

        // data types that are noted in JSON notation in xsd (therefore e.g. 'RoleCollection' or 'Array')
        isObject: function (type) {
            var datatype = DataTypes[type];
            return (datatype !== undefined && datatype.baseType === BASETYPE.Object);
        },

        isString: function (type) {
            var datatype = DataTypes[type];
            return (datatype !== undefined && datatype.baseType === BASETYPE.String);
        },

        isPath: function (type) {
            return ['ImagePath', 'DirectoryPath', 'FilePath', 'PdfPath', 'VideoPath'].indexOf(type) !== -1;
        },

        isPathCollection: function (type) {
            return ['GraphicCollection'].indexOf(type) !== -1;
        },

        // data types that are noted on an element basis in xsd (therefore not 'RoleCollection' or 'Array')
        isArrayType: function (type) {
            var datatype = DataTypes[type];
            return (datatype !== undefined && datatype.baseType === BASETYPE.Array);
        },

        isArrayProp: function (type) {
            var datatype = DataTypes[type];
            return (datatype !== undefined && (datatype.baseType === BASETYPE.Array || type === 'brease.datatype.ArrayNode' || type === 'ArrayNode'));
        },

        baseType: function (type) {
            var datatype = DataTypes[type];
            return (datatype) ? datatype.baseType : undefined;
        },

        fullType: function (type) {
            var datatype = DataTypes[type];
            return (datatype) ? datatype.fullName : undefined;
        }
    };

})();
