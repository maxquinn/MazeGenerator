import React from 'react';
import CountdownNow from 'react-countdown-now';
import axios from 'axios';
import GameBoard from './GameBoard';
import Instructions from './Instructions';
import Countdown from './Countdown';
import GameTimer from './GameTimer';
import Header from './Header';
import InputDialog from './InputDialog';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.DIFFICULTY = 11;
    this.startGame = this.startGame.bind(this);
    this.renderer = this.renderer.bind(this);
    this.handleGameWin = this.handleGameWin.bind(this);
    this.handleGameTimerUpdate = this.handleGameTimerUpdate.bind(this);
    this.handleHighscoreSubmit = this.handleHighscoreSubmit.bind(this);
    this.state = {
      gameInProgress: false,
      gameWon: false,
      startTime: null,
      gameTime: '0.0',
    };
  }

  componentDidMount() {
    window.addEventListener('keypress', this.startGame);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.startGame);
  }

  startGame(value) {
    if (value.key === ' ') {
      const { gameInProgress, gameWon } = this.state;
      if (!gameWon && !gameInProgress) {
        this.setState({
          startTime: Date.now(),
        });
      }
      if (!gameWon) {
        this.setState({
          gameTime: '0.0',
          gameInProgress: !gameInProgress,
        });
      }
    }
  }

  handleGameWin() {
    this.setState({ gameWon: true });
  }

  handleGameTimerUpdate(time) {
    const elapsed = Math.round(time / 100);
    const seconds = (elapsed / 10).toFixed(1);
    this.setState({ gameTime: seconds });
  }

  handleHighscoreSubmit(name) {
    const { gameTime } = this.state;
    axios.post('/highscores', {
      difficulty: this.DIFFICULTY,
      time: gameTime,
      name,
    });
  }

  renderer({
    hours, minutes, seconds, completed,
  }) {
    const { gameTime } = this.state;
    if (completed) {
      return (
        <>
          <GameTimer time={gameTime} />
          <GameBoard
            onGameWin={this.handleGameWin}
            onGameTimerUpdate={this.handleGameTimerUpdate}
            startTime={Date.now()}
            difficulty={this.DIFFICULTY}
          />
        </>
      );
    }
    return <Countdown s={seconds} />;
  }

  render() {
    const { gameInProgress, gameWon, startTime } = this.state;
    let componentToRender = null;
    if (gameInProgress) {
      componentToRender = (
        <CountdownNow date={startTime + 3000} zeroPadLength={1} renderer={this.renderer} />
      );
      if (gameWon) {
        componentToRender = (
          <InputDialog
            title="HighScore"
            dialogText="Congratulations! Please enter your name to submit your highscore."
            onSubmit={this.handleHighscoreSubmit}
          />
        );
      }
    } else {
      componentToRender = (
        <>
          <Header title="The Labyrinth" />
          <Instructions />
        </>
      );
    }
    return <div>{componentToRender}</div>;
  }
}

export default Game;
