/**
 * @file
 * @author qiaogang
 * @date 2017/4/26
 */

let { Animation, Clip, Shader } = Animator;

let animation = new Animation();

let clip1 = new Clip({
    duration: 2 * 1000,
    repeat: 2
});

animation.addClip(clip1);

clip1.on(Clip.Event.UPDATE, params => {
    console.log(params);
});



$('#start-btn').click(ev => {
    clip1.start();
    animation.start();
});

$('#reset-btn').click(ev => {
    animation.stop();
});

