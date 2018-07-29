import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import GameBoard from './components/GameBoard';
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
        return (
            <Layout>
                <ControlPanel handleGameStart={this.startGame} />
                {this.state.gameInProgress && <GameBoard />}
            </Layout>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
