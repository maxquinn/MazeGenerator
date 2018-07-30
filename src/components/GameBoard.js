import React from 'react';
import Wall from '../classes/Wall';
import { forgeTheLabyrinth } from '../helpers/forgeTheLabyrinth';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.WINDOW_SIZE_MULTIPLIER = 0.7;
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            boardSize: 0,
            ctx: undefined,
            difficulty: 11,
            grid: undefined
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        let boardSize =
            Math.min(window.innerHeight, window.innerWidth) *
            this.WINDOW_SIZE_MULTIPLIER;
        this.setState(
            {
                ctx: this.refs.canvas.getContext('2d'),
                boardSize: boardSize,
                grid: this.generateGrid(this.state.difficulty, boardSize)
            },
            () => {
                this.handleResize();
                this.setState({
                    grid: forgeTheLabyrinth(1, 1, this.state.grid)
                });
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
                boardSize: nextBoardSize
            },
            () => {
                this.resizeGrid(
                    Math.floor(nextBoardSize / this.state.difficulty)
                );
                this.drawGrid();
            }
        );
    }

    generateGrid(gridSize, boardSize) {
        let grid = [];
        for (let row = 0; row < gridSize; row++) {
            grid[row] = [];
            for (let col = 0; col < gridSize; col++) {
                grid[row][col] = new Wall(
                    row,
                    col,
                    Math.floor(boardSize / this.state.difficulty)
                );
            }
        }
        return grid;
    }

    resizeGrid(size) {
        this.state.grid.forEach(item => {
            item.forEach(cell => {
                cell.setSize(size);
            });
        });
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
