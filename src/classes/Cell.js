export default class Cell {
    constructor(x, y, size) {
        this.row = x;
        this.col = y;
        this.size = size;
        this.neighbors = [];
    }

    draw(context) {}

    getFillStyle() {
        return this.fillStyle;
    }

    setNeighbors(neighbors) {
        this.neighbors = neighbors;
    }

    hasNeighbors() {
        if (this.neighbors.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    setSize(newSize) {
        this.size = newSize;
    }
}
