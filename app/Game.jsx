var styles = require('./styles.js');
var React = require('react');
var $ = require('jquery');
var _ = require('lodash');
var cst = require('./game-api/constants.js');

export var Info = React.createClass({
    render: function() {
        var gameState = this.props.gameState;
        var api = this.props.api;
        return (
            <div>
                <Score score={gameState.score.player1} currentState={gameState.currentState} player='player1' />
                <Score score={gameState.score.player2} currentState={gameState.currentState} player='player2' />
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
            largeMessage = formattedPlayerString(gameState.score.lastScorer) + ' scores!';
            instruction = 'Press enter to continue.';
        } else if (currentState == cst.CurrentState.End) {
            var winner = winnerFromScore(gameState.score);
            keyHandler = handleKeyDown(api.restartGame);
            key = cst.CurrentState.End;
            largeMessage = formattedPlayerString(winner)+' wins!';
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
            border: "20px solid "+styles.white,
            backgroundColor: styles.gray,
            fontFamily: 'VT323',
            color: styles.white,
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
        var player = this.props.player;
        var currentState = this.props.currentState;
        var scoreDistance = '10px';
        var scoreLocation = (player == 'player1') ? {top: scoreDistance} : {bottom: scoreDistance};
        var scoreColor = (currentState == cst.CurrentState.InPlay) ? styles.lightGray : styles.white;
        var scoreStyle = _.merge({
            position: 'absolute',
            left: 10,
            color: scoreColor,
            fontFamily: 'VT323',
            fontSize: '30px',
        }, scoreLocation);
        return (
            <div style={scoreStyle}>
                <div>{formattedPlayerString(player)}: {score}</div>
            </div>
        );
    }
});

function formattedPlayerString(playerString) {
    if (playerString == 'player1') {
        return 'Player 1';
    } else if (playerString == 'player2') {
        return 'Player 2';
    } else {
        throw new Error('Cannot get player string for player: '+playerString);
    }
}

function winnerFromScore(scoreInfo) {
    if (scoreInfo.player1 == cst.MAX_POINTS) {
        return 'player1';
    } else if (scoreInfo.player2 == cst.MAX_POINTS) {
        return 'player2';
    } else {
        throw new Error('Cannot find winner for this score: '+scoreInfo);
    }
}

function handleKeyDown(methodForKeyDown) {
    return function(e) {
        var ENTER = 13;
        if (e.keyCode == ENTER) {
            methodForKeyDown();
        }
    };
}
