var React = require('react');
var gameStateApi = require('./game-api/game-state.js');
var Game = require('./Game.jsx');

var initialGameState = gameStateApi.initialGameState();

tickAway(initialGameState);

function tickAway(gameState) {
    React.render(<Game.Game gameState={gameState}/>, document.body);
    setTimeout(() => {
        var nextGameState = gameStateApi.nextTick(gameState, Game.keypresses);
        tickAway(nextGameState);
    }, 20);
}

