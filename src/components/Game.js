import React from 'react';
import GameBoard from './GameBoard';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { number: 1 };
    }

    // componentDidMount() {
    //     this.interval = setInterval(() => {
    //         this.setState({ number: this.state.number + 1 });
    //     }, 1000);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    render() {
        return <GameBoard />;
    }
}

export default Game;
