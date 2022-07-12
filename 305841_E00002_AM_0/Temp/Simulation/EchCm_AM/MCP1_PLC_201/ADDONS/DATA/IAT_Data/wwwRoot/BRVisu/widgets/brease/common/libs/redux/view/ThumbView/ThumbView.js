define([
    'brease/events/BreaseEvent'
], function (BreaseEvent) {

    'use strict';

    var ThumbView = function (props, parent, self) {
        if (self === undefined) {
            this.create(props, parent);
            this.render(props);
            return this;
        } else {
            self.render(props);
            return self;
        }
    };

    var p = ThumbView.prototype;

    p.create = function render(props, parent) {
        if (props.additionalId !== undefined) {
            this.id = parent[0].id + '_Thumb_' + props.additionalId;
        } else {
            this.id = parent[0].id + '_Thumb';
        }

        this.el = $('<div id="' + this.id + '"></div>');
        if (props.additionalClass !== undefined) {
            this.el[0].classList.add(props.additionalClass);
        }
        this.el[0].classList.add('ThumbView');
        this.el.append('<img/>');

        parent[0].appendChild(this.el[0]);
    };

    p.render = function (props) {

        if (props.thumbImage !== undefined && props.thumbImage !== '') {
            this.el[0].querySelector('img').src = props.thumbImage;
            this.el[0].querySelector('img').style.display = 'block';
        } else {
            this.el[0].querySelector('img').style.display = 'none';
        }
        this.el[0].style.left = props.left + 'px';
        this.el[0].style.top = props.top + 'px';
        this.el[0].style.height = props.thumbSize + 'px';
        this.el[0].style.width = props.thumbSize + 'px';

        if (props.selected !== undefined && props.selected) {
            this.el[0].style.zIndex = 5;
        } else {
            this.el[0].style.zIndex = 0;
        }
        this.dragBehavior(props);
    };

    p.dragBehavior = function (props) {
        if (brease.config.editMode || !props.enabled) { return; }

        this.mouseMove = props.onMouseMove;
        this.mouseUp = props.onMouseUp;
        this.mouseDown = props.onMouseDown;

        if (props.selected) {
            $(document.body).on(BreaseEvent.MOUSE_MOVE, props.onMouseMove);
            $(document).on(BreaseEvent.MOUSE_UP, props.onMouseUp);
            $(window).on('blur', props.onMouseUp);
        } else {
            this.el.on(BreaseEvent.MOUSE_DOWN, props.onMouseDown);
        }
    };

    p.dispose = function dispose() {
        $(document.body).off(BreaseEvent.MOUSE_MOVE, this.mouseMove);
        $(document).off(BreaseEvent.MOUSE_UP, this.mouseUp);
        this.el.off(BreaseEvent.MOUSE_DOWN, this.mouseDown);
        $(window).off('blur', this.onMouseUp);
    };

    return ThumbView;

});
