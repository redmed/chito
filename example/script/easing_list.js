let Easing = {

    Linear: function (k) {

        return k;

    },

    QuadraticIn: function (k) {

        return k * k;

    },

    QuadraticOut: function (k) {

        return k * (2 - k);

    },

    QuadraticInOut: function (k) {

        if ((k *= 2) < 1) {
            return 0.5 * k * k;
        }

        return -0.5 * (--k * (k - 2) - 1);

    },

    CubicIn: function (k) {

        return k * k * k;

    },

    CubicOut: function (k) {

        return --k * k * k + 1;

    },

    CubicInOut: function (k) {

        if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
        }

        return 0.5 * ((k -= 2) * k * k + 2);

    },

    QuarticIn: function (k) {

        return k * k * k * k;

    },

    QuarticOut: function (k) {

        return 1 - (--k * k * k * k);

    },

    QuarticInOut: function (k) {

        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k;
        }

        return -0.5 * ((k -= 2) * k * k * k - 2);

    },

    QuinticIn: function (k) {

        return k * k * k * k * k;

    },

    QuinticOut: function (k) {

        return --k * k * k * k * k + 1;

    },

    QuinticInOut: function (k) {

        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k * k;
        }

        return 0.5 * ((k -= 2) * k * k * k * k + 2);

    },

    SinusoidalIn: function (k) {

        return 1 - Math.cos(k * Math.PI / 2);

    },

    SinusoidalOut: function (k) {

        return Math.sin(k * Math.PI / 2);

    },

    SinusoidalInOut: function (k) {

        return 0.5 * (1 - Math.cos(Math.PI * k));

    },

    ExponentialIn: function (k) {

        return k === 0 ? 0 : Math.pow(1024, k - 1);

    },

    ExponentialOut: function (k) {

        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);

    },

    ExponentialInOut: function (k) {

        if (k === 0) {
            return 0;
        }

        if (k === 1) {
            return 1;
        }

        if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1);
        }

        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);

    },

    CircularIn: function (k) {

        return 1 - Math.sqrt(1 - k * k);

    },

    CircularOut: function (k) {

        return Math.sqrt(1 - (--k * k));

    },

    CircularInOut: function (k) {

        if ((k *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - k * k) - 1);
        }

        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

    },

    ElasticIn: function (k) {

        var s;
        var a = 0.1;
        var p = 0.4;

        if (k === 0) {
            return 0;
        }

        if (k === 1) {
            return 1;
        }

        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }

        return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));

    },

    ElasticOut: function (k) {

        var s;
        var a = 0.1;
        var p = 0.4;

        if (k === 0) {
            return 0;
        }

        if (k === 1) {
            return 1;
        }

        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }

        return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);

    },

    ElasticInOut: function (k) {

        var s;
        var a = 0.1;
        var p = 0.4;

        if (k === 0) {
            return 0;
        }

        if (k === 1) {
            return 1;
        }

        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }

        if ((k *= 2) < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
        }

        return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

    },

    BackIn: function (k) {

        var s = 1.70158;

        return k * k * ((s + 1) * k - s);

    },

    BackOut: function (k) {

        var s = 1.70158;

        return --k * k * ((s + 1) * k + s) + 1;

    },

    BackInOut: function (k) {

        var s = 1.70158 * 1.525;

        if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s));
        }

        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

    },

    BounceIn: function (k) {

        return 1 - Easing.BounceOut(1 - k);

    },

    BounceOut: function (k) {

        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        }
        else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        }
        else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        }
        else {
            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
        }

    },

    BounceInOut: function (k) {

        if (k < 0.5) {
            return Easing.BounceIn(k * 2) * 0.5;
        }

        return Easing.BounceOut(k * 2 - 1) * 0.5 + 0.5;

    }

};

var names = [];
var C = 0.6;
var CAV_WIDTH = 200, CAV_HEIGHT = 200 * (1 + C);
var WIDTH = CAV_WIDTH;
var INTERVAL = 1000, DURATION = 1500;

function createCanvasTable() {

    for (var key in Easing) {
        if (Easing.hasOwnProperty(key)) {
            names.push(key);
        }
    }

    var $table = document.getElementById('canvas-table');

    var i = 0;
    var tableArr = [];

    while (i < names.length) {
        tableArr.push('<tr>');
        let j = -1;
        while (++j < 3) {
            var name = names[i];

            var str = `
                <td data-type="${name}">
                    <p>${name}</p>
                    <div class="ceil">
                    <canvas id="${name}" width="${CAV_WIDTH}px" height="${CAV_HEIGHT}px" style="width:${CAV_WIDTH}px; height:${CAV_HEIGHT}px"></canvas>
                    <span id="${name}_p" style="bottom: ${CAV_WIDTH * C / 2}px" class="pointer"></span>
                    <span id="${name}_t" style="" class="time"></span>
                    </div>
                </td>
            `

            tableArr.push(str);
            if (i++ == 0) {
                break;
            }
        }

        tableArr.push('<tr/>');
    }

    $table.innerHTML = tableArr.join('');

}

function easingShape(id, easing) {

    var $cav = document.getElementById(id);

    if (!$cav && !easing) {
        return;
    }

    var ctx = $cav.getContext('2d');

    // 上下留出空间展示超出部分的曲线
    var dH = WIDTH * (1 + C / 2),
        dH2 = WIDTH;

    // Easing 曲线
    ctx.moveTo(0, dH);
    ctx.beginPath();

    var i = -1, len = 500;
    while (++i < len) {

        var k = i / len;
        var p = easing(k);

        var x = k * WIDTH;
        var y = p * WIDTH;

        ctx.lineTo(x, dH - y);
    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#222222';
    ctx.stroke();
    
    // XY 轴
    ctx.beginPath();
    // x 轴
    ctx.moveTo(0, dH);
    ctx.lineTo(WIDTH, dH);
    // y 轴
    ctx.moveTo(0.5, dH);
    ctx.lineTo(0.5, dH - dH2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#222288';
    ctx.setLineDash([4, 1]);
    ctx.stroke();
}

function init() {
    createCanvasTable();

    var m = -1, len = names.length;
    while (++m < len) {
        var key = names[m];
        easingShape(key, Easing[key]);
    }

    var clip,
        ani = new Chito.Animation();

    var $table = document.getElementById('canvas-table');
    $table.addEventListener('mouseover', function (ev) {
        var $target = ev.target;
        var easingName = $target.id;

        if ($target.tagName == 'CANVAS' && easingName) {

            var $next = document.getElementById($target.id + '_p');
            var $time = document.getElementById($target.id + '_t');

            clip && clip.destroy();
            clip = new Chito.Clip({
                duration: DURATION,
                repeat: 99,
                interval: INTERVAL,
                easing: easingName
            }, {
                y: [0, WIDTH]
            });

            clip.on('update', function (ev) {
                var p = ev.elapsed, k = ev.keyframe;
                
                $next.style.bottom = (k.y + WIDTH * C / 2) + 'px';
                $time.style.left = (p * WIDTH - 2) + 'px';
            });

            ani.stop();
            ani.removeClip();
            ani.addClip(clip);
            ani.start();
        }
    })
}

init();

