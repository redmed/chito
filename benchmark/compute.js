import colorHelper from '../src/plugins/color/colorhelper';

suite('toString() vs + ""', () => {
    bench('toString()', () => {
        let s = 1234;
        let s1 = s.toString();
    });

    bench('+ ""', () => {

        let s = 1234;
        let s1 = s + '';
    });

});

suite('String concat', () => {
    bench('Array.join("")', () => {
        let s = [ 1, 2, 3, 4 ];
        let s1 = s.join('');
    });

    bench('Array + ""', () => {
        let s = [ 1, 2, 3, 4 ];
        let i = 0, len = s.length;
        let s1 = '';

        while (i < len) {
            s1 += s[ i++ ];
        }
    });
});

suite('ColorHelper', () => {
    bench('toRGBA() ... 1', () => {
        let s = [ 121, 212, 23, 0.1 ];
        colorHelper.toRGBA(s);
    });
});

suite('Loop', function () {

    var hash = {},
        list = [];
    var i = 0, m = 5000;

    while (i++ < m) {
        hash[ i ] = i;
        list.push({
            name: i,
            value: i
        });
    }

    bench('for...in loop', function () {
        for (var key in hash) {
            let v = hash[ key ];

            // let x = v * v;
        }
    });

    bench('while loop', function () {

        let i = 0, len = list.length;

        while (i < len) {
            let v = list[ i++ ].name;

            // let x = v * v;
        }
    });

});

suite('indexOf vs key-value', function() {

    var i = -1, len = 1000;
    var list = [];
    var hashMap = {};
    while(++i < len) {
        let item = {
            id: i,
            value: i
        };
        list.push(item);
        hashMap[i] = item;
    }


    bench('indexOf()', function() {

        var pos = (Math.random() * 1000) >> 0;
        var findIt = list[pos];

        list.indexOf(findIt);

    });

    bench('key-value check', function() {

        var pos = (Math.random() * 1000) >> 0;
        var findIt = list[pos];

        hashMap[findIt.id];

    });
});