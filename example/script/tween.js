var $p3Num = document.getElementById('p3-num');
var $p3 = document.getElementById('p3');
var $p2Num = document.getElementById('p2-num');
var $p2 = document.getElementById('p2');
var $p1Num = document.getElementById('p1-num');
var $p1 = document.getElementById('p1');

var from1 = {
    x: 0
}

var from2 = {
    x: 0
}

var from3 = {
    x: 0
}

var tw1 = new TWEEN.Tween(from1)
    .to({
        x: 400
    }, 2000)
    .repeat(2)
    .onUpdate(function () {
        var x = this.x;
        $p1.style.left = x + 'px';
    })
    .onComplete(function () {
        console.log('tw1 comp')
        this.x = 0;
    })
// .start()

var tw2 = new TWEEN.Tween(from2)
    .to({
        x: 400
    }, 2000)
    .repeat(2)
    .onUpdate(function () {
        var x = this.x;
        $p2.style.left = x + 'px';
    })
    .onComplete(function () {
        console.log('tw2 comp')
        this.x = 0;
    })
// .start()

var tw3 = new TWEEN.Tween(from3)
    .to({
        x: 400
    }, 2000)
    .repeat(2)
    .onUpdate(function () {
        var x = this.x;
        $p3.style.left = x + 'px';
    })
    .onComplete(function () {
        this.x = 0;
    })

// tw2.chain(tw3)
// tw1.chain(tw2).start();

var twLi = [ tw1, tw2, tw3, tw1 ];
var i = -1, len = twLi.length;
while (++i < len) {
    var t = twLi[ i ];
    var t1 = twLi[ i + 1 ];
    if (t && t1) {
        t.chain(t1);
    }
}

twLi[ 0 ].start();

var timer = null;

function updateKeyframe(time) {
    var res = TWEEN.update();
    // if (res) {
        timer = requestAnimationFrame(updateKeyframe);
    // }
}

timer = requestAnimationFrame(updateKeyframe)

setTimeout(function() {
    // cancelAnimationFrame(timer);
    // timer = null;
    tw1.stop()
    setTimeout(function() {
        // timer = requestAnimationFrame(updateKeyframe)
        tw1.start();
    }, 2343)
}, 2532);
