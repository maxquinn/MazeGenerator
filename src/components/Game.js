import React from 'react';
import GameBoard from './GameBoard';
import Instructions from './Instructions';

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
        return <div>{gameInProgress ? <GameBoard /> : <Instructions />}</div>;
    }
}

export default Game;
