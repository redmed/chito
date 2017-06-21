'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clip = require('../../clip');

var _clip2 = _interopRequireDefault(_clip);

var _colorhelper = require('./colorhelper');

var _colorhelper2 = _interopRequireDefault(_colorhelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 颜色插件
 * @author qiaogang
 * @date 2017/6/5
 */

var plugin = {

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
  test: function test(value, key) {

    return _colorhelper2['default'].isColor(value);
  },


  /**
   * @param {*} value 待解析的数据
   * @param {string=} key 解析数据名称
   * @returns {*} 解析中间过程的值
   */
  parse: function parse(value, key) {

    return _colorhelper2['default'].toNormalArray(value);
  },


  /**
   * 获取实际值
   * @param {*} parsedValue
   * @param {number} progress 经过缓动函数变换后的进度
   * @param {number=} elapsed 缓动变换前的原进度
   * @param {string=} key
   * @returns {*}
   */
  valueOf: function valueOf(parsedValue, progress, elapsed, key) {

    var val = _colorhelper2['default'].linearGradient(parsedValue, progress);
    val = _colorhelper2['default'].toRGBA(val);

    return val;
  }
};

_clip2['default'].registerPlugin(plugin);

exports['default'] = plugin;