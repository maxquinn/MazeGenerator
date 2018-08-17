import React from 'react';
import { Loop } from 'react-game-kit';
import GameBoard from './GameBoard';

class Game extends React.Component {
    render() {
        return (
            <Loop>
                <GameBoard />
            </Loop>
        );
    }
}

export default Game;
