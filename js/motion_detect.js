
if (window.DeviceOrientationEvent) {
    $('#text1').html("support deviceorientation at 18:00");
    var lastAcc;    // 用来存储上一次的deviceorientation事件
    window.addEventListener('deviceorientation', function(event) {
        if ('undefined' === typeof lastAcc) { // initialize
            lastAcc = event;
            return;
        }
        $('#text2').html('add event success: ' + new Date());
        $('#text3').html("Alpha: " + event.alpha + "<br>"
        	+ "Beta: " + event.beta + "<br>"
        	+ "Gamma: " + event.gamma + "<br>");
        // alpha轴偏转角, (0,360)
        var delA = Math.abs(360 + Math.min(event.alpha, lastAcc.alpha) - Math.max(event.alpha, lastAcc.alpha));
        var delB = Math.abs(event.beta - lastAcc.beta);    // beta轴偏转角, (-180,180)
        var delG = Math.abs(event.gamma - lastAcc.gamma);    // gamma轴偏转角, (-90, 90)
        var msg = "Alpha bias: " + (event.alpha < lastAcc.alphadelA + "<br>"
        	+ "Beta bias: " + delB + "<br>"
        	+ "Gamma bias: " + delG + "<br>");
        if (delA > 60) {
            alert("Shake alpha! <br>" + "Alpha bias: " + delA + "<br>"
        	+ "Beta bias: " + delB + "<br>"
        	+ "Gamma bias: " + delG + "<br>");
        }
        lastAcc = event;    // 存储上一次的event
    }, false);
} else {
    $('#text1').html("Do NOT support deviceorientation!");
}
if (window.DeviceMotionEvent) {
    var speed = 25;    // 用来判定的加速度阈值，太大了则很难触发
    var x, y, z, lastX, lastY, lastZ;
    x = y = z = lastX = lastY = lastZ = 0;
    var index = 0;

    window.addEventListener('devicemotion', function (event) {
        if (index++ <= 10) {
            return;
        }
        index = 0;
        var acceleration = event.accelerationIncludingGravity;
        x = acceleration.x;
        y = acceleration.y;
        $('#text6').html('x:' + (x-lastX) + '<br>y:' + (y-lastY));
        lastX = x;
        lastY = y;
    }, false);
}
