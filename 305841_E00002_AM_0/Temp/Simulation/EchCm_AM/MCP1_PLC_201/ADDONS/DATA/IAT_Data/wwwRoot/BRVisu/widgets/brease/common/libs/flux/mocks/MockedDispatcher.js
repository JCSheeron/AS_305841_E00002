define(function () {

    'use strict';

    return function MockedDispatcher() {

        this.registeredStores = [];

        this.registerStore = function registerStore(store) {
            this.registeredStores.push(store);
        };

        this.resetStores = function resetStore() {
            this.registeredStores = [];
        };

        this.dispatch = function dispatch(action) {
            this.registeredStores.forEach(function (store) {
                store.newAction(action);
            });
        };

    };

});
