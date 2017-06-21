// Include a performance.now polyfill
(function () {

    if ('performance' in window === false) {
        window.performance = {};
    }

    // IE 8
    Date.now = (Date.now || function () {
        return new Date().getTime();
    });

    if ('now' in window.performance === false) {
        var offset = window.performance.timing && window.performance.timing.navigationStart
            ? window.performance.timing.navigationStart : Date.now();

        window.performance.now = function () {
            return Date.now() - offset;
        };
    }

})();

const requestAnimationFrame = (() => {
    return (typeof window !== 'undefined' &&
        (window.requestAnimationFrame
        || window.msRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame))
        || function (callback) {
            setTimeout(callback, 16);
        };
})();

const cancelAnimationFrame = (() => {
    return (typeof window !== 'undefined' &&
        (window.cancelAnimationFrame
        || window.msCancelAnimationFrame
        || window.mozCancelAnimationFrame
        || window.webkitCancelAnimationFrame))
        || function (timer) {
            clearTimeout(timer);
        };
})();

export {
    requestAnimationFrame,
    cancelAnimationFrame
};
