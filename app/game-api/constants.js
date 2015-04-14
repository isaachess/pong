export var BALL_DIAMETER = 100; // In game units
export var WALL_LENGTH = 1000; // In game units
export var PADDLE_THICKNESS = 10; // In game units
export var PADDLE_WIDTH = 100; // In game units
export var PADDLE_VECTOR = { x: 10, y: 0 }; // In game units

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

