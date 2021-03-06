export default class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.neighbors = [];
  }

  getFillStyle() {
    return this.fillStyle;
  }

  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  hasNeighbors() {
    if (this.neighbors.length > 0) {
      return true;
    }
    return false;
  }

  setSize(newSize) {
    this.size = newSize;
  }
}
