define([
    'brease/enum/Enum'
], function (Enum) {

    'use strict';

    var ValueDisplayView = function (props, parent, self) {
        if (self === undefined) {
            this.create(props, parent);
            this.render(props);
            return this;
        } else {
            self.render(props);
            return self;
        }
    };

    var p = ValueDisplayView.prototype;

    p.create = function (props, parent) {
        this.el = $('<output></output>');
        this.el[0].classList.add('ValueDisplayView');
        this.addElements(props);
        parent[0].appendChild(this.el[0]);
    };

    p.render = function render(props) {

        this.zIndex(props);

        this.visible(props);

        this.showUnit(props);

        this.orientation(props);

        this.ellipsis(props);

        this.position(props);

        this.updateElements(props);

    };

    p.position = function (props) {

        if (props.ellipsis === true || props.ellipsis === undefined) {
            this.el[0].style.width = props.width + 'px';
        } else {
            this.el[0].style.width = 'auto';
        }

        if (props.left !== undefined) {
            this.el[0].style.left = props.left + 'px';
            this.el[0].style.right = 'initial';
        }

        if (props.right !== undefined) {
            this.el[0].style.right = props.right + 'px';
            this.el[0].style.left = 'initial';
        }

        this.el[0].style.height = props.height + 'px';
        this.el[0].style.top = props.top + 'px';
    };

    p.ellipsis = function (props) {
        if (props.ellipsis === true) {
            this.el[0].classList.add('ellipsis');
        } else {
            this.el[0].classList.remove('ellipsis');
        }
    };

    p.zIndex = function (props) {
        if (props.selected !== undefined && props.selected) {
            this.el[0].style.zIndex = 5;
        } else {
            this.el[0].style.zIndex = 0;
        }
    };

    p.visible = function (props) {
        if (props.visible === true) {
            this.el[0].classList.remove('remove');
        } else {
            this.el[0].classList.add('remove');
        }
    };

    p.orientation = function (props) {
        if (props.orientation === Enum.Orientation.LTR || props.orientation === Enum.Orientation.RTL) {
            this.el[0].classList.add('horizontal');
        } else if (props.orientation === Enum.Orientation.BTT || props.orientation === Enum.Orientation.TTB) {
            this.el[0].classList.add('vertical');
        }
    };

    p.addElements = function addElements(props) {
        this.outputValEl = $('<span/>').attr('class', 'valueOutput').text(props.value);
        this.outputUnitEl = $('<span/>').attr('class', 'unitOutput').text(props.unitSymbol);
        this.outputArrowEl = $('<span/>').attr('class', 'arrowOutput');

        this.el.append([this.outputValEl, this.outputUnitEl, this.outputArrowEl]);
    };

    p.showUnit = function (props) {
        if (props.showUnit === true) {
            this.outputUnitEl[0].classList.remove('remove');
        } else {
            this.outputUnitEl[0].classList.add('remove');
        }
    };

    p.updateElements = function (props) {
        this.outputValEl.text(props.value);
        this.outputUnitEl.text(props.unitSymbol);
    };

    p.dispose = function dispose() {
        this.el[0].classList.remove('horizontal', 'vertical');
    };

    return ValueDisplayView;

});
