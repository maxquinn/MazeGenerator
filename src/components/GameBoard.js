import React from 'react';

class Cell {
    constructor(x, y, size) {
        this.row = x;
        this.col = y;
        this.size = size;
    }

    draw(context) {
        context.fillStyle = (this.row + this.col) % 2 ? '#000' : '#fff';
        context.fillRect(
            this.row * this.size,
            this.col * this.size,
            this.size,
            this.size
        );
    }
}

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.WINDOW_SIZE_MULTIPLIER = 0.7;
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            boardSize: 0,
            ctx: undefined,
            difficulty: 10,
            grid: undefined
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.setState(
            {
                ctx: this.refs.canvas.getContext('2d')
            },
            () => {
                this.handleResize();
            }
        );
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        let nextBoardSize =
            Math.min(window.innerHeight, window.innerWidth) *
            this.WINDOW_SIZE_MULTIPLIER;
        this.setState(
            {
                boardSize: nextBoardSize,
                grid: this.generateGrid(this.state.difficulty, nextBoardSize)
            },
            () => {
                this.drawGrid();
            }
        );
    }

    generateGrid(gridSize, boardSize) {
        console.log(this.state);
        let grid = [];
        for (let row = 0; row < gridSize; row++) {
            grid[row] = [];
            for (let col = 0; col < gridSize; col++) {
                grid[row][col] = new Cell(
                    row,
                    col,
                    Math.floor(boardSize / this.state.difficulty)
                );
            }
        }
        return grid;
    }

    drawGrid() {
        this.state.grid.forEach(item => {
            item.forEach(cell => {
                cell.draw(this.state.ctx);
            });
        });
    }

    render() {
        return (
            <canvas
                className="Component_GameBoard-canvas"
                ref="canvas"
                width={this.state.boardSize}
                height={this.state.boardSize}
            />
        );
    }
}

export default GameBoard;
