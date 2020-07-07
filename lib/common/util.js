"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = remove;
exports.normalize = normalize;
exports.forInMap = forInMap;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @file Utils
 * @author redmed
 * @date 2017/4/26
 */
function pullAt(array, indexes) {
  var length = array ? indexes.length : 0; // if (length > 0) {
  //     while (length--) {
  //         let index = indexes[length];
  //         Array.prototype.splice.call(array, index, 1);
  //     }
  // }

  while (length-- > 0) {
    var index = indexes[length];
    array.splice(index, 1);
  }

  return array;
}

function remove(array, predicate) {
  var result = [];

  if (!(array && array.length)) {
    return result;
  }

  if (typeof predicate === 'function') {
    var index = -1,
        indexes = [],
        length = array.length;

    while (++index < length) {
      var value = array[index];

      if (predicate(value, index, array)) {
        result.push(value);
        indexes.push(index);
      }
    }

    pullAt(array, indexes);
  }

  return result;
}
/**
 * 数据归一化
 * 将数据归一到 [0, 1] 区间, 目前仅支持离差归一和log归一
 * @param {Array} arr 待归一的数据
 * @param {Object} options
 * @options {string=} options.type 归一方法 默认 'minmax'离差归一 / 'log' log归一
 * @options {Array.<number>=} options.range 归一范围 默认 [0, 1]
 */


function normalize(arr) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!Array.isArray(arr)) {
    return arr;
  }

  var _options$type = options.type,
      type = _options$type === void 0 ? '' : _options$type,
      _options$range = options.range,
      range = _options$range === void 0 ? [0, 1] : _options$range,
      _options$min = options.min,
      min = _options$min === void 0 ? Math.min.apply(Math, arr) : _options$min,
      _options$max = options.max,
      max = _options$max === void 0 ? Math.max.apply(Math, arr) : _options$max;
  type = type.toLowerCase();
  var normalizationArr = [];
  var diff = max - min;
  var i = -1,
      len = arr.length;

  while (++i < len) {
    var v = arr[i];

    if (v > max) {
      v = max;
    }

    if (v < min) {
      v = min;
    }

    var v2 = void 0;

    if (type !== 'log') {
      v2 = (v - min) / diff;
    } else {
      v2 = Math.log10(v);
    }

    normalizationArr.push(v2);
  }

  if (type === 'log') {
    normalizationArr = normalize(normalizationArr);
  } // 非标准归一


  var _range = _slicedToArray(range, 2),
      rMin = _range[0],
      rMax = _range[1];

  if (rMin !== 0 || rMax !== 1) {
    var _i2 = -1,
        _len = normalizationArr.length;

    var _diff = rMax - rMin;

    var norArr = [];

    while (++_i2 < _len) {
      var _v = normalizationArr[_i2];

      var _v2 = _diff * _v + rMin;

      norArr.push(_v2);
    }

    normalizationArr = norArr;
  }

  return normalizationArr;
}

function forInMap(obj, callback) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var value = obj[key];
      callback(value, key, obj);
    }
  }
} // export default {
//     remove,
//     normalize,
//     forInMap,
// };