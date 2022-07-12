define(function () {
    
    'use strict';

    /**
    * @class brease.controller.libs.PreCacheInfo
    * @extends Function
    */

    var PreCacheInfo = function (showProgressBar, finishCallback, contentsToPreloadLength, messageDelay) { 
            this.finishCallback = finishCallback;
            this.showProgressBar = showProgressBar;
            this.messageDelay = messageDelay;
            this.preloadingInfo = {};
            this.progressBar = {
                width: 100,
                step: 100 / (contentsToPreloadLength - 1)
            };
            setPreloadingInfoScreen.call(this, contentsToPreloadLength);
        },
        p = PreCacheInfo.prototype;

    p.updateCount = function (count, contentId) {

        var self = this;

        if (self.showProgressBar) {
            this.preloadingInfo.span.html(count);
            if (contentId !== undefined) {
                this.preloadingInfo.inner.html(contentId);
            }
            moveProgressBar.call(this);
        }

        if (count === 0) {
            delete self.rejectedContents;
            if (self.showProgressBar) {
                this.preloadingInfo.main.html('All contents have been precached');
                this.progressBar.$el.slideUp('slow');
            }
            // just a helper timer. The user should be able to see and recognize the info message, that everything is ready
            window.setTimeout(function () {
                if (self.showProgressBar) {
                    self.preloadingInfo.wrapper.remove();
                }
                self.finishCallback();
            }, this.messageDelay);
        }
    };

    function moveProgressBar() {
        this.progressBar.width -= this.progressBar.step;
        this.progressBar.$el.width(this.progressBar.width + '%');
    }

    function setPreloadingInfoScreen(contentsToPreloadLength) {

        var preloadingInfoClass = 'preLoadingInfo';

        if (this.showProgressBar) {
            var preloadingInfoWrapperEl = $('<div class="preLoadingInfoWrapper"></div>');
            this.preloadingInfo.main = $('<div class="' + preloadingInfoClass + '"><span>' + contentsToPreloadLength + '</span> contents to preload: <div style="display: inline-block" class="' + preloadingInfoClass + '_inner"></div></div>');
            preloadingInfoWrapperEl.append(this.preloadingInfo.main);

            this.preloadingInfo.span = $('span', this.preloadingInfo.main).eq(0);
            this.preloadingInfo.inner = $('.' + preloadingInfoClass + '_inner', this.preloadingInfo.main).eq(0);

            // add a progressbar
            this.preloadingInfo.wrapper = $('<div class="system_brease_StartupProgressBar_style_default startupProgressBarWrapper" style="z-index:3;"></div>');
            this.progressBar.$el = $('<div class="startupProgressBar"></div>');

            this.preloadingInfo.wrapper.prepend(preloadingInfoWrapperEl);
            this.preloadingInfo.wrapper.append(this.progressBar.$el);

            $(document.body).prepend(this.preloadingInfo.wrapper);
        }
    }

    return PreCacheInfo;
});
