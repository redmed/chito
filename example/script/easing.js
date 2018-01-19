var $p1Num = document.getElementById('p1-num');
var $p1 = document.getElementById('p1');
var $p2 = document.getElementById('p2');
var $p2Num = document.getElementById('p2-num');
var $p3 = document.getElementById('p3');
var $p3Num = document.getElementById('p3-num');
var $p4 = document.getElementById('p4');
var $p4Num = document.getElementById('p4-num');
var $st = document.getElementById('status');

function goBottom() {
    $st.scrollTop += 100;
}

var Animation = Chito.Animation,
    Clip = Chito.Clip;

var clip1 = new Clip({
    duration: 3000,
    repeat: 6,
    interval: 1000
}, {
    x: [0, 400],
    fill: ['#22e1ee', '#eb5e17']
});

clip1.on('update', function (ev) {
    var progress = ev.progress, keyframe = ev.keyframe;
    $p1Num.innerText = ((progress * 100) >> 0) + '%';
    $p1.style.left = keyframe.x + 'px';
    $p1.style.backgroundColor = keyframe.fill;
});

var clip2 = new Clip({
    duration: 3000,
    repeat: 6,
    interval: 1000,
    easing: 'ElasticInOut'
}, {
    x: [0, 400],
    fill: ['#22e1ee', '#eb5e17']
});

clip2.on('update', function (ev) {
    var progress = ev.progress, keyframe = ev.keyframe;
    $p2Num.innerText = ((progress * 100) >> 0) + '%';
    $p2.style.left = keyframe.x + 'px';
    $p2.style.backgroundColor = keyframe.fill;
});

var clip3 = new Clip({
    duration: 3000,
    repeat: 6,
    interval: 1000,
    easing: 'BounceInOut'
}, {
    x: [0, 400],
    fill: ['#22e1ee', '#eb5e17']
});

clip3.on('update', function (ev) {
    var progress = ev.progress, keyframe = ev.keyframe;
    $p3Num.innerText = ((progress * 100) >> 0) + '%';
    $p3.style.left = keyframe.x + 'px';
    $p3.style.backgroundColor = keyframe.fill;
});

var clip4 = new Clip({
    duration: 3000,
    repeat: 6,
    interval: 1000,
    easing: function (progress) {
        return Math.floor(progress * 10) / 10;
    }
}, {
    x: [0, 400],
    fill: ['#22e1ee', '#eb5e17']
});

clip4.on('update', function (ev) {
    var progress = ev.progress, keyframe = ev.keyframe;
    $p4Num.innerText = ((progress * 100) >> 0) + '%';
    $p4.style.left = keyframe.x + 'px';
    $p4.style.backgroundColor = keyframe.fill;
});

var animation = new Animation();

animation
    .on('start', function () {
        $st.value += '\n Start... \n';
        goBottom()
    })
    .on('update', function () {
        $st.value += '.';
        goBottom()
    })
    .on('complete', function () {
        $st.value += ' \n Complete... \n';
        goBottom()
    })
    .on('stop', function () {
        $st.value += '\n Stop... \n';
        goBottom()
    })
    .on('pause', function () {
        $st.value += '\n Pause... \n';
        goBottom()
    });

animation.addClip([clip1, clip2, clip3, clip4]);
animation.start();

var $startBtn = document.getElementById('start');
var $stopBtn = document.getElementById('stop');
var $pauseBtn = document.getElementById('pause');
var $resetBtn = document.getElementById('reset');

$startBtn.onclick = function () {
    animation.start();
};

$stopBtn.onclick = function () {
    animation.stop();
};

$pauseBtn.onclick = function () {
    animation.pause();
};

$resetBtn.onclick = function () {
    animation.reset();
};