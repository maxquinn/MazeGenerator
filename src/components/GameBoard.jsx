import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Grid from '../classes/Grid';
import forgeTheLabyrinth from '../helpers/forgeTheLabyrinth';
import InputManager from '../classes/InputManager';

function GameBoard(props) {
  const {
    difficulty, boardSize, onGameTimerUpdate, startTime,
  } = props;
  const canvas = useRef(null);
  const [tick, setTick] = useState(null);
  const [gameTimer, setGameTimer] = useState(null);
  const [grid, setGrid] = useState(new Grid(difficulty, boardSize));
  const [input] = useState(new InputManager());

  function checkWin() {
    const {
      finishCell: { x: finishX, y: finishY },
      player: { x: playerX, y: playerY },
    } = grid;
    if (finishX === playerX && finishY === playerY) {
      const { onGameWin } = props;
      onGameWin(true);
    }
  }

  function update() {
    if (input.pressedKeys.left) {
      if (grid.isLegalMove(grid.player.x - 1, grid.player.y)) {
        grid.movePlayerLeft();
        setGrid(grid);
      }
    }
    if (input.pressedKeys.right) {
      if (grid.isLegalMove(grid.player.x + 1, grid.player.y)) {
        grid.movePlayerRight();
        setGrid(grid);
      }
    }
    if (input.pressedKeys.up) {
      if (grid.isLegalMove(grid.player.x, grid.player.y - 1)) {
        grid.movePlayerUp();
        setGrid(grid);
      }
    }
    if (input.pressedKeys.down) {
      if (grid.isLegalMove(grid.player.x, grid.player.y + 1)) {
        grid.movePlayerDown();
        setGrid(grid);
      }
    }

    checkWin();
  }

  function updateGameTimer() {
    onGameTimerUpdate(new Date() - startTime);
  }

  function loop() {
    setTick(
      setInterval(() => {
        update();
      }, 50),
    );
    setGameTimer(
      setInterval(() => {
        updateGameTimer();
      }, 50),
    );
  }

  function startGame() {
    setGrid(grid.setBoard(forgeTheLabyrinth(1, 1, grid.board)));
    loop();
  }

  useEffect(() => {
    input.bindKeys();
    startGame();
    grid.draw(canvas.current.getContext('2d'));

    return () => {
      clearInterval(tick);
      clearInterval(gameTimer);
      input.unbindKeys();
    };
  }, []);

  useEffect(() => {
    grid.resize(boardSize / props.difficulty);
    setGrid(grid);
  }, [boardSize]);

  return (
    <canvas
      className="Component_GameBoard-canvas"
      ref={canvas}
      width={boardSize}
      height={boardSize}
    />
  );
}

GameBoard.propTypes = {
  onGameWin: PropTypes.func.isRequired,
  onGameTimerUpdate: PropTypes.func.isRequired,
  difficulty: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  boardSize: PropTypes.number.isRequired,
};

export default GameBoard;
