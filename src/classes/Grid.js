import Wall from './Wall';
import Player from './Player';

export default class Grid {
    constructor(gridSize, boardSize) {
        this.board = [];
        for (let x = 0; x < gridSize; x++) {
            this.board[x] = [];
            for (let y = 0; y < gridSize; y++) {
                this.board[x][y] = new Wall(x, y, boardSize / gridSize);
            }
        }
        this.movementOverlay = this.createMovementOverlay();
        this.player = new Player(1, 1, boardSize / gridSize);
    }

    setBoard(newBoard) {
        this.board = newBoard;
        this.createMovementOverlay();
    }

    resize(size) {
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
