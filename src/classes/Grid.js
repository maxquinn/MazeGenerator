import Wall from './Wall';
import Player from './Player';
import Path from './Path';
import Finish from './Finish';

export default class Grid {
  constructor(gridSize, boardSize, playerColor = '#000000') {
    this.board = [];
    this.cellSize = Math.floor(boardSize / gridSize);
    this.startCell = {
      x: 0,
      y: 1,
    };
    this.finishCell = {
      x: gridSize - 1,
      y: gridSize - 2,
    };
    for (let x = 0; x < gridSize; x += 1) {
      this.board[x] = [];
      for (let y = 0; y < gridSize; y += 1) {
        this.board[x][y] = new Wall(x, y, this.cellSize);
      }
    }
    this.player = new Player(0, 1, this.cellSize, playerColor);
    this.ctx = null;
  }

  setBoard(newBoard) {
    this.board = newBoard;
    this.makeEntryAndExit();
    this.createMovementOverlay();
  }

  makeEntryAndExit() {
    this.board[this.startCell.x][this.startCell.y] = new Path(
      this.startCell.x,
      this.startCell.y,
      this.cellSize,
    );
    this.board[this.finishCell.x][this.finishCell.y] = new Finish(
      this.finishCell.x,
      this.finishCell.y,
      this.cellSize,
    );
  }

  resize(size) {
    this.cellSize = Math.floor(size);
    this.board.forEach((item) => {
      item.forEach((cell) => {
        cell.setSize(size);
      });
    });
    this.player.setSize(size);
    this.draw(this.ctx);
  }

  draw(context) {
    this.ctx = context;
    this.board.forEach((item) => {
      item.forEach((cell) => {
        cell.draw(context);
      });
    });
    this.player.draw(context);
  }

  createMovementOverlay() {
    this.movementOverlay = this.board.map(x => x.map((y) => {
      if (y instanceof Wall) {
        return false;
      }
      return true;
    }));
  }

  isLegalMove(x, y) {
    if (x < 0 || x >= this.movementOverlay.length || y < 0 || y >= this.movementOverlay[0].length) {
      return false;
    }
    return this.movementOverlay[x][y];
  }

  movePlayerLeft() {
    const oldCell = this.player.getPosition();
    this.player.moveLeft();
    this.board[oldCell.x][oldCell.y].draw(this.ctx);
    this.player.draw(this.ctx);
  }

  movePlayerRight() {
    const oldCell = this.player.getPosition();
    this.player.moveRight();
    this.board[oldCell.x][oldCell.y].draw(this.ctx);
    this.player.draw(this.ctx);
  }

  movePlayerUp() {
    const oldCell = this.player.getPosition();
    this.player.moveUp();
    this.board[oldCell.x][oldCell.y].draw(this.ctx);
    this.player.draw(this.ctx);
  }

  movePlayerDown() {
    const oldCell = this.player.getPosition();
    this.player.moveDown();
    this.board[oldCell.x][oldCell.y].draw(this.ctx);
    this.player.draw(this.ctx);
  }
}
