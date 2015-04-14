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

export function getRectanglePoints(coordinate, rectWidth, rectHeight) {
    return {
        minX: coordinate.x - rectWidth/2,
        maxX: coordinate.x + rectWidth/2,
        minY: coordinate.y - rectHeight/2,
        maxY: coordinate.y + rectHeight/2
    };
}

export function rectanglesIntersect(rect1, rect2) {
    return !(
        rect1.maxX < rect2.minX ||
        rect1.minX > rect2.maxX ||
        rect1.minY > rect2.maxY ||
        rect1.maxY < rect2.minY
    );
}
