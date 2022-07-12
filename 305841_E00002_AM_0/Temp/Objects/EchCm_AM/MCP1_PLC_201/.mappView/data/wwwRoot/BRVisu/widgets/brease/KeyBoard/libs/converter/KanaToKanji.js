define([
    'widgets/brease/KeyBoard/libs/external/wanakana', 
    'widgets/brease/KeyBoard/libs/external/dictionaries/single_kanji'
], function (Wanakana, Dictionary) {

    'use strict';
    
    /**
     * @class widgets.brease.KeyBoard.KanaToKanji
     * #Description
     * Converts kana input to kanji
     * @extends Object
     */
    var KanaToKanji = function () {
            this.pathDict = 'widgets/brease/KeyBoard/libs/external/dictionaries/KanjiDic';
        },
        p = KanaToKanji.prototype;

    /**
     * @method getCandidates
     * get suggestions for a specific value
     * @param {String} value
     */
    p.getCandidates = function (value) {
        this.candidateList = [];
        switch (_getValueType(value)) {
            case 0:// romaji 
                this.lookup(value).map(_addCandidateToList, this);
                break;
            case 1: //katakana or hiragana
                this.lookup(Wanakana.toRomaji(value)).map(_addCandidateToList, this);
                break;
            default:

        }
        return this.candidateList;
    };
    /**
     * @method lookup
     * lookup a word in the dictionary
     * @param {String} value
     */
    p.lookup = function (value) {
        var hiragana = Wanakana.toKana(value, { passRomaji: true }),
            filter = '',
            candidates = [];
        for (var i = 0; i < hiragana.length; i += 1) {
            if (Wanakana.isKana(hiragana[i])) {
                filter += hiragana[i];
            }
        }
        for (var kana in Dictionary) {
            //console.debug(kana, hiragana);
            if (kana.indexOf(filter) === 0) {
                candidates = candidates.concat(Dictionary[kana].split(''));
            }
        }
        return candidates;
    };
    function _addCandidateToList(Char) { this.candidateList.push(Char); }
    function _getValueType(value) {
        if (Wanakana.isRomaji(value)) {
            return 0;
        } else if (Wanakana.isKatakana(value) || Wanakana.isHiragana(value)) {
            return 1;
        } else {
            return undefined;
        }
    }
    return new KanaToKanji();
});
