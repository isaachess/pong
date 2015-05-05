// All constants in game units
export var BALL_DIAMETER = 100;
export var WALL_LENGTH = 1000;
export var PADDLE_THICKNESS = 10;
export var PADDLE_WIDTH = 150;
export var SMALLEST_ANGLE = 25;
export var PADDLE_VECTOR = { x: 6, y: 0 };

export var PaddleInfo = {
    player1: Coordinate, // Center of the paddle
    player2: Coordinate
};

export var BallInfo = {
    ballLocation: Coordinate,
    ballVector: Coordinate
};

export var PaddleDirections = {
    player1: '', // Acceptable values are 'left' and 'right'
    player2: '',
};

export var Coordinate = { x: 0, y: 0 };

