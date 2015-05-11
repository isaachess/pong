export function startScore() {
    return genericScore(0, 0);
}

export function genericScore(player1Score, player2Score) {
    return {
        player1: player1Score,
        player2: player2Score,
    };
}
