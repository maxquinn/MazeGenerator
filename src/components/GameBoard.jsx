import {
  useState, useEffect, useRef, useContext,
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { timer } from 'd3-timer';
import { hsl } from 'd3-color';
import Grid from '../classes/Grid';
import forgeTheLabyrinth from '../helpers/forgeTheLabyrinth';
import InputManager from '../classes/InputManager';
import GlobalContext from './GlobalContext';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    display: 'flex',
  },
});

function GameBoard(props) {
  const {
    settings: { playerColor },
  } = useContext(GlobalContext);
  const {
    difficulty, boardSize, onGameTimerUpdate, startTime,
  } = props;
  const canvas = useRef(null);
  const [grid, setGrid] = useState(new Grid(difficulty, boardSize, playerColor));
  const [frontier, setFrontier] = useState([]);
  const [input] = useState(new InputManager());
  const [playing, setPlaying] = useState(false);
  const [secretActivated] = useState(playerColor === '#10085e');

  function checkWin() {
    const {
      finishCell: { x: finishX, y: finishY },
      player: { x: playerX, y: playerY },
    } = grid;
    if (finishX === playerX && finishY === playerY) {
      const { onGameWin } = props;
      setPlaying(false);
      onGameWin(true);
    }
  }

  function visualise() {
    let distance = 0;
    timer(() => {
      grid.ctx.fillStyle = `${hsl((distance += 1 % 360), 1, 0.5)}`;
      if (frontier.length) {
        frontier.pop().colorFill(grid.ctx);
      }
      return true;
    });
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
    if (input.pressedKeys.p && secretActivated) {
      visualise();
    }

    checkWin();
  }

  function updateGameTimer() {
    onGameTimerUpdate(new Date() - startTime);
  }

  function startGame() {
    const labyrinth = forgeTheLabyrinth(1, 1, grid.board);
    setGrid(grid.setBoard(labyrinth.grid));
    setFrontier(labyrinth.frontier);
    setPlaying(true);
  }

  useEffect(() => {
    input.bindKeys();
    startGame();
    grid.draw(canvas.current.getContext('2d'));

    return () => {
      input.unbindKeys();
    };
  }, []);

  useEffect(() => {
    grid.resize(boardSize / props.difficulty);
    setGrid(grid);
  }, [boardSize]);

  useEffect(() => {
    const gameTick = setInterval(() => {
      update();
    }, 50);

    const gameTimer = setInterval(() => {
      updateGameTimer();
    }, 50);

    return () => {
      clearInterval(gameTick);
      clearInterval(gameTimer);
    };
  }, [playing]);

  const classes = useStyles();

  return <canvas className={classes.root} ref={canvas} width={boardSize} height={boardSize} />;
}

GameBoard.propTypes = {
  onGameWin: PropTypes.func.isRequired,
  onGameTimerUpdate: PropTypes.func.isRequired,
  difficulty: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  boardSize: PropTypes.number.isRequired,
};

export default GameBoard;
