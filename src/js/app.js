import $ from 'jquery';
import { platform, defaultEvent } from './device';

// import * as slider from 'slick-carousel/slick/slick.min';
// import 'pubsub-js';

let body = $(".page-index");
let $window = $(window);

if (!platform.isMobile) {
    body.addClass('desktop');
} else {
    body.addClass('mobile');
}
if (platform.isWin7) {
    body.addClass('win7');
}
if (platform.isFirefox) {
    body.addClass('firefox');
}

if (!platform.hasTouch) {
    body.addClass('notouch');
}

if (platform.isIE || platform.isEdge) {
    body.addClass('isIE');
}


import * as load from './loadImg';
import story from './hotUpdate';



let loaded_count = 0,
    loaded_len = 0,
    headHeight = 0;
let data, html;

if (ishot) {
    var $mainStory = $("#main-article");
    $mainStory.empty();
    $.getJSON('./copy.txt').then(succss);
} else {
    succss();
}

function succss(data) {
    if (ishot) $mainStory.append(article(data));

    console.log('=====begin=======');

    load.loadImgs('.preload', function() {
        console.log('====images loaded======');
    });
}

export function init() {
    console.log('-----init1-------');
}