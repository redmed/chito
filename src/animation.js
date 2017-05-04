/**
 * @file 动画类 控制全局动画
 * @author redmed
 */

import EventEmitter from './lib/eventemitter.js';
import utils from './lib/util.js';
import { requestAnimationFrame, cancelAnimationFrame } from './lib/animationframe.js';

let Event = {
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
     * 未结束的子动画片段
     * @type {Array.<Clip>}
     * @private
     */
    _aliveClips = [];

    /**
     * 主进程动画函数
     * @type {Function}
     * @private
     */
    _animation;

    /**
     * 动画进程标记
     * @type {*}
     * @private
     */
    _animationTimer;

    /**
     * 动画状态
     * -1: unInit
     * 0: init
     * 1: start
     * 2: stop
     * @type {number}
     */
    _status = -1;

    Event = Event;

    static Event = Event;

    /**
     * 构造函数
     * @param {Object} options 配置项
     */
    constructor(options = {}) {

        super();

        this._options = options;
        this.initialize();

        this._status = 0;

    }

    /**
     * 初始化函数
     */
    initialize() {

        this._animation = (timestamp) => {

            this._animationTimer = requestAnimationFrame(this._animation);
            this.emit(Event.UPDATE, timestamp);

            let aliveClips = this._aliveClips,
                alive = [];

            let i = 0,
                len = aliveClips.length;

            while (i < len) {
                let clip = aliveClips[ i++ ];

                let finish = clip.update(timestamp);
                clip._finish = finish;

                // 未结束的动画保存下来, 以便下次继续执行
                if (finish) {
                    alive.push(clip);
                }
            }

            this._aliveClips = alive;

            this.emit(Event.AFTER_UPDATE, timestamp);

            if (this._aliveClips.length === 0) {
                this.stop();
                this.emit(Event.COMPLETE);
            }
        };

    }

    /**
     * 启动动画进程
     */
    start() {

        if (this._animationTimer || this._aliveClips.length === 0) {
            return;
        }

        // FIXME: 这里启动clip可能存在问题, 后面在衡量一下是否在使用Clip时调用，还是这里统一调用
        // this._aliveClips.forEach(clip => {
        //     clip.start();
        // });

        this.emit(Event.START);

        requestAnimationFrame(this._animation);
        this._status = 1;

    }

    /**
     * 停止动画进程
     */
    stop() {

        if (this._animationTimer) {
            cancelAnimationFrame(this._animationTimer);
            this._animationTimer = null;

            // FIXME: 这里停止clip可能存在问题, 考虑是否在使用Clip时调用
            // this._aliveClips.forEach(clip => {
            //     clip.stop();
            // });

            this.emit(Event.STOP);

            this._status = 2;
        }

    }

    /**
     * 重启动画进程, 重置所有 Clip._finish 状态
     */
    restart() {

        this._clips.forEach((clip, i) => {
            clip._finish = false;
        });
        this._aliveClips = this._clips;

        this.stop();
        this.start();

    }

    /**
     * 添加子动画片段
     * @param {Clip|Array.<Clip>} clip
     */
    addClip(clip) {

        if (!Array.isArray(clip)) {
            clip = [ clip ];
        }

        this._aliveClips = this._clips = this._clips.concat(clip);

        return this;

    }

    /**
     * 移除子动画片段
     * @param {Clip=} clip
     */
    removeClip(clip) {

        // TODO: All in one loop
        if (clip) {
            utils.remove(this._clips, c => {
                return c === clip;
            });

            utils.remove(this._aliveClips, c => {
                return c === clip;
            });
        }
        else {
            this._clips = [];
            this._aliveClips = [];
        }

        return this;

    }

    /**
     * 获得 Clips
     * @returns {Array.<Clip>}
     */
    getClips() {
        return this._aliveClips;
    }

    /**
     * 析构函数
     */
    destroy() {

        this.stop();
        this._clips.forEach((clip) => {
            clip.destroy();
        });
        this._clips = [];
        this._aliveClips = [];
        this._status = -1;

        this.off();

    }
}

export default Animation;
