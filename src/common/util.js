/**
 * @file Utils
 * @author redmed
 * @date 2017/4/26
 */

function pullAt(array, indexes) {
    let length = array ? indexes.length : 0;

    // if (length > 0) {
    //     while (length--) {
    //         let index = indexes[length];
    //         Array.prototype.splice.call(array, index, 1);
    //     }
    // }
    while(length-- > 0) {
        let index = indexes[length];
        array.splice(index, 1);
    }

    return array;
}

export function remove(array, predicate) {
    let result = [];

    if (!(array && array.length)) {
        return result;
    }

    if (typeof predicate === 'function') {
        let index = -1,
            indexes = [],
            length = array.length;

        while (++index < length) {
            let value = array[index];
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
export function normalize(arr, options = {}) {

    if (!Array.isArray(arr)) {
        return arr;
    }

    let {
        type = '',
        range = [0, 1],
        min = Math.min.apply(Math, arr),
        max = Math.max.apply(Math, arr)
        /*, base = 10*/
    } = options;
    type = type.toLowerCase();

    let normalizationArr = [];

    let diff = max - min;

    let i = -1, len = arr.length;
    while (++i < len) {
        let v = arr[i];
        if (v > max) {
            v = max;
        }

        if (v < min) {
            v = min;
        }

        let v2;
        if (type !== 'log') {
            v2 = (v - min) / diff;
        } else {
            v2 = Math.log10(v);
        }

        normalizationArr.push(v2);
    }

    if (type === 'log') {
        normalizationArr = normalize(normalizationArr);
    }

    // 非标准归一
    let [rMin, rMax] = range;
    if (rMin !== 0 || rMax !== 1) {
        let i = -1, len = normalizationArr.length;
        let diff = rMax - rMin;
        let norArr = [];
        while (++i < len) {
            let v = normalizationArr[i];
            let v2 = diff * v + rMin;

            norArr.push(v2);
        }

        normalizationArr = norArr;
    }

    return normalizationArr;

}

export function forInMap(obj, callback) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let value = obj[key];
            callback(value, key, obj);
        }
    }
}
