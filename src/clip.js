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
     * @protected
     */
    _options = {};

    /**
     * 变换属性
     * @type {Object}
     * @protected
     */
    _attr = {};

    /**
     * 运行时长
     * @type {number}
     * @protected
     */
    _duration;

    /**
     * 延迟运行
     * @type {number} ms
     * @protected
     */
    _delay;

    /**
     * 每次动画间隔
     * @type {number} ms
     * @protected
     */
    _interval;

    /**
     * 动画重复次数，用于reset重置使用
     * @type {number}
     * @protected
     */
    _repeat_0;

    /**
     * 动画重复次数
     * @type {number}
     * @protected
     */
    _repeat;

    /**
     * Ease 动画名
     * @type {Function}
     * @protected
     */
    _easing;

    /**
     * 是否按原轨迹返回(类似溜溜球)
     * @type {boolean}
     * @protected
     */
    _yoyo;

    /**
     * progress起始位置加成, 可以控制progress不从0开始启动
     * @type {number}
     * @protected
     */
    _startAt = 0;

    /**
     * 停止状态
     * @type {boolean}
     * @protected
     */
    _stopped = true;

    /**
     * 暂停状态
     * @type {boolean}
     * @protected
     */
    _paused = false;

    /**
     * 动画起始时间
     * @type {number}
     * @protected
     */
    _startTime = 0;

    /**
     * 每次暂停动画起始时间
     * @type {number}
     * @protected
     */
    _pauseStart = 0;

    /**
     * 暂停时长
     * @type {number}
     * @protected
     */
    _pauseTime = 0;

    /**
     * yoyo 翻转状态
     * @type {boolean}
     * @protected
     */
    _reversed = false;

    /**
     * 被当前 Clip 链式调用的 Clip
     * @type {Array}
     * @protected
     */
    _chainClips = [];

    /**
     * @type {Animation}
     * @protected
     */
    _animation;

    static Event = Ev;

    static Attr = Attr;

    static Easing = Easing;

    /**
     * 构造函数
     * @param {Object=} options 配置项
     * @param {Object=} attr 变换属性
     */
    constructor(options, attr) {

        super();

        this._options = options || {};
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
        this._repeat_0 = this._repeat = options[ Attr.REPEAT ] || 1;
        this._interval = options[ Attr.INTERVAL ] || 0;
        this._yoyo = options[ Attr.YOYO ] || false;
        this._startAt = options[ Attr.START ] || 0;

    }

    /**
     * @protected
     */
    _getOption() {
        return {
            options: this._options,
            attr: this._attr
        }
    }

    /**
     * 启动动画
     * @param {boolean=false} force 强制重新计时
     * @returns {Clip}
     */
    start(force) {

        if (this._paused) {
            this._pauseTime += window.performance.now() - this._pauseStart;
            this._paused = false;
        }
        else {
            if (!force && !this._stopped) {
                return this;
            }

            this._stopped = false;
            this._startTime = window.performance.now() + this._delay;
        }

        this.emit(Ev.START, this._getOption());

        return this;

    }

    /**
     * 停止动画
     * @param {boolean=false} reset 是否重置 repeat 次数
     * @returns {Clip}
     */
    stop(reset) {

        if (!this._stopped) {
            this._stopped = true;
            this._paused = false;
            this._pauseTime = 0;
            this._pauseStart = 0;

            this.emit(Ev.STOP, this._getOption());

            this.stopChain();
        }

        if (reset) {
            this._repeat = this._repeat_0;
        }

        return this;

    }

    pause() {

        if (this._stopped || this._paused) {
            return this;
        }

        this._paused = true;
        this._pauseStart = window.performance.now();

        return this;

    }

    stopChain() {

        let i = -1,
            clips = this._chainClips,
            len = clips.length;

        while (++i < len) {
            let clip = clips[ i ];
            clip.stop();
        }

        return this;

    }

    /**
     * 更新动画, 触发 UPDATE 事件
     * @param {number} time
     * @returns {boolean} true: 还没结束. false: 运行结束
     */
    update(time) {

        if (this._stopped) {
            return true;
        }

        if (this._paused || time && time < this._startTime) {
            return true;
        }

        let t = time - this._pauseTime;
        let { percent, elapsed } = this._getProgress(t);

        let attr = this._updateAttr(percent, elapsed);

        this.emit(Ev.UPDATE, percent, attr, this._getOption());

        // 一个周期结束
        return this._afterUpdate(t, elapsed);

    }

    _getProgress(time) {

        let elapsed = (time - this._startTime) / this._duration;
        elapsed += this._startAt;
        elapsed = Math.min(elapsed, 1);

        let percent = this._easing(this._reversed ? 1 - elapsed : elapsed);

        return {
            percent,
            elapsed
        }

    }

    _updateAttr(percent, elapsed) {

        return this._attr;

    }

    _afterUpdate(time, elapsed) {

        // 一个周期结束
        if (elapsed == 1) {

            let rep = this._repeat;

            if (rep > 1) {
                if (isFinite(rep)) {
                    rep--;
                }

                this._startTime = time + this._interval;
                this._startAt = 0;

                if (this._yoyo) {
                    this._reversed = !this._reversed;
                }

                this.emit(Ev.REPEAT_COMPLETE, rep, this._getOption());

                this._repeat = rep;

                return true;
            }
            else {

                this.emit(Ev.COMPLETE, this._getOption());

                let i = -1,
                    chains = this._chainClips,
                    len = chains.length;
                while (++i < len) {
                    let clip = chains[ i ];

                    let ani = this._animation;
                    ani && ani.addClip(clip);

                    clip.start();
                }

                this._stopped = true;
                this._pauseTime = 0;
                this._pauseStart = 0;
                this._repeat = this._repeat_0;

                return false;
            }
        }

        return true;

    }

    /**
     * 链接新 Clip
     * @param {*} args
     * @returns {Clip}
     */
    chain(...args) {

        this._chainClips = args;

        return this;

    }

    /**
     * 析构函数
     */
    destroy() {

        this._stopped = true;
        this._paused = false;
        this._startTime = 0;
        this._pauseTime = 0;
        this._pauseStart = 0;
        this._chainClips = [];

        let ani = this._animation;
        ani && ani.removeClip(this);
        this._animation = null;

        this.off();

    }
}

export default Clip;
