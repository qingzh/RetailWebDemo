alert("Start Demo @ 12:45");

if (window.DeviceOrientationEvent) {
    var lastOrientation;    // 用来存储上一次的deviceorientation事件
    var orientationTime = new Date();
    window.addEventListener('deviceorientation', function(event) {
        if ('undefined' === typeof lastOrientation) { // initialize
            lastOrientation = event;
            return;
        }
        if (new Date() - orientationTime < 200) {
            return;
        }
        orientationTime = new Date();
        // alpha轴偏转角, (0,360)
        var delA = Math.abs(event.alpha - lastOrientation.alpha);
        delA = Math.min(delA, 360-delA);
        var delB = Math.abs(event.beta - lastOrientation.beta);    // beta轴偏转角, (-180,180)
        var delG = Math.abs(event.gamma - lastOrientation.gamma);    // gamma轴偏转角, (-90, 90)
        var msg = "Alpha bias: " + delA + "<br>"
        	+ "Beta bias: " + delB + "<br>"
        	+ "Gamma bias: " + delG + "<br>";
        lastOrientation = event;    // 存储上一次的event
    }, false);
} else {
    $('#hint').html("Do NOT support deviceorientation!");
}
if (window.DeviceMotionEvent) {
    var threshold = 100;    // 用来判定的加速度阈值，太大了则很难触发
    var lastMotion;
    var motionTime = new Date();
    var index = 1;
    $('.ablock[index=1]').addClass('selected');

    window.addEventListener('devicemotion', function (event) {
        if ('undefined' === typeof lastMotion) { // initialization
            lastMotion = event;
            return;
        }
        if (new Date() - motionTime < 200) {
            return;
        }
        motionTime = new Date();

        var pre = lastMotion.accelerationIncludingGravity;
        var cur = event.accelerationIncludingGravity;
        var biasX = Math.abs(cur.x - pre.x);
        var biasY = Math.abs(cur.y - pre.y);
        var biasZ = Math.abs(cur.z - pre.z);
        if (biasX > biasZ && biasX > 30 && (biasX + biasY) > 45) {
            index = index % 3 + 1;
            $('.ablock').removeClass('selected');
            $('.ablock[index=' + index + ']').addClass('selected');
        } else if (biasZ > 30 && biasX < 15) {
            $('.ablock.selected').click();
        }
        lastMotion = event;
    }, false);
}
