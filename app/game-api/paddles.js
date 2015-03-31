var constants = require('./constants.js');
var vectors = require('./vectors.js');

export function bounceVector(ballInfo) {
    // TODO: Check if bounce is off side wall or paddle; right now only bounces off paddle, which bounces x
    return vectors.bounceY(ballInfo.ballVector);
}

export function willBounce(ballInfo, paddleInfo) {
    var potentialLocation = vectors.addVectors(ballInfo.ballLocation, ballInfo.ballVector);
    return locationHitsAnyPaddle(potentialLocation, paddleInfo);
}

function locationHitsAnyPaddle(location, paddleInfo) {
    var hitsPlayer1 = locationHitsOnePaddle(location, paddleInfo.player1);
    var hitsPlayer2 = locationHitsOnePaddle(location, paddleInfo.player2);
    return hitsPlayer1 || hitsPlayer2;
}

function locationHitsOnePaddle(location, singlePaddleCoord) {
    var ballRect = getRectanglePoints(location, constants.BALL_DIAMETER, constants.BALL_DIAMETER);
    var paddleRect = getRectanglePoints(singlePaddleCoord, constants.PADDLE_WIDTH, constants.PADDLE_THICKNESS);
    return rectanglesIntersect(ballRect, paddleRect);
}

export function getRectanglePoints(coordinate, rectWidth, rectHeight) {
    return {
        minX: coordinate.x - rectWidth/2,
        maxX: coordinate.x + rectWidth/2,
        minY: coordinate.y - rectHeight/2,
        maxY: coordinate.y + rectHeight/2
    };
}

export function rectanglesIntersect(rect1, rect2) {
    return !(
        rect1.maxX < rect2.minX ||
        rect1.minX > rect2.maxX ||
        rect1.minY > rect2.maxY ||
        rect1.maxY < rect2.minY
    );
}
