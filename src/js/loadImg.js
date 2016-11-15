function preloadImages(arr) {
    var newimages = [],
        loadedimages = 0,
        imgLen = 0;

    var postaction = function() {};
    arr = (typeof arr != "object") ? [arr] : arr;
    imgLen = arr.length;

    function imageloadpost() {
        loadedimages++;
        let ratio = loadedimages / imgLen;
        if (arr[loadedimages - 1] === null) {
            log('nothing here');
        }
        if (loadedimages == imgLen) {
            console.log('====done')
            postaction(newimages);
            // for (var j = 0, len = imgLen; j < len; j++) {
            //     $(arr[j]).append(newimages[j]);
            //     $(arr[j]).removeAttr("data-src");
            // }
        }
    }
    var img;
    for (var i = 0, len = imgLen; i < len; i++) {
        img = new Image();
        newimages.push(img);

        img.addEventListener("load", function() {
            imageloadpost();
        });
        img.addEventListener("error", function() {
            imageloadpost();
        });
        if (arr[i].getAttribute('data-src') !== null) {
            img.src = arr[i].getAttribute('data-src');
            img.alt = "";
            $(arr[i]).append(img);
            $(arr[i]).removeAttr("data-src");
        }
    }
    return {
        done: function(f) {
            postaction = f || postaction;
        }
    };
}

export function loadImgs(preload, callBack) {
    var imgs = document.querySelectorAll(preload),
        imgArray = [];
    for (let i = 0; i < imgs.length; ++i) {
        imgArray.push(imgs[i]);
    }
    let loadImages = preloadImages(imgArray);
    loadImages.done(callBack);
}