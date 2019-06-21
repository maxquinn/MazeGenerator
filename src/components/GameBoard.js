import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../classes/Grid';
import forgeTheLabyrinth from '../helpers/forgeTheLabyrinth';
import InputManager from '../classes/InputManager';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.WINDOW_SIZE_MULTIPLIER = 0.8;
    this.canvas = React.createRef();
    this.startTime = null;
    this.handleResize = this.handleResize.bind(this);
    this.state = {
      boardSize: 0,
      ctx: undefined,
      grid: undefined,
      input: new InputManager(),
    };
  }

  componentDidMount() {
    const { input } = this.state;
    const { difficulty } = this.props;
    window.addEventListener('resize', this.handleResize);
    input.bindKeys();
    const boardSize = Math.min(window.innerHeight, window.innerWidth) * this.WINDOW_SIZE_MULTIPLIER;
    this.setState(
      prevState => ({
        ctx: this.canvas.current.getContext('2d'),
        boardSize,
        grid: new Grid(difficulty, boardSize),
      }),
      () => {
        this.handleResize();
        this.startGame();
      },
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
    clearInterval(this.tick);
    clearInterval(this.gameTimer);
    window.removeEventListener('resize', this.handleResize);
    input.unbindKeys();
  }

  handleResize() {
    const { difficulty } = this.props;
    const nextBoardSize = Math.min(window.innerHeight, window.innerWidth) * this.WINDOW_SIZE_MULTIPLIER;
    this.setState((prevState) => {
      const newGrid = prevState.grid;
      newGrid.resize(nextBoardSize / difficulty);
      return {
        boardSize: nextBoardSize,
        grid: newGrid,
      };
    });
  }

  startGame() {
    const { grid } = this.state;
    this.setState((prevState) => {
      const mazeGrid = prevState.grid;
      mazeGrid.setBoard(forgeTheLabyrinth(1, 1, grid.board));
      return {
        grid: mazeGrid,
      };
    });
    this.startTime = Date.now();
    this.loop();
  }

  update() {
    const { input, grid } = this.state;
    if (input.pressedKeys.left) {
      if (grid.isLegalMove(grid.player.x - 1, grid.player.y)) {
        this.setState((prevState) => {
          const newGrid = prevState.grid;
          newGrid.movePlayerLeft();
          return {
            grid: newGrid,
          };
        });
      }
    }
    if (input.pressedKeys.right) {
      if (grid.isLegalMove(grid.player.x + 1, grid.player.y)) {
        this.setState((prevState) => {
          const newGrid = prevState.grid;
          newGrid.movePlayerRight();
          return {
            grid: newGrid,
          };
        });
      }
    }
    if (input.pressedKeys.up) {
      if (grid.isLegalMove(grid.player.x, grid.player.y - 1)) {
        this.setState((prevState) => {
          const newGrid = prevState.grid;
          newGrid.movePlayerUp();
          return {
            grid: newGrid,
          };
        });
      }
    }
    if (input.pressedKeys.down) {
      if (grid.isLegalMove(grid.player.x, grid.player.y + 1)) {
        this.setState((prevState) => {
          const newGrid = prevState.grid;
          newGrid.movePlayerDown();
          return {
            grid: newGrid,
          };
        });
      }
    }

    this.checkWin();
  }

  checkWin() {
    const {
      grid: {
        finishCell: { x: finishX, y: finishY },
        player: { x: playerX, y: playerY },
      },
    } = this.state;
    if (finishX === playerX && finishY === playerY) {
      const { onGameWin } = this.props;
      onGameWin();
    }
  }

  loop() {
    this.tick = setInterval(() => {
      this.update();
    }, 50);
    this.gameTimer = setInterval(() => {
      this.updateGameTimer();
    }, 50);
  }

  updateGameTimer() {
    const { onGameTimerUpdate } = this.props;
    onGameTimerUpdate(new Date() - this.startTime);
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

GameBoard.propTypes = {
  onGameWin: PropTypes.func.isRequired,
  onGameTimerUpdate: PropTypes.func.isRequired,
  difficulty: PropTypes.number.isRequired,
};

export default GameBoard;
