import Cell from './Cell';

export default class Path extends Cell {
    constructor(x, y, size) {
        super(x, y, size);
    }

    draw(context) {
        context.clearRect(
            this.row * this.size,
            this.col * this.size,
            this.size,
            this.size
        );
    }
}
