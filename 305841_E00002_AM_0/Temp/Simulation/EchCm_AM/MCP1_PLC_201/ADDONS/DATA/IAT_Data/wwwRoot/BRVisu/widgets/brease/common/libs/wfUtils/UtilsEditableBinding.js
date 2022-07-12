define(function () {

    'use strict';

    /**
     * @class widgets.brease.common.libs.wfUtils.UtilsEditableBinding
     * This Module should be used for handling the EditableBindings (Bindable Properties, which are able to handle a TwoWay-Binding)
     */

    var UtilsEditableBinding = {};

    /**
     * @method 
     * This Function is used for setting the correct parameters for the Framework to establish an editableBinding
     * @param {Boolean} editable editable - input of setEditable function
     * @param {Object} metaData metaData - input of setEditable function
     * @param {WidgetInstance} widget Instance of the Widget 
     * @param {StringArray1D} propertyArray In this array all the property-names should be listed for an editableBinding e.g. ['node', 'value',...]
     */
    UtilsEditableBinding.handleEditable = function (editable, metaData, widget, propertyArray) {
        if (metaData !== undefined && metaData.refAttribute !== undefined) {
            var refAttribute = metaData.refAttribute;
            if (propertyArray.indexOf(refAttribute) > -1) {
                _storeEditable.call(widget, refAttribute, editable);
                widget.settings.editable = _isEditable.call(widget);
                widget._internalEnable();
            }
        }
    };
    // create a collection of all editables
    function _storeEditable(refAttribute, editable) {
        // this = widget
        if (!_hasEditableStorage.call(this)) {
            _createEditableStorage.call(this);
        }
        this.internal.editables[refAttribute] = editable;
    }
    // returns true if all stored editables return true
    function _isEditable() {
        // this = widget
        var isEditable = true,
            editables = this.internal.editables;
        for (var editable in editables) {
            isEditable = isEditable && editables[editable];
            if (!isEditable) {
                return isEditable;
            }
        }
        return isEditable;
    }
    function _hasEditableStorage() {
        // this = widget
        return this.internal && this.internal.editables;
    }
    function _createEditableStorage() {
        // this = widget
        if (!this.internal) {
            this.internal = {};
        }
        if (!this.internal.editables) {
            this.internal.editables = {};
        }
    }
    return UtilsEditableBinding;
});
