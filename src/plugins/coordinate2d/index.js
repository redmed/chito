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
 *  { distance: 10, segment: [ [x, y], [x1, y2] ] },
 *  { distance: 50, segment: [ [x, y], [x1, y2] ] },
 *  { ... }
 * ]
 * distance 距离起点的向量长度之和, segment 所在片段的起始+终止点, segmentLength 片段长度
 */
function parseMovingSteps(path) {

    let i = 0,
        len = path.length,
        distance = 0,
        _path = [],
        steps = [],
        angle = 0;

    while (i < len - 1) {
        let p0 = path[ i ], p1 = path[ i + 1 ];
        let segmentLength = vector.distance(p0, p1);
        distance += segmentLength;

        angle = vector.getAngle(p1, p0);

        // if (i === 0) {
        //     _path.push(p0);
        // }
        // _path.push(p1);
        // 之前会存储包含当前步长所在的全部节点
        // 现在只存已经过的节点
        _path.push(p0);

        steps.push({
            distance,
            segmentLength,
            segment: [ p0.slice(), p1.slice() ], // 当前步长所在的片段
            path: _path.slice(), // 已走过的路径
            angle
        });

        i++;
    }

    // 记录一个总长度
    steps[ 'sumDistance' ] = distance;

    return steps;

}

let plugin = {

    /**
     * 插件类型
     * @type {string}
     */
    type: '2D-Coordinate',

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

        console.log('Coordinate \n', path);

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

        return 2;

    }

};

Clip.registerPlugin(plugin);

export default plugin;
