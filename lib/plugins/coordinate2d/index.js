'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @file 直角坐标系转换插件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author qiaogang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @date 2017/6/5
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

var _clip = require('../../clip');

var _clip2 = _interopRequireDefault(_clip);

var _vector = require('./vector');

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var i = 0,
        len = path.length,
        length = 0,
        _path = [],
        steps = [],
        angle = 0;

    while (i < len - 1) {
        var p0 = path[i],
            p1 = path[i + 1];
        var segmentLength = _vector2['default'].distance(p0, p1);
        length += segmentLength;

        angle = _vector2['default'].getAngle(p1, p0);

        // if (i === 0) {
        //     _path.push(p0);
        // }
        // _path.push(p1);
        // 之前会存储包含当前步长所在的全部节点
        // 现在只存已经过的节点
        _path.push(p0);

        steps.push({
            length: length,
            segmentLength: segmentLength,
            segment: [p0.slice(), p1.slice()], // 当前步长所在的片段
            path: _path.slice(), // 已走过的路径
            angle: angle
        });

        i++;
    }

    // 记录一个总长度
    steps['sum'] = length;

    return steps;
}

var plugin = {

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
    test: function test(value, key) {

        var res = false;

        if (Array.isArray(value)) {

            var i = -1,
                len = value.length;
            while (++i < len) {

                var item = value[i];
                if (Array.isArray(item)) {
                    var _item = _slicedToArray(item, 2),
                        x = _item[0],
                        y = _item[1];

                    var _ref = [+x, +y];
                    x = _ref[0];
                    y = _ref[1];


                    res = typeof x == 'number' && typeof y == 'number' && isFinite(x) && isFinite(y);
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
    parse: function parse(value, key) {

        var path = [];
        var i = -1,
            len = value.length;
        while (++i < len) {

            var item = value[i];

            var _item2 = _slicedToArray(item, 2),
                x = _item2[0],
                y = _item2[1];

            var _ref2 = [+x, +y];
            x = _ref2[0];
            y = _ref2[1];


            path.push([x, y]);
        }

        var res = parseMovingSteps(path);

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
    valueOf: function valueOf(steps, progress, elapsed, key) {
        var sum = steps.sum;
        // TODO: 这里是按照行进距离寻找所在片段
        // TODO: 也可以根据progress进度寻找所在分段

        var current = sum * progress;

        // 找到当前轨迹运行区间
        var i = -1,
            len = steps.length;
        var step = steps[0];
        while (++i < len) {
            var s = steps[i];
            if (current <= s.length) {
                step = s;
                break;
            }
        }

        var _step$segment = _slicedToArray(step.segment, 2),
            p0 = _step$segment[0],
            p1 = _step$segment[1],
            subLength = 0;

        if (i == 0) {
            subLength = current;
        } else {
            subLength = current - steps[i - 1].length;
        }

        // 根据每段已行驶的距离，计算 x, y 坐标
        var scale = subLength / step.segmentLength;
        var out = _vector2['default'].create();
        // 这就是这一时刻的坐标点所在，这里待计算
        var position = _vector2['default'].create();
        _vector2['default'].sub(out, p1, p0);
        _vector2['default'].scaleAndAdd(position, p0, out, scale);

        position.step = step;

        return position;
    }
};

_clip2['default'].registerPlugin(plugin);

exports['default'] = plugin;