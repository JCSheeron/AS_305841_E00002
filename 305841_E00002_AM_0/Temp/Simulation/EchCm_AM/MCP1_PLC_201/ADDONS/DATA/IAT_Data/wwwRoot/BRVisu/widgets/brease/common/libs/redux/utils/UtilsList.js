define([
    'brease/enum/Enum',
    'brease/core/Utils'
], function (Enum, CoreUtils) {

    'use strict';

    /**
    * @class widgets.brease.common.libs.redux.utils.UtilsList
    * @extends core.javascript.Object
    */

    var UtilsList = {};

    /**
     * @method 
     * This method takes a non parsed dataprovider and parses each object separately and returns
     * the entire configuration.
     * If one item fails it will not be part of the returned configuration.
     * @param {String[]} dataProvider list of string with the dataprovider configuration
     * @returns {Object[]}
     */
    UtilsList.parseJSONtoObject = function (dataProvider, widgetId) {
        var data = [];
        if (Array.isArray(dataProvider)) {
            data = dataProvider.map(function (item) {
                if (typeof item === 'string') {
                    return CoreUtils.parsePseudoJSON(item, 'malformed data provider - widgetId: ' + widgetId);
                } else if (item !== null && typeof item === 'object') {
                    return item;
                }
            }, this).filter(function (item) { return item !== undefined; });
        }
        return data;
    };

    UtilsList.getItemsFromItems = function (itemsArray, selectedIndex) {
        var itemList = [], i;
        for (i = 0; i < itemsArray.length; i = i + 1) {
            itemList.push({
                imageId: i.toString(),
                textId: i.toString(),
                value: itemsArray[i].value,
                selected: i === selectedIndex
            });
        }
        return itemList;
    };

    UtilsList.getSelectedValueFromItems = function (itemsArray, selectedIndex) {
        if (itemsArray[selectedIndex] !== undefined) {
            return itemsArray[selectedIndex].value;
        } else {
            return '';
        }
    };

    /**
     * @method 
     * This method calculates the height of the list given the number of items available, how many should be
     * visible, the how heigh one item is and if the height should fit to items or not.
     * @param {Boolean} fitHeight2Items
     * @param {UInteger} numberOfItems
     * @param {UInteger} maxVisibleEntries
     * @param {UInteger} itemHeight
     * @returns {UInteger} listHeight
     */
    UtilsList.calculateListHeight = function (fitHeight2Items, numberOfItems, maxVisibleEntries, itemHeight) {
        var itemsToShow = (maxVisibleEntries > numberOfItems || fitHeight2Items) ? numberOfItems : maxVisibleEntries,
            listHeight = itemsToShow * itemHeight;
        return listHeight;
    };

    /**
     * @method 
     * This method will take all languages from the language system and convert these
     * into a dataprovider that the dropdownbox can understand with necessary information
     * It also sorts the data alafabetically after the language key. Should be used in the 
     * LanguageSelector
     * @param {Object[]} languages
     * @returns {Object[]} sorted list of the languages
     */
    UtilsList.getDataProviderForLanguage = function (languages) {
        var dataProvider = Object.keys(languages).map(function (key) {
            return {
                value: key,
                text: languages[key].description,
                image: key + '.png',
                index: languages[key].index !== undefined ? languages[key].index : 0
            };
        });
        return dataProvider.sort(function (a, b) { return a.index - b.index; });
    };

    /**
     * @method 
     * This method will take all measurements from the measurement system and convert these
     * into a dataprovider that the dropdownbox can understand with necessary information
     * It also sorts the data alafabetically after the measurement key. Should be used in the 
     * MeasurementSelector
     * @param {Object[]} systems
     * @returns {Object[]} sorted list of the systems
     */
    UtilsList.getDataProviderForMeasurement = function (systems) {
        var dataProvider = Object.keys(systems).map(function (key) {
            return {
                value: key,
                text: systems[key].description,
                image: key + '.png'
            };
        });
        return dataProvider.sort(function (a, b) { return a.index - b.index; });
    };

    /**
     * @method 
     * This method will take the display settings and generate the correct
     * setup for that specific type
     * @param {brease.enum.DropDownDisplaySettings} displaySettings
     * @returns {Object} 
     */
    UtilsList.getShowValues = function (displaySettings) {
        return {
            showTexts: (displaySettings === Enum.DropDownDisplaySettings.default) ||
                (displaySettings === Enum.DropDownDisplaySettings.text) ||
                (displaySettings === Enum.DropDownDisplaySettings.imageAndText),
            showImages: (displaySettings === Enum.DropDownDisplaySettings.default) ||
                (displaySettings === Enum.DropDownDisplaySettings.image) ||
                (displaySettings === Enum.DropDownDisplaySettings.imageAndText),
            showTextsInButton: (displaySettings === Enum.DropDownDisplaySettings.default) ||
                (displaySettings === Enum.DropDownDisplaySettings.text) ||
                (displaySettings === Enum.DropDownDisplaySettings.imageAndText),
            showImagesInButton: (displaySettings === Enum.DropDownDisplaySettings.image) ||
                (displaySettings === Enum.DropDownDisplaySettings.imageAndText)
        };
    };

    /**
     * @method 
     * This method compares two values where these can either both be of the same type
     * or they can be of two contradicting types. Both should be fine.
     * I.e. 1 === true returns true
     *   true === true returns true
     *   true === 1    return  true
     * etc.
     * 
     * @param {Boolean|Integer} in1
     * @param {Boolean|Integer} in2
     * @returns {Boolean}
     */
    UtilsList.isEqualIntBool = function (in1, in2) {
        return in1 === in2 || ((in1 === true || in1 === 1) && (in2 === true || in2 === 1)) || ((in1 === false || in1 === 0) && (in2 === false || in2 === 0));
    };

    return UtilsList;

});
