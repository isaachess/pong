var walls = require('./walls.js');
var _ = require('lodash');
var math = require('./math.js');
var paddles = require('./paddles.js');
var cst = require('./constants.js');

export function startBallInfo() {
    var ballDirection = (_.random() <= 0.5) ? 1 : -1;
    return genericBallInfo({x: 0, y: 0}, {x: 0, y: cst.BALL_VELOCITY*ballDirection});
}

export function newBallInfo(oldBallInfo, paddleInfo, potentialLocation) {
    var newVector = newBallVector(oldBallInfo, paddleInfo, potentialLocation);
    var newLocation = math.addVectors(oldBallInfo.ballLocation, newVector);
    return genericBallInfo(newLocation, newVector);
}

function genericBallInfo(ballLocation, ballVector) {
    return {
        ballLocation: ballLocation,
        ballVector: ballVector
    };
}

function newBallVector(oldBallInfo, paddleInfo, potentialLocation) {
    // Init the new vector as the origin vector
    var newVector = oldBallInfo.ballVector;
    newVector = paddles.bounceOffPaddles(newVector, potentialLocation, paddleInfo);
    newVector = walls.bounceOffWalls(newVector, potentialLocation);
    return newVector;
}
