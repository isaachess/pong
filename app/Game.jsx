var styles = require('./styles.js');
var React = require('react');
var $ = require('jquery');
var cst = require('./game-api/constants.js');

export var Info = React.createClass({
    render: function() {
        var gameState = this.props.gameState;
        var api = this.props.api;
        return (
            <div>
                <Score score={gameState.score.player1} player='player1' />
                <Score score={gameState.score.player2} player='player2' />
                <GameInfo gameState={gameState} api={api} />
            </div>
        );
    }
});

var GameInfo = React.createClass({
    render: function() {
        var keyHandler, largeMessage, instruction, key;
        var gameState = this.props.gameState;
        var currentState = gameState.currentState;
        var api = this.props.api;
        if (currentState == cst.CurrentState.InPlay) {
            return null;
        } else if (currentState == cst.CurrentState.Beginning) {
            keyHandler = handleKeyDown(api.startGame);
            key = cst.CurrentState.Beginning;
            largeMessage = 'PONG!';
            instruction = 'Press enter to begin.';
        } else if (currentState == cst.CurrentState.BetweenPlay) {
            keyHandler = handleKeyDown(api.resumeGame);
            key = cst.CurrentState.BetweenPlay;
            largeMessage = gameState.score.lastScorer + ' scores!';
            instruction = 'Press enter to continue.';
        } else if (currentState == cst.CurrentState.End) {
            keyHandler = handleKeyDown(api.restartGame);
            key = cst.CurrentState.End;
            largeMessage = 'Someone wins!';
            instruction = 'Press enter to play again.';
        } else {
            throw new Error('Cannot match CurrentState to any GameInfo to render.');
        }
        return <GameInfoAction key={key} keyHandler={keyHandler} largeMessage={largeMessage} instruction={instruction} />;
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
        var largeMessage = this.props.largeMessage;
        var instruction = this.props.instruction;
        var distanceFromEdge = '10%';
        var gameInfoStyle = {
            position: 'absolute',
            top: distanceFromEdge,
            bottom: distanceFromEdge,
            left: distanceFromEdge,
            right: distanceFromEdge,
            border: "20px solid "+styles.whiteColor,
            backgroundColor: styles.grayColor,
            fontFamily: 'VT323',
            color: styles.whiteColor,
        };
        var largeMessageStyle = {
            padding: '30px 0',
            fontSize: '90px',
            textAlign: 'center',
        };
        var instructionStyle = {
            fontSize: '30px',
            textAlign: 'center',
        };
        return (
            <div style={gameInfoStyle}>
                <div style={largeMessageStyle}>{largeMessage}</div>
                <div style={instructionStyle}>{instruction}</div>
            </div>
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
