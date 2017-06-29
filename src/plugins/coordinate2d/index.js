/**
 * @file 直角坐标系转换插件
 * @author qiaogang
 * @date 2017/6/5
 */

import Clip from '../../clip';
import vector from './vector';

/**
 * 计算移动步长
 * @param {Array} path
 * @returns {Array}
 * @example:
 * let path = [ [x, y], [x1, y1], [x2, y2] ];
 * parseMovingSteps(path) =>
 * [
 *  { length: 10, segment: [ [x, y], [x1, y2] ] },
 *  { length: 50, segment: [ [x, y], [x1, y2] ] },
 *  { ... }
 * ]
 * length 距离起点的向量长度之和, segment 所在片段的起始+终止点, segmentLength 片段长度
 */
function parseMovingSteps(path) {

    let i = 0,
        len = path.length,
        length = 0,
        _path = [],
        steps = [],
        angle = 0;

    while (i < len - 1) {
        let p0 = path[ i ], p1 = path[ i + 1 ];
        let segmentLength = vector.distance(p0, p1);
        length += segmentLength;

        angle = vector.getAngle(p1, p0);

        // if (i === 0) {
        //     _path.push(p0);
        // }
        // _path.push(p1);
        // 之前会存储包含当前步长所在的全部节点
        // 现在只存已经过的节点
        _path.push(p0);

        steps.push({
            length,
            segmentLength,
            segment: [ p0.slice(), p1.slice() ], // 当前步长所在的片段
            path: _path.slice(), // 已走过的路径
            angle
        });

        i++;
    }

    // 记录一个总长度
    steps[ 'sum' ] = length;

    return steps;

}

let plugin = {

    /**
     * 插件类型
     * @type {string}
     */
    type: 'coordinate-2d',

    /**
     *
     * @param {*} value 待解析的数据
     * @param {string=} key 解析数据名称
     * @returns {boolean} 是否支持该类型
     */
    test(value, key) {

        let res = false;

        if (Array.isArray(value)) {

            let i = -1, len = value.length;
            while (++i < len) {

                let item = value[ i ];
                if (Array.isArray(item)) {
                    let [ x, y ] = item;
                    [ x, y ] = [ +x, +y ];

                    res = typeof x == 'number'
                        && typeof y == 'number'
                        && isFinite(x) && isFinite(y);
                }
            }
        }

        return res;

    },

    /**
     * @param {*} value 待解析的数据
     * @param {string=} key 解析数据名称
     * @returns {*} 解析中间过程的值
     */
    parse(value, key) {

        let path = [];
        let i = -1, len = value.length;
        while (++i < len) {

            let item = value[ i ];
            let [ x, y ] = item;
            [ x, y ] = [ +x, +y ];

            path.push([ x, y ]);
        }

        let res = parseMovingSteps(path);

        return res;

    },

    /**
     * 获取实际值
     * @param {*} steps
     * @param {number} progress 经过缓动函数变换后的进度
     * @param {number=} elapsed 缓动变换前的原进度
     * @param {string=} key
     * @returns {*}
     */
    valueOf(steps, progress, elapsed, key) {

        let { sum } = steps;
        // TODO: 这里是按照行进距离寻找所在片段
        // TODO: 也可以根据progress进度寻找所在分段
        let current = sum * progress;

        // 找到当前轨迹运行区间
        let i = -1, len = steps.length;
        let step = steps[ 0 ];
        while (++i < len) {
            let s = steps[ i ];
            if (current <= s.length) {
                step = s;
                break;
            }
        }

        let [ p0, p1 ] = step.segment, subLength = 0;
        if (i == 0) {
            subLength = current;
        }
        else {
            subLength = current - steps[ i - 1 ].length;
        }

        // 根据每段已行驶的距离，计算 x, y 坐标
        let scale = subLength / step.segmentLength;
        let out = vector.create();
        // 这就是这一时刻的坐标点所在，这里待计算
        let position = vector.create();
        vector.sub(out, p1, p0);
        vector.scaleAndAdd(position, p0, out, scale);

        position.step = step;

        return position;

    }

};

Clip.registerPlugin(plugin);

export default plugin;
