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
        ballVector: { x: 20, y: 10 }
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

    // Init the new vector as the origin vector
    var newVector = oldBallInfo.ballVector;

    // Modify new vector to bounce off paddles
    if (paddles.willBounce(oldBallInfo, paddleInfo)) {
        newVector = paddles.bounceVector(newVector);
    }

    // Modify new vector to bounce off walls
    if (walls.willBounce(oldBallInfo)) {
        console.log('willBounce wall');
        newVector = walls.bounceVector(newVector);
    }

    return newVector;
}
