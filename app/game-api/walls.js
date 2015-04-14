var constants = require('./constants.js');
var vectors = require('./vectors.js');

export function willBounce(ballInfo) {
    var potentialLocation = vectors.addVectors(ballInfo.ballLocation, ballInfo.ballVector);
    return locationHitsAnyWall(potentialLocation);
}

export function bounceVector(vectorToBounce) {
    return vectors.bounceX(vectorToBounce);
}

function locationHitsAnyWall(location) {
    var ballRect = vectors.getRectanglePoints(location, constants.BALL_DIAMETER, constants.BALL_DIAMETER);
    return ballHitsLeftWall(ballRect) || ballHitsRightWall(ballRect);
}

function ballHitsLeftWall(ballRect) {
    return ballRect.minX <= -constants.WALL_LENGTH/2;
}

function ballHitsRightWall(ballRect) {
    return ballRect.maxX >= constants.WALL_LENGTH/2;
}
