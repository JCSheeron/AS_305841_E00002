define(function () {

    'use strict';

    /**
    * @class widgets.brease.common.libs.redux.utils.UtilsImage
    * @extends core.javascript.Object
    */
    var UtilsImage = {};

    /**
     * @method 
     * This method takes a dataprovider and creates a list of strings containing
     * either the given images as provided or the index of the item of png type.
     * @param {Object[]} dataProvider
     * @returns {String[]}
     */
    UtilsImage.createImageList = function (dataProvider) {
        dataProvider = dataProvider || [];
        var imageList = [], i = 0;
        for (i = 0; i < dataProvider.length; i = i + 1) {
            if (dataProvider[i].image !== undefined) {
                imageList.push(dataProvider[i].image);
            } else {
                imageList.push(i.toString() + '.png');
            }
        }
        return imageList;
    };

    /**
     * @method 
     * This method will create the necessary elements from the imageList
     * created in the createImageList and an imagePath.
     * @param {String[]} imageList
     * @param {String} imagePath
     * @returns {Object}
     */
    UtilsImage.createImageElements = function (imageList, imagePath) {
        imageList = imageList || [];
        var imageElements = {}, i = 0;
        for (i = 0; i < imageList.length; i = i + 1) {
            var id = i.toString();
            imageElements[id] = {};
            imageElements[id].id = id;
            if (imagePath !== undefined && imagePath !== '') {
                imageElements[id].imagePath = imagePath + imageList[i];
            } else {
                imageElements[id].imagePath = undefined;
            }
        }
        return imageElements;
    };

    return UtilsImage;

});
