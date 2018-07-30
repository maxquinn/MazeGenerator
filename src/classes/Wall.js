import Cell from './Cell';

export default class Wall extends Cell {
    constructor(x, y, size) {
        super(x, y, size);
        this.fillStyle = '#000000';
    }

    draw(context) {
        context.fillStyle = this.getFillStyle();
        context.fillRect(
            this.row * this.size,
            this.col * this.size,
            this.size,
            this.size
        );
    }
}
