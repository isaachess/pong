var walls = require('./walls.js');
var vectors = require('./vectors.js');
var paddles = require('./paddles.js');

export function startBallInfo() {
    return genericBallInfo({x: 0, y: 0}, {x: 0, y: 10});
}

export function newBallInfo(oldBallInfo, paddleInfo) {
    var potentialLocation = vectors.addVectors(oldBallInfo.ballLocation, oldBallInfo.ballVector);
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
