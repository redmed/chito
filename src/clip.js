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
import { Ev, Attr, Easing } from './lib/define.js';

class Clip extends EventEmitter {

    /**
     * 配置项
     * @type {Object}
     * @private
     */
    _options = {};

    /**
     * 变换属性
     * @type {Object}
     * @private
     */
    _attr = {};

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
     * 动画重复次数
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
     * 每次动画起始时间
     * @type {number}
     */
    _startTime;

    /**
     * yoyo 翻转状态
     * @type {boolean}
     */
    _reversed = false;

    static Event = Ev;

    static Attr = Attr;

    static Easing = Easing;

    /**
     * 构造函数
     * @param {Object=} options 配置项
     * @param {Object=} attr 变换属性
     */
    constructor(options = {}, attr) {

        super();

        this._options = options;
        this._attr = attr;

        this._initOption(options);

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
        let dur = options[ Attr.DURATION ];
        this._duration = typeof dur == 'undefined' ? 1000 : dur;
        this._repeat = options[ Attr.REPEAT ] || 1;
        this._interval = options[ Attr.INTERVAL ] || 0;
        this._yoyo = options[ Attr.YOYO ] || false;
        this._startAt = options[ Attr.START ] || 0;

    }

    getOpt() {
        return {
            options: this._options,
            attr: this._attr
        }
    }

    /**
     * 启动动画
     * @param {boolean=} forceStart 强制重新计时
     */
    start(forceStart) {

        if (!forceStart && this._isPlaying) {
            return;
        }

        this._isPlaying = true;
        this._startTime = window.performance.now() + this._delay;

        this.emit(Ev.START, this.getOpt());

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

        this.emit(Ev.STOP, this.getOpt());

        return this;

    }

    /**
     * 更新动画, 触发 UPDATE 事件
     * @param {number} time
     * @returns {boolean} true: 还没结束. false: 运行结束
     */
    update(time) {

        if (this._isPlaying && time && time < this._startTime) {
            return true;
        }

        let elapsed = (time - this._startTime) / this._duration;
        elapsed += this._startAt;
        elapsed = Math.min(elapsed, 1);

        let percent = this._easing(this._reversed ? 1 - elapsed : elapsed);
        this.emit(Ev.UPDATE, percent, this.getOpt());

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

                this.emit(Ev.REPEAT_COMPLETE, this._repeat, this.getOpt());

                return true;
            }
            else {
                this.emit(Ev.COMPLETE, this.getOpt());

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
