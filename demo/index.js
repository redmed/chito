import Chito from '../lib/core';
import '../lib/plugins/color';

var $p3Num = document.getElementById('p3-num');
var $p3 = document.getElementById('p3');
var $p2Num = document.getElementById('p2-num');
var $p2 = document.getElementById('p2');
var $p1Num = document.getElementById('p1-num');
var $p1 = document.getElementById('p1');

var Animation = Chito.Animation,
    Clip = Chito.Clip;
console.log(Chito, Animation, Clip)

var clip1 = new Clip({
    duration: 2000,
    repeat: 2
}, {
    x: [ 0, 300 ],
    fill: [ '#22e1ee', '#eb5e17' ]
});

clip1.on('update', function (progress, keyframe) {
    $p1Num.innerText = ((progress * 100) >> 0) + '%';
    $p1.style.left = keyframe.x + 'px';
    // $p1.style.top = keyframe.y + 'px';
    // $p1.style.width = keyframe.width + 'px';
    // $p1.style.height = keyframe.height + 'px';
    $p1.style.backgroundColor = keyframe.fill;
});

var clip2 = new Clip({
    duration: 3000,
    repeat: 1
}, {
    x: [ 0, 300 ],
    fill: [ '#22e1ee', '#eb5e17' ]
});

clip2.on('update', function (progress, keyframe) {
    $p2Num.innerText = ((progress * 100) >> 0) + '%';
    $p2.style.left = keyframe.x + 'px';
    // $p2.style.top = keyframe.y + 'px';
    $p2.style.backgroundColor = keyframe.fill;
});

var clip3 = new Clip({
    duration: 3000,
    repeat: 2
}, {
    x: [ 0, 300 ],
    fill: [ '#22e1ee', '#eb5e17' ]
});

clip3.on('update', function (progress, keyframe) {
    $p3Num.innerText = ((progress * 100) >> 0) + '%';
    $p3.style.left = keyframe.x + 'px';
    // $p1.style.top = keyframe.y + 'px';
    // $p1.style.width = keyframe.width + 'px';
    // $p1.style.height = keyframe.height + 'px';
    $p3.style.backgroundColor = keyframe.fill;
});

clip1.chain(clip2);
clip2.chain(clip1);

var animation = new Animation();

animation
    .on('start', function () {
        console.log('animation start')
    })
    .on('stop', function () {
        console.log('animation stop')
    })
    .on('pause', function () {
        console.log('animation pause')
    })
    .on('update', function () {
        console.log('animation update')
    })
    .on('complete', function () {
        console.log('animation complete')
    });

animation.addClip(clip1);
animation.addClip(clip3);
// animation.start();

let startStatus = true;

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

var $startBtn2 = document.getElementById('start2');
var $stopBtn2 = document.getElementById('stop2');
var $pauseBtn2 = document.getElementById('pause2');
var $resumeBtn2 = document.getElementById('resume2');
var $resetBtn2 = document.getElementById('reset2');

$startBtn2.onclick = function () {
    clip1.start();
};

$stopBtn2.onclick = function () {
    clip1.stop();
    // clip2.stop();
    // animation.stop();
};

$pauseBtn2.onclick = function () {
    clip1.pause();
    // animation.pause();
};

$resumeBtn2.onclick = function () {
    clip1.start()
    // animation.start();
};

$resetBtn2.onclick = function () {
    clip1.reset()
    // animation.reset();
};
