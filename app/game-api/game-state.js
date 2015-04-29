var paddles = require('./paddles.js');
var walls = require('./walls.js');
var vectors = require('./vectors.js');

export function nextTick(prevGameState, paddleDirections) {
    return newGameState(prevGameState, paddleDirections);
}

export function initialGameState() {
    return genericGameState(startBallInfo(), paddles.startPaddleInfo());
}

function startBallInfo() {
    return {
        ballLocation: { x: 0, y: 0 },
        ballVector: { x: 0, y: 10 }
    };
}

function genericGameState(ballInfo, paddleInfo) {
    return {
        ballInfo: ballInfo,
        paddleInfo: paddleInfo,
    };
}

function newGameState(prevGameState, paddleDirections) {
    var newPaddleInfo = paddles.newPaddleLocations(prevGameState.paddleInfo, paddleDirections);
    var newBallInfo = calcNewBallInfo(prevGameState.ballInfo, newPaddleInfo);
    return genericGameState(newBallInfo, newPaddleInfo);
}

function calcNewBallInfo(oldBallInfo, paddleInfo) {
    var potentialLocation = vectors.addVectors(oldBallInfo.ballLocation, oldBallInfo.ballVector);
    var newVector = newBallVector(oldBallInfo, paddleInfo, potentialLocation);
    var newLocation = vectors.addVectors(oldBallInfo.ballLocation, newVector);
    return newBallInfo(newLocation, newVector);
}

function newBallInfo(ballLocation, ballVector) {
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
