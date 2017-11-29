var Animation = Chito.Animation,
    Clip = Chito.Clip;

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

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Clip test', function () {

    var animationOptions = {
        'duration': 1000,
        'repeat': 1,
        'delay': 0,
        'easing': 'Linear'
    };

    it('Static attributes test ...ok', function () {
        expect(Clip.Event.UPDATE).toBe('update');
        expect(Clip.Event.START).toBe('start');
        expect(Clip.Event.STOP).toBe('stop');
        expect(Clip.Event.COMPLETE).toBe('complete');
        expect(Clip.Event.REPEAT_COMPLETE).toBe('repeatComplete');
    });

    it('.start() test ...ok', function () {
        var clip = new Clip(animationOptions);
        clip.start();

        expect(clip._stopped).toBe(false);
    });

    it('.update() test ...ok', function () {
        var clip = new Clip(animationOptions);
        clip.start();

        var res = clip.update(window.performance.now() + 500);
        expect(res).toBe(true);
        res = clip.update(window.performance.now() + 1500);
        expect(res).toBe(false);
    });

    it('.chain() test ...ok', function () {
        var clipA = new Clip(animationOptions);
        var clipB = new Clip(animationOptions);

        clipA.chain(clipB);

        expect(clipA._chainClips.length).toBe(1);
        expect(clipA._chainClips[0]).toBe(clipB);
    });

    it('.on(Event.START)/emit(Event.START) test ...ok', function (done) {
        var clip = new Clip(animationOptions);

        clip.on(Clip.Event.START, function () {
            expect(1).toBe(1);
            done();
        });

        clip.start();
    });

    it('.on(Event.STOP)/emit(Event.STOP) test ...ok', function (done) {
        var clip = new Clip(animationOptions);

        clip.on(Clip.Event.STOP, function () {
            expect(1).toBe(1);
            done();
        });

        clip.start();
        // clip.update(window.performance.now() + 500);
        clip.stop();
    });

    it('.on(Event.UPDATE)/emit(Event.UPDATE) test ...ok', function (done) {
        var clip = new Clip(animationOptions);

        clip.on(Clip.Event.UPDATE, function (progress) {
            expect(typeof progress == 'number' && progress <= 1).toBe(true);
            done();
        });
        clip.start();

        clip.update(window.performance.now() + 500);
    });

    it('.on(Event.COMPLETE)/emit(Event.COMPLETE) test ...ok', function (done) {
        var clip = new Clip(animationOptions);

        clip.on(Clip.Event.COMPLETE, function () {
            expect(1).toBe(1);
            done();
        });
        clip.start();

        clip.update(window.performance.now() + 5000);
    });

    it('.on(Event.REPEAT_COMPLETE)/emit(Event.REPEAT_COMPLETE) test ...ok', function (done) {
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

    // it('Clip COMPLETE Event arguments test ...ok', function (done) {
    //     animationOptions = {
    //         'durtaion': 1000,
    //         'repeat': 1
    //     };
    //
    //     var clip = new Clip(animationOptions);
    //
    //     clip.on(Clip.Event.COMPLETE, function (args) {
    //         expect(typeof args.options == 'object'
    //             && args.options[ Clip.Attr.DURATION ] === animationOptions[ Clip.Attr.DURATION ])
    //             .toBe(true);
    //         expect(typeof args.options == 'object'
    //             && args.options[ Clip.Attr.REPEAT ] === animationOptions[ Clip.Attr.REPEAT ])
    //             .toBe(true);
    //
    //         done();
    //     });
    //     clip.start();
    //
    //     clip.update(window.performance.now() + 1500);
    // });
});

describe('Clip attr test', function () {
    var animationOptions = {
        'duration': 1000,
        'repeat': 1,
        'delay': 0,
        'easing': 'Linear'
    };

    var attr = {
        x: [0, 100],
        y: [200, 400],
        color: ['#f00', '#00f']
    };

    it('Static attributes test ...ok', function () {
        expect(Clip.Event.UPDATE).toBe('update');
        expect(Clip.Event.START).toBe('start');
        expect(Clip.Event.STOP).toBe('stop');
        expect(Clip.Event.COMPLETE).toBe('complete');
        expect(Clip.Event.REPEAT_COMPLETE).toBe('repeatComplete');
    });

    it('.update() test ...ok', function () {
        var clip = new Clip(animationOptions, attr);
        clip.start();

        var res = clip.update(window.performance.now() + 500);
        expect(res).toBe(true);
        res = clip.update(window.performance.now() + 1500);
        expect(res).toBe(false);
    });

    it('.on(Event.UPDATE)/emit(Event.UPDATE) test ...ok', function (done) {
        var clip = new Clip(animationOptions, attr);

        clip.on(Clip.Event.UPDATE, function (progress, keyframe, args) {
            expect(typeof progress == 'number' && progress <= 1).toBe(true);
            expect(typeof keyframe == 'object'
                && typeof keyframe.x == 'number'
                && keyframe.x < 100).toBe(true);
            // expect(typeof args.options == 'object'
            //     && args.options[ Clip.Attr.DURATION ] === animationOptions[ Clip.Attr.DURATION ]).toBe(true);

            done();
        });
        clip.start();

        clip.update(window.performance.now() + 500);
    });

});

describe('Animation test', function () {

    var clipOpt = {
        duration: 5000,
        repeat: 10
    };

    var ani = new Animation();

    var clip1 = new Clip(clipOpt);
    var clips2 = [];

    for (var i = 0, len = 10; i < len; i++) {
        clips2.push(new Clip(clipOpt));
    }

    it('.addClip() test ...ok', function () {
        ani.addClip(clip1);
        expect(ani._clips.length).toBe(1);

        ani.addClip(clips2);
        expect(ani._clips.length).toBe(clips2.length + 1);
    });

    it('.removeClip() test ...ok', function () {
        ani.removeClip(clip1);
        expect(ani._clips.length).toBe(clips2.length);

        ani.removeClip();
        expect(ani._clips.length).toBe(0);
    });

    it('.getClips() test ...ok', function () {
        var clip1 = new Clip(clipOpt);
        var ani = new Animation();
        ani.addClip(clip1);

        expect(ani.getClips()[0]).toBe(clip1);
    });

    it('.start()/on(Event.START) test ...ok', function (done) {
        var clip1 = new Clip(clipOpt);
        var ani = new Animation();
        ani.addClip(clip1);

        ani.on(Animation.Event.START, function () {
            expect(1).toBe(1);
            done();
        });

        ani.start();
    });

    // it('.start(true) test ...ok', function (done) {
    //     var ani = new Animation();
    //     ani.addClip(new Clip(clipOpt));
    //
    //     ani.on(Animation.Event.START, function () {
    //
    //         var clips = ani.getClips();
    //         for (var i = 0, len = clips.length; i < len; i++) {
    //             var c = clips[ i ];
    //
    //             expect(c._stopped).toBe(false);
    //         }
    //
    //         done();
    //     });
    //
    //     ani.start(true);
    // });

    it('.stop()/on(Event.STOP) test ...ok', function (done) {
        var clip1 = new Clip(clipOpt);
        var ani = new Animation();
        ani.addClip(clip1);

        ani.on(Animation.Event.STOP, function () {
            expect(ani._timer).toBe(null);
            done();
        });

        ani.start();
        setTimeout(function () {
            ani.stop()
        }, 500);
    });

    it('.on(Event.UPDATE/UPDATE_AFTER) test ...ok', function (done) {
        var clip = new Clip({
            duration: 500,
            repeat: 1
        });

        var ani = new Animation();
        clip.start();
        ani.addClip(clip);

        var t, t1;
        ani
            .on(Animation.Event.UPDATE, function () {
                ani.stop();
                t = window.performance.now();
            })
            .on(Animation.Event.AFTER_UPDATE, function () {
                t1 = window.performance.now();
                expect(t1 > t).toBe(true);
                done();
            });

        ani.start();
    });

});

describe('Running test', function () {
    var aniOpt = {
        duration: 1000,
        repeat: 2,
    };

    var attr = {
        x: [0, 10],
        fill: ['#fff', '#000']
    };

    it('start -> update -> stop -> start -> update -> complete', function (done) {
        var clip1 = new Clip(aniOpt, attr);
        var clip2 = new Clip({ duration: 1000, repeat: 2 }, attr);
        var ani = new Animation();

        var t0, t1, t2,
            ct0, ct1, ct2,
            repeatEnd = 0, pause = 0, repeatStart = 0,
            at0, at1, at2,
            at00, t11;

        clip1
            .on('start', function () {
                t0 = window.performance.now();
            })
            .on('update', function (p, k) {
                t1 = window.performance.now();
                if (!t11) {
                    t11 = t1;
                }

                expect(p <= 1 && p >= 0).toBe(true);
                expect(k.x <= 10 && k.x >= 0).toBe(true);
                expect(!!k.fill.match(/rgba\(\d+,\d+,\d+,.+\)/ig)).toBe(true);

                expect(t0 < t1).toBe(true);
            })
            .on('pause', function () {
                pause++;
            })
            .on('repeat', function () {
                repeatStart++;
            })
            .on('repeatComplete', function () {
                repeatEnd++;
            })
            .on('complete', function () {
                t2 = window.performance.now();

                expect(t1 < t2).toBe(true);
                expect(repeatEnd === repeatStart).toBe(true);
                expect(pause).toBe(1);

            });

        clip2
            .on('start', function () {
                ct0 = window.performance.now();
                expect(ct0 > t2).toBe(true);
            })
            .on('complete', function () {
                ct2 = window.performance.now();
            });

        ani
            .on('update', function () {
                at0 = window.performance.now();
                if (!at00) {
                    at00 = at0;
                }
            })
            .on('afterUpdate', function () {
                at1 = window.performance.now();
                expect(at0 < at1).toBe(true);
            })
            .on('complete', function () {
                at2 = window.performance.now();
                expect(at2 > t11 && ct2 > t2).toBe(true);
                expect(at00 < t11).toBe(true);
                expect(ani.getClips().length).toBe(0);
                done();
            });

        clip1.chain(clip2);
        ani.addClip(clip1);
        ani.start();

        setTimeout(function () {
            ani.pause();
            setTimeout(function () {
                ani.start();
            }, 500)
        }, 800)
    });
});