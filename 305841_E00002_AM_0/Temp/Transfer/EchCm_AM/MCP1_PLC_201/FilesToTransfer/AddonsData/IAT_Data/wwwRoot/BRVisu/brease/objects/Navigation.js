define(['brease/controller/libs/LogCode'], function (LogCode) {

    'use strict';
    /**
    * @class brease.objects.Navigation
    * @alternateClassName Navigation
    * @extends Object
    */
    /**
    * @method constructor
    * Creates a new Navigation instance.
    * @param {String} id
    * @param {Object} visuData
    * @param {Object} logger
    */
    /**
    * @property {String} id
    */
    /**
    * @property {Object} pages
    */
    /**
    * @property {Object} swipes
    */
    var Navigation = function (id, visuData, logger) {
        this.id = id;
        this.pages = {};
        this.swipes = {};
        _parseNavigation(this, visuData, logger);
    };

    Navigation.prototype.addPage = function (navPage, pageObj, pageId, visuData) {
        if (this.pages[pageId] === undefined) {
            this.pages[pageId] = new Page(pageId, validateTargets(navPage, visuData.pages), pageObj.displayName, pageObj.image);
        }
    };

    function validateTargets(navPage, visuPages) {
        var targets = (navPage && navPage.targets) ? navPage.targets : [];
        targets = targets.filter(function (pageId) { return pageExistsInVisu(pageId, visuPages); });
        return targets;
    }
    function pageExistsInVisu(id, pages) {
        return pages && pages[id] !== undefined;
    }

    function addIfNotExistsInNavigation(targetId, navObj, navData, visuData) {
        // if target is not in navObj: add it
        if (navObj.pages[targetId] === undefined) {
            navObj.addPage(navData.pages[targetId], visuData.pages[targetId], targetId, visuData);
        }
    }

    function _parseNavigation(instance, visuData, logger) {

        var navData = visuData.navigations[instance.id];

        for (var navPageId in navData.pages) {
            if (pageExistsInVisu(navPageId, visuData.pages)) {
                // casting to NavigationPage
                instance.addPage(navData.pages[navPageId], visuData.pages[navPageId], navPageId, visuData);
                
                var targets = navData.pages[navPageId].targets;
                if (targets) {
                    for (var i = 0; i < targets.length; i += 1) {
                    // all targets of the page will have page as source (reachableFrom)
                        var targetId = targets[i];
                        if (pageExistsInVisu(targetId, visuData.pages)) {
                            addIfNotExistsInNavigation(targetId, instance, navData, visuData);
                            instance.pages[targetId].addSource(navPageId); 
                        } else {
                            logger.log(LogCode.PAGE_NOT_FOUND, { pageId: targetId, isStartPage: (visuData && visuData.startPage === targetId) });
                        }
                    }
                }
                instance.swipes[navPageId] = navData.pages[navPageId].swipe;
            } else {
                logger.log(LogCode.PAGE_NOT_FOUND, { pageId: navPageId, isStartPage: (visuData && visuData.startPage === navPageId) });
            }
        }

    }

    // *** Page ***

    function Page(id, targets, displayName, image) {
        this.id = id;
        if (image !== undefined) {
            this.image = image;
        }
        if (displayName !== undefined) {
            this.displayName = displayName;
        }
        this.targets = targets;
        this.reachableFrom = [];
    }

    Page.prototype.addSource = function (pageId) {
        this.reachableFrom.push(pageId);
    };

    return Navigation;

});
