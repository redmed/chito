/**
 * @file Utils
 * @author redmed
 * @date 2017/4/26
 */

function pullAt(array, indexes) {
    let length = array ? indexes.length : 0;

    if (length > 0) {
        while (length--) {
            let index = indexes[ length ];
            Array.prototype.splice.call(array, index, 1);
        }
    }

    return array;
}

function remove(array, predicate) {
    let result = [];

    if (!(array && array.length)) {
        return result;
    }

    if (typeof predicate == 'function') {
        let index = -1,
            indexes = [],
            length = array.length;

        while (++index < length) {
            let value = array[ index ];
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
function normalize(arr, options = {}) {

    if (!Array.isArray(arr)) {
        return arr;
    }

    let { type = '', range = [ 0, 1 ] /*, base = 10*/ } = options;

    let normalizationArr = [];
    let max = Math.max.apply(Math, arr),
        min = Math.min.apply(Math, arr);

    if (type != 'log') {
        let diff = max - min;

        let i = -1, len = arr.length;
        while (++i < len) {
            let v = arr[ i ];
            let v2 = (v - min) / diff;

            normalizationArr.push(v2);
        }
    }
    else {
        let i = -1, len = arr.length;
        while (++i < len) {
            let v = arr[ i ];
            let v2 = Math.log10(v);
            // if (base != 10) {
            //     v2 = v2 / Math.log10(base);
            // }

            normalizationArr.push(v2);
        }

        normalizationArr = normalize(normalizationArr);
    }

    // 非标准归一
    let [ rMin, rMax ] = range;
    if (rMin != 0 || rMax != 1) {
        let i = -1, len = normalizationArr.length;
        let diff = rMax - rMin;
        let norArr = [];
        while (++i < len) {
            let v = normalizationArr[ i ];
            let v2 = diff * v + rMin;

            norArr.push(v2);
        }

        normalizationArr = norArr;
    }

    return normalizationArr;

}

export default {
    remove,
    normalize,
};