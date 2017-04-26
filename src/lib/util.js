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

function clone(obj) {
    return obj;
}

export default {
    remove,
    clone
};