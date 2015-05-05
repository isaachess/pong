var paddles = require('./paddles.js');
var ball = require('./ball.js');

var gameState = initialGameState();

initGameSetup();
runGame();

export function getGameState() {
    return gameState;
}

function runGame() {
    var newState = nextTick(gameState);
    gameState = newState;
    setTimeout(() => runGame(), 10);
}

function nextTick(prevGameState) {
    return newGameState(prevGameState, paddles.keypresses);
}

function initialGameState() {
    return genericGameState(ball.startBallInfo(), paddles.startPaddleInfo());
}

function initGameSetup() {
    paddles.attachKeyListeners();
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

