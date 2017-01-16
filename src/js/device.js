let ua = window.navigator.userAgent.toLowerCase();

let platform = {
    isRetina: function() {
        let mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5),\
                              (min--moz-device-pixel-ratio: 1.5),\
                              (-o-min-device-pixel-ratio: 3/2),\
                              (min-resolution: 1.5dppx)';
        if (window.devicePixelRatio > 1) return true;
        if (window.matchMedia && window.matchMedia(mediaQuery).matches) return true;
        return false;
    }(),
    isAndroid412: ua.match(/android 4\.1\.2/i) !== null,
    isDuos: ua.match(/gt\-s7562/i) !== null,
    isI9300: ua.match(/gt\-i9300/i) !== null,
    isI9500: ua.match(/gt\-i9500/i) !== null,
    hasTouch: ('ontouchstart' in window),
    isiPod: ua.match(/ipod/i) !== null,
    isiPad: ua.match(/ipad/i) !== null,
    isiPhone: ua.match(/iphone/i) !== null,
    isAndroid: ua.match(/android/i) !== null,
    isBustedAndroid: ua.match(/android 2\.[12]/) !== null,
    //isIE: window.navigator.appName.indexOf("Microsoft") != -1,
    isIE8: ua.match(/msie 8/) !== null,
    isIE9: ua.match(/msie 9/) !== null,
    isIE10: ua.match(/msie 10/) !== null,
    isIE11: !(window.ActiveXObject) && "ActiveXObject" in window,
   
    isEdge: /edge\/\d./i.test(ua),
    isIE: /(msie|trident)/i.test(ua),
    
    isChrome: ua.match(/Chrome/gi) !== null,
    isFirefox: ua.match(/firefox/gi) !== null,
    isSafari: ua.indexOf('safari') != -1 && ua.indexOf('chrome') == -1,
    isWebkit: ua.match(/webkit/gi) !== null,
    isGecko: ua.match(/gecko/gi) !== null,
    isOpera: ua.match(/opera/gi) !== null,
    isMac: ua.match('mac') !== null,
    isIOS8: ua.match(/(iphone|ipod|ipad).* os 8_/) !== null,
    isWin7: window.navigator.userAgent.indexOf("Windows NT 6.1") !== -1,
    isS4: ua.match(/gt\-i9500/i) !== null,
    isS5: ua.match(/sm\-g900/i) !== null,
    isS6: ua.match(/sm\-g9250/i) !== null,
    isS7: ua.match(/sm\-g9300/i) !== null,
    supportsSvg: !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
};
platform.isAndroidNative = window.navigator.userAgent.toLowerCase().indexOf('samsung') > -1;
platform.isMobile = platform.isiPhone || platform.isAndroid;
platform.isTablet = platform.isiPad;
platform.isDesktop = !platform.isMobile && !platform.isTablet;
platform.isWin = navigator.platform.indexOf('Win') > -1;

let defaultEvent = (platform.isMobile || platform.isTablet) ? {
    tap: "click",
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
    hover: "touchstart",
    out: "touchend"
} : {
    tap: "click",
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
    hover: "mouseenter",
    out: "mouseleave"
};

export { platform, defaultEvent }