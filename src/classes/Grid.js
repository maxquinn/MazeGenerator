import Wall from './Wall';
import Player from './Player';
import Path from './Path';
import Finish from './Finish';

export default class Grid {
    constructor(gridSize, boardSize) {
        this.board = [];
        this.cellSize = boardSize / gridSize;
        this.startCell = {
            x: 0,
            y: 1
        };
        this.finishCell = {
            x: gridSize - 1,
            y: gridSize - 2
        };
        for (let x = 0; x < gridSize; x++) {
            this.board[x] = [];
            for (let y = 0; y < gridSize; y++) {
                this.board[x][y] = new Wall(x, y, this.cellSize);
            }
        }
        this.player = new Player(0, 1, this.cellSize);
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
            this.cellSize
        );
        this.board[this.finishCell.x][this.finishCell.y] = new Finish(
            this.finishCell.x,
            this.finishCell.y,
            this.cellSize
        );
    }

    resize(size) {
        this.cellSize = size;
        this.board.forEach(item => {
            item.forEach(cell => {
                cell.setSize(size);
            });
        });
        this.player.setSize(size);
    }

    draw(context) {
        this.board.forEach(item => {
            item.forEach(cell => {
                cell.draw(context);
            });
        });
        this.player.draw(context);
    }

    createMovementOverlay() {
        this.movementOverlay = this.board.map(x =>
            x.map(y => {
                if (y instanceof Wall) {
                    return false;
                } else {
                    return true;
                }
            })
        );
    }

    isLegalMove(x, y) {
        if (
            x < 0 ||
            x >= this.movementOverlay.length ||
            y < 0 ||
            y >= this.movementOverlay[0].length
        )
            return false;
        return this.movementOverlay[x][y];
    }

    movePlayerLeft() {
        this.player.moveLeft();
    }

    movePlayerRight() {
        this.player.moveRight();
    }

    movePlayerUp() {
        this.player.moveUp();
    }

    movePlayerDown() {
        this.player.moveDown();
    }
}
