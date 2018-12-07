import React from 'react';
import CountdownNow from 'react-countdown-now';
import GameBoard from './GameBoard';
import Instructions from './Instructions';
import Countdown from './Countdown';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.startGame = this.startGame.bind(this);
        this.renderer = this.renderer.bind(this);
        this.handleGameWin = this.handleGameWin.bind(this);
        this.state = {
            gameInProgress: false,
            gameWon: false
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
            if (!gameWon) {
                this.setState({
                    gameInProgress: !gameInProgress
                });
            }
        }
    }

    handleGameWin() {
        this.setState({ gameWon: true });
    }

    renderer({ hours, minutes, seconds, completed }) {
        if (completed) {
            return <GameBoard onGameWin={this.handleGameWin} startTime={Date.now()} />;
        } else {
            return <Countdown s={seconds} />;
        }
    }

    render() {
        const { gameInProgress, gameWon } = this.state;
        let componentToRender = null;
        if (gameInProgress) {
            componentToRender = (
                <CountdownNow date={Date.now() + 3000} zeroPadLength={1} renderer={this.renderer} />
            );
            if (gameWon) {
                componentToRender = null;
            }
        } else {
            componentToRender = <Instructions />;
        }
        return <div>{componentToRender}</div>;
    }
}

export default Game;
