var React = require('react');
var constants = require('./game-api/constants.js');
var actualWallLengthPx = 500;
var conversionFactor = actualWallLengthPx/constants.WALL_LENGTH;

var Game = React.createClass({
    render: function () {
        var gameBoardStyle = {
            width: gamePxToScreenPx(constants.WALL_LENGTH),
            height: gamePxToScreenPx(constants.WALL_LENGTH),
            position: 'relative',
            border: '1px solid green',
        };
        var gameState = this.props.gameState;
        console.log('gameState', gameState);
        return (
            <div style={gameBoardStyle}>
                <Ball ballInfo={gameState.ballInfo} />
                <Paddle paddleInfo={gameState.paddleInfo.player1} />
                <Paddle paddleInfo={gameState.paddleInfo.player2} />
            </div>
        );
    }
});

var Ball = React.createClass({
    render: function() {
        var ballInfo = this.props.ballInfo;
        var ballStyle = {
            width: gamePxToScreenPx(constants.BALL_DIAMETER),
            height: gamePxToScreenPx(constants.BALL_DIAMETER),
            borderRadius: gamePxToScreenPx(constants.BALL_DIAMETER/2),
            position: 'absolute',
            left: gameCoordToScreenCoord(ballInfo.ballLocation.x, constants.BALL_DIAMETER),
            top: gameCoordToScreenCoord(ballInfo.ballLocation.y, constants.BALL_DIAMETER),
            border: '1px solid blue',
        };
        return (
            <div style={ballStyle}></div>
        );
    }
});

var Paddle = React.createClass({
    render: function() {
        var paddleInfo = this.props.paddleInfo;
        var paddleStyle = {
            width: gamePxToScreenPx(constants.PADDLE_WIDTH),
            height: gamePxToScreenPx(constants.PADDLE_THICKNESS),
            position: 'absolute',
            left: gameCoordToScreenCoord(paddleInfo.x, constants.PADDLE_WIDTH),
            top: gameCoordToScreenCoord(paddleInfo.y, constants.PADDLE_THICKNESS),
            border: '1px solid purple',
        };
        return (
            <div style={paddleStyle}></div>
        );
    }
});

module.exports = Game;

function gamePxToScreenPx(gamePx) {
    return gamePx*conversionFactor;
}

function gameCoordToScreenCoord(gameCoord, thickness) {
    return gamePxToScreenPx(gameCoord + constants.WALL_LENGTH/2 - Number(thickness)/2);
}
