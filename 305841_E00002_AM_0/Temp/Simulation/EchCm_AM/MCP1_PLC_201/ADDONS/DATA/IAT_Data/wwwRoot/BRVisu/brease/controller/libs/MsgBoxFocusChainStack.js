define([], function () {

    'use strict';

    /**
     * The MsgBoxFocusChainStack stores all focusable elments of all open MessageBoxes.
     * When a MsgBox is opened, it is pushed onto the stack and receives focus.
     * Pop removes the topmost MsgBox elements from the stack and sets the focus to the new topmost MsgBox.
     * If there is no more MsgBox the focus will be returned to body.
     * Methods resetFocus, focusNext, focusPrevious, focus can be used to move the focus in the topmost MsgBox. 
     */
    var MsgBoxFocusChainStack = function () {
        this.stack = [];
        this.position = undefined;
    };

    /**
     * @returns true if there are no pushed elements
     */
    MsgBoxFocusChainStack.prototype.isEmpty = function () {
        return this.stack.length === 0;
    };

    /**
     * Push MessageBox focusable elements to the stack and focus first of them.
     * @param {Array} msgBoxElems Array of HTML Nodes with tabindex>=0.
     */
    MsgBoxFocusChainStack.prototype.push = function (msgBoxElems) {
        this.stack.push(msgBoxElems);
        this.resetFocus();
    };

    /**
     * Pop top of stack.
     */
    MsgBoxFocusChainStack.prototype.pop = function () {
        this.stack.pop();
        if (!this.isEmpty()) {
            this.resetFocus();
        } else {
            document.activeElement.blur();
        }
    };

    /**
     * @returns return the top MessageBox elements of stack 
     */
    MsgBoxFocusChainStack.prototype.peek = function () {
        return this.stack[this.stack.length - 1];
    };
    
    /**
     * Reset focus to first element of currently focusable elements.
     */
    MsgBoxFocusChainStack.prototype.resetFocus = function () {
        var chain = this.peek();
        chain[0].focus();
        this.position = 0;
    };

    /**
     * Set focus on next focusable in chain. 
     */
    MsgBoxFocusChainStack.prototype.focusNext = function () {
        this.position++;
        var chain = this.peek();
        if (this.position >= chain.length) {
            this.position = 0;
        }
        chain[this.position].focus();
    };

    /**
     * Set focus on previous focusable in chain.
     */
    MsgBoxFocusChainStack.prototype.focusPrevious = function () {
        this.position--;
        var chain = this.peek();
        if (this.position < 0) {
            this.position = chain.length - 1;
        }
        chain[this.position].focus();
    };

    /**
     * Manually set to focus to a element in the focus chain.
     * This function should always be called if any element gets the focus (document.focusin) to keep the MsgBoxFocusChainStack
     * synchronised.
     * @param {Node} elem Focus target HTML node.
     */
    MsgBoxFocusChainStack.prototype.focus = function (elem) {
        var chain = this.peek();
        this.position = chain.findIndex(function (chainElem) {
            return elem.isSameNode(chainElem);
        });
    };

    return MsgBoxFocusChainStack;
});
