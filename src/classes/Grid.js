import Wall from './Wall';

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
        this.player;
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
    }

    draw(context) {
        this.board.forEach(item => {
            item.forEach(cell => {
                cell.draw(context);
            });
        });
    }

    createMovementOverlay() {
        this.movementOverlay = this.board.map(x => {
            return x.map(y => {
                if (y instanceof Wall) {
                    return false;
                } else {
                    return true;
                }
            });
        });
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

    addPlayer(player) {
        let position = player.getPosition();
        this.board[position.x][position.y] = this.player = player;
    }

    movePlayerLeft() {
        let originalPlayerPosition = this.player.getPosition();
        this.player.moveLeft();
        this.swapKey(
            this.board[originalPlayerPosition.x][originalPlayerPosition.y],
            this.board[this.player.x][this.player.y]
        );
    }

    movePlayerRight() {
        let originalPlayerPosition = this.player.getPosition();
        this.player.moveRight();
        this.swapKey(
            this.board[originalPlayerPosition.x][originalPlayerPosition.y],
            this.board[this.player.x][this.player.y]
        );
    }

    movePlayerUp() {
        let originalPlayerPosition = this.player.getPosition();
        this.player.moveUp();
        this.swapKey(
            this.board[originalPlayerPosition.x][originalPlayerPosition.y],
            this.board[this.player.x][this.player.y]
        );
    }

    movePlayerDown() {
        let originalPlayerPosition = this.player.getPosition();
        this.player.moveDown();
        this.swapKey(
            this.board[originalPlayerPosition.x][originalPlayerPosition.y],
            this.board[this.player.x][this.player.y]
        );
    }

    swapKey(a, b) {
        [a, b] = [b, a];
    }
}
