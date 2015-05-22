var _ = require('lodash');
var paddles = require('./paddles.js');
var cst = require('./constants.js');

var randomKeys = {};

export function move(gameState) {
    _.forEach(gameState.ai.players, (player) => makeMove(player, gameState.ai.difficulty, gameState.ballInfo, gameState.paddleInfo));
}

function makeMove(player, difficulty, ballInfo, paddleInfo) {
    var relevantPaddleInfo = paddleInfo[player];
    // Only make a move if the ball is moving toward your paddle && the ball is close enough to start moving
    if (ballMovingTowardPlayer(player, relevantPaddleInfo, ballInfo.ballVector) && withinAcceptableDistance(relevantPaddleInfo, ballInfo.ballLocation, difficulty)) {
        var intersectionCoord = getBallIntersect(relevantPaddleInfo, ballInfo);
        var offSetDistance = getRandomKey(player) * cst.PADDLE_WIDTH/2;
        var desiredX = intersectionCoord.x + offSetDistance;
        if (desiredX < relevantPaddleInfo.x) {
            return paddles.movePaddle(player, 'left');
        } else if (desiredX > relevantPaddleInfo.x) {
            return paddles.movePaddle(player, 'right');
        } else {
            return paddles.movePaddle(player, null);
        }
    }
    else {
        generateNewRandomKey(player);
        return paddles.movePaddle(player, null);
    }
}

function ballMovingTowardPlayer(player, paddleCoord, ballVector) {
    return paddleCoord.y * ballVector.y > 0;
}

function withinAcceptableDistance(paddleCoord, ballLocation, difficulty) {
    return Math.abs(ballLocation.y - paddleCoord.y) < cst.WALL_LENGTH*cst.AI_DIFFICULTY[difficulty];
}

function getBallIntersect(paddleCoord, ballInfo) {
    var ballLine = getBallLine(ballInfo);
    var yLocation = paddleCoord.y;
    var xLocation = (yLocation - ballLine.yIntercept) / ballLine.slope;
    if (isNaN(xLocation)) xLocation = 0; // If slope is 0 xLocation is NaN, so just set it to zero
    return {x: xLocation, y: yLocation};
}

function getBallLine(ballInfo) {
    var ballVector = ballInfo.ballVector;
    var ballLocation = ballInfo.ballLocation;
    var slope = ballVector.y / ballVector.x;
    var yIntercept = ballLocation.y - slope*ballLocation.x;
    return {
        slope: slope,
        yIntercept: yIntercept,
    };
}

function generateNewRandomKey(playerString) {
    randomKeys[playerString] = _.random(-1, 1, true);
}

function getRandomKey(playerString) {
    return randomKeys[playerString];
}
