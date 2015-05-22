var cst = require('./constants.js');
var math = require('./math.js');

export function startScore() {
    return genericScore(0, 0);
}

export function newScoreInfo(prevScore, potentialBallLocation) {
    var scoringPlayer = playerWillScore(potentialBallLocation);
    if (scoringPlayer == 'player1') {
        return genericScore(prevScore.player1+1, prevScore.player2, scoringPlayer);
    } else if (scoringPlayer == 'player2') {
        return genericScore(prevScore.player1, prevScore.player2+1, scoringPlayer);
    } else {
        return prevScore;
    }
}

export function currentStatePerScore(oldScoreInfo, newScoreInfo) {
    if (anyPlayerWillWin(newScoreInfo)) {
        return cst.CurrentState.End;
    } else if (oldScoreInfo != newScoreInfo) {
        return cst.CurrentState.BetweenPlay;
    } else {
        return cst.CurrentState.InPlay;
    }
}

function genericScore(player1Score, player2Score, lastScorer) {
    return {
        player1: player1Score,
        player2: player2Score,
        lastScorer: lastScorer,
    };
}

function playerWillScore(potentialBallLocation) {
    // Returns string 'player1', 'player2', or null if no score
    var ballRect = math.getRectanglePoints(potentialBallLocation, cst.BALL_DIAMETER, cst.BALL_DIAMETER);
    var gameRect = math.getRectanglePoints({x: 0, y: 0}, cst.WALL_LENGTH, cst.WALL_LENGTH);
    if (!math.rectanglesIntersect(ballRect, gameRect)) {
        if (potentialBallLocation.y < 0) {
            return 'player1';
        } else {
            return 'player2';
        }
    } else {
        return null;
    }
}

function anyPlayerWillWin(newScoreInfo) {
    return newScoreInfo.player1 == cst.MAX_POINTS || newScoreInfo.player2 == cst.MAX_POINTS;
}
