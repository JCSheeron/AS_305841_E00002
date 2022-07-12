define([
    'widgets/brease/Button/Button'
], function (SuperClass) {

    'use strict';

    /**
     * @class widgets.brease.LoginButton
     * #Description
     * widget provides an interface to login a user
     *  
     * @breaseNote
     * @extends widgets.brease.Button
    
     * @iatMeta category:Category
     * Login,Buttons,System
     * @iatMeta description:short
     * Button for login
     * @iatMeta description:de
     * Startet einen Loginversuch, wenn der Benutzer darauf klickt
     * @iatMeta description:en
     * Starts a login attempt when the user clicks it
     */

    /**
     * @cfg {String} userName=''
     * @iatStudioExposed
     * @iatCategory Data
     * @bindable
     * Name of user.  
     */

    /**
     * @cfg {String} password=''
     * @iatStudioExposed
     * @iatCategory Data
     * @bindable
     * Password .  
     */
    var defaultSettings = {
            userName: '',
            password: ''
        },

        WidgetClass = SuperClass.extend(function LoginButton() {
            SuperClass.apply(this, arguments);
            this.loginActionCompletedDeferred = $.Deferred().reject();
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseLoginButton');
        }
        SuperClass.prototype.init.call(this);
    };

    /**
     * @method setUserName
     * @iatStudioExposed
     * Sets the name of the user
     * @param {String} userName
     */
    p.setUserName = function (userName) {
        this.settings.userName = userName;
    };

    p.getUserName = function () {
        return this.settings.userName;
    };

    /**
     * @method setPassword
     * @iatStudioExposed
     * Sets the password
     * @param {String} password
     */
    p.setPassword = function (password) {
        this.settings.password = password;
    };

    p.getPassword = function () {
        return this.settings.password;
    };

    p._onButtonClick = function () {
        this.loginActionCompletedDeferred = $.Deferred();
        brease.user.authenticateUser(this.settings.userName, this.settings.password).then(
            this._bind('_authSuccessHandler'),
            this._bind('_authFailHandler')
        );
    };

    p._authSuccessHandler = function (user) {
        brease.user.setCurrentUser(user).then(
            this._bind('_setUserSuccessHandler'),
            this._bind('_setUserFailHandler')
        );
    };

    p._authFailHandler = function (user) {
        /**
         * @event AuthentificationFailed
         * @iatStudioExposed
         * Fired when login (authentication) failed.
         */
        var clickEv = this.createEvent('AuthentificationFailed');
        clickEv.dispatch();
        this.loginActionCompletedDeferred.reject();
    };

    p._setUserSuccessHandler = function (user) {
        /**
         * @event LoginSuccess
         * @iatStudioExposed
         * Fired when successfully logged in.
         */
        var clickEv = this.createEvent('LoginSuccess');
        clickEv.dispatch();
        this.loginActionCompletedDeferred.resolve();
    };

    p._setUserFailHandler = function (user) {
        /**
         * @event LoginFailed
         * @iatStudioExposed
         * Fired when login failed.
         * @deprecated
         */
        var clickEv = this.createEvent('LoginFailed');
        clickEv.dispatch();
        this.loginActionCompletedDeferred.reject();
    };

    p.dispose = function () {
        var that = this;
        this.loginActionCompletedDeferred.always(function () {
            SuperClass.prototype.dispose.apply(that, arguments);
        });
    };

    return WidgetClass;

});
