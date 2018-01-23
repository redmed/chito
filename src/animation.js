/**
 * @file 动画类 控制全局动画
 * @author redmed
 */

import EventEmitter from './common/eventemitter';
import utils from './common/util';
import { requestAnimationFrame as rAF, cancelAnimationFrame as cAF } from './common/animationframe';
import { Ev } from './common/define';
const { remove, forInMap } = utils;

class Animation extends EventEmitter {

    /**
     * 配置项
     * @type {Object}
     * @private
     */
    _options = {};

    /**
     * 执行后停止的Clip，用于reset时重置
     * @type {Object} id-Clip 值对保存
     * @private
     */
    _savedClipMap = {};

    /**
     * 执行中的子动画片段
     * @type {Array.<Clip>}
     * @private
     */
    _clips = [];

    _clipMap = {};

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

        this.emit(Ev.UPDATE, { timestamp });

        let i = 0;
        while (i < clips.length) {
            let clip = clips[i];
            let running = clip.update(timestamp);

            if (!running) {
                this._rmClip(clip);
            } else {
                i++;
            }
        }

        this._clips = clips;

        this.emit(Ev.AFTER_UPDATE);

        if (clips.length === 0) {
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

        if (this._timer || len === 0) {
            return this;
        }

        this.emit(Ev.START);

        let i = -1;
        while (++i < len) {
            let clip = clips[i];
            clip.start();
        }

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

        this._stop(false, true, false);

        let savedMap = this._savedClipMap;

        let list = [];
        forInMap(savedMap, value => {
            value.stop(true);
            list.push(value);
        });

        this._clips = list;

        this.emit(Ev.RESET);

        return this;

    }

    /**
     * 停止/暂停/重置 动画
     * @param {boolean=false} pause 是否暂停 默认不暂停
     * @param {boolean=false} reset 是否重置 默认不重置
     * @param {boolean=true} emit 是否派发事件 默认派发
     * @private
     */
    _stop(pause, reset, emit = true) {

        this._stopAni();

        let clips = this._clips,
            len = clips.length;

        if (len) {
            let i = -1;
            while (++i < len) {
                let clip = clips[i];
                pause ? clip.pause() : clip.stop(reset);
            }

            emit && this.emit(pause ? Ev.PAUSE : Ev.STOP);
        }

    }

    /**
     * 添加子动画片段
     * @param {Clip|Array.<Clip>} clips
     * @param {Boolean} startClip
     */
    addClip(clips, startClip = true) {

        if (!Array.isArray(clips)) {
            clips = [clips];
        }

        let i = -1,
            len = clips.length;

        while (++i < len) {
            let clip = clips[i];
            if (!this._hasSavedClip(clip)) {
                this._addClip(clip);
                this._addSavedClip(clip);

                if (this._timer && startClip) {
                    // 如果主进程进行中，立即启动Clip进程
                    clip.start();
                }
            }
        }

        return this;

    }

    _addClip(clip) {

        let _c = this._clips;
        // 防止重复添加
        if (_c.indexOf(clip) === -1) {
            _c.push(clip);
            clip._animation = this;
        }

    }

    _addSavedClip(clip) {

        let clipMap = this._savedClipMap;
        let id = clip.id;
        // 防止重复添加
        if (clipMap[id] !== clip) {
            clipMap[id] = clip;
            clip._animation = this;
        }

    }

    /**
     * 移除子动画片段
     * @param {Clip=} clip
     */
    removeClip(clip) {

        let savedMap = this._savedClipMap;

        if (clip) {
            this._rmClip(clip);
            this._rmSavedClip(clip);

            clip._animation = null;
        } else {
            // Rm all
            forInMap(savedMap, value => {
                value._animation = null;
            });

            this._clips = [];
            this._savedClipMap = {};
        }

        return this;

    }

    _rmClip(clip) {

        remove(this._clips, c => {
            return c === clip;
        });

    }

    _rmSavedClip(clip) {

        if (this._hasSavedClip(clip)) {
            delete this._savedClipMap[clip.id];
        }

    }

    /**
     * 获得 Clips
     * @returns {Array.<Clip>}
     */
    getClips() {

        return this._clips;

    }

    /**
     * 判断指定的Clip是否存在
     * @param {Clip} clip
     * @returns {boolean}
     */
    _hasSavedClip(clip) {

        let id = clip.id;
        let savedMap = this._savedClipMap;
        let savedClip = savedMap[id];
        return savedClip && savedClip === clip;

    }

    _hasClip(clip) {
        return this._clips.indexOf(clip) !== -1;
    }

    /**
     * 析构函数
     */
    destroy() {

        this.off();
        this._stopAni();
        this.removeClip();

    }
}

export default Animation;
