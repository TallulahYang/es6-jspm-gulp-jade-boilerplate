import platform from './device';

export default (function($) {
    $.fn.reveal = function(options) {
        var options = $.extend({
                default_offset_pct: 0.5,
                orientation: "horizontal" // vertical has bugs and will fixed if available
            },
            options);

        var pointerEventToXY = function(e) {
            var out = { x: 0, y: 0 };
            if (e.touches && e.touches[0]) e = e.touches[0];
            else if (e.changedTouches && e.changedTouches[0]) e = e.changedTouches[0];
            out.x = e.pageX;
            out.y = e.pageY;
            return out;
        };

        var browserPrefixes = ['moz', 'ms', 'o', 'webkit'],
            isVisible = true;
        var wraper = $('body');

        initEvent();

        function initEvent() {
            $(window).mouseup(function(){
                wraper.off("touchmove mousemove");
                wraper.off("touchend mouseup");
            });
            // get the correct attribute name
            function getHiddenPropertyName(prefix) {
                return (prefix ? prefix + 'Hidden' : 'hidden');
            }

            // get the correct event name
            function getVisibilityEvent(prefix) {
                return (prefix ? prefix : '') + 'visibilitychange';
            }

            // get current browser vendor prefix
            function getBrowserPrefix() {
                for (var i = 0; i < browserPrefixes.length; i++) {
                    if(getHiddenPropertyName(browserPrefixes[i]) in document) {
                        // return vendor prefix
                        return browserPrefixes[i];
                    }
                }
                // no vendor prefix needed
                return null;
            }

            // bind and handle events
            var browserPrefix = getBrowserPrefix(),
                hiddenPropertyName = getHiddenPropertyName(browserPrefix),
                visibilityEventName = getVisibilityEvent(browserPrefix);

            function onVisible() {
                // prevent double execution
                if(isVisible) {
                    return;
                }
                // change flag value
                isVisible = true;
                wraper.off("touchmove mousemove");
                wraper.off("touchend mouseup");
                console.log('visible');
            }

            function onHidden() {
                // prevent double execution
                if(!isVisible) {
                    return;
                }
                // change flag value
                isVisible = false;
                console.log('hidden');
            }

            function handleVisibilityChange(forcedFlag) {
                // forcedFlag is a boolean when this event handler is triggered by a
                // focus or blur eventotherwise it's an Event object
                if(typeof forcedFlag === "boolean") {
                    if(forcedFlag) {
                        return onVisible();
                    }
                    return onHidden();
                }
                if(document[hiddenPropertyName]) {
                    return onHidden();
                }
                return onVisible();
            }
            document.addEventListener(visibilityEventName, handleVisibilityChange, false);

            // extra event listeners for better behaviour
            document.addEventListener('focus', function() {
                handleVisibilityChange(true);
            }, false);

            document.addEventListener('blur', function() {
                handleVisibilityChange(false);
            }, false);

            window.addEventListener('focus', function() {
                handleVisibilityChange(true);
            }, false);

            window.addEventListener('blur', function() {
                handleVisibilityChange(false);
            }, false);
        }


        return this.each(function() {
            var sliderPct = options.default_offset_pct;
            var sliderParent = $(this);
            var container = $(this).find('.slide');
            var sliderOrientation = options.orientation;
            var beforeDirection = (sliderOrientation === "vertical") ? "down" : "left";
            var afterDirection = (sliderOrientation === "vertical") ? "up" : "right";
            container.wrap("<div class='reveal-wrapper reveal-" + sliderOrientation + "'></div>");
            container.append("<div class='reveal-overlay'></div>");
            var beforeImg = container.find(".imgfirst");
            var afterImg = container.find(".imglast");
            var beforeImg_ = beforeImg.find('img');
            var afterImg_ = afterImg.find('img');
            container.append("<div class='reveal-handle'><div class='handle-hot'></div></div>");
            var slider = container.find(".reveal-handle");
            var slider_hot = container.find(".handle-hot");
            slider.append("<span class='reveal-" + beforeDirection + "-arrow'></span>");
            slider.append("<span class='reveal-" + afterDirection + "-arrow'></span>");
            container.addClass("reveal-container");
            beforeImg.addClass("reveal-before");
            afterImg.addClass("reveal-after");
            var overlay = container.find(".reveal-overlay"),
                paddingX = parseInt(beforeImg.css('padding-left')),
                paddingY = parseInt(beforeImg.css('padding-top'));

            var checkID, flag , checkFlag = false , ieAdjust = false;

            checkID = setInterval(check, 50);

            function check() {
                flag = beforeImg.find('img').length;

                if (!checkFlag && flag > 0 && beforeImg.height()) {
                    checkFlag = true;
                    beforeImg_ = beforeImg.find('img');
                    afterImg_ = afterImg.find('img');
                    clearInterval(checkID);

                    if(platform.isIE && !ieAdjust){
                        // console.log('----isIE-----')
                        ieAdjust = true;
                        setTimeout(function(){
                            adjustSlider(sliderPct);
                            beforeImg_.css('width','100.01%');
                            // setTimeout(function(){ 
                            //     beforeImg_.css('width','100%');
                            // },100);
                        },500);
                    }
                }
                adjustSlider(sliderPct);
            }

            var calcOffset = function(dimensionPct) {
                paddingX = parseInt(beforeImg.css('padding-left'));
                paddingY = parseInt(beforeImg.css('padding-top'));
                var w,h;
                if (checkFlag) {
                    w = beforeImg.width() + paddingX * 2;
                    h = beforeImg_.height() + paddingY *2 ;
                    if(platform.isIE) {
                        h= afterImg.height() + paddingY *2 ;
                        w = afterImg.width() + paddingX * 2;
                    }
                    // console.log('=============',w,h,afterImg.height())
                }else{
                    w = container.width() * 0.63;
                    h = w * 1230/801;
                }
                // console.log(w,h)
                return { w: w + "px", h: h + "px", cw: (dimensionPct * w) + "px", ch: (dimensionPct * h) + "px" };
            };
            var adjustContainer = function(offset) {

                if (sliderOrientation === "vertical") {
                    beforeImg.css("clip", "rect(0," + offset.w + "," + ( parseInt(offset.ch) + 2)  + "px ,0)");
                } else {
                    beforeImg.css("clip", "rect(0," + ( parseInt(offset.cw) + 2) + "px ," + offset.h + ",0)");
                }
                container.css("height", offset.h);
                sliderParent.css("height", offset.h);
                slider_hot.css("height", ( parseInt ( offset.h ) + 200)  +'px' );
                slider_hot.css("top", - ( parseInt ( offset.h ) + 200) / 2 + 'px');
            };
            var adjustSlider = function(pct) {
                imgWidth = beforeImg.width() + paddingX * 2;
                imgHeight = beforeImg.height() + paddingX * 2;

                leftRatio = ( paddingX - 3 ) / imgWidth;
                rightRatio = 1 - leftRatio;

                if (pct < leftRatio) { pct = leftRatio }
                if (pct > rightRatio) { pct = rightRatio }

                var offset = calcOffset(pct);
                slider.css((sliderOrientation === "vertical") ? "top" : "left", (sliderOrientation === "vertical") ? offset.ch : offset.cw);

                adjustContainer(offset);
            };

            $(window).on("resize.reveal", function(e) {
                adjustSlider(sliderPct);
            });
            var offsetX = 0,
                offsetY = 0,
                sliderMouseOffsetX = 0,
                sliderMouseOffsetY = 0;
            var imgWidth = 0,
                imgHeight = 0;

            var lastX = 0,
                startX = 0,
                lastY = 0,
                startY = 0,
                leftRatio, rightRatio;

            slider.on("touchstart mousedown", function(e) {
                offsetX = container.offset().left;
                offsetY = container.offset().top;

                startX = pointerEventToXY(e).x - offsetX - slider.position().left;
                startY = pointerEventToXY(e).y - offsetY - slider.position().top;


                container.addClass("active");

                imgWidth = beforeImg.width() + paddingX * 2;
                imgHeight = beforeImg.height() + paddingX * 2;

                leftRatio = ( paddingX - 3 ) / imgWidth;
                rightRatio = 1 - leftRatio;

                wraper.addClass("active");

                wraper.on("touchmove mousemove", onTouchMove);
                wraper.on("touchend mouseup", onTouchEnd);

                function onTouchMove(e) {

                    if(!isVisible) return;

                    lastX = pointerEventToXY(e).x - offsetX;
                    lastY = pointerEventToXY(e).y - offsetY;

                    var diffX = lastX - startX,
                        diffY = lastY - startY;

                    sliderPct = (sliderOrientation === "vertical") ? diffY / imgHeight : diffX / imgWidth;

                    if (sliderPct < leftRatio) { sliderPct = leftRatio }
                    if (sliderPct > rightRatio) { sliderPct = rightRatio }

                    adjustSlider(sliderPct);

                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }

                function onTouchEnd(e) {
                    wraper.off("touchmove mousemove", onTouchMove);
                    wraper.off("touchend mouseup", onTouchEnd);
                    container.removeClass("active");
                    wraper.removeClass("active");
                }
            });
            container.find("img").on("mousedown", function(event) { event.preventDefault(); });
            $(window).trigger("resize.reveal");
        });
    };
})($);