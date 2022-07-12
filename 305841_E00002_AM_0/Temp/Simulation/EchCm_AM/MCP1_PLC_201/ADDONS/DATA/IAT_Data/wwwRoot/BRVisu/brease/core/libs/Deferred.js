define(function () {

    'use strict';

    /**
    * @class brease.core.libs.Deferred
    * lightweight version of Promise 
    */
    var Deferred = function (type, loopParams) {
        this.type = type;
        if (Array.isArray(loopParams)) {
            this.loopParams = loopParams.slice(0);
        }
        this._done = [];
        this._fail = [];
        this._then = [];
    };
    Deferred.TYPE_SINGLE = 'singleShot';
    Deferred.TYPE_MULTI = 'multiShot';

    Deferred.prototype = {
        execute: function (list, data) {
            var i = list.length - 1;
            while (i >= 0) {
                list[i].apply(null, data);
                i = i - 1;
            }
            
            i = this._then.length - 1;
            while (i >= 0) {
                this._then[i].apply(null, data);
                i = i - 1;
            }
            if (this.type === Deferred.TYPE_SINGLE && (list.length > 0 || (Array.isArray(this._then) && this._then.length > 0))) {
                this.terminate();
            }
            this._then = null;
            this._done = null;
            this._fail = null;
        },
        resolve: function () {
            if (this.state === undefined) {
                this.state = 1;
                if (Array.isArray(this.loopParams)) {
                    this.doneData = this.loopParams;
                } else {
                    this.doneData = [];
                }
                // extend doneData with arguments inline, as it prevents optimizations in some JavaScript engines
                // if we pass arguments to a function
                for (var i = arguments.length - 1; i >= 0; i -= 1) {
                    this.doneData.unshift(arguments[i]);
                }

                this.loopParams = null;

                this.execute(this._done, this.doneData);
            }
        },
        reject: function () {
            if (this.state === undefined) {
                this.state = -1;
                if (Array.isArray(this.loopParams)) {
                    this.failData = this.loopParams;
                } else {
                    this.failData = [];
                }
                // extend failData with arguments inline, as it prevents optimizations in some JavaScript engines
                // if we pass arguments to a function
                for (var i = arguments.length - 1; i >= 0; i -= 1) {
                    this.failData.unshift(arguments[i]);
                }

                this.loopParams = null;
                this.execute(this._fail, this.failData);
            }
        },
        done: function (callback) {
            if (typeof callback === 'function') {
                if (this.doneData) {
                    callback.apply(null, this.doneData);
                    if (this.type === Deferred.TYPE_SINGLE) {
                        this.terminate();
                    }
                } else if (this._done) {
                    this._done.push(callback);
                }
            }
            return this;
        },
        fail: function (callback) {
            if (typeof callback === 'function') {
                if (this.failData) {
                    callback.apply(null, this.failData);
                    if (this.type === Deferred.TYPE_SINGLE) {
                        this.terminate();
                    }
                } else if (this._fail) {
                    this._fail.push(callback);
                }
            }
            return this;
        },
        then: function (callback) {
            if (typeof callback === 'function') {
                if (this.failData || this.doneData) {
                    if (this.failData) {
                        callback.apply(null, this.failData);
                        if (this.type === Deferred.TYPE_SINGLE) {
                            this.terminate();
                        }
                    }
                    if (this.doneData) {
                        callback.apply(null, this.doneData);
                        if (this.type === Deferred.TYPE_SINGLE) {
                            this.terminate();
                        }
                    }
                } else if (this._then) {
                    this._then.push(callback);
                }
            }
            return this;
        },
        terminate: function () {
            this.doneData = null;
            this.failData = null;
            this.loopParams = null;
        }
    };

    return Deferred;

});
