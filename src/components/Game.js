import React from 'react';
import GameBoard from './GameBoard';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.startGame = this.startGame.bind(this);
        this.state = {
            gameInProgress: false
        };
    }

    componentDidMount() {
        window.addEventListener('keyup', this.startGame.bind(this, false));
        window.addEventListener('keydown', this.startGame.bind(this, true));
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.startGame);
        window.removeEventListener('keydown', this.startGame);
    }

    startGame(value, e) {
        if (e.key === ' ') {
            this.setState({
                gameInProgress: true
            });
        }
    }

    render() {
        const { gameInProgress } = this.state;
        return <div>{gameInProgress && <GameBoard />}</div>;
    }
}

export default Game;
