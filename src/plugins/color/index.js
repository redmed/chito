/**
 * @file 颜色插件
 * @author qiaogang
 * @date 2017/6/5
 */

import Clip from '../../clip';
import ColorHelper from './colorhelper';

const plugin = {

    /**
     * 插件类型
     * @type {string}
     */
    type: 'color',

    /**
     *
     * @param {*} value 待解析的数据
     * @param {string=} key 解析数据名称
     * @returns {boolean} 是否支持该类型
     */
    test(value, key) {

        return ColorHelper.isColor(value);

    },

    /**
     * @param {*} value 待解析的数据
     * @param {string=} key 解析数据名称
     * @returns {*} 解析中间过程的值
     */
    parse(value, key) {

        return ColorHelper.toNormalArray(value);

    },

    /**
     * 获取实际值
     * @param {*} parsedValue
     * @param {number} progress 经过缓动函数变换后的进度
     * @param {number=} elapsed 缓动变换前的原进度
     * @param {string=} key
     * @returns {*}
     */
    valueOf(parsedValue, progress, elapsed, key) {

        let val = ColorHelper.linearGradient(parsedValue, progress);
        val = ColorHelper.toRGBA(val);

        return val;

    }

};

Clip.registerPlugin(plugin);

export default plugin;
