var React = require('react');
var gameStateApi = require('./game-api/game-state.js');
var Game = require('./Game.jsx');

tickAway();

function tickAway() {
    React.render(<Game.Game gameState={gameStateApi.getGameState()}/>, document.body);
    setTimeout(() => tickAway(), 40);
}

