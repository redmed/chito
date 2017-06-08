/**
 * @file 颜色处理帮助类
 * @author redmed
 * @date 16/8/17
 */

import cssColorParser from 'csscolorparser';
const parseCSSColor = cssColorParser.parseCSSColor;

function _clamp_css_byte(i) {  // Clamp to integer 0 .. 255.
    i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
    return i < 0 ? 0 : i > 255 ? 255 : i;
}

function _clamp_css_float(f) {  // Clamp to float 0.0 .. 1.0.
    return f < 0 ? 0 : f > 1 ? 1 : f;
}

const ColorHelper = {

    /**
     * 判断是否为颜色类型
     * @param {string|Array.<string>} color
     * @returns {boolean}
     */
    isColor(color) {
        if (typeof color === 'string') {
            return !!cssColorParser(color);
        }
        else if (Array.isArray(color)) {
            let i = 0, len = color.length;

            while (i < len) {
                let c = color[ i++ ];

                if (typeof c === 'string') {
                    if (!parseCSSColor(c)) {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }

            return true;
        }

        return false;
    },

    isColorIncrease(inc) {
        if (Array.isArray(color)) {
            return color.length > 0;
        }

        return false;
    },

    toColorIncrease(inc) {
        return [ inc[ 0 ] || 0, inc[ 1 ] || 0, inc[ 2 ] || 0, inc[ 3 ] || 0 ];
    },

    /**
     * 转换为 CSS 标准颜色格式
     * @param {string|Array.<string>} color
     * @returns {Array|*}
     */
    toNormal(color) {
        if (Array.isArray(color)) {
            let colorArr = [];
            let i = 0, len = color.length;

            while (i < len) {
                let c = color[ i++ ];

                if (typeof c === 'string') {
                    let cssColor = parseCSSColor(c);

                    if (!cssColor) {
                        return null;
                    }
                    else {
                        colorArr.push(cssColor);
                    }
                }
                else {
                    return null;
                }
            }

            return colorArr;
        }
        else if (typeof color === 'string') {
            return parseCSSColor(color);
        }
        else {
            return null;
        }
    },

    toNormalArray(color) {
        if (Array.isArray(color)) {
            let colorArr = [];
            let i = 0, len = color.length;

            while (i < len) {
                let c = color[ i++ ];

                if (typeof c === 'string') {
                    let cssColor = parseCSSColor(c);

                    if (!cssColor) {
                        return null;
                    }
                    else {
                        colorArr.push(cssColor);
                    }
                }
                else {
                    return null;
                }
            }

            return colorArr;
        }
        else if (typeof color === 'string') {
            return [ parseCSSColor(color) ];
        }
        else {
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
    linearGradient(steps, progress = 0, interpolation = ColorHelper.Utils.Linear) {
        let m = steps.length - 1;
        let f = m * progress;
        let i = f >> 0;
        let fn = interpolation;

        let fns = (p0, p1, t) => {
            let [ r0, g0, b0, a0 ] = p0;
            let [ r1, g1, b1, a1 ] = p1;

            let rgba = [
                fn(r0, r1, t) >> 0,
                fn(g0, g1, t) >> 0,
                fn(b0, b1, t) >> 0,
                fn(a0, a1, t)
            ];

            return rgba;
        };

        let s0 = steps[ i ];
        let s1 = steps[ i + 1 > m ? m : i + 1 ];
        let t = f - i;

        return fns(s0, s1, t);
    },

    /**
     * 混合颜色
     * @param {Array} color
     * @param {Array} increase
     * @returns {*}
     */
    mixColors(color, increase) {
        let c = this.toNormal(color);
        if (Array.isArray(increase) && c) {
            let [ r, g, b, a ] = [
                _clamp_css_byte(c[ 0 ] + increase[ 0 ] || 0),
                _clamp_css_byte(c[ 1 ] + increase[ 1 ] || 0),
                _clamp_css_byte(c[ 2 ] + increase[ 2 ] || 0),
                _clamp_css_float(c[ 3 ] + increase[ 3 ] || 0)
            ];

            let rgba = [ r, g, b, a ].join(',');

            return 'rgba(' + rgba + ')';
        }
        else {
            return color;
        }
    },

    /**
     * 数组格式 => rgba格式
     * @param {Array} color
     * @returns {string}
     */
    toRGBA(color) {
        if (color && color.length >= 3) {
            let alpha = typeof color[ 3 ] === 'undefined' ? 1 : color[ 3 ];
            let r = _clamp_css_byte(color[ 0 ]),
                g = _clamp_css_byte(color[ 1 ]),
                b = _clamp_css_byte(color[ 2 ]),
                a = _clamp_css_float(alpha);

            // Maybe slower..
            // let rgba = [ r, g, b, a ].join(',');

            return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }
        else {
            return 'transparent';
        }
    },

    Utils: {
        Linear: (p0, p1, t) => {

            return (p1 - p0) * t + p0;

        }
    }
};

export default ColorHelper;
