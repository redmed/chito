import { Clip, ShaderClip as Shader } from '../src/main';

suite('Clip benchmark test', () => {
    let clips = [],
        shaders = [];

    let i = 0, m = 5000;
    while (i++ < m) {
        // Clip
        let clip = new Clip({
            duration: 9999999999,
            repeat: 9999999999
        });

        clips.push(clip);
        clip.start();

        // Shader
        let shader = new Shader({
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
        let j = 0;
        while (j < m) {
            let shader = shaders[ j++ ];
            shader.update(Date.now());
        }
    });

    bench('Clip update ', () => {
        let j = 0;
        while (j < m) {
            let clip = clips[ j++ ];
            clip.update(Date.now());
        }
    });

});

suite('create Class', () => {

    let opt = {
        duration: 1000,
        repeat: 1
    };

    let keyframe = {
        x: [ 0, 100 ],
        color: [ 'red', 'blue', '#0fe' ]
    };

    bench('new ShaderClip', () => {
        new Shader(opt, keyframe);
    });

    bench('new Clip', () => {
        new Clip(opt);
    });

});
