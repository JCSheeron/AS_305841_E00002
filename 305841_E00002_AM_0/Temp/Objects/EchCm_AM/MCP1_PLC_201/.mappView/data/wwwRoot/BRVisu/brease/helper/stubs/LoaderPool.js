define(['brease/events/BreaseEvent'],
    function (BreaseEvent) {

        'use strict';
        var LoaderPoolStub = function () {
            this.dispatchFragmentShowForContent = function (contentId) {
                window.setTimeout(function (cid) {
                    document.body.dispatchEvent(new CustomEvent(BreaseEvent.FRAGMENT_SHOW, { detail: { url: '', contentId: cid }, bubbles: true }));
                }, 10, contentId);
            };
            this.dispatchFragmentHideForContent = function (contentId) {
                document.body.dispatchEvent(new CustomEvent(BreaseEvent.FRAGMENT_HIDE, { detail: { contentId: contentId }, bubbles: true }));
            };
            this.isStub = true;
        };
        LoaderPoolStub.prototype.dispose = function () { };
        LoaderPoolStub.prototype.findContentLoaderWithContent = function () { };
        LoaderPoolStub.prototype.startTagMode = function () { };
        LoaderPoolStub.prototype.endTagMode = function () { };
        // eslint-disable-next-line no-unused-vars
        LoaderPoolStub.prototype.loadContent = function (contentId, container, deferred) {
            console.log('loadContent', contentId);
            deferred.resolve('', true);
        };
        LoaderPoolStub.prototype.removeLoader = function () { };
        return LoaderPoolStub;
    });
