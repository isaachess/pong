var React = require('react');
var gameStateApi = require('./game-api/game-state.js');
var cst = require('./game-api/constants.js');
var Game = require('./Game.jsx');

var apiMethods = {
    startGame: startGame,
};

// Render game once to begin
var gameState = gameStateApi.getGameState();
renderGame(gameState);


function tickAway() {
    var gameState = gameStateApi.getGameState();
    renderGame(gameState);
    if (gameState.currentState == cst.CurrentState.InPlay) {
        setTimeout(() => tickAway(), 30);
    }
}

function renderGame(gameState) {
    React.render(<Game.Game gameState={gameState} api={apiMethods}/>, document.body);
}

function startGame() {
    gameStateApi.startGame();
    tickAway();
}
