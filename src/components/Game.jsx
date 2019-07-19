import { useState, useEffect, useContext } from 'react';
import CountdownNow from 'react-countdown-now';
import fetch from 'isomorphic-unfetch';
import { makeStyles } from '@material-ui/styles';
import Router from 'next/router';
import GameBoard from './GameBoard';
import Instructions from './Instructions';
import Countdown from './Countdown';
import GameTimer from './GameTimer';
import Header from './Header';
import InputDialog from './InputDialog';
import DifficultySelect from './DifficultySelect';
import GlobalContext from './GlobalContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '30px',
    '& div': {
      margin: '10px',
    },
  },
});

function Game() {
  const { settings: { difficulty, gameSize } } = useContext(GlobalContext);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [gameTime, setGameTime] = useState('0.0');
  const [boardSize, setBoardSize] = useState(0);

  function handleResize() {
    const nextBoardSize = Math.min(window.innerHeight, window.innerWidth) * gameSize;
    setBoardSize(nextBoardSize);
  }

  function startGame(value) {
    handleResize();
    if (value.key === ' ') {
      if (!gameWon && !gameInProgress) {
        setStartTime(Date.now());
      }
      if (!gameWon) {
        setGameTime('0.0');
        setGameInProgress(!gameInProgress);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keypress', startGame);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keypress', startGame);
      window.removeEventListener('resize', handleResize);
    };
  });

  function handleGameTimerUpdate(time) {
    const elapsed = Math.round(time / 100);
    const seconds = (elapsed / 10).toFixed(1);
    setGameTime(seconds);
  }

  function handleHighscoreSubmit(name) {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        difficulty,
        time: gameTime,
        name,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    fetch('/api/highscores', options)
      .then(res => res.json())
      .then((data) => {
        Router.push({
          pathname: '/highscores',
          query: { difficulty: data.difficulty },
        }, '/highscores');
      });
  }

  function renderer(properties) {
    const { seconds, completed } = properties;
    if (completed) {
      return (
        <>
          <GameTimer time={gameTime} />
          <GameBoard
            onGameWin={setGameWon}
            onGameTimerUpdate={handleGameTimerUpdate}
            boardSize={boardSize}
            startTime={new Date()}
            difficulty={difficulty}
          />
        </>
      );
    }
    return <Countdown s={seconds} />;
  }

  let componentToRender = null;
  const classes = useStyles();
  if (gameInProgress) {
    componentToRender = (
      <CountdownNow date={(startTime) + 3000} zeroPadLength={1} renderer={renderer} />
    );
    if (gameWon) {
      componentToRender = (
        <InputDialog
          title="HighScore"
          dialogText="Congratulations! Please enter your name to submit your highscore."
          onSubmit={handleHighscoreSubmit}
        />
      );
    }
  } else {
    componentToRender = (
      <>
        <Header title="The Labyrinth" />
        <div className={classes.root}>
          <Instructions />
          <DifficultySelect />
        </div>
      </>
    );
  }
  return <div>{componentToRender}</div>;
}

export default Game;
