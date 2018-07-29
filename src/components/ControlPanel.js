import React from 'react';

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.startGame = this.startGame.bind(this);
    }

    startGame() {
        this.props.handleGameStart();
    }

    render() {
        return (
            <div className="Component_ControlPanel-parentContainer">
                <div className="Component_ControlPanel-childContainer">
                    <button>Element 1</button>
                </div>
                <div className="Component_ControlPanel-childContainer">
                    <a onClick={this.startGame}>
                        <button>Play</button>
                    </a>
                </div>
                <div className="Component_ControlPanel-childContainer">
                    <button>Element 3</button>
                </div>
            </div>
        );
    }
}

export default ControlPanel;
