define(['widgets/brease/KeyBoard/libs/PluginProto'], function (SuperClass) {
    'use strict';
    /**
    * @class widgets.brease.KeyBoard.libs.external.PluginEs
    * #Description
    * Plugin to handle spanish accents e.g.: ´ + a => á
    * @extends widgets.brease.keyBoard.PluginProto
    * @iatMeta category:Category
    * PlugIn
    */
    var Plugin = SuperClass.extend(function PluginEs() {
            SuperClass.apply(this, arguments);
        }),

        p = Plugin.prototype;

    p.onInput = function (value, cursor) {
        var startIdx = Math.max(0, cursor - 2),
            accent = _getAccentCharacter(value.slice(startIdx, cursor)),
            newValue = _insertAccent(value, startIdx, accent);
        if (value !== newValue) {
            this.keyboard.setValue(newValue);
            this.keyboard.setCursor(cursor - accent.length);
        }
    };

    function _insertAccent(value, index, accent) {
        return value.slice(0, index) + accent + value.slice(index + (accent.length > 0 ? 2 : 0));
    }

    function _getAccentCharacter(value) {
        return ACCENTCHARACTERS[value] ? ACCENTCHARACTERS[value] : '';
    }
    var ACUTE = {
        '´a': 'á',
        '´e': 'é',
        '´i': 'í',
        '´o': 'ó',
        '´u': 'ú',
        '´A': 'Á',
        '´E': 'É',
        '´I': 'Í',
        '´O': 'Ó',
        '´U': 'Ú'
    };
    var GRAVE = {
        '`a': 'à',
        '`e': 'è',
        '`i': 'ì',
        '`o': 'ò',
        '`u': 'ù',
        '`A': 'À',
        '`E': 'È',
        '`I': 'Ì',
        '`O': 'Ò',
        '`U': 'Ù'
    };
    var CIRCUMFLEX = {
        '^a': 'â',
        '^e': 'ê',
        '^i': 'î',
        '^o': 'ô',
        '^u': 'û',
        '^A': 'Â',
        '^E': 'Ê',
        '^I': 'Î',
        '^O': 'Ô',
        '^U': 'Û'
    };
    var DIARESIS = {
        '¨a': 'ä',
        '¨e': 'ë',
        '¨i': 'ï',
        '¨o': 'ö',
        '¨u': 'ü',
        '¨A': 'Ä',
        '¨E': 'Ë',
        '¨I': 'Ï',
        '¨O': 'Ö',
        '¨U': 'Ü'
    };
    var PERISPOMENE = {
        '~a': 'ã',
        '~e': 'ẽ',
        '~i': 'ĩ',
        '~o': 'õ',
        '~u': 'ũ',
        '~A': 'Ã',
        '~E': 'Ẽ',
        '~I': 'Ĩ',
        '~O': 'Õ',
        '~U': 'Ũ'
    };
    var ACCENTCHARACTERS = Object.assign(ACUTE, GRAVE, CIRCUMFLEX, DIARESIS, PERISPOMENE);
    return new Plugin();

});
