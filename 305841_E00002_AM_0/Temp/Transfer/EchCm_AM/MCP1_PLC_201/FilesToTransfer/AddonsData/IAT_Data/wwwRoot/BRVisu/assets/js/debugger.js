var _debugger = {
    config: {
        width: 480,
        position: 'right'
    },
    createElem: function (name, arAttr, textContent) {
        var elem = document.createElement(name);
        for (var i = 0; i < arAttr.length; i += 1) {
            elem.setAttribute(arAttr[i].name, arAttr[i].value);
        }
        if (textContent) {
            elem.textContent = '' + textContent;
        }
        return elem;
    },
    init: function () {
        var btns = _debugger.createElem('div', [{ name: 'id', value: 'logger_buttons' }, { name: 'style', value: 'z-index:102;position:fixed;bottom:0;' + _debugger.config.position + ':0;' }]);

        var btnReload = _debugger.createElem('button', [], 'reload');
        btnReload.addEventListener('click', function (e) { document.location.reload(); });
        btns.appendChild(btnReload);

        var btnClear = _debugger.createElem('button', [], 'clear');
        btnClear.addEventListener('click', function (e) { _debugger.clear(); });
        btns.appendChild(btnClear);

        var btnUp = _debugger.createElem('button', [], 'up');
        btnUp.addEventListener('click', function (e) { _debugger.scrollTo(0, 0); });
        btns.appendChild(btnUp);

        var btnDown = _debugger.createElem('button', [], 'down');
        btnDown.addEventListener('click', function (e) { _debugger.scrollTo(0, 100000); });
        btns.appendChild(btnDown);

        document.body.appendChild(btns);

        _debugger.ausgabe = _debugger.createElem('div', [{ name: 'id', value: 'logger_ausgabe' }, { name: 'style', value: 'z-index:101;overflow-y:scroll;overflow-x:hidden;display:block; width:' + _debugger.config.width + 'px; height:100%; position:fixed;top:0;' + _debugger.config.position + ':0;background-color:rgba(255,255,255,0.8);pointer-events:none;' }]);

        document.body.appendChild(_debugger.ausgabe);

        _debugger.log(navigator.userAgent);
        window.onerror = function (e) { _debugger.log(e.toString()); }

        return this;
    },
    clear: function () {
        _debugger.ausgabe.innerHTML = '';
    },
    log: function (m, color) {
        var p = _debugger.createElem('p', [{ name: 'style', value: 'font-size:11px;color:' + ((color) ? color : 'black') + ';padding:0;margin:2px 0 0 0;' }], m);
        _debugger.ausgabe.appendChild(p);
        _debugger.scrollTo(0, 100000);
    },
    scrollTo: function (x, y) {
        if (typeof _debugger.ausgabe.scrollTo === 'function') {
            _debugger.ausgabe.scrollTo(x, y);
        }
    },
    monitorEvents: function (target, arEv) {
        target = target || document;
        arEv = arEv || [];
        if (Array.isArray(arEv)) {
            for (var i = 0; i < arEv.length; i += 1) {
                target.addEventListener(arEv[i], function (e) {
                    _debugger.log(e.type, (('' + e.type).indexOf('cancel') !== -1) ? '#cc0000' : '#0000BB');
                });
            }
        }
    }
};
window._debugger = _debugger.init();
window._debugger.monitorEvents(document, ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'mousecancel', 'click', 'touchstart', 'touchend', 'touchcancel']);