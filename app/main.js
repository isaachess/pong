var React = require('react');
var gameState = require('./game-api/game-state.js');
var Game = require('./Game.jsx');

var startBallInfo = gameState.startBallInfo();
var paddleLocations = gameState.startPaddleInfo();

tickAway(startBallInfo);

function tickAway(ballInfo) {
    var newBallInfo = gameState.nextTick(ballInfo, paddleLocations);
    console.log('newBallInfo', newBallInfo.ballLocation);
    React.render(<Game gameState={newBallInfo}/>, document.body);
    setTimeout(() => tickAway(newBallInfo), 300);
}

