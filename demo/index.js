var Animation = Animater.Animation,
    Clip = Animater.Clip,
    ShaderClip = Animater.ShaderClip;

var clip = new ShaderClip({
    duration: 5000,
    repeat: 10
}, {
    x: [ 0, 300 ],
    y: [ 0, 400 ],
    color: [ '#22e1ee', '#e1ee22' ]
});

var $p1 = document.getElementById('p1');

clip.on(ShaderClip.Event.UPDATE, function(p, keyframe) {
    $p1.style.left = keyframe.x + 'px';
    $p1.style.top = keyframe.y + 'px';
    $p1.style.backgroundColor = keyframe.color;
});

var ani = new Animation();
ani.addClip(clip);

ani.start(true);