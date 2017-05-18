var Animation = Animater.Animation,
    Clip = Animater.Clip,
    ShaderClip = Animater.ShaderClip;

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
        var shader = new ShaderClip({
            duration: 9999999999,
            repeat: 9999999999
        }, {
            x: [ 0, 100 ],
            y: [ 100, 0 ],
            color: [ 'red', 'blue' ]
        });

        shaders.push(shader);
        shader.start();

        var shader2 = new ShaderClip({
            duration: 9999999999,
            repeat: 9999999999,
            colorSupport: false
        }, {
            x: [ 0, 100 ],
            y: [ 100, 0 ],
            // color: [ 'red', 'blue' ]
        });

        shaders2.push(shader2);
        shader2.start();

        // Tween
        var from = { x: 0, y: 100 };
        var tween = new TWEEN.Tween(from)
            .to({ x: 100, y: 0 })
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

    bench('Clip update ', function () {
        var j = 0;
        while (j < m) {
            var clip = clips[ j++ ];
            clip.update(Date.now());
        }
    });

    bench('ShaderClip update (color not support) ', function () {
        var j = 0;
        while (j < m) {
            var shader = shaders2[ j++ ];
            shader.update(Date.now());
        }
    });

    bench('ShaderClip update (color support) ', function () {
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

    var keyframe = {
        x: [ 0, 100 ],
        color: [ 'red', 'blue', '#0fe' ]
    };

    bench('new Tween', function () {
        var from = { x: 0 };
        new TWEEN.Tween(from)
            .to({ x: 100 });
    });

    bench('new Clip', function () {
        new Clip(opt);
    });

    bench('new ShaderClip (color not support) ', function () {
        new ShaderClip({
            duration: 1000,
            repeat: 1,
            colorSupport: false
        }, keyframe);
    });

    bench('new ShaderClip (color support) ', function () {
        new ShaderClip({
            duration: 1000,
            repeat: 1,
        }, keyframe);
    });

});

suite('Animation._update()', function () {

    var ani = new Animation();
    var ani2 = new Animation();

    var clips = [];

    var i = 0, m = 5000;

    while (i++ < m) {
        // Clip
        var clip = new Clip({
            duration: 999999,
            repeat: 99999
        });

        clips.push(clip);
        clip.start();

    }

    ani.addClip(clips);
    ani2.addClip(clips);

    bench('Animation._update()', function () {
        ani._update(Date.now());
    });

});

suite('Animation._update()', function () {

    var hash = {},
        list = [];
    var i = 0, m = 5000;

    while (i++ < m) {
        hash[ i ] = i;
        list.push(i);
    }

    bench('for...in loop', function () {
        for (var key in hash) {
            let v = hash[ key ];

            let x = v * v;
        }
    });

    bench('while loop', function () {

        let i = 0, len = list.length;

        while (i < len) {
            let v = list[ i++ ];

            let x = v * v;
        }
    });

});