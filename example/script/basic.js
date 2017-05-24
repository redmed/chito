import Animater from '../../src/main';

var $p2Num = document.getElementById('p2-num');
var $p2 = document.getElementById('p2');
var $p1Num = document.getElementById('p1-num');
var $p1 = document.getElementById('p1');

var Animation = Animater.Animation,
    ShaderClip = Animater.ShaderClip;

var clip1 = new ShaderClip({
    duration: 5000,
    repeat: 1
}, {
    x: [ 0, 300 ],
    y: [ 0, 300 ],
    width: [ 50, 100, 50 ],
    height: [ 50, 100, 50 ],
    fill: [ '#22e1ee', '#eb5e17' ]
});

clip1.on('update', function (progress, keyframe) {
    $p1Num.innerText = ((progress * 100) >> 0) + '%';
    $p1.style.left = keyframe.x + 'px';
    $p1.style.top = keyframe.y + 'px';
    $p1.style.width = keyframe.width + 'px';
    $p1.style.height = keyframe.height + 'px';
    $p1.style.backgroundColor = keyframe.fill;
});

var clip2 = new ShaderClip({
    duration: 5000,
    repeat: 1
}, {
    x: [ 0, 300, 300, 0, 0 ],
    y: [ 0, 0, 300, 300, 0 ],
    fill: [ '#22e1ee', '#eb5e17' ]
});

clip2.on('update', function (progress, keyframe) {
    $p2Num.innerText = ((progress * 100) >> 0) + '%';
    $p2.style.left = keyframe.x + 'px';
    $p2.style.top = keyframe.y + 'px';
    $p2.style.backgroundColor = keyframe.fill;
});

var animation = new Animation();
animation.addClip([ clip1, clip2 ]);

clip1.start();
clip2.start();
animation.start();

var $startBtn = document.getElementById('start');
var $stopBtn = document.getElementById('stop');
var $resetBtn = document.getElementById('reset');

$startBtn.onclick = function () {
    clip1.start();
    clip2.start();
    animation.start();
};

$stopBtn.onclick = function () {
    clip1.stop();
    clip2.stop();
    // animation.stop();
};

$resetBtn.onclick = function () {

};