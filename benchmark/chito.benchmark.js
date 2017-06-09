var Animation = Chito.Animation,
    Clip = Chito.Clip;

suite('Clip.update() benchmark test', function () {
    var clips = [],
        shaders = [],
        shaders2 = [],
        tweens = [];

    var i = 0, m = 5000;
    while (i++ < m) {
        // Clip
        var clip = new Clip({
            duration: 9999999999,
            repeat: 9999999999
        });

        clips.push(clip);
        clip.start();

        // Shader
        var shader = new Clip({
            duration: 9999999999,
            repeat: 9999999999
        }, {
            x: [ 0, 100 ],
            y: [ 100, 0 ],
            color: [ 'red', 'blue' ]
        });

        shaders.push(shader);
        shader.start();

        var shader2 = new Clip({
            duration: 9999999999,
            repeat: 9999999999,
            colorSupport: false
        }, {
            x: [ 0, 100 ],
            y: [ 100, 0 ]
        });

        shaders2.push(shader2);
        shader2.start();

        // Tween
        var from = { x: 0, y: 100 };
        var tween = new TWEEN.Tween(from)
            .to({ x: 100, y: 0 }, 99999999)
            .start();

        tweens.push(tween);
    }

    bench('Tween update ', function () {
        var j = 0;
        while (j < m) {
            var tw = tweens[ j++ ];
            tw.update(Date.now());
        }
    });

    // bench('Clip update ', function () {
    //     var j = 0;
    //     while (j < m) {
    //         var clip = clips[ j++ ];
    //         clip.update(Date.now());
    //     }
    // });

    bench('Clip update (color not support) ', function () {
        var j = 0;
        while (j < m) {
            var shader = shaders2[ j++ ];
            shader.update(Date.now());
        }
    });

    bench('Clip update (color support) ', function () {
        var j = 0;
        while (j < m) {
            var shader = shaders[ j++ ];
            shader.update(Date.now());
        }
    });
});

suite('create Class', function () {

    var opt = {
        duration: 1000,
        repeat: 1
    };

    bench('new Tween', function () {
        var from = { x: 0 };
        new TWEEN.Tween(from)
            .to({ x: 100 });
    });

    // bench('new Clip', function () {
    //     new Clip(opt);
    // });

    bench('new Clip (color not support) ', function () {
        new Clip({
            duration: 1000,
            repeat: 1,
        }, {
            x: [ 0, 100 ]
        });
    });

    bench('new Clip (color support) ', function () {
        new Clip({
            duration: 1000,
            repeat: 1,
        }, {
            x: [ 0, 100 ],
            color: [ 'red', 'blue', '#0fe' ]
        });
    });

});

suite('Animation._update()', function () {

    var ani = new Animation();
    var ani2 = new Animation();

    var clips = [], clips2 = [];

    var i = 0, m = 5000;

    while (i++ < m) {
        // Clip
        var clip = new Clip({
            duration: 999999,
            repeat: 99999
        });

        clips.push(clip);
        clip.start();

        var clip2 = new Clip({
            duration: 999999,
            repeat: 99999
        });

        clips2.push(clip2);
        clip2.start();

    }

    ani.addClip(clips);
    ani2.addClip(clips2);

    bench('Animation._update()', function () {
        ani._update(Date.now());
    });

});