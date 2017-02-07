// $('body').load(function () {
//    buildTree();
// });

function buildTree () {
    $(".circle").all();
    console.log();
}

function lineDistance(x, y, x0, y0){
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
}

function drawLine(a, b, line) {
    var pointA = $(a).offset();
    var pointB = $(b).offset();
    var pointAcenterX = $(a).width() / 2;
    var pointAcenterY = $(a).height() / 2;
    var pointBcenterX = $(b).width() / 2;
    var pointBcenterY = $(b).height() / 2;
    var angle = Math.atan2(pointB.top - pointA.top, pointB.left - pointA.left) * 180 / Math.PI;
    var distance = lineDistance(pointA.left, pointA.top, pointB.left, pointB.top);

    // INFO
    $('.info .point-a').text('Point-A: Left: ' + pointA.left + ' Top: ' + pointA.top);
    $('.info .point-b').text('Point-B: Left: ' + pointB.left + ' Top: ' + pointB.top);
    $('.info .angle').text('Angle: ' + angle);
    $('.info .distance').text('Distance: ' + distance);

    // Set Angle
    $(line).css('transform', 'rotate(' + angle + 'deg)');

    // Set Width
    $(line).css('width', distance + 'px');

    // Set Position
    $(line).css('position', 'absolute');
    if(pointB.left < pointA.left) {
        $(line).offset({top: pointA.top + pointAcenterY, left: pointB.left + pointBcenterX});
    } else {
        $(line).offset({top: pointA.top + pointAcenterY, left: pointA.left + pointAcenterX});
    }
}

setInterval(function() {
    drawLine('.a', '.b', '.line');
});


