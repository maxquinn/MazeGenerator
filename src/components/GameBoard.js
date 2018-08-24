import React from 'react';
import PropTypes from 'prop-types';
import Wall from '../classes/Wall';
import Player from '../classes/Player';
import { forgeTheLabyrinth } from '../helpers/forgeTheLabyrinth';
import InputManager from '../classes/InputManager';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.WINDOW_SIZE_MULTIPLIER = 0.7;
        this.handleResize = this.handleResize.bind(this);
        this.loop = this.loop.bind(this);
        this.state = {
            boardSize: 0,
            ctx: undefined,
            difficulty: 11,
            grid: undefined,
            player: undefined,
            input: new InputManager()
        };
    }

    static contextTypes = {
        loop: PropTypes.object
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.state.input.bindKeys();
        this.context.loop.subscribe(this.loop);
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
                this.startGame();
            }
        );
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        this.state.input.unbindKeys();
        this.context.loop.unsubscribe(this.loop);
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
                this.resizeGrid(nextBoardSize / this.state.difficulty);
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
                    boardSize / this.state.difficulty
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

    createMovementOverlay() {
        return this.state.grid.map(row => {
            return row.map(col => {
                if (col instanceof Wall) {
                    return false;
                } else {
                    return true;
                }
            });
        });
    }

    startGame() {
        this.setState({
            movementOverlay: this.createMovementOverlay()
        });
        this.setState(
            {
                player: new Player(
                    1,
                    1,
                    this.state.boardSize / this.state.difficulty
                )
            },
            () => {
                this.state.grid[1][1] = this.state.player;
                this.state.player.draw(this.state.ctx);
            }
        );
    }

    isLegalMove(row, col) {
        if (
            row < 0 ||
            row >= this.state.movementOverlay.length ||
            col < 0 ||
            col >= this.state.movementOverlay[0].length
        )
            return false;
        return this.state.movementOverlay[row][col];
    }

    loop() {
        if (this.state.input.pressedKeys.left) console.log('left');
        if (this.state.input.pressedKeys.right) {
            let playerPosition = this.state.player.getPosition();
            if (this.isLegalMove(playerPosition.row, playerPosition.col)) {
                console.log('moveRight');
                this.state.player.moveRight();
            } else {
                console.log('cant move right anymore');
            }
        }
        if (this.state.input.pressedKeys.up) console.log('up');
        if (this.state.input.pressedKeys.down) console.log('down');
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
