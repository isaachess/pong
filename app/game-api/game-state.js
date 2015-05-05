var paddles = require('./paddles.js');
var ball = require('./ball.js');

export function nextTick(prevGameState, paddleDirections) {
    return newGameState(prevGameState, paddleDirections);
}

export function initialGameState() {
    return genericGameState(ball.startBallInfo(), paddles.startPaddleInfo());
}

function genericGameState(ballInfo, paddleInfo) {
    return {
        ballInfo: ballInfo,
        paddleInfo: paddleInfo,
    };
}

function newGameState(prevGameState, paddleDirections) {
    var newPaddleInfo = paddles.newPaddleLocations(prevGameState.paddleInfo, paddleDirections);
    var newBallInfo = ball.newBallInfo(prevGameState.ballInfo, newPaddleInfo);
    return genericGameState(newBallInfo, newPaddleInfo);
}

