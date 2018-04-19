
if (window.DeviceOrientationEvent) {
    $('#text1').html("support deviceorientation at 17:05");
    var lastAcc;    // 用来存储上一次的deviceorientation事件
    window.addEventListener('deviceorientation', function(event) {
        $('#text2').html('add event success');
        $('#text3').html("Alpha: " + event.alpha + "<br>"
        	+ "Beta: " + event.beta + "<br>"
        	+ "Gamma: " + event.gamma + "<br>");
        var delA = Math.abs(event.alpha - lastAcc.alpha);    // alpha轴偏转角
        var delB = Math.abs(event.beta - lastAcc.beta);    // beta轴偏转角
        var delG = Math.abs(event.gamma - lastAcc.gamma);    // gamma轴偏转角
        $('#text4').html("Alpha: " + delA + "<br>"
        	+ "Beta: " + delB + "<br>"
        	+ "Gamma: " + delG + "<br>");
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
