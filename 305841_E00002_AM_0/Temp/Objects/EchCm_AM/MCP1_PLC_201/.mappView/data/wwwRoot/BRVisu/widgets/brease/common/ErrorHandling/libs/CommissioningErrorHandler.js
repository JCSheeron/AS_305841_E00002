define(['brease/core/Class'], function (SuperClass) {

    'use strict';

    /**
    * @class widgets.brease.common.ErrorHandling.libs.CommissioningErrorHandler
    * @extends brease.core.Class
    * Commissioning error module for all widgets. It provides functions to signal commissioning errors to the user. 
    */
    /**
    * @method constructor
    * @param {Object} [widget] reference to widget creating the instance
    */
    var ErrorHandler = SuperClass.extend(function ErrorHandler(widget) {
            this.widget = widget;
            this.init();
            SuperClass.apply(this, arguments);
        }, null),

        p = ErrorHandler.prototype;

    p.init = function () {
        this.contentId = this.widget.settings.parentContentId;
        this.widgetId = this.widget.elem.id;
        this.$overlay = null;
        this.numberOfReportedErrors = 0;
    };

    p.dispose = function () {
        if (this.$overlay) {
            this.$overlay.remove();
            this.$overlay = null;
        }
    };

    /**
     * @method requiredBindingMissing 
     * used when a required binding is missing (e.g. mpLink)
     * @param {String} property name of bindable property
     * @param {String} [id] if different from  widget's id
     */
    p.requiredBindingMissing = function (arg1, arg2) {
        var id = _getWidgetId(this.widgetId, this.contentId),
            property = arg1;

        if (arg2 !== undefined) {
            id = _getWidgetId(arg2, this.contentId);
        }
        _setErrorMessage(this, id, 'Binding for property ' + property + ' missing!');
    };

    /**
    * @method requiredBindingsMissing 
    * used when required bindings are missing
    * @param {String} properties name of bindable properties
    * @param {String} [id] if different from  widget's id
    */
    p.requiredBindingsMissing = function (arg1) {
        var id = _getWidgetId(this.widgetId, this.contentId);
        if (arg1 !== undefined) {
            id = _getWidgetId(arg1, this.contentId);
        }
        _setErrorMessage(this, id, 'Binding for properties missing!');
    };
    /**
   * @method requiredBindingNodesMissing 
   * used when required bindings are missing
   */
    p.requiredBindingNodesMissing = function () {
        var id = _getWidgetId(this.widgetId, this.contentId);
        _setErrorMessage(this, id, 'Node(s) binding for graph(s) missing!');
    };

    /**
    * @method invalidPropertyValue 
    * used when a property is invalid or creates a conflict the widget cannot handle. 
    *         E.g. widgetRefId is not exisisting. 
    * @param {String} property name of property
    * @param {String} [id] if different from  widget's id
    */
    p.invalidPropertyValue = function (arg1, arg2) {
        var id = _getWidgetId(this.widgetId, this.contentId),
            property = arg1;

        if (arg2 !== undefined) {
            id = _getWidgetId(arg2, this.contentId);
        }
        _setErrorMessage(this, id, 'Property "' + property + '" has invalid or conflicting value!');
    };

    /**
    * @method requiredAncestorWidgetMissing  
    * used when a child is missing the required ancestor. 
    * @param {String|Array} ancestorType name of unit property
    * @param {String} [id] if different from  widget's id
    */
    p.requiredAncestorWidgetMissing = function (arg1, arg2) {
        var id = _getWidgetId(this.widgetId, this.contentId),
            property;

        if (typeof arg1 === 'string') {
            property = arg1;
        } else {
            property = arg1.join(', ');
        }
        if (arg2 !== undefined) {
            id = _getWidgetId(arg2, this.contentId);
        }

        _setErrorMessage(this, id, 'Missing an ancestor of type ' + property + '!');
    };

    /**
    * @method requiredParentWidgetMissing  
    * used when a child is missing the required parent. 
    * @param {String|Array} parentType name of unit property
    * @param {String} [id] if different from  widget's id
    */
    p.requiredParentWidgetMissing = function (arg1, arg2) {
        var id = _getWidgetId(this.widgetId, this.contentId),
            property;

        if (typeof arg1 === 'string') {
            property = arg1;
        } else {
            property = arg1.join(', ');
        }
        if (arg2 !== undefined) {
            id = _getWidgetId(arg2, this.contentId);
        }

        _setErrorMessage(this, id, 'Missing a parent of type ' + property + '!');
    };

    /**
    * @method requiredChildWidgetMissing  
    * used when a parent is missing one or more required children. 
    * @param {String|Array} childType name of unit property
    * @param {String} [id] if different from  widget's id
    */
    p.requiredChildWidgetMissing = function (arg1, arg2) {
        var id = _getWidgetId(this.widgetId, this.contentId),
            property;

        if (typeof arg1 === 'string') {
            property = arg1;
        } else {
            property = arg1.join(', ');
        }
        if (arg2 !== undefined) {
            id = _getWidgetId(arg2, this.contentId);
        }

        _setErrorMessage(this, id, 'Missing a child of type ' + property + '!');
    };

    /**
    * @method childrenConflict
    * used when a parent cannot handle the type, amount or combination of children
    * @param {String} childId id of child widget
    * @param {String} [id] if different from  widget's id
    */
    p.childrenConflict = function (arg1, arg2) {
        var id = _getWidgetId(this.widgetId, this.contentId),
            childId = _getWidgetId(arg1, this.contentId);

        if (arg2 !== undefined) {
            id = _getWidgetId(arg2, this.contentId);
        }
        _setErrorMessage(this, id, 'Child ' + childId + ' is invalid or conflicts with other children!');
    };

    function _getWidgetId(widgetId, contentId) {
        var id = widgetId.replace(contentId + '_', '');
        return id;
    }

    function _createOverlay(widget) {
        var $overlay = $('<div />');
        var css = {
            'background-color': 'white',
            'width': '100%',
            'height': '100%',
            'position': 'absolute',
            'top': '0px',
            'left': '0px',
            'color': 'red',
            'z-index': '999'
        };
        $overlay.css(css);
        widget.el.append($overlay);
        return $overlay;
    }

    function _setErrorMessage(self, widgetId, msg) {
        if (brease.config.editMode || window.jasmine) { return false; }
        _showErrorMessageOnUI(self, 'ERROR: ' + msg + ' { WidgetId: ' + widgetId + ', ContentId: ' + self.contentId + ' }');
        self._numberOfReportedErrors += 1;
    }

    function _showErrorMessageOnUI(self, errorMessage) {
        if (self.$overlay === null) {
            self.$overlay = _createOverlay(self.widget);
        }
        if (self.$overlay.text().indexOf(errorMessage) < 0) {
            self.$overlay.append('<p>' + errorMessage + '</p>');
        }
        console.error(errorMessage);
    }

    return ErrorHandler;
});
