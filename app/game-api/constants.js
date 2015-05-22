// All constants in game units
export var BALL_DIAMETER = 50;
export var WALL_LENGTH = 1000;
export var PADDLE_THICKNESS = 10;
export var PADDLE_WIDTH = 150;
export var SMALLEST_ANGLE = 25;
export var PADDLE_VECTOR = { x: 6, y: 0 };
export var MAX_POINTS = 5;
export var BALL_VELOCITY = 10;
export var AI_DIFFICULTY = {
    easy: 0.8,
    medium: 0.85,
    hard: 0.9,
};

export var GameState = {
    ballInfo: BallInfo,
    paddleInfo: PaddleInfo,
    score: Score,
    message: '',
    currentState: CurrentState,
    ai: Ai,
};

export var Ai = {
    players: [Player], // array of 'Player' type, telling which players should be controlled by the ai
    difficulty: '', // Can be easy, medium, or hard
};

export var Score = {
    player1: 0,
    player2: 0,
    lastScorer: Player,
};

// Acceptable values are 'player1' and 'player2'
export var Player = '';

export var CurrentState = {
    Beginning: 0,
    InPlay: 1,
    BetweenPlay: 2,
    End: 3,
};

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

export var Line = {
    slope: 0,
    yIntercept: 0,
};
