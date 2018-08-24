import Cell from './Cell';

export default class Player extends Cell {
    constructor(x, y, size) {
        super(x, y, size);
        this.fillStyle = '#0199d9';
    }

    draw(context) {
        context.fillStyle = this.getFillStyle();
        context.fillRect(
            this.x * this.size,
            this.y * this.size,
            this.size,
            this.size
        );
    }

    getPosition() {
        return {
            y: this.y,
            x: this.x
        };
    }

    moveLeft() {
        this.y--;
    }

    moveRight() {
        this.y++;
    }

    moveUp() {
        this.x--;
    }

    moveDown() {
        this.x++;
    }
}
