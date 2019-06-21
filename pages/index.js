import React from 'react';
import ControlPanel from '../src/components/ControlPanel';
import Game from '../src/components/Game';
import '../src/style/style.css';

class Index extends React.Component {
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
                componentToRender = <div className="highscores" />;
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

export default Index;
