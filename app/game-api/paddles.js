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

export function bounceOffPaddles(vectorToBounce, potentialLocation, paddleInfo) {
    var ballRect = vectors.getRectanglePoints(potentialLocation, constants.BALL_DIAMETER, constants.BALL_DIAMETER);
    if (hitsPlayer1Paddle(ballRect, paddleInfo)) {
        return bounceVector(vectorToBounce, potentialLocation, paddleInfo.player1);
    }
    else if (hitsPlayer2Paddle(ballRect, paddleInfo)) {
        return bounceVector(vectorToBounce, potentialLocation, paddleInfo.player2);
    }
    else {
        // If it hits neither paddle, just retun unbounced vector
        return vectorToBounce;
    }
}

function bounceVector(vectorToBounce, potentialLocation, singlePaddleCoord) {
    var modifiedVector = alterForPaddleLocation(vectorToBounce, potentialLocation, singlePaddleCoord);
    return vectors.bounceY(modifiedVector);
}

function hitsPlayer1Paddle(ballRect, paddleInfo) {
    return ballHitsOnePaddle(ballRect, paddleInfo.player1);
}

function hitsPlayer2Paddle(ballRect, paddleInfo) {
    return ballHitsOnePaddle(ballRect, paddleInfo.player2);
}

function ballHitsOnePaddle(ballRect, singlePaddleCoord) {
    var paddleRect = vectors.getRectanglePoints(singlePaddleCoord, constants.PADDLE_WIDTH, constants.PADDLE_THICKNESS);
    return vectors.rectanglesIntersect(ballRect, paddleRect);
}

function movePaddleCoordinate(coordinate, direction) {
    if (!direction) return coordinate;
    else if (direction == 'left') return vectors.subtractVectors(coordinate, constants.PADDLE_VECTOR);
    else if (direction == 'right') return vectors.addVectors(coordinate, constants.PADDLE_VECTOR);
}

function alterForPaddleLocation(vector, ballLocation, singlePaddleCoord) {
    var yAdjuster = (singlePaddleCoord.y > 0) ? 1 : -1;
    var ballPercentDistanceFromPaddleCenter = (ballLocation.x - singlePaddleCoord.x) / (constants.PADDLE_WIDTH/2 + constants.BALL_DIAMETER/2); // Divide by two at end because we are dealing with center points
    var baseAngle = 90 - (90 - constants.SMALLEST_ANGLE)*Math.abs(ballPercentDistanceFromPaddleCenter);
    var angleToUse = (ballPercentDistanceFromPaddleCenter > 0) ? baseAngle : 180 - baseAngle; // Adjust for whether is left or right side of paddle
    var angleInRadians = vectors.degreesToRadians(angleToUse);
    var magnitude = Math.sqrt(vector.x*vector.x + vector.y*vector.y);
    return {
        x: Math.round(magnitude*Math.cos(angleInRadians)*100)/100,
        y: Math.round(magnitude*Math.sin(angleInRadians)*100)/100 * yAdjuster,
    };
}
