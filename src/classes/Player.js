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
            x: this.x,
            y: this.y
        };
    }

    moveLeft() {
        this.x--;
    }

    moveRight() {
        this.x++;
    }

    moveUp() {
        this.y--;
    }

    moveDown() {
        this.y++;
    }
}
