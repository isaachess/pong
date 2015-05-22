var cst = require('./constants.js');
var vectors = require('./vectors.js');
var $ = require('jquery');

export var keypresses = blankKeypresses();

export function attachKeyListeners() {
    $(document.body).on('keydown', handleKeydown);
    $(document.body).on('keyup', handleKeyup);
}

export function startPaddleInfo() {
    var player1 = { x: 0, y: cst.WALL_LENGTH/2 - cst.PADDLE_THICKNESS/2 };
    var player2 = { x: 0, y: -(cst.WALL_LENGTH/2 - cst.PADDLE_THICKNESS/2) };
    return genericPaddleInfo(player1, player2);
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
    var ballRect = vectors.getRectanglePoints(potentialLocation, cst.BALL_DIAMETER, cst.BALL_DIAMETER);
    if (ballHitsOnePaddle(ballRect, paddleInfo.player1)) {
        return bounceVector(vectorToBounce, potentialLocation, paddleInfo.player1);
    } else if (ballHitsOnePaddle(ballRect, paddleInfo.player2)) {
        return bounceVector(vectorToBounce, potentialLocation, paddleInfo.player2);
    } else {
        // If it hits neither paddle, just retun unbounced vector
        return vectorToBounce;
    }
}

function bounceVector(vectorToBounce, potentialLocation, singlePaddleCoord) {
    var modifiedVector = alterForPaddleLocation(vectorToBounce, potentialLocation, singlePaddleCoord);
    return vectors.bounceY(modifiedVector);
}

function ballHitsOnePaddle(ballRect, singlePaddleCoord) {
    var paddleRect = vectors.getRectanglePoints(singlePaddleCoord, cst.PADDLE_WIDTH, cst.PADDLE_THICKNESS);
    return vectors.rectanglesIntersect(ballRect, paddleRect);
}

function movePaddleCoordinate(coordinate, direction) {
    if (!direction) return coordinate;
    else if (direction == 'left') return movePaddleLeft(coordinate);
    else if (direction == 'right') return movePaddleRight(coordinate);
}

function movePaddleLeft(coordinate) {
    var amountToMove = (isPaddleAtLeftEdge(coordinate)) ? { x: 0, y: 0 } : cst.PADDLE_VECTOR;
    return vectors.subtractVectors(coordinate, amountToMove);
}

function movePaddleRight(coordinate) {
    var amountToMove = (isPaddleAtRightEdge(coordinate)) ? { x: 0, y: 0 } : cst.PADDLE_VECTOR;
    return vectors.addVectors(coordinate, amountToMove);
}

function isPaddleAtLeftEdge(coordinate) {
    return coordinate.x - cst.PADDLE_WIDTH/2 <= -cst.WALL_LENGTH/2;
}

function isPaddleAtRightEdge(coordinate) {
    return coordinate.x + cst.PADDLE_WIDTH/2 >= cst.WALL_LENGTH/2;
}

function alterForPaddleLocation(vector, ballLocation, singlePaddleCoord) {
    var yAdjuster = (singlePaddleCoord.y > 0) ? 1 : -1;
    var ballPercentDistanceFromPaddleCenter = (ballLocation.x - singlePaddleCoord.x) / (cst.PADDLE_WIDTH/2 + cst.BALL_DIAMETER/2); // Divide by two at end because we are dealing with center points
    var baseAngle = 90 - (90 - cst.SMALLEST_ANGLE)*Math.abs(ballPercentDistanceFromPaddleCenter);
    var angleToUse = (ballPercentDistanceFromPaddleCenter > 0) ? baseAngle : 180 - baseAngle; // Adjust for whether is left or right side of paddle
    var angleInRadians = vectors.degreesToRadians(angleToUse);
    var magnitude = Math.sqrt(vector.x*vector.x + vector.y*vector.y);
    return {
        x: Math.round(magnitude*Math.cos(angleInRadians)*100)/100,
        y: Math.round(magnitude*Math.sin(angleInRadians)*100)/100 * yAdjuster,
    };
}

//////////////////////
/// Moving paddles ///
//////////////////////

function blankKeypresses() {
    return {
        player1: null,
        player2: null,
    };
}

export function movePaddle(player, direction) {
    keypresses[player] = direction;
}

function handleKeydown(e) {
    switch(e.keyCode) {
        case 65: // 'A'
            return movePaddle('player1', 'left');
        case 83: // 'S'
            return movePaddle('player1', 'right');
        case 75: // 'K'
            return movePaddle('player2', 'left');
        case 76: // 'L'
            return movePaddle('player2', 'right');
    }
}

function handleKeyup(e) {
    switch(e.keyCode) {
        case 65: // 'A'
            return movePaddle('player1', null);
        case 83: // 'S'
            return movePaddle('player1', null);
        case 75: // 'K'
            return movePaddle('player2', null);
        case 76: // 'L'
            return movePaddle('player2', null);
    }
}
