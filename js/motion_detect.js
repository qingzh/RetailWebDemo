
if (window.DeviceOrientationEvent) {
    $('#text1').html("support deviceorientation at 19:20");
    var lastAcc;    // 用来存储上一次的deviceorientation事件
    var orientationTime = new Date();
    window.addEventListener('deviceorientation', function(event) {
        if ('undefined' === typeof lastAcc) { // initialize
            lastAcc = event;
            return;
        }
        var currentTime = new Date();
        if (currentTime - orientationTime < 3000) {
            return;
        }
        orientationTime = new Date();
        $('#text2').html('add event success: ' + new Date());
        $('#text3').html("Alpha: " + event.alpha + "<br>"
        	+ "Beta: " + event.beta + "<br>"
        	+ "Gamma: " + event.gamma + "<br>");
        // alpha轴偏转角, (0,360)
        var delA = Math.abs(event.alpha - lastAcc.alpha);
        delA = Math.min(delA, 360-delA);
        var delB = Math.abs(event.beta - lastAcc.beta);    // beta轴偏转角, (-180,180)
        var delG = Math.abs(event.gamma - lastAcc.gamma);    // gamma轴偏转角, (-90, 90)
        var msg = "Alpha bias: " + delA + "<br>"
        	+ "Beta bias: " + delB + "<br>"
        	+ "Gamma bias: " + delG + "<br>";
        if (delA > 60 || delG > 30) {
            alert("Shake alpha! <br>" + msg);
        }
        lastAcc = event;    // 存储上一次的event
    }, false);
} else {
    $('#text1').html("Do NOT support deviceorientation!");
}
if (window.DeviceMotionEvent) {
    var threshold = 100;    // 用来判定的加速度阈值，太大了则很难触发
    var lastMotion;
    var motionTime = new Date();

    window.addEventListener('devicemotion', function (event) {
        if ('undefined' === lastMotion) { // initialization
            lastMotion = event;;
            return;
        }
        var currentTime = new Date();
        if (currentTIme - motionTime < 3000) {
            return;
        }
        motionTime = new Date();
        
        var pre = lastMotion.accelerationIncludingGravity;
        var cur = event.accelerationIncludingGravity;
        $('#text6').html('x:' + (cur.x-pre.x) + '<br>y:' + (cur.y-pre.y)) + '<br>z:' + (cur.z-pre.z);
        lastMotion = event;
    }, false);
}
