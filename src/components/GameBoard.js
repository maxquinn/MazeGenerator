import React from 'react';
import Grid from '../classes/Grid';
import forgeTheLabyrinth from '../helpers/forgeTheLabyrinth';
import InputManager from '../classes/InputManager';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.WINDOW_SIZE_MULTIPLIER = 0.7;
        this.canvas = React.createRef();
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            boardSize: 0,
            ctx: undefined,
            difficulty: 11,
            grid: undefined,
            input: new InputManager()
        };
    }

    componentDidMount() {
        const { input } = this.state;
        window.addEventListener('resize', this.handleResize);
        input.bindKeys();
        let boardSize =
            Math.min(window.innerHeight, window.innerWidth) * this.WINDOW_SIZE_MULTIPLIER;
        this.setState(
            prevState => ({
                ctx: this.canvas.current.getContext('2d'),
                boardSize: boardSize,
                grid: new Grid(prevState.difficulty, boardSize)
            }),
            () => {
                this.handleResize();
                this.startGame();
            }
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { grid, ctx } = this.state;
        if (prevState?.grid?.player?.getPosition() !== this.state?.player?.getPosition()) {
            grid.draw(ctx);
        }
    }

    componentWillUnmount() {
        const { input } = this.state;
        window.removeEventListener('resize', this.handleResize);
        input.unbindKeys();
    }

    handleResize() {
        let nextBoardSize =
            Math.min(window.innerHeight, window.innerWidth) * this.WINDOW_SIZE_MULTIPLIER;
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
        const { grid } = this.state;
        this.setState(prevState => {
            let mazeGrid = prevState.grid;
            mazeGrid.setBoard(forgeTheLabyrinth(1, 1, grid.board));
            return {
                grid: mazeGrid
            };
        });
        this.loop();
    }

    update() {
        const { input, grid } = this.state;
        if (input.pressedKeys.left) {
            if (grid.isLegalMove(grid.player.x - 1, grid.player.y)) {
                this.setState(prevState => {
                    let newGrid = prevState.grid;
                    newGrid.movePlayerLeft();
                    return {
                        grid: newGrid
                    };
                });
            }
        }
        if (input.pressedKeys.right) {
            if (grid.isLegalMove(grid.player.x + 1, grid.player.y)) {
                this.setState(prevState => {
                    let newGrid = prevState.grid;
                    newGrid.movePlayerRight();
                    return {
                        grid: newGrid
                    };
                });
            }
        }
        if (input.pressedKeys.up) {
            if (grid.isLegalMove(grid.player.x, grid.player.y - 1)) {
                this.setState(prevState => {
                    let newGrid = prevState.grid;
                    newGrid.movePlayerUp();
                    return {
                        grid: newGrid
                    };
                });
            }
        }
        if (input.pressedKeys.down) {
            if (grid.isLegalMove(grid.player.x, grid.player.y + 1)) {
                this.setState(prevState => {
                    let newGrid = prevState.grid;
                    newGrid.movePlayerDown();
                    return {
                        grid: newGrid
                    };
                });
            }
        }
    }

    loop() {
        this.interval = setInterval(() => {
            this.update();
        }, 50);
    }

    render() {
        const { boardSize } = this.state;
        return (
            <canvas
                className="Component_GameBoard-canvas"
                ref={this.canvas}
                width={boardSize}
                height={boardSize}
            />
        );
    }
}

export default GameBoard;
