var Animation = Animater.Animation,
    Clip = Animater.Clip,
    ShaderClip = Animater.ShaderClip;

var ConsoleReporter = jasmineRequire.ConsoleReporter();
var options = {
    timer: new jasmine.Timer,
    print: function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('[JASMINE]');
        console.log.apply(console, args);
    }
};

var consoleReporter = new ConsoleReporter(options); // initialize ConsoleReporter
jasmine.getEnv().addReporter(consoleReporter);

describe('Clip test', function () {

    var animationOptions = {
        'duration': 1000,
        'repeat': 1,
        'delay': 0,
        'easing': 'Linear'
    };

    it('Clip start() test ...ok', function () {
        var clip = new Clip(animationOptions);
        clip.start();

        expect(clip._isPlaying).toBe(true);
    });

    it('Clip update() test ...ok', function () {
        var clip = new Clip(animationOptions);
        clip.start();

        var res = clip.update(window.performance.now() + 500);
        expect(res).toBe(true);
        res = clip.update(window.performance.now() + 1500);
        expect(res).toBe(false);
    });

    it('Clip on(Event.START)/emit(Event.START) test ...ok', function (done) {
        var clip = new Clip(animationOptions);

        clip.on(Clip.Event.START, function () {
            expect(1).toBe(1);
            done();
        });

        clip.start();
    });

    it('Clip on(Event.STOP)/emit(Event.STOP) test ...ok', function (done) {
        var clip = new Clip(animationOptions);

        clip.on(Clip.Event.STOP, function () {
            expect(1).toBe(1);
            done();
        });

        clip.start();
        // clip.update(window.performance.now() + 500);
        clip.stop();
    });

    it('Clip on(Event.UPDATE)/emit(Event.UPDATE) test ...ok', function (done) {
        var clip = new Clip(animationOptions);

        clip.on(Clip.Event.UPDATE, function (progress) {
            expect(typeof progress == 'number' && progress <= 1).toBe(true);
            done();
        });
        clip.start();

        clip.update(window.performance.now() + 500);
    });

    it('Clip on(Event.COMPLETE)/emit(Event.COMPLETE) test ...ok', function (done) {
        var clip = new Clip(animationOptions);

        clip.on(Clip.Event.COMPLETE, function () {
            expect(1).toBe(1);
            done();
        });
        clip.start();

        clip.update(window.performance.now() + 5000);
    });

    it('Clip on(Event.REPEAT_COMPLETE)/emit(Event.REPEAT_COMPLETE) test ...ok', function (done) {
        animationOptions = {
            'duration': 1000,
            'repeat': 2
        };

        var clip = new Clip(animationOptions);

        clip.on(Clip.Event.REPEAT_COMPLETE, function (repeat) {
            expect(typeof repeat == 'number' && repeat > 0).toBe(true);
            done();
        });
        clip.start();

        clip.update(window.performance.now() + 1500);
    });

    it('Clip COMPLETE Event arguments test ...ok', function (done) {
        animationOptions = {
            'durtaion': 1000,
            'repeat': 1
        };

        var clip = new Clip(animationOptions);

        clip.on(Clip.Event.COMPLETE, function (args) {
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

describe('ShaderClip test', function () {
    var animationOptions = {
        'duration': 1000,
        'repeat': 1,
        'delay': 0,
        'easing': 'Linear'
    };

    var attr = {
        x: [ 0, 100 ],
        y: [ 200, 400 ],
        color: [ '#f00', '#00f' ]
    };

    it('ShaderClip update() test ...ok', function () {
        var clip = new ShaderClip(animationOptions, attr);
        clip.start();

        var res = clip.update(window.performance.now() + 500);
        expect(res).toBe(true);
        res = clip.update(window.performance.now() + 1500);
        expect(res).toBe(false);
    });

    it('ShaderClip on(Event.UPDATE)/emit(Event.UPDATE) test ...ok', function (done) {
        var clip = new ShaderClip(animationOptions, attr);

        clip.on(ShaderClip.Event.UPDATE, function (progress, keyframe, args) {
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

describe('Animation test', function () {
    var ani;

    it('Animation Event.UPDATE/UPDATE_AFTER test ...ok', function (done) {
        ani = new Animation();
        var clip = new Clip({
            duration: 500,
            repeat: 1
        });

        clip.start();
        ani.addClip(clip);

        var t, t1;
        ani.on(Animation.Event.UPDATE, function (timestamp) {
            ani.stop();
            t = window.performance.now();
            expect(typeof timestamp == 'number').toBe(true);
        });

        ani.on(Animation.Event.AFTER_UPDATE, function (timestamp) {
            t1 = window.performance.now();
            expect(typeof timestamp == 'number').toBe(true);
            expect(t1 > t).toBe(true);
            done();
        });

        ani.start();
    });

});