/**
 * @file 动画类 控制全局动画
 * @author redmed
 */

import EventEmitter from './lib/eventemitter.js';
import utils from './lib/util.js';
import { requestAnimationFrame, cancelAnimationFrame } from './lib/animationframe.js';
import { Ev } from './lib/define.js';

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

        let i = -1,
            len = clips.length;
        let over = true;

        while (++i < len) {
            let clip = clips[ i ];

            if (clip._isPlaying && !clip._isFinish) {
                over = false;
                clip.update(timestamp);
            }
        }

        this.emit(Ev.AFTER_UPDATE, timestamp, clips);

        if (over) {
            this.stop();
            this.emit(Ev.COMPLETE, timestamp);
        }

    }

    /**
     * 启动动画进程
     * @param {boolean=false} startClip 是否同时启动内部 Clip
     */
    start(startClip = false) {

        let clips = this._clips,
            len = clips.length;
        if (this._timer || len === 0) {
            return;
        }

        if (startClip) {
            let i = 0;
            while (i < len) {
                let clip = clips[ i++ ];
                clip.start();
            }
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
                let i = 0,
                    clips = this._clips,
                    len = clips.length;
                while (i < len) {
                    let clip = clips[ i++ ];
                    clip.stop();
                }
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

        let _addClip = (clips) => {
            if (clips && clips.length > 0) {
                let i = -1, len = clips.length;

                while (++i < len) {
                    let clip = clips[ i ];

                    if (!clip.__chained__) {
                        this._clips.push(clip);

                        clip.__chained__ = true;

                        _addClip(clip._chainClips);

                    }
                }
            }
        };

        _addClip(clips);

        return this;

    }

    /**
     * 移除子动画片段
     * @param {Clip=} clip
     */
    removeClip(clip) {

        let clips = this._clips;

        if (clip) {
            utils.remove(clips, c => {
                if (c === clip) {
                    c.__chained__ = false;
                    return true;
                }
            });
        }
        else {
            let i = -1,
                len = clips.length;

            while (++i < len) {
                let c = clips[ i ];
                c.__chained__ = false;
            }

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
        this.removeClip();

        this.off();

    }
}

export default Animation;
