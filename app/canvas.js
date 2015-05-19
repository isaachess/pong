var cst = require('./game-api/constants.js');
var styles = require('./styles.js');
var canvasWallLength = cst.WALL_LENGTH;
var conversionFactor = canvasWallLength/cst.WALL_LENGTH; // Currently this ratio is 1, but this way I don't *depend* on it being 1

export function render(gameState) {
    var c = document.getElementById('pong-game');
    var ctx = c.getContext('2d');
    board(ctx);
    ball(ctx, gameState.ballInfo);
    paddle(ctx, gameState.paddleInfo.player1);
    paddle(ctx, gameState.paddleInfo.player2);
}

function board(ctx) {
    ctx.beginPath();
    ctx.rect(0, 0, canvasWallLength, canvasWallLength);
    ctx.save();
    ctx.clip();

    ctx.beginPath();
    ctx.fillStyle = styles.gray;
    ctx.fillRect(0, 0, canvasWallLength, canvasWallLength);
}

function ball(ctx, ballInfo) {
    var ballLocation = gameCoordToCanvasCoord(ballInfo.ballLocation, 0, 0);
    ctx.beginPath();
    ctx.fillStyle = styles.white;
    ctx.arc(ballLocation.x, ballLocation.y, gamePxToCanvasPx(cst.BALL_DIAMETER/2), 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
}

function paddle(ctx, paddleCoord) {
    var canvasCoord = gameCoordToCanvasCoord(paddleCoord, cst.PADDLE_WIDTH, cst.PADDLE_THICKNESS);
    ctx.fillStyle = styles.white;
    ctx.fillRect(canvasCoord.x, canvasCoord.y, gamePxToCanvasPx(cst.PADDLE_WIDTH), gamePxToCanvasPx(cst.PADDLE_THICKNESS));
}

function gamePxToCanvasPx(gamePx) {
    return gamePx*conversionFactor;
}

function gameLocationToCanvasLocation(gameLocation, thickness) {
    return gamePxToCanvasPx(gameLocation + cst.WALL_LENGTH/2 - Number(thickness)/2);
}

function gameCoordToCanvasCoord(gameCoord, thicknessX, thicknessY) {
    var x = gameLocationToCanvasLocation(gameCoord.x, thicknessX);
    var y = gameLocationToCanvasLocation(gameCoord.y, thicknessY);
    return { x: x, y: y };
}
