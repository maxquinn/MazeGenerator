import React from 'react';
import ReactDOM from 'react-dom';
import ControlPanel from './components/ControlPanel';
import Game from './components/Game';
import './style/style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleNavigationChange = this.handleNavigationChange.bind(this);
        this.state = {
            navigationValue: 1
        };
    }

    handleNavigationChange(event, value) {
        this.setState({
            navigationValue: value
        });
    }

    render() {
        const { navigationValue } = this.state;
        let componentToRender = null;
        switch (navigationValue) {
            case 0:
                componentToRender = <div className="hiscores" />;
                break;
            case 1:
                componentToRender = <Game />;
                break;
            case 2:
                componentToRender = <div className="modes" />;
                break;
            default:
                componentToRender = null;
        }
        return (
            <div>
                {componentToRender}
                <ControlPanel
                    navigationValue={navigationValue}
                    onNavigationChange={this.handleNavigationChange}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
