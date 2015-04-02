var paddles = require('./paddles.js');
var vectors = require('./vectors.js');
var constants = require('./constants.js');

export function nextTick(prevGameState) { // TODO: Add parameter to take keypresses
    // TODO: Modify paddle locations before calculating the new ball info
    return newGameState(prevGameState);
}

export function initialGameState() {
    return genericGameState(startBallInfo(), startPaddleInfo());
}

function startBallInfo() {
    return {
        ballLocation: { x: 0, y: 0 },
        ballVector: { x: 0, y: 10 }
    };
}

function startPaddleInfo() {
    return {
        player1: { x: 0, y: constants.WALL_LENGTH/2 },
        player2: { x: 0, y: -constants.WALL_LENGTH/2 }
    };
}

function genericGameState(ballInfo, paddleInfo) {
    return {
        ballInfo: ballInfo,
        paddleInfo: paddleInfo,
    };
}

function newGameState(prevGameState) {
    var newPaddleInfo = prevGameState.paddleInfo; // TODO: Actually update paddle info based on keypresses
    var newBallInfo = calcNewBallInfo(prevGameState.ballInfo, newPaddleInfo);
    return genericGameState(newBallInfo, newPaddleInfo);
}

function calcNewBallInfo(oldBallInfo, paddleInfo) {
    var newVector = newBallVector(oldBallInfo, paddleInfo);
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
