"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _csscolorparser = _interopRequireDefault(require("./csscolorparser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var parseCSSColor = _csscolorparser["default"].parseCSSColor;

function _clamp_css_byte(i) {
  // Clamp to integer 0 .. 255.
  i = Math.round(i); // Seems to be what Chrome does (vs truncation).

  return i < 0 ? 0 : i > 255 ? 255 : i;
}

function _clamp_css_float(f) {
  // Clamp to float 0.0 .. 1.0.
  return f < 0 ? 0 : f > 1 ? 1 : f;
}

var ColorHelper = {
  /**
   * 判断是否为颜色类型
   * @param {string|Array.<string>} color
   * @returns {boolean}
   */
  isColor: function isColor(color) {
    if (typeof color === 'string') {
      return !!(0, _csscolorparser["default"])(color);
    } else if (Array.isArray(color)) {
      var i = 0,
          len = color.length;

      while (i < len) {
        var c = color[i++];

        if (typeof c === 'string') {
          if (!parseCSSColor(c)) {
            return false;
          }
        } else {
          return false;
        }
      }

      return true;
    }

    return false;
  },
  toColorIncrease: function toColorIncrease(inc) {
    return [inc[0] || 0, inc[1] || 0, inc[2] || 0, inc[3] || 0];
  },

  /**
   * 转换为 CSS 标准颜色格式
   * @param {string|Array.<string>} color
   * @returns {Array|*}
   */
  toNormal: function toNormal(color) {
    if (Array.isArray(color)) {
      var colorArr = [];
      var i = 0,
          len = color.length;

      while (i < len) {
        var c = color[i++];

        if (typeof c === 'string') {
          var cssColor = parseCSSColor(c);

          if (!cssColor) {
            return null;
          } else {
            colorArr.push(cssColor);
          }
        } else {
          return null;
        }
      }

      return colorArr;
    } else if (typeof color === 'string') {
      return parseCSSColor(color);
    } else {
      return null;
    }
  },
  toNormalArray: function toNormalArray(color) {
    if (Array.isArray(color)) {
      var colorArr = [];
      var i = 0,
          len = color.length;

      while (i < len) {
        var c = color[i++];

        if (typeof c === 'string') {
          var cssColor = parseCSSColor(c);

          if (!cssColor) {
            return null;
          } else {
            colorArr.push(cssColor);
          }
        } else {
          return null;
        }
      }

      return colorArr;
    } else if (typeof color === 'string') {
      return [parseCSSColor(color)];
    } else {
      return null;
    }
  },

  /**
   * 颜色渐变
   * @param {Array} steps 渐变步进, 使用标准 CSS 颜色
   * @param {number=0} progress 进度 [0 - 1]
   * @returns {Array} 标准 CSS 颜色
   * @example:
   * var c0 = [0, 0, 0, 0], c1 = [100, 100, 100, 1];
   * linearGradient([c0, c1], 0.5) => [50, 50, 50, 0.5]
   */
  linearGradient: function linearGradient(steps) {
    var progress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var interpolation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ColorHelper.Utils.Linear;
    var m = steps.length - 1;
    var f = m * progress;
    var i = f >> 0;
    var fn = interpolation;

    var fns = function fns(p0, p1, t) {
      var _p = _slicedToArray(p0, 4),
          r0 = _p[0],
          g0 = _p[1],
          b0 = _p[2],
          a0 = _p[3];

      var _p2 = _slicedToArray(p1, 4),
          r1 = _p2[0],
          g1 = _p2[1],
          b1 = _p2[2],
          a1 = _p2[3];

      var rgba = [fn(r0, r1, t) >> 0, fn(g0, g1, t) >> 0, fn(b0, b1, t) >> 0, fn(a0, a1, t)];
      return rgba;
    };

    var s0 = steps[i];
    var s1 = steps[i + 1 > m ? m : i + 1];
    var t = f - i;
    return fns(s0, s1, t);
  },

  /**
   * 混合颜色
   * @param {Array} color
   * @param {Array} increase
   * @returns {*}
   */
  mixColors: function mixColors(color, increase) {
    var c = this.toNormal(color);

    if (Array.isArray(increase) && c) {
      var _ref = [_clamp_css_byte(c[0] + increase[0] || 0), _clamp_css_byte(c[1] + increase[1] || 0), _clamp_css_byte(c[2] + increase[2] || 0), _clamp_css_float(c[3] + increase[3] || 0)],
          r = _ref[0],
          g = _ref[1],
          b = _ref[2],
          a = _ref[3];
      var rgba = [r, g, b, a].join(',');
      return 'rgba(' + rgba + ')';
    } else {
      return color;
    }
  },

  /**
   * 数组格式 => rgba格式
   * @param {Array} color
   * @returns {string}
   */
  toRGBA: function toRGBA(color) {
    if (color && color.length >= 3) {
      var alpha = typeof color[3] === 'undefined' ? 1 : color[3];

      var r = _clamp_css_byte(color[0]),
          g = _clamp_css_byte(color[1]),
          b = _clamp_css_byte(color[2]),
          a = _clamp_css_float(alpha); // Maybe slower..
      // let rgba = [ r, g, b, a ].join(',');


      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    } else {
      return 'transparent';
    }
  },
  Utils: {
    Linear: function Linear(p0, p1, t) {
      return (p1 - p0) * t + p0;
    }
  }
};
var _default = ColorHelper;
exports["default"] = _default;