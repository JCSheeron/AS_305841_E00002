define([
    'libs/d3/d3'
], function (d3) {

    'use strict';

    var UtilsLocalize = {};

    UtilsLocalize.getTimeFormatD3 = function (cultureKey) {

        // Get culture from Globalize
        cultureKey = cultureKey || brease.culture.getCurrentCulture().key;
        var culture;
        if (Globalize.findClosestCulture(cultureKey) === null) {
            culture = Globalize.cultures[Globalize.cultures.default.name];
        } else {
            culture = Globalize.cultures[cultureKey];
        }

        //Build Formater for d3
        var locale = d3.locale({
            'dateTime': culture.calendar.patterns.F,
            'date': culture.calendar.patterns.D,
            'time': culture.calendar.patterns.T,
            'periods': [culture.calendar.AM === null ? 'AM' : culture.calendar.AM[0],
                culture.calendar.PM === null ? 'PM' : culture.calendar.PM[0]],
            'days': culture.calendar.days.names,
            'shortDays': culture.calendar.days.namesAbbr,
            'months': culture.calendar.months.names.slice(0, 12),
            'shortMonths': culture.calendar.months.namesAbbr.slice(0, 12)
        });

        var timeFormats = [[locale.timeFormat.utc('%Y'), function () { return true; }],
            [locale.timeFormat.utc('%B'), function (d) { return d.getUTCMonth(); }],
            [locale.timeFormat.utc('%b %d'), function (d) { return d.getUTCDate() !== 1; }],
            [locale.timeFormat.utc('%a %d'), function (d) { return d.getUTCDay() && d.getUTCDate() !== 1; }],
            [locale.timeFormat.utc('%H:%M'), function (d) { return d.getUTCHours(); }],
            [locale.timeFormat.utc('%H:%M'), function (d) { return d.getUTCMinutes(); }],
            [locale.timeFormat.utc('%Ss'), function (d) { return d.getUTCSeconds(); }],
            [locale.timeFormat.utc('%Lms'), function (d) { return d.getUTCMilliseconds(); }]];

        var timeFormatPicker = function (formats) {
            return function (date) {
                var i = formats.length - 1, f = formats[i];
                while (!f[1](date)) {
                    i = i - 1;
                    f = formats[i];
                }
                return f[0](date);
            };
        };

        return timeFormatPicker(timeFormats);

    };

    return UtilsLocalize;
});
