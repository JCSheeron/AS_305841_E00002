define(function () {

    'use strict';

    var TrackView = function (props, parent, self) {
        if (self === undefined) {
            this.create(props, parent);
            this.render(props);
            return this;
        } else {
            self.render(props);
            return self;
        }
    };

    var p = TrackView.prototype;

    p.create = function (props, parent) {
        if (props.additionalId !== undefined) {
            this.id = parent[0].id + '_TrackView_' + props.additionalId;
        } else {
            this.id = parent[0].id + '_TrackView';
        }

        this.el = $('<div id="' + this.id + '"></div>');
        this.el[0].classList.add('TrackView');

        if (props.additionalClass !== '' || props.additionalClass !== undefined) {
            this.el[0].classList.add(props.additionalClass);
            if (props.arrowClasses !== undefined) {
                if (props.additionalClass === 'TrackYView') {
                    if (props.arrowClasses[0] === 'top' || props.arrowClasses[1] === 'bottom') {
                        this.arrowTop = $("<div class='arrow top'></div>");
                        this.arrowBottom = $("<div class='arrow bottom'></div>");
                    }
                }
                if (props.additionalClass === 'TrackXView') {
                    if (props.arrowClasses[0] === 'left' || props.arrowClasses[1] === 'right') {
                        this.arrowLeft = $("<div class='arrow left'></div>");
                        this.arrowRight = $("<div class='arrow right'></div>");
                    }
                }
            }
        }
        parent[0].appendChild(this.el[0]);

    };

    p.render = function render(props) {
        this.el[0].style.height = props.height + 'px';
        this.el[0].style.left = props.left + 'px';
        this.el[0].style.top = props.top + 'px';
        this.el[0].style.width = props.width + 'px';
        if ((props.arrowClasses !== undefined) && props.additionalClass === 'TrackXView') {
            this.el.append(this.arrowLeft);
            this.el.append(this.arrowRight);
            if (props.arrowClasses[0] === 'left') {
                this.arrowLeft.css({ 'margin-left': (props.width) - 18, 'margin-top': -18 + props.height / 2 });
            }
            if (props.arrowClasses[1] === 'right') {
                this.arrowRight.css({ 'margin-left': 0, 'margin-top': -18 + props.height / 2 });
            }
        }
        if ((props.arrowClasses !== undefined) && props.additionalClass === 'TrackYView') {
            this.el.append(this.arrowTop);
            this.el.append(this.arrowBottom);
            if (props.arrowClasses[0] === 'top') {
                this.arrowTop.css({ 'margin-top': props.height - 18, 'margin-left': -18 + props.width / 2 });
            }
            if (props.arrowClasses[1] === 'bottom') {
                this.arrowBottom.css({ 'margin-top': 0, 'margin-left': -18 + props.width / 2 });
            }
        }

    };

    p.dispose = function dispose() {

    };

    return TrackView;

});
