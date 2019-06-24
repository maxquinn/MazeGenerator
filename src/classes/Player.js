import Cell from './Cell';

export default class Player extends Cell {
  constructor(x, y, size) {
    super(x, y, size);
    this.fillStyle = '#0199d9';
  }

  draw(context) {
    const ctx = context;
    ctx.fillStyle = this.getFillStyle();
    ctx.fillRect(this.x * this.size + 1, this.y * this.size + 1, this.size - 2, this.size - 2);
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  moveLeft() {
    this.x -= 1;
  }

  moveRight() {
    this.x += 1;
  }

  moveUp() {
    this.y -= 1;
  }

  moveDown() {
    this.y += 1;
  }
}
