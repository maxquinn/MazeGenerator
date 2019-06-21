import Cell from './Cell';

export default class Player extends Cell {
  constructor(x, y, size) {
    super(x, y, size);
    this.fillStyle = '#0199d9';
  }

  draw(context) {
    const ctx = context;
    ctx.fillStyle = this.getFillStyle();
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
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
