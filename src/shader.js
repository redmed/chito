/**
 * @file
 * @author redmed
 * @date 2017/3/13
 */

import Clip from './clip.js';
import Interpolation from './lib/Interpolation.js';
import ColorHelper from './lib/colorhelper.js';

const SUPPORT_COLORS = {
    color: 1,
    backgroundColor: 1,
    borderColor: 1,
    lineColor: 1,
    shadowColor: 1
};

function isColorName(name) {
    // TODO: 修改, 根据特性判断。自己构造内部使用的数据类型
    return name in SUPPORT_COLORS;
}

/**
 * 计算属性在某个时间上的具体数值
 * @param {Object} keyframe 属性
 * @param {number} progress 进度
 * @param {Function} interpolation 插值算法
 * @returns {Object}
 */
function loopKeyframe(keyframe, progress, interpolation = Interpolation.Linear) {

    let _keyframe = {};

    for (let key in keyframe) {
        if (keyframe.hasOwnProperty(key)) {

            let val = keyframe[ key ];

            if (typeof val != 'undefined') {
                // if (_.isPlainObject(val)) {
                //     val = loopKeyframe(val, progress, interpolation);
                // }
                // else {
                if (Array.isArray(val)) {
                    if (isColorName(key) && Array.isArray(val[ 0 ])) {
                        // 颜色渐变
                        val = ColorHelper.linearGradient(val, progress);
                        val = ColorHelper.toRGBA(val);
                    }
                    else {
                        val = interpolation(val, progress);
                    }
                }
                // }

                _keyframe[ key ] = val;
            }
        }
    }

    return _keyframe;
}

/**
 * 转换数据格式
 * @param {Object} attr
 * @returns {Object}
 */
function transform(attr) {

    let _attr = {};

    for (let key in attr) {
        if (attr.hasOwnProperty(key)) {

            let val = attr[ key ];

            if (ColorHelper.isColor(val)) {
                val = ColorHelper.toNormalArray(val);
            }

            _attr[ key ] = val;
        }
    }

    return _attr;
}

/**
 * 渲染器
 */
class ShaderClip extends Clip {

    /**
     * 存储属性
     * @type {Object}
     * @private
     */
    _tracks = {};

    /**
     * 插值算法
     * @type {Function}
     * @private
     */
    _interpolation = Interpolation.Linear;

    constructor(...args) {

        super();
        this.initialize(...args);

    }

    initialize(options, attr) {

        super.initialize(options);
        this._tracks = transform(attr);

    }

    /**
     * 设置属性状态及时间控制点
     * @param {Object} attr
     * @param {number} time 单位ms
     * @returns {ShaderClip}
     */
    when(attr/*, time*/) {
        // TODO: 如果需要支持指定time上的变化，需要实现关于时间的插值计算，比较复杂，后面再考虑实现
        let tracks = this._tracks;
        for (let key in attr) {
            if (attr.hasOwnProperty(key)) {
                let value = attr[ key ];

                if (!tracks[ key ]) {
                    tracks[ key ] = [];

                    // if (time != 0) {
                    //     tracks[ key ].push({
                    //         value,
                    //         time: 0
                    //     });
                    // }
                }

                // tracks[ key ].push({
                //     value,
                //     time
                // });
                tracks[ key ].push(value);
            }
        }

        return this;
    }

    update(time) {

        if (this._isPlaying && time && time < this._startTime) {
            return true;
        }

        let elapsed = (time - this._startTime) / this._duration;
        elapsed += this._startAt;
        elapsed = Math.min(elapsed, 1);

        let percent = this._easing(this._reversed ? 1 - elapsed : elapsed);

        let tracks = this._tracks;
        let keyframe = {};

        for (let key in tracks) {
            if (tracks.hasOwnProperty(key)) {

                let val = tracks[ key ];

                if (Array.isArray(val)) {
                    if (isColorName(key) && Array.isArray(val[ 0 ])) {
                        // 颜色渐变
                        val = ColorHelper.linearGradient(val, percent);
                        val = ColorHelper.toRGBA(val);
                    }
                    else {
                        val = this._interpolation(val, percent);
                    }

                }

                keyframe[ key ] = val;
            }
        }

        this.emit(this.Event.UPDATE, percent, keyframe);

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

                return true;
            }
            else {
                this.emit(this.Event.COMPLETE);

                return false;
            }
        }

        return true;

    }
}

export default ShaderClip;