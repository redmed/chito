var Animation = Animater.Animation,
    ShaderClip = Animater.ShaderClip;

var $p2Num = document.getElementById('p2-num');
var $p2 = document.getElementById('p2');
var $p1Num = document.getElementById('p1-num');
var $p1 = document.getElementById('p1');

var ani = new Animation();

var clip1 = new ShaderClip({
    duration: 5000,
    repeat: 100
}, {
    x: [ 0, 300 ],
    y: [ 0, 300 ],
    width: [ 50, 100 ],
    height: [ 50, 100 ],
    color: [ '#126EB2', '#FFBA19' ]
});

clip1.on(ShaderClip.Event.UPDATE, function (p, keyframe) {
    $p1Num.innerText = ((p * 100) >> 0) + '%';
    $p1.style.left = keyframe.x + 'px';
    $p1.style.top = keyframe.y + 'px';
    $p1.style.width = keyframe.width + 'px';
    $p1.style.height = keyframe.height + 'px';
    $p1.style.backgroundColor = keyframe.color;
});

ani.addClip(clip1);

var clip2 = new ShaderClip({
    duration: 5000,
    repeat: 100
}, {
    x: [ 0, 300, 300, 0, 0 ],
    y: [ 0, 0, 300, 300, 0 ],
    fill: [ '#126EB2', '#77AFD8', '#FFD1C6', '#FF4719', '#126EB2']
});

clip2.on('update', function (p, keyframe) {
    $p2Num.innerText = ((p * 100) >> 0) + '%';
    $p2.style.left = keyframe.x + 'px';
    $p2.style.top = keyframe.y + 'px';
    $p2.style.backgroundColor = keyframe.fill;
});

ani.addClip(clip2);

ani.start(true);