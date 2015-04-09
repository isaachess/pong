export function addVectors(v1, v2) {
    return { x: v1.x+v2.x, y: v1.y+v2.y };
}

export function subtractVectors(v1, v2) {
    return addVectors(v1, inverseVector(v2));
}

export function inverseVector(v) {
    return { x: -v.x, y: -v.y };
}

export function bounceX(vector) {
    return { x: -vector.x, y: vector.y };
}

export function bounceY(vector) {
    return { x: vector.x, y: -vector.y };
}


