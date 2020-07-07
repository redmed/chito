var $bugIcon = document.getElementById('bug-icon');
var $p2Num = document.getElementById('p2-num');
var $p2 = document.getElementById('p2');
var $p1Num = document.getElementById('p1-num');
var $p1 = document.getElementById('p1');
var $st = document.getElementById('status');

function goBottom() {
  $st.scrollTop += 100;
}

var Animation = Chito.Animation,
  Clip = Chito.Clip;

var clip1 = new Clip({
  duration: 3000,
  repeat: 20,
  yoyo: true
}, {
  p: [
    [0, 0],
    [100, 100],
    [200, 0],
    [300, 100],
  ],
  fill: ['darkred', 'skyblue']
});

clip1.on('update', function (ev) {
  var progress = ev.progress, keyframe = ev.keyframe;

  $p1Num.innerText = ((progress * 100) >> 0) + '%';
  $p1.style.left = keyframe.p[0] + 'px';
  $p1.style.top = keyframe.p[1] + 'px';
  $p1.style.backgroundColor = keyframe.fill;
});

var clip2 = new Clip({
  duration: 8000,
  repeat: 10
}, {
  p: [
    [0, 0],
    [100, 100],
    [200, 100],
    [300, 0],
    [0, 0]
  ]
});

clip2.on('update', function (ev) {
  var progress = ev.progress, keyframe = ev.keyframe;
  var angle = keyframe.p.step.angle;
  $bugIcon.style.transform = `rotate(${(angle + 0.5 * Math.PI) * 180 / Math.PI}deg)`;
  // $p2Num.innerText = ((progress * 100) >> 0) + '%';
  $p2.style.left = keyframe.p[0] + 'px';
  $p2.style.top = keyframe.p[1] + 'px';
});

var animation = new Animation();

animation
  .on('start', function () {
    $st.value += '\n Start... \n';
    goBottom()
  })
  .on('reset', function () {
    $st.value += '\n Reset... \n';
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

animation.addClip([clip1, clip2]);
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
