/**
 * @file 动画类 控制全局动画
 * @author redmed
 */

import EventEmitter from './lib/eventemitter.js';
import utils from './lib/util.js';
import { requestAnimationFrame as rAF, cancelAnimationFrame as cAF } from './lib/animationframe.js';
import { Ev } from './lib/define.js';

class Animation extends EventEmitter {

    /**
     * 配置项
     * @type {Object}
     * @private
     */
    _options = {};

    _savedClips = [];

    /**
     * 子动画片段
     * @type {Array.<Clip>}
     * @private
     */
    _clips = [];

    /**
     * 动画进程标记
     * @type {number|null}
     * @private
     */
    _timer;

    static Event = Ev;

    /**
     * 构造函数
     * @param {Object=} options 配置项
     */
    constructor(options) {

        super();
        this._options = options || {};

    }

    /**
     * 主进程动画函数
     * @private
     */
    _startAni() {

        let update = timestamp => {
            this._timer = rAF(update);
            this._update(timestamp);
        };

        this._timer = rAF(update);

    }

    /**
     * 停止主进程
     * @private
     */
    _stopAni() {

        let timer = this._timer;

        if (timer) {
            cAF(timer);
            this._timer = null;

            return true;
        }

        return false;

    }

    /**
     * 更新动画
     * @param {number} timestamp
     * @private
     */
    _update(timestamp) {

        let clips = this._clips;

        this.emit(Ev.UPDATE, clips);

        let i = 0;
        while (i < clips.length) {
            let clip = clips[ i ];

            let running = clip.update(timestamp);

            if (!running) {
                clip._animation = null;
                clips.splice(i, 1);
            }
            else {
                i++;
            }
        }

        this._clips = clips;

        this.emit(Ev.AFTER_UPDATE, clips);

        if (clips.length == 0) {
            this._stopAni();
            this.emit(Ev.COMPLETE);
        }

    }

    /**
     * 启动动画进程
     */
    start() {

        let clips = this._clips,
            len = clips.length;

        if (this._timer || len == 0) {
            return this;
        }

        let i = -1;
        while (++i < len) {
            let clip = clips[ i ];
            clip.start();
        }

        this.emit(Ev.START);
        this._startAni();

        return this;

    }

    /**
     * 停止动画进程
     */
    stop() {

        this._stop(false);

        return this;

    }

    /**
     * 暂停动画进程
     */
    pause() {

        this._stop(true);

        return this;

    }

    /**
     * 重置动画
     * 会重置内部 Clip 已经执行的的 repeat 次数
     */
    reset() {

        let i = -1,
            saved = this._savedClips,
            len = saved.length;

        while (++i < len) {
            let c = saved[ i ];
            c.stop(true);
        }

        this._clips = saved.slice();

        this.emit(Ev.RESET);

        return this;

    }

    /**
     * 停止/暂停/重置 动画
     * @param {boolean} pause 是否暂停 默认不暂停
     * @param {boolean} reset 是否重置 默认不重置
     * @private
     */
    _stop(pause, reset) {

        this._stopAni();

        let clips = this._clips,
            len = clips.length;

        if (len) {
            let i = -1;
            while (++i < len) {
                let clip = clips[ i ];
                pause ? clip.pause() : clip.stop(reset);
            }

            this.emit(pause ? Ev.PAUSE : Ev.STOP);
        }

    }

    /**
     * 添加子动画片段
     * @param {Clip|Array.<Clip>} clips
     */
    addClip(clips) {

        if (!Array.isArray(clips)) {
            clips = [ clips ];
        }

        let i = -1,
            len = clips.length;

        while (++i < len) {
            let clip = clips[ i ];
            clip._animation = this;

            this._clips.push(clip);
            this._savedClips.push(clip);
        }

        return this;

    }

    /**
     * 移除子动画片段
     * @param {Clip=} clip
     */
    removeClip(clip) {

        let clips = this._clips;
        let saved = this._savedClips;

        if (clip) {
            // let idx = clips.indexOf(clip);
            // if (idx != -1) {
            //     clip._animation = null;
            //     clips.splice(idx, 1);
            // }
            utils.remove(clips, c => {
                return c === clip;
            });
            utils.remove(saved, c => {
                return c === clip;
            });

            clip._animation = null;
        }
        else {
            let i = -1,
                len = saved.length;

            while (++i < len) {
                let c = saved[ i ];
                c._animation = null;
            }

            this._clips = [];
            this._savedClips = [];
        }

        return this;

    }

    /**
     * 获得 Clips
     * @returns {Array.<Clip>}
     */
    getClips() {

        return this._clips;

    }

    /**
     * 析构函数
     */
    destroy() {

        this._stopAni();
        this.removeClip();

        this.off();

    }
}

export default Animation;
