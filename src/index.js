import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import Game from './components/Game';
import ControlPanel from './components/ControlPanel';

import './style/style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.startGame = this.startGame.bind(this);
        this.state = {
            gameInProgress: false
        };
    }

    startGame() {
        this.setState({
            gameInProgress: true
        });
    }

    render() {
        const { gameInProgress } = this.state;
        return (
            <Layout>
                <ControlPanel handleGameStart={this.startGame} />
                {gameInProgress && <Game />}
            </Layout>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
