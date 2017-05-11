/**
 * @file 动画库 测试用例
 * @author qiaogang
 * @date 16/7/30
 */

import { Animation, Clip, ShaderClip } from '../src/main';

describe('Clip test', () => {

    let animationOptions = {
        [Clip.Attr.DURATION]: 1000,
        [Clip.Attr.REPEAT]: 1,
        [Clip.Attr.DELAY]: 0,
        [Clip.Attr.EASING]: 'Linear'
    };

    it('Clip start() test ...ok', () => {
        let clip = new Clip(animationOptions);
        clip.start();

        expect(clip._isPlaying).toBe(true);
    });

    it('Clip update() test ...ok', () => {
        let clip = new Clip(animationOptions);
        clip.start();

        let res = clip.update(window.performance.now() + 500);
        expect(res).toBe(true);
        res = clip.update(window.performance.now() + 1500);
        expect(res).toBe(false);
    });

    it('Clip on(Event.START)/emit(Event.START) test ...ok', (done) => {
        let clip = new Clip(animationOptions);

        clip.on(Clip.Event.START, () => {
            expect(1).toBe(1);
            done();
        });

        clip.start();
    });

    it('Clip on(Event.STOP)/emit(Event.STOP) test ...ok', (done) => {
        let clip = new Clip(animationOptions);

        clip.on(Clip.Event.STOP, () => {
            expect(1).toBe(1);
            done();
        });

        clip.start();
        // clip.update(window.performance.now() + 500);
        clip.stop();
    });

    it('Clip on(Event.UPDATE)/emit(Event.UPDATE) test ...ok', (done) => {
        let clip = new Clip(animationOptions);

        clip.on(Clip.Event.UPDATE, (progress) => {
            expect(typeof progress == 'number' && progress <= 1).toBe(true);
            done();
        });
        clip.start();

        clip.update(window.performance.now() + 500);
    });

    it('Clip on(Event.COMPLETE)/emit(Event.COMPLETE) test ...ok', (done) => {
        let clip = new Clip(animationOptions);

        clip.on(Clip.Event.COMPLETE, () => {
            expect(1).toBe(1);
            done();
        });
        clip.start();

        clip.update(window.performance.now() + 5000);
    });

    it('Clip on(Event.REPEAT_COMPLETE)/emit(Event.REPEAT_COMPLETE) test ...ok', (done) => {
        animationOptions = {
            [Clip.Attr.DURATION]: 1000,
            [Clip.Attr.REPEAT]: 2
        };

        let clip = new Clip(animationOptions);

        clip.on(Clip.Event.REPEAT_COMPLETE, (repeat) => {
            expect(typeof repeat == 'number' && repeat > 0).toBe(true);
            done();
        });
        clip.start();

        clip.update(window.performance.now() + 1500);
    });

    it('Clip Complete Event arguments test ...ok', (done) => {
        animationOptions = {
            [Clip.Attr.DURATION]: 1000,
            [Clip.Attr.REPEAT]: 1
        };

        let clip = new Clip(animationOptions);

        clip.on(Clip.Event.COMPLETE, (args) => {
            expect(typeof args.options == 'object'
                && args.options[ Clip.Attr.DURATION ] === animationOptions[ Clip.Attr.DURATION ])
                .toBe(true);
            expect(typeof args.options == 'object'
                && args.options[ Clip.Attr.REPEAT ] === animationOptions[ Clip.Attr.REPEAT ])
                .toBe(true);

            done();
        });
        clip.start();

        clip.update(window.performance.now() + 1500);
    });
});

describe('ShaderClip test', () => {
    let animationOptions = {
        [ShaderClip.Attr.DURATION]: 1000,
        [ShaderClip.Attr.REPEAT]: 1,
        [ShaderClip.Attr.DELAY]: 0,
        [ShaderClip.Attr.EASING]: 'Linear'
    };

    let attr = {
        x: [ 0, 100 ],
        y: [ 200, 400 ],
        color: [ '#f00', '#00f' ]
    };

    it('ShaderClip update() test ...ok', () => {
        let clip = new ShaderClip(animationOptions, attr);
        clip.start();

        let res = clip.update(window.performance.now() + 500);
        expect(res).toBe(true);
        res = clip.update(window.performance.now() + 1500);
        expect(res).toBe(false);
    });

    it('ShaderClip on(Event.UPDATE)/emit(Event.UPDATE) test ...ok', (done) => {
        let clip = new ShaderClip(animationOptions, attr);

        clip.on(ShaderClip.Event.UPDATE, (progress, keyframe, args) => {
            expect(typeof progress == 'number' && progress <= 1).toBe(true);
            expect(typeof keyframe == 'object'
                && typeof keyframe.x == 'number'
                && keyframe.x < 100).toBe(true);
            expect(typeof args.options == 'object'
                && args.options[ ShaderClip.Attr.DURATION ] === animationOptions[ ShaderClip.Attr.DURATION ]).toBe(true);

            done();
        });
        clip.start();

        clip.update(window.performance.now() + 500);
    });

});

describe('Animation test', () => {
    let ani;

    it('Animation constructor test ...ok', () => {
        let a = new Animation();
        expect(a._status).toBe(0);
    });

    it('Animation Event.UPDATE/UPDATE_AFTER test ...ok', (done) => {
        ani = new Animation();
        let clip = new Clip({
            duration: 500,
            repeat: 1
        });

        clip.start();
        ani.addClip(clip);

        let t, t1;
        ani.on(Animation.Event.UPDATE, (timestamp) => {
            ani.stop();
            t = window.performance.now();
            expect(typeof timestamp == 'number').toBe(true);
        });

        ani.on(Animation.Event.AFTER_UPDATE, (timestamp) => {
            t1 = window.performance.now();
            expect(typeof timestamp == 'number').toBe(true);
            expect(t1 > t).toBe(true);
            done();
        });

        ani.start();
    });

});