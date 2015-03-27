export function addVectors(v1, v2) {
    return { x: v1.x+v2.x, y: v1.y+v2.y };
}

export function bounceX(vector) {
    return { x: -vector.x, y: vector.y };
}

export function bounceY(vector) {
    return { x: vector.x, y: -vector.y };
}
