var React = require('react');
var gameState = require('./game-api/game-state.js');
var AppComponent = require('./AppComponent.jsx');

var startBallInfo = gameState.startBallInfo();
var paddleLocations = gameState.startPaddleInfo();

tickAway(startBallInfo);

function tickAway(ballInfo) {
    var newBallInfo = gameState.nextTick(ballInfo, paddleLocations);
    console.log('newBallInfo', newBallInfo.ballLocation);
    setTimeout(() => tickAway(newBallInfo), 1000);
}

React.render(<AppComponent/>, document.body);
