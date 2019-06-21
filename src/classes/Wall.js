import Cell from './Cell';

export default class Wall extends Cell {
  constructor(x, y, size) {
    super(x, y, size);
    this.fillStyle = '#000000';
  }

  draw(context) {
    const ctx = context;
    ctx.fillStyle = this.getFillStyle();
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
  }
}
