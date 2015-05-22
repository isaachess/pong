var styles = require('./styles.js');
var React = require('react');
var classnames = require('classnames');
var $ = require('jquery');
var _ = require('lodash');
var cst = require('./game-api/constants.js');

var ai = {
    players: [],
    difficulty: 'easy',
};

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
        var keyHandler, largeMessage, instructions, keyInstruction, key;
        var gameState = this.props.gameState;
        var currentState = gameState.currentState;
        var api = this.props.api;
        if (currentState == cst.CurrentState.InPlay) {
            return null;
        } else if (currentState == cst.CurrentState.Beginning) {
            keyHandler = handleKeyDown(api.startGame, [ai]);
            key = cst.CurrentState.Beginning;
            largeMessage = 'PONG!';
            instructions = ['Player 1: A/S keys. Player 2: K/L keys.', 'Press enter to begin.'];
        } else if (currentState == cst.CurrentState.BetweenPlay) {
            keyHandler = handleKeyDown(api.resumeGame);
            key = cst.CurrentState.BetweenPlay;
            largeMessage = formattedPlayerString(gameState.score.lastScorer) + ' scores!';
            instructions = ['Press enter to continue.'];
        } else if (currentState == cst.CurrentState.End) {
            var winner = winnerFromScore(gameState.score);
            keyHandler = handleKeyDown(api.restartGame);
            key = cst.CurrentState.End;
            largeMessage = formattedPlayerString(winner)+' wins!';
            instructions = ['Press enter to play again.'];
        } else {
            throw new Error('Cannot match CurrentState to any GameInfo to render.');
        }
        return <GameInfoAction key={key} keyHandler={keyHandler} largeMessage={largeMessage} instructions={instructions} keyInstruction={keyInstruction} currentState={currentState} />;
    }
});

/////////////////////
/// Info sections ///
/////////////////////

var GameInfoAction = React.createClass({
    componentDidMount: function() {
        $(document.body).on('keydown', this.props.keyHandler);
    },
    componentWillUnmount: function() {
        $(document.body).off('keydown', this.props.keyHandler);
    },
    render: function() {
        var largeMessage = this.props.largeMessage;
        var instructions = this.props.instructions;
        var currentState = this.props.currentState;
        var aiControls;
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
            paddingBottom: '20px',
            fontSize: '30px',
            textAlign: 'center',
        };
        var renderedInstructions = _.map(instructions, (instruction) => <div style={instructionStyle}>{instruction}</div>);
        if (currentState == cst.CurrentState.Beginning) {
            aiControls =
                <div style={instructionStyle}>
                    <AiSelector player={'player1'} />
                    <AiSelector player={'player2'} />
                    <AiDifficulty />
                </div>;
        }
        return (
            <div style={gameInfoStyle}>
                <div style={largeMessageStyle}>{largeMessage}</div>
                {aiControls}
                {renderedInstructions}
            </div>
        );
    }
});

var AiDifficulty = React.createClass({
    getInitialState: function() {
        return this.getSelectedState();
    },
    getSelectedState: function() {
        return {
            'easy': this.isDifficultySelected('easy'),
            'medium': this.isDifficultySelected('medium'),
            'hard': this.isDifficultySelected('hard'),
        };
    },
    isDifficultySelected: function(difficulty) {
        return ai.difficulty == difficulty;
    },
    selectDifficulty: function(difficulty) {
        ai.difficulty = difficulty;
        this.setState(this.getSelectedState());
    },
    selectEasy: function() {return this.selectDifficulty('easy');},
    selectMedium: function() {return this.selectDifficulty('medium');},
    selectHard: function() {return this.selectDifficulty('hard');},
    render: function() {
        var easyClasses = classnames({
            'selected': this.state.easy,
            'link': true,
        });
        var mediumClasses = classnames({
            'selected': this.state.medium,
            'link': true,
        });
        var hardClasses = classnames({
            'selected': this.state.hard,
            'link': true,
        });
        return (
            <div>
                <span>Comp difficulty: </span>
                <span className={easyClasses} onClick={this.selectEasy}>Easy </span>
                <span className={mediumClasses} onClick={this.selectMedium}>Medium </span>
                <span className={hardClasses} onClick={this.selectHard}>Hard </span>
            </div>
        );
    }
});

var AiSelector = React.createClass({
    getInitialState: function() {
        return this.getSelectedState();
    },
    getSelectedState: function() {
        return { humanSelected: this.isHumanSelected(this.props.player) };
    },
    isHumanSelected: function(player) {
        return !_.contains(ai.players, player);
    },
    selectHuman: function() {
        _.remove(ai.players, (player) => this.props.player == player);
        this.setState(this.getSelectedState());
    },
    selectComputer: function() {
        _.remove(ai.players, (player) => this.props.player == player);
        ai.players.push(this.props.player);
        this.setState(this.getSelectedState());
    },
    render: function() {
        var player = this.props.player;
        var humanClasses = classnames({
            'selected': this.state.humanSelected,
            'link': true,
        });
        var computerClasses = classnames({
            'selected': !this.state.humanSelected,
            'link': true,
        });
        return (
            <div>{formattedPlayerString(player)} <span onClick={this.selectHuman} className={humanClasses}>Human</span> <span onClick={this.selectComputer} className={computerClasses}>Computer</span></div>
        );
    }
});

var Score = React.createClass({
    render: function() {
        var score = this.props.score;
        var player = this.props.player;
        var currentState = this.props.currentState;
        var scoreDistance = '10px';
        var scoreLocation = (player == 'player1') ? {bottom: scoreDistance} : {top: scoreDistance};
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

function handleKeyDown(methodForKeyDown, argsForKeyDown) {
    return function(e) {
        var ENTER = 13;
        if (e.keyCode == ENTER) {
            methodForKeyDown.apply(methodForKeyDown, argsForKeyDown);
        }
    };
}
