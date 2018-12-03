import React from 'react';
import CountdownNow from 'react-countdown-now';
import GameBoard from './GameBoard';
import Instructions from './Instructions';
import Countdown from './Countdown';

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return <GameBoard />;
    } else {
        return <Countdown s={seconds} />;
    }
};

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.startGame = this.startGame.bind(this);
        this.state = {
            gameInProgress: false
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
            const { gameInProgress } = this.state;
            this.setState({
                gameInProgress: !gameInProgress
            });
        }
    }

    render() {
        const { gameInProgress } = this.state;
        return (
            <div>
                {gameInProgress ? (
                    <CountdownNow date={Date.now() + 3000} zeroPadLength={1} renderer={renderer} />
                ) : (
                    <Instructions />
                )}
            </div>
        );
    }
}

export default Game;
