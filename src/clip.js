/**
 * @file 动画片段, 由 Animation 统一调度, 只控制时间的变化量
 * @author redmed
 */

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

import EventEmitter from './lib/eventemitter.js';
import EasingFunc from './lib/easing.js';

const Event = {
    UPDATE: 'update',
    START: 'start',
    REPEAT_COMPLETE: 'repeatComplete',
    COMPLETE: 'complete',
    STOP: 'stop'
};

const Attr = {
    DURATION: 'duration',
    REPEAT: 'repeat',
    DELAY: 'delay',
    EASING: 'easing',
    INTERVAL: 'interval',
    YOYO: 'yoyo',
    START: 'startAt'
};

const Easing = {
    LINEAR: 'Linear',

    QUADRATIC_IN: 'QuadraticIn',
    QUADRATIC_OUT: 'QuadraticOut',
    QUADRATIC_IN_OUT: 'QuadraticInOut',

    CUBIC_IN: 'CubicIn',
    CUBIC_OUT: 'CubicOut',
    CUBIC_IN_OUT: 'CubicInOut',

    QUARTIC_IN: 'QuarticIn',
    QUARTIC_OUT: 'QuarticOut',
    QUARTIC_IN_OUT: 'QuarticInOut',

    QUINTIC_IN: 'QuinticIn',
    QUINTIC_OUT: 'QuinticOut',
    QUINTIC_IN_OUT: 'QuinticInOut',

    SINUSOIDAL_IN: 'SinusoidalIn',
    SINUSOIDAL_OUT: 'SinusoidalOut',
    SINUSOIDAL_IN_OUT: 'SinusoidalInOut',

    EXPONENTIAL_IN: 'ExponentialIn',
    EXPONENTIAL_OUT: 'ExponentialOut',
    EXPONENTIAL_IN_OUT: 'ExponentialInOut',

    CIRCULAR_IN: 'CircularIn',
    CIRCULAR_OUT: 'CircularOut',
    CIRCULAR_IN_OUT: 'CircularInOut',

    ELASTIC_IN: 'ElasticIn',
    ELASTIC_OUT: 'ElasticOut',
    ELASTIC_IN_OUT: 'ElasticInOut',

    BACK_IN: 'BackIn',
    BACK_OUT: 'BackOut',
    BACK_IN_OUT: 'BackInOut',

    BOUNCE_IN: 'BounceIn',
    BOUNCE_OUT: 'BounceOut',
    BOUNCE_IN_OUT: 'BounceInOut'
};

class Clip extends EventEmitter {

    /**
     * 配置项
     * @type {Object}
     */
    _options = {};

    /**
     * 运行时长
     * @type {number}
     */
    _duration;

    /**
     * 延迟运行
     * @type {number} ms
     */
    _delay;

    /**
     * 每次动画间隔
     * @type {number} ms
     */
    _interval;

    /**
     * 重复数量
     * @type {number}
     */
    _repeat;

    /**
     * Ease 动画名
     * @type {Function}
     */
    _easing;

    /**
     * 是否按原轨迹返回(类似溜溜球)
     * @type {boolean}
     */
    _yoyo;

    /**
     * progress起始位置加成, 可以控制progress不从0开始启动
     * @type {number}
     */
    _startAt = 0;

    /**
     * 播放状态
     * @type {boolean}
     */
    _isPlaying = false;

    /**
     * 起始时间
     */
    _startTime;

    /**
     * yoyo翻转状态
     * @type {boolean}
     */
    _reversed = false;

    Event = Event;

    static Event = Event;

    static Attr = Attr;

    static Easing = Easing;

    /**
     * 构造函数
     * @param {Object=} options 配置项
     */
    constructor(options = {}) {

        super();
        this.initialize(options);

    }

    /**
     * 初始化函数
     * @param {Object=} from 起始帧
     * @param {Object=} to 结束帧
     * @param {Object=} options 配置项
     */
    initialize(options = {}, attr) {

        this._options = this._initOption(options);

    }

    /**
     * 初始配置项
     * @param {Object=} options
     * @options {number=} options.duration, 单位ms, 默认 1000ms
     * @options {number=} options.delay
     * @options {string=|Function=} options.ease
     * @options {number=} options.repeat
     * @private
     */
    _initOption(options) {

        let easing = options[ Attr.EASING ] || Easing.LINEAR;
        this._easing = EasingFunc[ easing ] ? EasingFunc[ easing ] : easing;
        this._delay = options[ Attr.DELAY ] || 0;
        this._duration = options[ Attr.DURATION ] || 1000;
        this._repeat = options[ Attr.REPEAT ] || 0;
        this._interval = options[ Attr.INTERVAL ] || 0;
        this._yoyo = options[ Attr.YOYO ] || false;
        this._startAt = options[ Attr.START ] || 0;

        return options;

    }

    /**
     * 启动动画
     * @param {Boolean=} forceStart 强制重新计时
     */
    start(forceStart) {

        if (!forceStart && this._isPlaying) {
            return;
        }

        this._isPlaying = true;
        this._startTime = window.performance.now() + this._delay;

        this.emit(Event.START);

        return this;

    }

    /**
     * 停止动画
     */
    stop() {

        if (!this._isPlaying) {
            return;
        }

        this._isPlaying = false;

        this.emit(Event.STOP);

        return this;

    }

    /**
     * 更新动画, 触发 UPDATE 事件
     * @param {number} time
     * @returns {Boolean} true: 还没结束. false: 运行结束
     */
    update(time) {

        if (this._isPlaying && time && time < this._startTime) {
            return true;
        }

        let elapsed = (time - this._startTime) / this._duration;
        elapsed += this._startAt;
        elapsed = Math.min(elapsed, 1);

        let percent = this._easing(this._reversed ? 1 - elapsed : elapsed);
        this.emit(Event.UPDATE, percent);

        // 一个周期结束
        if (elapsed == 1) {
            if (this._repeat > 1) {
                if (isFinite(this._repeat)) {
                    this._repeat--;
                }

                this._startTime = time + this._interval;
                this._startAt = 0;

                if (this._yoyo) {
                    this._reversed = !this._reversed;
                }

                this.emit(Event.REPEAT_COMPLETE, this._repeat);

                return true;
            }
            else {
                this.emit(Event.COMPLETE);

                return false;
            }
        }

        return true;

    }

    /**
     * 析构函数
     */
    destroy() {

        this._isPlaying = false;
        this.off();

    }
}

export default Clip;
