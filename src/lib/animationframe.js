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
