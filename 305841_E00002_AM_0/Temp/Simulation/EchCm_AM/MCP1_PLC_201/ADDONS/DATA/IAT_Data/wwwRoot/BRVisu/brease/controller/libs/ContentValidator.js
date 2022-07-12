define(['brease/controller/libs/LogCode',
    'brease/controller/libs/AreaManager',
    'brease/objects/Area',
    'brease/controller/libs/Containers',
    'brease/controller/objects/PageType',
    'brease/core/Utils'],
function (LogCode, AreaManager, Area, containers, PageType, Utils) {

    'use strict';
    var ContentValidator = {};

    ContentValidator.injectDependencies = function (obj) {
        if (obj.visuModel) {
            this.visuModel = obj.visuModel;
        }
        if (obj.contentManager) {
            this.contentManager = obj.contentManager;
        }
        if (obj.loaderPool) {
            this.loaderPool = obj.loaderPool;
        }
    };

    /**
    * @method getTargetForContent
    * Validates if a content load is allowed and returns area and assignment  
    * only for content loading via loadContentInDialogArea and loadContentInArea (and loadContentInWidget for ContentControl which calls loadContentInArea)  
    * in case of success=false, additional info is returned, which is needed in PageLogger, dependent of returned statusCode  
    * @param {Object} data
    * @param {String} data.contentId
    * @param {String} data.areaId
    * @param {String} data.pageId
    * @param {brease.controller.objects.PageType} data.pageType
    * @param {Boolean} force
    * @return {Object} 
    * @return {Boolean} return.success
    * @return {brease.controller.libs.LogCode} return.statusCode LogCode for PageLogger in case of success=false
    * @return {Object} return.data
    * @return {Object} return.data.area
    * @return {Object} return.data.assignment
    * @return {String} return.data.contentId
    * @return {String} return.data.containerId
    * @return {String} return.data.areaId
    * @return {String} return.data.pageId
    * @return {String} return.data.layoutId
    */
    ContentValidator.getTargetForContent = function (data, force) {

        // content to load has to exist and must not be in creation or already loaded, except force is set
        var response = (force !== true) ? _validateContent(data.contentId) : { success: true };
        if (!response.success) {
            return response;
        }

        // page has to exist and has to be currently loaded  
        // in case of a widget (=ContentControl) this page is a virtual page and is created in getTargetForWidget
        var containerId, page;
        response = _validatePage(data.pageId, data.pageType);
        if (!response.success) {
            return response;
        } else {
            page = response.data.page;
            containerId = response.data.containerId;
        }

        // area has to be part of layout of page  
        // in case of a widget (=ContentControl) this area is part of the created page
        var area;
        response = _validateArea(data, page, containerId);
        if (!response.success) {
            return response;
        } else {
            area = response.data.area;
        }

        // strategy for loadContentInArea: 
        // not allowed:
        // 1) if new content is pending 
        // 2) if old content is pending in same area
        var oldContentId = _findContentOfArea(area, page),
            oldContent = ContentValidator.contentManager.getContent(oldContentId),
            oldContentPending = oldContentId && oldContent.areaId === area.id && (ContentValidator.contentManager.isPending(oldContentId)),
            newContentId = data.contentId,
            newContentPending = ContentValidator.contentManager.isPending(newContentId);
                
        if (newContentPending || oldContentPending) {
            response.success = false;
            response.statusCode = LogCode.CONTENT_LOADING_IN_PROCESS;
            response.data = { areaId: data.areaId, pageId: data.pageId, layoutId: page.layout };
            return response;
        }

        // as there exists no static assignment, we need to create it:
        // create new assignment with desired contentid
        var assignment = _createAssignment(page, data.areaId, data.contentId);

        response.data = {
            area: area,
            assignment: assignment
        };

        return response;
    };

    /**
    * @method getTargetForWidget
    * Returns areaId, pageId and areaDivId of the created area and page for the loading of a content into a ContentControl  
    * @param {String} widgetId
    * @param {String} contentId id of the content to be loaded
    * @param {String} parentContentId id of the content, where the widget is located
    * @param {ZoomType} zoomMode
    * @param {Object} size
    * @param {jQuery} $LayoutArea jquery object of the layoutArea in the widget; at first load this area does not exist -> $LayoutArea.length=0
    * @return {Object} 
    * @return {String} return.pageId id of the created virtual page for the assignment of the content to the area
    * @return {Object} return.areaId id of area, where the content is loaded
    * @return {Object} return.areaDivId id of div of area, where the content is loaded
    */
    ContentValidator.getTargetForWidget = function (widgetId, contentId, parentContentId, zoomMode, size, $LayoutArea) {
        var areaId = 'A0',
            layoutId = widgetId,
            pageId = 'virtualPage_' + widgetId,
            area = new Area(areaId, { width: size.realWidth, cssWidth: size.cssWidth, height: size.realHeight, cssHeight: size.cssHeight, top: 0, left: 0 }),
            parentContent = ContentValidator.visuModel.getContentById(parentContentId),
            areaObj;

        if ($LayoutArea.length === 0) {
            ContentValidator.visuModel.addLayout(layoutId, { id: layoutId, areas: {} });
            ContentValidator.visuModel.addArea(layoutId, area);
            ContentValidator.visuModel.addPage(pageId, { id: pageId, layout: layoutId, type: 'Page', visuId: (parentContent) ? parentContent.visuId : ContentValidator.visuModel.startVisuId, assignments: {} });
            ContentValidator.visuModel.addAssignment(areaId, pageId, { areaId: areaId, contentId: contentId, type: 'Content', zoomMode: zoomMode });
            containers.addContainer(widgetId, { currentPage: pageId });

            areaObj = AreaManager.add(widgetId, layoutId, area, 'Page');
            var widgetElem = document.getElementById(widgetId);
            if (widgetElem) {
                widgetElem.appendChild(areaObj.div);
            }
        } else {
            areaObj = AreaManager.getArea(widgetId, layoutId, areaId, 'Page');
            areaObj.$div = $LayoutArea;
            areaObj.div = $LayoutArea[0];
            areaObj.$innerBox = $LayoutArea.find(' > .ScrollBox');
            areaObj.innerBox = areaObj.$innerBox[0];
            areaObj.info = area;
        }

        return {
            areaDivId: (areaObj) ? areaObj.id : undefined,
            areaId: areaId,
            pageId: pageId
        };
    };

    // create a new assignment from an existing assignment
    // used when exchanging contents with loadContentInArea or laodContentInDialogArea
    function _createAssignment(page, areaId, contentId) {
        var assignment = {},
            originalAssignment = ContentValidator.visuModel.findAssignment(page, areaId);
        if (originalAssignment) {
            assignment = Utils.deepCopy(originalAssignment);
        }
        assignment.contentId = contentId;
        return assignment;
    }

    function _findContentOfArea(area, page) {
        var loaderElem = document.querySelectorAll('#' + area.id + ' [data-brease-widget="system/widgets/ContentLoader"]'),
            contentId;

        if (loaderElem.length === 0) {
            contentId = page.assignments[area.info.id].contentId;
        } else {
            contentId = loaderElem[0].getAttribute('data-brease-contentid');
        }

        return !contentId ? page.assignments[area.info.id].contentId : contentId;
    }

    function _validateContent(contentId) {
        var content = ContentValidator.visuModel.getContentById(contentId);

        if (content === undefined || content.virtual === true) {
            return {
                success: false,
                statusCode: LogCode.CONTENT_NOT_FOUND,
                data: { contentId: contentId }
            };
        } else if (ContentValidator.loaderPool.isContentLoaded(contentId) === true) {
            return {
                success: false,
                statusCode: LogCode.CONTENT_IS_ACTIVE,
                data: { contentId: contentId }
            };
        } 

        return {
            success: true,
            statusCode: 0,
            data: {}
        };
    }

    function _validatePage(pageId, pageType) {
        var response = {
            success: true,
            statusCode: 0,
            data: {}
        };

        if (pageType === PageType.PAGE) {
            response.data.page = ContentValidator.visuModel.getPageById(pageId);
            if (!response.data.page) {
                response.success = false;
                response.statusCode = LogCode.PAGE_NOT_FOUND;
                response.data = {
                    pageId: pageId,
                    isStartPage: false
                };
                return response;
            }
        } else if (pageType === PageType.DIALOG) {
            response.data.page = ContentValidator.visuModel.getDialogById(pageId);
            if (!response.data.page) {
                response.success = false;
                response.statusCode = LogCode.DIALOG_NOT_FOUND;
                response.data = {
                    dialogId: pageId
                };
                return response;
            }
        }
        response.data.containerId = containers.getContainerForPage(pageId);
        if (response.data.containerId === undefined) {
            response.success = false;
            response.statusCode = LogCode.PAGE_NOT_CURRENT;
            response.data = {
                pageId: pageId
            };

        }
        return response;
    }

    function _validateArea(data, page, containerId) {
        
        if (ContentValidator.visuModel.pageHasArea(data.areaId, page) === false) {
            return { 
                success: false,
                statusCode: LogCode.AREA_NOT_FOUND,
                data: { areaId: data.areaId, pageId: data.pageId, layoutId: page.layout }
            };
        }
        var areaObj = AreaManager.getArea(containerId, page.layout, data.areaId, page.type);
        if (!areaObj) {
            return { 
                success: false,
                statusCode: LogCode.AREA_NOT_FOUND,
                data: { areaId: data.areaId, pageId: data.pageId, layoutId: page.layout }
            };
        }

        return { 
            success: true,
            statusCode: 0,
            data: { area: areaObj } 
        };
    }

    return ContentValidator;
});
