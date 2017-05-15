var Animation = Animater.Animation,
    Clip = Animater.Clip,
    ShaderClip = Animater.ShaderClip;

suite('Clip.update() benchmark test', () => {
    var clips = [],
        shaders = [];

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
            color: [ 'red', 'blue', '#0fe' ]
        });

        shaders.push(shader);
        shader.start();

    }

    bench('ShaderClip update ', () => {
        var j = 0;
        while (j < m) {
            var shader = shaders[ j++ ];
            shader.update(Date.now());
        }
    });

    bench('Clip update ', () => {
        var j = 0;
        while (j < m) {
            var clip = clips[ j++ ];
            clip.update(Date.now());
        }
    });

});

suite('create Class', () => {

    var opt = {
        duration: 1000,
        repeat: 1
    };

    var keyframe = {
        x: [ 0, 100 ],
        color: [ 'red', 'blue', '#0fe' ]
    };

    bench('new ShaderClip', () => {
        new ShaderClip(opt, keyframe);
    });

    bench('new Clip', () => {
        new Clip(opt);
    });

});

suite('Animation._update()', () => {

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

    bench('Animation._update()', () => {
        ani._update(Date.now());
    });

});