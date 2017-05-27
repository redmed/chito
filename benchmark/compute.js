import colorHelper from '../src/lib/colorhelper';

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

suite('', () => {
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
