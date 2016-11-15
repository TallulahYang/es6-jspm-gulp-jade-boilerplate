var ua = window.navigator.userAgent.toLowerCase();
export default {
    hasTouch : ('ontouchstart' in window),
    isRetina : function() {
        let mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5),\
                          (min--moz-device-pixel-ratio: 1.5),\
                          (-o-min-device-pixel-ratio: 3/2),\
                          (min-resolution: 1.5dppx)';
        if (window.devicePixelRatio > 1) return true;
        if (window.matchMedia && window.matchMedia(mediaQuery).matches) return true;
        return false;
    }(),
    isIE9 : $("html").hasClass("lt-ie10"),
    isIE10 : navigator.userAgent.match(/MSIE\s([\d]+)/) !== null,
    isIE11 : navigator.userAgent.match(/rv\:11\.0/gi) !== null,
    isEdge : /Edge\/\d./i.test(navigator.userAgent),
    isIE : /(msie|trident)/i.test(navigator.userAgent),
    isFirefox : navigator.userAgent.match(/firefox/gi) !== null,
    isChrome : navigator.userAgent.match(/Chrome/gi) !== null,
    isSafari : /^((?!chrome).)*safari/i.test(navigator.userAgent),
    isS4 : ua.match(/gt\-i9500/i) !== null,
    isS5 : ua.match(/sm\-g900p/i) !== null,
    isS6 : ua.match(/sm\-g9250/i) !== null,
    isS7 : ua.match(/sm\-g9300/i) !== null,
    isiPad : ua.match(/ipad/i) !== null,
    isAndroid : ua.match(/android/i) !== null,
    isWin : ua.match(/windows/gi) !== null,
    isDesktop : !navigator.userAgent.match(/Android|ipad|webOS|iPhone|iPod|BlackBerry|IEMobile/i),
    iOS : parseFloat(
        ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1])
        .replace('undefined', '3_2').replace('_', '.').replace('_', '')
    ) || false,
    isAndroidNative : ua.toLowerCase().indexOf('samsung') > -1,
    isWin7 : window.navigator.userAgent.indexOf("Windows NT 6.1") !== -1
}