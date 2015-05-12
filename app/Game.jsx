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
                <GameInfo currentState={gameState.currentState} api={api} />
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
        var currentState = this.props.currentState;
        if (currentState == cst.CurrentState.InPlay) {
            return null;
        } else if (currentState == cst.CurrentState.Beginning) {
            return <GameInfoBeginning keyHandler={handleKeyDown(this.props.api.startGame)} />;
        } else if (currentState == cst.CurrentState.BetweenPlay) {
            return <GameInfoBetweenPlay />;
        } else if (currentState == cst.CurrentState.End) {
            return <GameInfoEnd />;
        } else {
            throw new Error('Cannot match CurrentState to any GameInfo to render.');
        }
    }
});

var GameInfoBeginning = React.createClass({
    componentDidMount: function() {
        $(document.body).on('keydown', this.props.keyHandler);
    },
    componentWillUnmount: function() {
        $(document.body).off('keydown', this.props.keyHandler);
    },
    render: function() {
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
            <div style={gameInfoStyle}>Hey bob!</div>
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

