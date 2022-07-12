define([
    'widgets/brease/Label/Label',
    'brease/decorators/UserDependency'
], function (SuperClass, userDependency) {

    'use strict';

    /**
     * @class widgets.brease.LoginInfo
     * #Description
     * Label to show the current user
     * @breaseNote
     * @extends widgets.brease.Label

     * @iatMeta category:Category
     * Login,Text,System
     * @iatMeta description:short
     * Anzeige des aktuellen Benutzers
     * @iatMeta description:de
     * Anzeige des aktuellen Benutzers
     * @iatMeta description:en
     * Displays current user
     */

    /**
     * @cfg {String} text
     * @hide
     */

    var defaultSettings = {
            text: ''
        },

        WidgetClass = SuperClass.extend(function LoginInfo() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;
   
    p.init = function () {
        var widget = this;
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseLoginInfo');
        }
        SuperClass.prototype.init.call(this);
        brease.user.loadCurrentUser().then(
            widget._bind('_getUserSuccessHandler'),
            widget._bind('_getUserFailHandler')
        );

    };

    p.userChangeHandler = function (e) {
        this.setText(e.detail.userID);

    };

    p._getUserSuccessHandler = function (user) {
        this.setText(user.userID);
    };

    p._getUserFailHandler = function () {
        this.setText('undefined');
    };

    return userDependency.decorate(WidgetClass, true);
});
