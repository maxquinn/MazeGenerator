import Cell from './Cell';

export default class Finish extends Cell {
    constructor(x, y, size) {
        super(x, y, size);
        this.fillStyle = '#ff0000e0';
    }

    draw(context) {
        context.fillStyle = this.getFillStyle();
        context.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
}
