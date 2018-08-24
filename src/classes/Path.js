import Cell from './Cell';

export default class Path extends Cell {
    constructor(x, y, size) {
        super(x, y, size);
    }

    draw(context) {
        context.clearRect(
            this.x * this.size,
            this.y * this.size,
            this.size,
            this.size
        );
    }
}
