var paddles = require('./paddles.js');
var vectors = require('./vectors.js');
var constants = require('./constants.js');

export function startBallInfo() {
    return {
        ballLocation: { x: 0, y: 0 },
        ballVector: { x: 0, y: 100 }
    };
}

export function startPaddleInfo() {
    return {
        player1: { x: 0, y: constants.WALL_LENGTH/2 },
        player2: { x: 0, y: -constants.WALL_LENGTH/2 }
    };
}

// TODO: Add parameter 'paddleLocations' to this to take into account
export function nextTick(prevBallInfo, paddleInfo) {
    return calcNewBallInfo(prevBallInfo, paddleInfo);
}

function calcNewBallInfo(oldBallInfo, paddleInfo) {
    var newVector = newBallVector(oldBallInfo, paddleInfo);
    console.log('newVector', newVector);
    var newLocation = vectors.addVectors(oldBallInfo.ballLocation, newVector);
    return newBallInfo(newLocation, newVector);
}

function newBallInfo(ballLocation, ballVector) {
    return {
        ballLocation: ballLocation,
        ballVector: ballVector
    };
}

function newBallVector(oldBallInfo, paddleInfo) {
    if (paddles.willBounce(oldBallInfo, paddleInfo)) {
        return paddles.bounceVector(oldBallInfo);
    }
    else return oldBallInfo.ballVector;
}
