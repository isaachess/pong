var paddles = require('./paddles.js');
var ball = require('./ball.js');

var gameState = initialGameState();

initGameSetup();
runGame();

export function getGameState() {
    return gameState;
}

function runGame() {
    var newState = nextTick(gameState, paddles.keypresses);
    gameState = newState;
    setTimeout(() => runGame(), 10);
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

function nextTick(prevGameState, paddleDirections) {
    var newPaddleInfo = paddles.newPaddleLocations(prevGameState.paddleInfo, paddleDirections);
    var newBallInfo = ball.newBallInfo(prevGameState.ballInfo, newPaddleInfo);
    return genericGameState(newBallInfo, newPaddleInfo);
}

