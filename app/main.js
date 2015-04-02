var React = require('react');
var gameStateApi = require('./game-api/game-state.js');
var Game = require('./Game.jsx');

var initialGameState = gameStateApi.initialGameState();

tickAway(initialGameState);

function tickAway(gameState) {
    React.render(<Game gameState={gameState}/>, document.body);
    var nextGameState = gameStateApi.nextTick(gameState); // TODO: Send back keypresses so I can modify the paddle state based on what is pressed
    setTimeout(() => tickAway(nextGameState), 10);
}

