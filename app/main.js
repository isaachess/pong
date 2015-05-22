var React = require('react');
var gameStateApi = require('./game-api/game-state.js');
var cst = require('./game-api/constants.js');
var Game = require('./Game.jsx');
var canvas = require('./canvas.js');

var apiMethods = {
    startGame: startGame,
    resumeGame: renderWithApi(gameStateApi.resumeGame),
    restartGame: renderWithApi(gameStateApi.restartGame),
};

// Render game once to begin
var gameState = gameStateApi.getGameState();
renderCanvas(gameState);
renderInfo(gameState);

function tickAway() {
    var gameState = gameStateApi.getGameState();
    renderCanvas(gameState);
    renderInfo(gameState);
    if (gameState.currentState == cst.CurrentState.InPlay) {
        setTimeout(() => tickAway(), 20);
    }
}

function renderCanvas(gameState) {
    canvas.render(gameState);
}

function renderInfo(gameState) {
    React.render(<Game.Info gameState={gameState} api={apiMethods} />, document.getElementById('game-info'));
}

function renderWithApi(apiCall) {
    return function () {
        apiCall();
        tickAway();
    };
}

function startGame(ais) {
    gameStateApi.startGame(ais);
    tickAway();
}
