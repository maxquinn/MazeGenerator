import React from 'react';
import PropTypes from 'prop-types';
import Player from '../classes/Player';
import Grid from '../classes/Grid';
import { forgeTheLabyrinth } from '../helpers/forgeTheLabyrinth';
import InputManager from '../classes/InputManager';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.WINDOW_SIZE_MULTIPLIER = 0.7;
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            boardSize: 0,
            ctx: undefined,
            difficulty: 11,
            grid: undefined,
            input: new InputManager()
        };
    }

    static contextType = GameContext;
    //bind this.context.loop

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.state.input.bindKeys();
        let boardSize =
            Math.min(window.innerHeight, window.innerWidth) *
            this.WINDOW_SIZE_MULTIPLIER;
        this.setState(
            prevState => {
                return {
                    ctx: this.refs.canvas.getContext('2d'),
                    boardSize: boardSize,
                    grid: new Grid(prevState.difficulty, boardSize)
                };
            },
            () => {
                this.handleResize();
                this.startGame();
            }
        );
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        this.state.input.unbindKeys();
    }

    handleResize() {
        let nextBoardSize =
            Math.min(window.innerHeight, window.innerWidth) *
            this.WINDOW_SIZE_MULTIPLIER;
        this.setState(prevState => {
            let newGrid = prevState.grid;
            newGrid.resize(nextBoardSize / prevState.difficulty);
            return {
                boardSize: nextBoardSize,
                grid: newGrid
            };
        });
    }

    startGame() {
        this.setState(prevState => {
            let mazeGrid = prevState.grid;
            mazeGrid.setBoard(forgeTheLabyrinth(1, 1, this.state.grid.board));
            mazeGrid.addPlayer(
                new Player(1, 1, this.state.boardSize / this.state.difficulty)
            );
            return {
                grid: mazeGrid
            };
        });
    }

    update() {
        if (this.state.input.pressedKeys.left) {
            if (
                this.state.grid.isLegalMove(
                    this.state.grid.player.x - 1,
                    this.state.grid.player.y
                )
            ) {
                this.setState(prevState => {
                    let newGrid = prevState.grid;
                    newGrid.movePlayerLeft();
                    return {
                        grid: newGrid
                    };
                });
            }
        }
        if (this.state.input.pressedKeys.right) {
            if (
                this.state.grid.isLegalMove(
                    this.state.grid.player.x + 1,
                    this.state.grid.player.y
                )
            ) {
                this.setState(prevState => {
                    let newGrid = prevState.grid;
                    newGrid.movePlayerRight();
                    return {
                        grid: newGrid
                    };
                });
            }
        }
        if (this.state.input.pressedKeys.up) {
            if (
                this.state.grid.isLegalMove(
                    this.state.grid.player.x,
                    this.state.grid.player.y - 1
                )
            ) {
                this.setState(prevState => {
                    let newGrid = prevState.grid;
                    newGrid.movePlayerUp();
                    return {
                        grid: newGrid
                    };
                });
            }
        }
        if (this.state.input.pressedKeys.down) {
            if (
                this.state.grid.isLegalMove(
                    this.state.grid.player.x,
                    this.state.grid.player.y + 1
                )
            ) {
                this.setState(prevState => {
                    let newGrid = prevState.grid;
                    newGrid.movePlayerDown();
                    return {
                        grid: newGrid
                    };
                });
            }
        }
        if (this.state.grid && this.state.grid.player) {
            this.state.grid.player.draw(this.state.ctx);
        }
    }

    loop() {
        console.log('start');
    }

    componentDidUpdate() {
        if (this.state.grid && this.state.ctx)
            this.state.grid.draw(this.state.ctx);
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
