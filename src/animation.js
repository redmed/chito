/**
 * @file 动画类 控制全局动画
 * @author redmed
 */

import EventEmitter from './lib/eventemitter.js';
import utils from './lib/util.js';
import { requestAnimationFrame, cancelAnimationFrame } from './lib/animationframe.js';

const Ev = {
    START: 'start',
    STOP: 'stop',
    UPDATE: 'update',
    AFTER_UPDATE: 'afterUpdate',
    COMPLETE: 'complete'
};

class Animation extends EventEmitter {

    /**
     * 配置项
     * @type {Object}
     * @private
     */
    _options = {};

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
    constructor(options = {}) {
        super();
        this._options = options;
    }

    /**
     * 主进程动画函数
     * @private
     */
    _startAni() {

        let update = (timestamp) => {
            this._timer = requestAnimationFrame(update);
            this._update(timestamp);
        };

        this._timer = requestAnimationFrame(update);

    }

    /**
     * 更新动画
     * @param {number} timestamp
     * @private
     */
    _update(timestamp) {

        let clips = this._clips;

        this.emit(Ev.UPDATE, timestamp, clips);

        let i = 0;

        while (i < clips.length) {
            let clip = clips[ i ];

            let running = clip.update(timestamp);

            // 未结束的动画保存下来, 以便下次继续执行
            if (!running) {
                clips.splice(i, 1);
            }
            else {
                i++;
            }

        }

        this._clips = clips;

        this.emit(Ev.AFTER_UPDATE, timestamp, clips);

        if (clips.length === 0) {
            this.stop();
            this.emit(Ev.COMPLETE);
        }

    }

    /**
     * 启动动画进程
     * @param {boolean=false} startClip 是否同时启动内部 Clip
     */
    start(startClip = false) {

        let clips = this._clips;
        if (this._timer || clips.length === 0) {
            return;
        }

        if (startClip) {
            clips.forEach(clip => {
                clip.start();
            });
        }

        this.emit(Ev.START);
        this._startAni();

    }

    /**
     * 停止动画进程
     * @param {boolean=false} stopClip 是否同时停止内部 Clip
     */
    stop(stopClip = false) {

        let timer = this._timer;

        if (timer) {
            cancelAnimationFrame(timer);
            this._timer = null;

            if (stopClip) {
                this._clips.forEach(clip => {
                    clip.stop();
                });
            }

            this.emit(Ev.STOP);
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

        this._clips = this._clips.concat(clips);

        return this;

    }

    /**
     * 移除子动画片段
     * @param {Clip=} clip
     */
    removeClip(clip) {

        if (clip) {
            utils.remove(this._clips, c => {
                return c === clip;
            });
        }
        else {
            this._clips = [];
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

        this.stop();
        this._clips = [];

        this.off();

    }
}

export default Animation;
