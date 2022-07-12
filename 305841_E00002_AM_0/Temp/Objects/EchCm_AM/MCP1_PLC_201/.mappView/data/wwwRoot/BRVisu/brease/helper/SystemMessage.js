define(['brease/controller/PopUpManager'], 
    function (popupManager) {

        'use strict';

        var SystemMessage = {

                deferMessage: function (message, delay) {
                    _timeout = window.setTimeout(function () {
                        SystemMessage.showMessage(message);
                    }, delay);
                },

                showMessage: function (message) {
                    if (_timeout) {
                        window.clearTimeout(_timeout);
                        _timeout = undefined;
                    }
                    _showMessage(message);
                },

                clear: function () {
                    if (_timeout) {
                        window.clearTimeout(_timeout);
                        _timeout = undefined;
                    }
                    _hideMessage();
                }
            },
            _timeout, _messageBox, _contentBox;

        function _hideMessage() {
            if (_messageBox && _messageBox.length > 0) {
                _messageBox.hide().off();
            }
        }

        function _showMessage(message) {
            _messageBox = _messageBox || $('#systemMessageBox');

            if (_messageBox.length === 0) {
                _messageBox = $('<div id="systemMessageBox" style="z-index:1;position:fixed; padding:0px;margin:0px; background-color:rgba(0,0,0,0.18); top:0; left:0;width:100%;height:100%;"><div style="position:absolute; padding:20px; width:400px; margin-left:-220px;color:red; background-color:white;font-size:20px;left:50%;top:50%;text-align:center;white-space:pre-wrap;"></div></div>').appendTo(document.body);
                _contentBox = _messageBox.find('div');
            }

            _contentBox.text(message);
            _messageBox.css('z-index', popupManager.getHighestZindex() + 1).show().on('click vclick mousedown mouseup pointerup pointerdown', function (e) {
                e.stopImmediatePropagation();
                e.preventDefault();
            });
        }

        return SystemMessage;

    });
