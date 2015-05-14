var React = require('react');
var $ = require('jquery');
var cst = require('./game-api/constants.js');
var actualWallLengthScreenPx = 500;
var conversionFactor = actualWallLengthScreenPx/cst.WALL_LENGTH;

export var Game = React.createClass({
    render: function () {
        var gameBoardStyle = {
            width: gamePxToScreenPx(cst.WALL_LENGTH),
            height: gamePxToScreenPx(cst.WALL_LENGTH),
            position: 'relative',
            border: '1px solid green',
        };
        var gameState = this.props.gameState;
        var api = this.props.api;
        return (
            <div style={gameBoardStyle}>
                <Ball ballInfo={gameState.ballInfo} />
                <Paddle paddleInfo={gameState.paddleInfo.player1} />
                <Paddle paddleInfo={gameState.paddleInfo.player2} />
                <GameInfo gameState={gameState} api={api} />
                <Score score={gameState.score} />
            </div>
        );
    }
});

var Ball = React.createClass({
    render: function() {
        var ballInfo = this.props.ballInfo;
        var ballStyle = {
            width: gamePxToScreenPx(cst.BALL_DIAMETER),
            height: gamePxToScreenPx(cst.BALL_DIAMETER),
            borderRadius: gamePxToScreenPx(cst.BALL_DIAMETER/2),
            position: 'absolute',
            left: gameCoordToScreenCoord(ballInfo.ballLocation.x, cst.BALL_DIAMETER),
            top: gameCoordToScreenCoord(ballInfo.ballLocation.y, cst.BALL_DIAMETER),
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
            width: gamePxToScreenPx(cst.PADDLE_WIDTH),
            height: gamePxToScreenPx(cst.PADDLE_THICKNESS),
            position: 'absolute',
            left: gameCoordToScreenCoord(paddleInfo.x, cst.PADDLE_WIDTH),
            top: gameCoordToScreenCoord(paddleInfo.y, cst.PADDLE_THICKNESS),
            border: '1px solid purple',
        };
        return (
            <div style={paddleStyle}></div>
        );
    }
});

var GameInfo = React.createClass({
    render: function() {
        var keyHandler, message;
        var gameState = this.props.gameState;
        var currentState = gameState.currentState;
        var api = this.props.api;
        if (currentState == cst.CurrentState.InPlay) {
            return null;
        } else if (currentState == cst.CurrentState.Beginning) {
            keyHandler = handleKeyDown(api.startGame);
            message = 'Press enter to begin.';
        } else if (currentState == cst.CurrentState.BetweenPlay) {
            keyHandler = handleKeyDown(api.resumeGame);
            message = gameState.score.lastScorer + ' scores! Press enter to continue.';
        } else if (currentState == cst.CurrentState.End) {
            keyHandler = handleKeyDown(api.restartGame);
            message = 'Game over! Who won?';
        } else {
            throw new Error('Cannot match CurrentState to any GameInfo to render.');
        }
        return <GameInfoAction keyHandler={keyHandler} message={message} />;
    }
});

var GameInfoAction = React.createClass({
    componentDidMount: function() {
        $(document.body).on('keydown', this.props.keyHandler);
    },
    componentWillUnmount: function() {
        $(document.body).off('keydown', this.props.keyHandler);
    },
    render: function() {
        var message = this.props.message;
        var distanceFromEdge = 0.15*actualWallLengthScreenPx;
        var gameInfoStyle = {
            position: 'absolute',
            top: distanceFromEdge,
            bottom: distanceFromEdge,
            left: distanceFromEdge,
            right: distanceFromEdge,
            border: "1px solid red",
        };
        return (
            <div style={gameInfoStyle}>{message}</div>
        );
    }
});

var Score = React.createClass({
    render: function() {
        var score = this.props.score;
        var scoreStyle = {
            position: 'absolute',
            right: '-140px',
            width: '125px',
            height: '50px',
        };
        return (
            <div style={scoreStyle}>
                <div>Player 1: {score.player1}</div>
                <div>Player 2: {score.player2}</div>
            </div>
        );
    }
});

function handleKeyDown(methodForKeyDown) {
    return function(e) {
        var ENTER = 13;
        if (e.keyCode == ENTER) {
            methodForKeyDown();
        }
    };
}

function gamePxToScreenPx(gamePx) {
    return gamePx*conversionFactor;
}

function gameCoordToScreenCoord(gameCoord, thickness) {
    return gamePxToScreenPx(gameCoord + cst.WALL_LENGTH/2 - Number(thickness)/2);
}

