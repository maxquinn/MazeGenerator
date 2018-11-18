import React from 'react';
import PropTypes from 'prop-types';

class ControlPanel extends React.Component {
    static propTypes = {
        handleGameStart: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.startGame = this.startGame.bind(this);
    }

    startGame() {
        const { handleGameStart } = this.props;
        handleGameStart();
    }

    render() {
        return (
            <div className="Component_ControlPanel-parentContainer">
                <div className="Component_ControlPanel-childContainer">
                    <button type="button">Element 1</button>
                </div>
                <div className="Component_ControlPanel-childContainer">
                    <button type="button" onClick={this.startGame}>
                        Play
                    </button>
                </div>
                <div className="Component_ControlPanel-childContainer">
                    <button type="button">Element 3</button>
                </div>
            </div>
        );
    }
}

export default ControlPanel;
