var paddles = require('./paddles.js');
var ball = require('./ball.js');
var cst = require('./constants.js');
var score = require('./score.js');
var vectors = require('./vectors.js');

var gameState;
initGameSetup();

export function getGameState() {
    return gameState;
}

export function startGame() {
    if (gameState.currentState == cst.CurrentState.Beginning) {
        gameState.currentState = cst.CurrentState.InPlay;
        runGame();
    } else {
        gameState = { error: 'Game state is not at the beginning -- cannot start game.' };
    }
}

export function resumeGame() {
    if (gameState.currentState == cst.CurrentState.BetweenPlay) {
        gameState = genericGameState(cst.CurrentState.InPlay, ball.startBallInfo(), paddles.startPaddleInfo(), gameState.score);
        runGame();
    } else {
        gameState = { error: 'Game state is not between play -- cannot resume game.' };
    }
}

export function restartGame() {
    // Restart can be called at any time -- simply restarts the game
    gameState = initialGameState();
}

function runGame() {
    var newState = nextTick(gameState, paddles.keypresses);
    gameState = newState;
    if (gameState.currentState == cst.CurrentState.InPlay) {
        setTimeout(() => runGame(), 40);
    }
}

function initialGameState() {
    return genericGameState(cst.CurrentState.Beginning, ball.startBallInfo(), paddles.startPaddleInfo(), score.startScore());
}

function initGameSetup() {
    restartGame();
    paddles.attachKeyListeners();
}

function genericGameState(currentState, ballInfo, paddleInfo, scoreInfo) {
    return {
        currentState: currentState,
        score: scoreInfo,
        ballInfo: ballInfo,
        paddleInfo: paddleInfo
    };
}

function nextTick(prevGameState, paddleDirections) {
    var potentialBallLocation = vectors.addVectors(prevGameState.ballInfo.ballLocation, prevGameState.ballInfo.ballVector);
    var newScoreInfo = score.newScoreInfo(prevGameState.score, potentialBallLocation);
    var newPaddleInfo = paddles.newPaddleLocations(prevGameState.paddleInfo, paddleDirections);
    var newBallInfo = ball.newBallInfo(prevGameState.ballInfo, newPaddleInfo, potentialBallLocation);
    var newCurrentState = score.currentStatePerScore(prevGameState.score, newScoreInfo);
    return genericGameState(newCurrentState, newBallInfo, newPaddleInfo, newScoreInfo);
}

