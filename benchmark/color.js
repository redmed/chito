import ColorHelper from '../src/plugins/color/colorhelper';

let [I, J, K] = [ 10000, 100, 10 ];

let colors = [];

for (let i = 0; i < K; i++) {

    let r = (Math.random() * 255) >> 0;
    let g = (Math.random() * 255) >> 0;
    let b = (Math.random() * 255) >> 0;
    let a = Math.random();

    let color = [ r, g, b, a ];

    colors.push(color);
}

suite('color', () => {
    bench('linearGradient ', () => {

        let k = 0;
        while (k++ < J) {
            let p = Math.random();

            ColorHelper.linearGradient(colors, p);
        }
    });

});

