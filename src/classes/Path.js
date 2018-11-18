import Cell from './Cell';

export default class Path extends Cell {
    draw(context) {
        context.clearRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
}
