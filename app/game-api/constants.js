export var BALL_DIAMETER = 100; // In game units
export var WALL_LENGTH = 1000; // In game units
export var PADDLE_THICKNESS = 100; // In game units
export var PADDLE_WIDTH = 500; // In game units

export var PaddleInfo = {
    player1: Coordinate, // Center of the paddle
    player2: Coordinate
};

export var BallInfo = {
    ballLocation: Coordinate,
    ballVector: Coordinate
};

export var Coordinate = { x: 0, y: 0 };
