var constants = require('./constants.js');
var vectors = require('./vectors.js');

export function bounceVector(ballInfo) {
    // TODO: Check if bounce is off side wall or paddle; right now only bounces off paddle, which bounces x
    return vectors.bounceY(ballInfo.ballVector);
}

export function willBounce(ballInfo, paddleInfo) {
    // Get next location based on info -- see if that location is on the paddle
    // If so, return true
    // Else return false
    var potentialLocation = vectors.addVectors(ballInfo.ballLocation, ballInfo.ballVector);
    return locationHitsAnyPaddle(potentialLocation, paddleInfo);
}

function locationHitsAnyPaddle(location, paddleInfo) {
    return locationHitsOnePaddle(location, paddleInfo.player1) || locationHitsOnePaddle(location, paddleInfo.player2);
}

function locationHitsOnePaddle(location, singlePaddleCoord) {
    // TODO: Take into account width of paddle.
    var ballRadius = constants.BALL_DIAMETER/2;
    var paddleThickness = constants.PADDLE_THICKNESS;
    //var paddleWidthRadius = constants.PADDLE_WIDTH/2;

    var ballTop = location.y + ballRadius;
    var ballBottom = location.y - ballRadius;
    var paddleTop = singlePaddleCoord.y + paddleThickness;
    var paddleBottom = singlePaddleCoord.y - paddleThickness;
    var x = ballBottom > paddleTop || ballTop > paddleBottom;
    console.log('x', x, singlePaddleCoord);
    debugger;
    return x;
}
