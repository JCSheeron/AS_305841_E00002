(function () {
    'use strict';

    var performance = window.performance,
        monitor = {
            init: function () {
                this.events = [];
                document.onreadystatechange = _readyHandler;
                window.onbeforeunload = _unloadHandler;
                var now = new Date();
                this.startdate = now.getFullYear() + '-' + _format(now.getMonth() + 1) + '-' + _format(now.getDate()) + 'T' + _format(now.getHours()) + ':' + _format(now.getMinutes()) + ':' + _format(now.getSeconds());
                //console.log('startdate:' + this.startdate);
                return this;
            },

            profile: function (type, state) {

                this.events.push({
                    time: performance.now(),
                    type: type,
                    state: state
                });
            },

            getEvents: function () {
                return this.events;
            },

            reset: function () {
                localStorage.setItem('breaseMonitor', JSON.stringify({}));
            },

            saveCurrent: function () {
                _saveData();
            }
        };

    function _format(n) {
        return ((n < 10) ? '0' : '') + n;
    }
    function _readyHandler() {

        if (document.readyState === "complete") {
            monitor.events.push({
                time: performance.now(),
                type: "DOMContentLoaded"
            });
            monitor.timing = performance.timing;
        }

    }
    function _saveData() {

        $.ajax({
            url: "/BRVisu/TPVersion.txt",
            type: "get",
            async: false,
            success: function (TPVersion) {

                var host = brease.config.visuId,
                    localString = localStorage.breaseMonitor,
                    data = {};

                try {
                    data = JSON.parse(localString);
                } catch (e) {
                    console.log(e);
                }

                if (data[host] === undefined) {
                    data[host] = {};
                }
                var item = {
                    timing: monitor.timing,
                    events: monitor.events,
                    visuId: brease.config.visuId,
                    debug: brease.config.debug,
                    watchdog: brease.config.watchdog,
                    clientId: brease.getClientId(),
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    cookieEnabled: navigator.cookieEnabled,
                    mappView: TPVersion
                };

                item.date = monitor.startdate;
                data[host][item.date] = item;

                try {
                    localStorage.setItem('breaseMonitor', JSON.stringify(data));
                } catch (e) {
                    if (isQuotaExceeded(e)) {
                        window.alert('Quota exceeded! Local Storage not working! Save data as JSON File'); //data wasn't successfully saved due to quota exceed so throw an error
                        var dataSave = JSON.stringify(data);
                        var blob = new Blob([dataSave], { type: "application/json" });
                        saveAs(blob, new Date() + "data.json"); // method in assets/performance/FileSaver.js
                    }

                }
            }
        });


    }

    function _unloadHandler() {
        _saveData();
    }

    function isQuotaExceeded(e) {
        var quotaExceeded = false;
        if (e) {
            if (e.code) {
                switch (e.code) {
                    case 22:
                        quotaExceeded = true;
                        break;
                    case 1014:
                        // Firefox
                        if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            quotaExceeded = true;
                        }
                        break;
                }
            } else if (e.number === -2147024882) {
                // Internet Explorer 8
                quotaExceeded = true;
            }
        }
        return quotaExceeded;
    }

    window.performanceMonitor = monitor.init();

})();
