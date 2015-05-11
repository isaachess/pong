var paddles = require('./paddles.js');
var ball = require('./ball.js');
var cst = require('./constants.js');
var score = require('./score.js');

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
    return genericGameState(cst.CurrentState.Beginning, ball.startBallInfo(), paddles.startPaddleInfo(), score.startScore());
}

function initGameSetup() {
    paddles.attachKeyListeners();
}

function genericGameState(currentState, ballInfo, paddleInfo, score) {
    return {
        currentState: currentState,
        score: score,
        ballInfo: ballInfo,
        paddleInfo: paddleInfo
    };
}

function nextTick(prevGameState, paddleDirections) {
    var newPaddleInfo = paddles.newPaddleLocations(prevGameState.paddleInfo, paddleDirections);
    var newBallInfo = ball.newBallInfo(prevGameState.ballInfo, newPaddleInfo);
    return genericGameState(prevGameState.currentState, newBallInfo, newPaddleInfo, prevGameState.score);
}

