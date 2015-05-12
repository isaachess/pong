var walls = require('./walls.js');
var _ = require('lodash');
var vectors = require('./vectors.js');
var paddles = require('./paddles.js');

export function startBallInfo() {
    var ballDirection = (_.random() <= 0.5) ? 1 : -1;
    return genericBallInfo({x: 0, y: 0}, {x: 0, y: 10*ballDirection});
}

export function newBallInfo(oldBallInfo, paddleInfo, potentialLocation) {
    var newVector = newBallVector(oldBallInfo, paddleInfo, potentialLocation);
    var newLocation = vectors.addVectors(oldBallInfo.ballLocation, newVector);
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
