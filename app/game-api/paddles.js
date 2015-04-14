var constants = require('./constants.js');
var vectors = require('./vectors.js');

export function startPaddleInfo() {
    return genericPaddleInfo({ x: 0, y: constants.WALL_LENGTH/2 }, { x: 0, y: -constants.WALL_LENGTH/2 });
}

export function genericPaddleInfo(player1Coord, player2Coord) {
    return {
        player1: player1Coord,
        player2: player2Coord,
    };
}

export function newPaddleLocations(oldPaddleInfo, paddleDirections) {
    var player1Location = movePaddleCoordinate(oldPaddleInfo.player1, paddleDirections.player1);
    var player2Location = movePaddleCoordinate(oldPaddleInfo.player2, paddleDirections.player2);
    return genericPaddleInfo(player1Location, player2Location);
}

export function bounceVector(vectorToBounce) {
    // TODO: Check if bounce is off side wall or paddle; right now only bounces off paddle, which bounces x
    return vectors.bounceY(vectorToBounce);
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
    var ballRect = vectors.getRectanglePoints(location, constants.BALL_DIAMETER, constants.BALL_DIAMETER);
    var paddleRect = vectors.getRectanglePoints(singlePaddleCoord, constants.PADDLE_WIDTH, constants.PADDLE_THICKNESS);
    return vectors.rectanglesIntersect(ballRect, paddleRect);
}

function movePaddleCoordinate(coordinate, direction) {
    if (!direction) return coordinate;
    else if (direction == 'left') return vectors.subtractVectors(coordinate, constants.PADDLE_VECTOR);
    else if (direction == 'right') return vectors.addVectors(coordinate, constants.PADDLE_VECTOR);
}
