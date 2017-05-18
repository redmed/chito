/**
 * @file ShaderClip 动画片段，由 Animation 统一调度, 提供数值和颜色的变化
 * @author redmed
 */

import Clip from './clip.js';
import Interpolation from './lib/Interpolation.js';
import ColorHelper from './lib/colorhelper.js';
import { Ev, Attr } from './lib/define.js';

/**
 * 转换数据格式
 * @param {Object} attr
 * @param {boolean} colorSupport
 * @returns {Object}
 */
function transform(attr, colorSupport) {

    let _attr = {};

    for (let key in attr) {
        if (attr.hasOwnProperty(key)) {

            let val = attr[ key ];

            if (ColorHelper.isColor(val)) {
                if (colorSupport) {
                    val = ColorHelper.toNormalArray(val);
                    val.__color__ = 1;
                }
                else {
                    val.__color__ = 2;
                }
            }

            _attr[ key ] = val;
        }
    }

    // 转换成数组，可以提高 loop 速度
    let _attrList = [];

    for (let key in _attr) {
        let val = _attr[ key ];
        _attrList.push({
            key,
            val
        });
    }

    return _attrList;
}

/**
 * 渲染器
 */
class ShaderClip extends Clip {

    /**
     * 存储属性
     * @param {Array}
     * @private
     */
    _tracks;

    /**
     * 插值算法
     * @type {Function}
     * @private
     */
    _interpolation = Interpolation.Linear;

    /**
     * 构造函数
     * @param {Object=} options 配置项
     * @param {Object=} attr 变换属性
     */
    constructor(options, attr) {

        super(options, attr);
        let cs = options[ Attr.COLOR_SUPPORT ];
        cs = typeof cs == 'undefined' ? true : cs;
        this._tracks = transform(attr, cs);

    }

    /**
     * 设置属性状态及时间控制点
     * @param {Object} attr
     * @param {number} time 单位ms
     * @returns {ShaderClip}
     */
    // when(attr/*, time*/) {
    //     // TODO: 如果需要支持指定time上的变化，需要实现关于时间的插值计算，比较复杂，后面再考虑实现
    //     let tracks = this._tracks;
    //     for (let key in attr) {
    //         if (attr.hasOwnProperty(key)) {
    //             let value = attr[ key ];
    //
    //             if (!tracks[ key ]) {
    //                 tracks[ key ] = [];
    //
    //                 // if (time != 0) {
    //                 //     tracks[ key ].push({
    //                 //         value,
    //                 //         time: 0
    //                 //     });
    //                 // }
    //             }
    //
    //             // tracks[ key ].push({
    //             //     value,
    //             //     time
    //             // });
    //             tracks[ key ].push(value);
    //         }
    //     }
    //
    //     return this;
    // }

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

        let tracks = this._tracks;
        let keyframe = {};

        let i = 0,
            len = tracks.length;

        while (i < len) {
            let item = tracks[ i++ ];
            let { key, val } = item;

            let color = val.__color__;
            if (color) {
                if (color == 1) {
                    // 颜色渐变
                    val = ColorHelper.linearGradient(val, percent);
                    val = ColorHelper.toRGBA(val);
                }
            }
            else {
                val = this._interpolation(val, percent);
            }

            keyframe[ key ] = val;
        }

        this.emit(Ev.UPDATE, percent, keyframe, this.getOpt());

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
}

export default ShaderClip;
