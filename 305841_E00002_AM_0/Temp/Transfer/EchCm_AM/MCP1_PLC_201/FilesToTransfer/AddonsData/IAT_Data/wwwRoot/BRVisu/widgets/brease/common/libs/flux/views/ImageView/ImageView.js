define([
    'widgets/brease/common/libs/flux/stores/ImageStore/ImageTypes',
    'brease/enum/Enum'
], function (ImageTypes, Enum) {

    'use strict';

    var ImageView = function (store, dispatcher, parent) {
        this.dispatcher = dispatcher;
        this.store = store;
        this.store.registerView(this);
        this.parent = parent;
        this._createElements();
    };

    ImageView.prototype._createElements = function _createElements() {
        this.el = $('<div class="ImageView"></div>')
            .height(this.store.getHeight())
            .width(this.store.getWidth());

        this.imageElem = new Image();
        this.imageElem.draggable = false;
        $(this.imageElem).css('display', 'none');
        this.svgEl = $('<svg></svg>').css('display', 'none');
        this.spanHelper = $('<span class="ImageView helper"></span>').css('display', 'none');

        this.el.append(this.spanHelper)
            .append(this.imageElem)
            .append(this.svgEl);

        this.parent.append(this.el);
    };

    ImageView.prototype.update = function update() {
        var view = this;
        view.el.height(this.store.getHeight());
        view.el.width(this.store.getWidth());
        view.svgEl.css({ 'position': 'relative', 'bottom': 'auto', 'top': 'auto' });
        $(view.imageElem).css({ 'position': 'relative', 'bottom': 'auto', 'top': 'auto', 'left': 'auto', 'right': 'auto' });
        switch (view.store.getImageType()) {
            case ImageTypes.INVALID:
                $(view.imageElem).css('display', '');
                view.svgEl.css('display', 'none');
                view.spanHelper.css('display', 'none');
                view.imageElem.src = '';
                break;
            case ImageTypes.SVG:
                view.svgEl.css('display', '');
                $(view.imageElem).css('display', 'none');
                view.spanHelper.css('display', 'none');
                view.svgEl.replaceWith(view.store.getSvgInline());
                view.svgEl = view.store.getSvgInline();
                switch (view.store.getImageSizeMode()) {
                    case Enum.SizeMode.CONTAIN:
                        view.svgEl.eq(0)[0].setAttribute('preserveAspectRatio', _getAspectRatio(view.store.getBackgroundAlignment()));
                        view.svgEl.eq(0)[0].setAttribute('width', '100%');
                        view.svgEl.eq(0)[0].setAttribute('height', '100%');
                        break;
                    case Enum.SizeMode.COVER:
                        view.svgEl.eq(0)[0].setAttribute('preserveAspectRatio', 'xMinYMin');
                        var imageWidth = view.svgEl.eq(0)[0].getAttribute('viewBox').split(' ').map(function (value) { return parseInt(value); })[2],
                            imageHeight = view.svgEl.eq(0)[0].getAttribute('viewBox').split(' ').map(function (value) { return parseInt(value); })[3];
                        var alignment = view.store.getBackgroundAlignment();
                        if (view.el.height() / view.el.width() > imageHeight / imageWidth) {
                            view.svgEl.eq(0)[0].setAttribute('width', view.el.height() / imageHeight * imageWidth);
                            view.svgEl.eq(0)[0].setAttribute('height', view.el.height());
                        } else {
                            view.svgEl.eq(0)[0].setAttribute('width', view.el.width());
                            view.svgEl.eq(0)[0].setAttribute('height', view.el.width() / imageWidth * imageHeight);
                        }
                        _alignItemOnCoverHorizontally(alignment[0], view.svgEl, view.el, view.svgEl.eq(0)[0].getAttribute('width'));
                        _alignItemOnCoverVertically(alignment[1], view.svgEl, view.el, view.svgEl.eq(0)[0].getAttribute('height'));
                        break;
                    case Enum.SizeMode.FILL:
                        view.svgEl.eq(0)[0].setAttribute('preserveAspectRatio', 'none');
                        view.svgEl.eq(0)[0].setAttribute('width', '100%');
                        view.svgEl.eq(0)[0].setAttribute('height', '100%');
                        break;
                    default:
                        break;
                }
                break;
            case ImageTypes.OTHER:
                $(view.imageElem).css('display', '');
                view.svgEl.css('display', 'none');
                view.spanHelper.css('display', 'none');
                if ($(view.imageElem).attr('src') === view.store.getImagePath()) {
                    view._readjustImageSize();
                } else {
                    view.imageElem.onload = view._readjustImageSize.bind(view);
                    view.imageElem.src = view.store.getImagePath();
                }
                break;
        }
    };

    ImageView.prototype._readjustImageSize = function _readjustImageSize() {
        var view = this;
        switch (view.store.getImageSizeMode()) {
            case Enum.SizeMode.CONTAIN:
                view.spanHelper.css('display', '');
                var verticalAlign = view.store.getBackgroundAlignment()[1];
                verticalAlign = verticalAlign === 'center' ? 'middle' : verticalAlign;
                view.el.css('text-align', view.store.getBackgroundAlignment()[0]);
                view.spanHelper.css('vertical-align', verticalAlign);
                $(view.imageElem).css('vertical-align', verticalAlign);
                if (view.el.height() / view.el.width() >= view.imageElem.naturalHeight / view.imageElem.naturalWidth) {
                    $(view.imageElem).width('100%');
                    $(view.imageElem).height('auto');
                } else {
                    $(view.imageElem).width('100%'); //to force recalculation of width: issue in css
                    $(view.imageElem).width('auto');
                    $(view.imageElem).height('100%');
                }
                break;
            case Enum.SizeMode.COVER:
                var alignment = view.store.getBackgroundAlignment();
                if (view.el.height() / view.el.width() > view.imageElem.naturalHeight / view.imageElem.naturalWidth) {
                    $(view.imageElem).width('auto');
                    $(view.imageElem).height('100%');
                } else {
                    $(view.imageElem).width('100%');
                    $(view.imageElem).height('auto');
                }
                _alignItemOnCoverHorizontally(alignment[0], $(view.imageElem), view.el, $(view.imageElem).width());
                _alignItemOnCoverVertically(alignment[1], $(view.imageElem), view.el, $(view.imageElem).height());
                break;
            case Enum.SizeMode.FILL:
                $(view.imageElem).width('100%');
                $(view.imageElem).height('100%');
                break;
            default:
                break;
        }
    };

    function _getAspectRatio(alignment) {
        var XAlign,
            YAlign;

        switch (alignment[0]) {
            case 'left':
                XAlign = 'Min';
                break;
            case 'center':
                XAlign = 'Mid';
                break;
            case 'right':
                XAlign = 'Max';
                break;
            default:
                XAlign = 'Min';
        }

        switch (alignment[1]) {
            case 'top':
                YAlign = 'Min';
                break;
            case 'center':
                YAlign = 'Mid';
                break;
            case 'bottom':
                YAlign = 'Max';
                break;
            default:
                YAlign = 'Min';
        }

        return 'x' + XAlign + 'Y' + YAlign;

    }

    function _alignItemOnCoverVertically(alignment, element, parentElement, elementHeight) {
        switch (alignment) {
            case 'bottom':
                element.css({ 'position': 'absolute', 'bottom': '0px', 'top': 'auto' });
                break;
            case 'top':
                element.css({ 'position': 'absolute', 'top': '0px', 'bottom': 'auto' });
                break;
            case 'center':
                var offsetCenterImage = parentElement.height() / 2 - elementHeight / 2;
                element.css({ 'position': 'absolute', 'top': offsetCenterImage + 'px', 'bottom': 'auto' });
                break;
        }
    }

    function _alignItemOnCoverHorizontally(alignment, element, parentElement, elementWidth) {
        switch (alignment) {
            case 'left':
                element.css({ 'position': 'absolute', 'left': '0px', 'right': 'auto' });
                break;
            case 'right':
                element.css({ 'position': 'absolute', 'left': 'auto', 'right': '0px' });
                break;
            case 'center':
                var offsetCenterImage = parentElement.width() / 2 - elementWidth / 2;
                element.css({ 'position': 'absolute', 'left': offsetCenterImage + 'px', 'right': 'auto' });
                break;
        }
    }

    return ImageView;

});
