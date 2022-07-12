define(function () {

    'use strict';

    var UtilsText = {};

    UtilsText.getTextsFromItems = function (itemsArray) {
        var textElements = {}, i;
        for (i = 0; i < itemsArray.length; i = i + 1) {
            var id = i.toString();
            textElements[id] = UtilsText.getTextElement(itemsArray[i].text, id);
        }
        return textElements;
    };

    UtilsText.getTextElement = function (text, id) {
        var textElement = {
            textId: id
        };
        if (brease.language.isKey(text)) {
            textElement.textKey = brease.language.parseKey(text);
            textElement.displayText = brease.language.getTextByKey(textElement.textKey);
        } else {
            textElement.textKey = undefined;
            textElement.displayText = text;
        }
        return textElement;
    };

    UtilsText.translateTextElements = function (textElements) {
        var updatedTexts = {};
        for (var textElementId in textElements) {
            if (textElements.hasOwnProperty(textElementId)) {
                updatedTexts[textElementId] = UtilsText.translateTextElement(textElements[textElementId]);
            }
        }
        return updatedTexts;
    };

    UtilsText.translateTextElement = function (textElement) {
        if (textElement.textKey === undefined) {
            return textElement;
        }
        return _.assign({}, textElement, { displayText: brease.language.getTextByKey(textElement.textKey) });
    };

    return UtilsText;

});
