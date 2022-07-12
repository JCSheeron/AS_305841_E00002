define(['ace/ext/searchbox'],
    function (SearchBox) {

        'use strict';

        var Commands = {};

        /*
         * List of valid commands
         */
        Commands.commandList = [
            'vCopy',
            'vPaste',
            'vCut',
            'insertCharacter',
            'removeline',
            'copylinesdown',
            'copylinesup',
            'movelinesdown',
            'movelinesup',
            'removetolineend',
            'removetolinestart',
            'removewordleft',
            'removewordright',
            'selectall',
            'selectleft',
            'selectright',
            'selectwordleft',
            'selectwordright',
            'selecttolineend',
            'selecttolinestart',
            'selectup',
            'selectdown',
            'selectup',
            'selectpageup',
            'selectpagedown',
            'duplicateSelection',
            'gotoleft',
            'gotoright',
            'gotowordleft',
            'gotowordright',
            'golineup',
            'golinedown',
            'golineup',
            'gotolinestart',
            'gotolineend',
            'gotopageup',
            'gotopagedown',
            'gotostart',
            'gotoend',
            'scrolldown',
            'scrollup',
            'jumptomatching',
            'find',
            'replace',
            'findnext',
            'findprevious',
            'indent',
            'outdent',
            'undo',
            'redo',
            'tolowercase',
            'touppercase',
            'overwrite',
            'del',
            'backspace'
        ];

        /*
         * Add extended commands
         * @param textEditor instance of the TextEditor
         */
        Commands.addCommands = function (textEditor) {
            //backspace command
            textEditor.editor.commands.addCommand({
                name: 'backspace',
                bindKey: bindKey(
                    'Shift-Backspace|Backspace',
                    'Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H'
                ),
                exec: function (editor) {
                    if (editor.searchBox !== undefined) {
                        if (editor.searchBox.active && editor.searchBox.isFocused()) {
                            var selectionStart = editor.searchBox.activeInput.selectionStart,
                                selectionEnd = editor.searchBox.activeInput.selectionEnd,
                                elementsToDelete = selectionEnd - selectionStart + 1;
                            if (selectionStart > 0) {
                                var temporalArray = editor.searchBox.activeInput.value.split('');
                                temporalArray.splice(selectionStart - 1, elementsToDelete);
                                editor.searchBox.activeInput.value = temporalArray.join('');
                                editor.searchBox.activeInput.setSelectionRange(selectionStart - 1, selectionStart - 1);
                            }
                        } else {
                            editor.remove('left');
                        }
                    } else {
                        editor.remove('left');
                    }
                },
                multiSelectAction: 'forEach',
                scrollIntoView: 'cursor'
            });
            //delete command
            textEditor.editor.commands.addCommand({
                name: 'del',
                bindKey: bindKey('Delete', 'Delete|Ctrl-D|Shift-Delete'),
                exec: function (editor) {
                    if (editor.searchBox !== undefined) {
                        if (editor.searchBox.active && editor.searchBox.isFocused()) {
                            var selectionStart = editor.searchBox.activeInput.selectionStart,
                                selectionEnd = editor.searchBox.activeInput.selectionEnd,
                                elementsToDelete = selectionEnd - selectionStart;
                            elementsToDelete = elementsToDelete === 0 ? 1 : elementsToDelete;
                            if (selectionStart < editor.searchBox.activeInput.value.length) {
                                var temporalArray = editor.searchBox.activeInput.value.split('');
                                temporalArray.splice(selectionStart, elementsToDelete);
                                editor.searchBox.activeInput.value = temporalArray.join('');
                                editor.searchBox.activeInput.setSelectionRange(selectionStart, selectionStart);
                            }
                        } else {
                            editor.remove('right');
                        }
                    } else {
                        editor.remove('right');
                    }
                },
                multiSelectAction: 'forEach',
                scrollIntoView: 'cursor'
            });
            //Find command
            textEditor.editor.commands.addCommand({
                name: 'find',
                bindKey: bindKey('Ctrl-F', 'Command-F'),
                exec: function (editor) {
                    SearchBox.Search(editor);
                    textEditor.addListenersSearchBox.apply(textEditor);
                },
                readOnly: true
            });
            //Replace command
            textEditor.editor.commands.addCommand({
                name: 'replace',
                bindKey: bindKey('Ctrl-H', 'Command-Option-F'),
                exec: function (editor) {
                    SearchBox.Search(editor, true);
                    textEditor.addListenersSearchBox.apply(textEditor);
                }
            });
            //Copy command
            textEditor.editor.commands.addCommand({
                name: 'vCopy',
                exec: function (editor) {
                    document.execCommand('copy');
                    textEditor.setClipboardText(editor.getCopyText());
                }
            });
            //Paste command
            textEditor.editor.commands.addCommand({
                name: 'vPaste',
                scrollIntoView: 'cursor',
                exec: function (editor) {
                    editor.insert(textEditor.getClipboardText());
                }
            });
            //Cut command
            textEditor.editor.commands.addCommand({
                name: 'vCut',
                exec: function (editor) {
                    textEditor.setClipboardText(editor.getCopyText());
                    document.execCommand('cut');
                }
            });
            //Insert character
            textEditor.editor.commands.addCommand({
                name: 'insertCharacter',
                exec: function (editor, args) {
                    document.execCommand('insertText', false, args[0]);
                    editor.renderer.scrollCursorIntoView();
                }
            });
            //Move cursor to the left
            textEditor.editor.commands.addCommand({
                name: 'gotoleft',
                bindKey: bindKey('Left', 'Left|Ctrl-B'),
                exec: function (editor, args) {
                    if (editor.searchBox !== undefined) {
                        if (editor.searchBox.active && editor.searchBox.isFocused()) {
                            var newCursorPos = Math.max(0, editor.searchBox.activeInput.selectionStart - 1);
                            editor.searchBox.activeInput.setSelectionRange(newCursorPos, newCursorPos);
                        } else {
                            editor.navigateLeft(args.times);
                        }
                    } else {
                        editor.navigateLeft(args.times);
                    }
                },
                multiSelectAction: 'forEach',
                scrollIntoView: 'cursor',
                readOnly: true
            });
            //Move cursor to the right
            textEditor.editor.commands.addCommand({
                name: 'gotoright',
                bindKey: bindKey('Right', 'Right|Ctrl-F'),
                exec: function (editor, args) {
                    if (editor.searchBox !== undefined) {
                        if (editor.searchBox.active && editor.searchBox.isFocused()) {
                            var newCursorPos = editor.searchBox.activeInput.selectionStart + 1;
                            editor.searchBox.activeInput.setSelectionRange(newCursorPos, newCursorPos);
                        } else {
                            editor.navigateRight(args.times);
                        }
                    } else {
                        editor.navigateRight(args.times);
                    }
                },
                multiSelectAction: 'forEach',
                scrollIntoView: 'cursor',
                readOnly: true
            });
            //Move cursor to start
            textEditor.editor.commands.addCommand({
                name: 'gotolinestart',
                bindKey: bindKey('Alt-Left|Home', 'Command-Left|Home|Ctrl-A'),
                exec: function (editor) {
                    if (editor.searchBox !== undefined) {
                        if (editor.searchBox.active && editor.searchBox.isFocused()) {
                            editor.searchBox.activeInput.setSelectionRange(0, 0);
                        } else {
                            editor.navigateLineStart();
                        }
                    } else {
                        editor.navigateLineStart();
                    }
                },
                multiSelectAction: 'forEach',
                scrollIntoView: 'cursor',
                readOnly: true
            });
            //Move cursor to end
            textEditor.editor.commands.addCommand({
                name: 'gotolineend',
                bindKey: bindKey('Alt-Right|End', 'Command-Right|End|Ctrl-E'),
                exec: function (editor) {
                    if (editor.searchBox !== undefined) {
                        if (editor.searchBox.active && editor.searchBox.isFocused()) {
                            var newCursorPos = editor.searchBox.activeInput.value.length + 1;
                            editor.searchBox.activeInput.setSelectionRange(newCursorPos, newCursorPos);
                        } else {
                            editor.navigateLineEnd();
                        }
                    } else {
                        editor.navigateLineEnd();
                    }
                },
                multiSelectAction: 'forEach',
                scrollIntoView: 'cursor',
                readOnly: true
            });
            //Insert
            textEditor.editor.commands.addCommand({
                name: 'overwrite',
                bindKey: 'Insert',
                exec: function (editor) {
                    if (editor.searchBox !== undefined) {
                        if (editor.searchBox.active && editor.searchBox.isFocused()) {
                            return;
                        }
                    }
                    editor.toggleOverwrite();
                },
                readOnly: true
            });
        };

        /*
         * Checks if the command is valid
         * @param command 
         * @return {Boolean} result of the comprobation
         */
        Commands.isValidCommand = function (command) {
            if (command === undefined || command === '') { return false; }
            return (this.commandList.indexOf(command) > -1);
        };

        function bindKey(win, mac) {
            return { win: win, mac: mac };
        }

        return Commands;

    });
