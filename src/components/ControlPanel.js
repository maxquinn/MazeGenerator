import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import VideogameAsset from '@material-ui/icons/VideogameAsset';
import Layers from '@material-ui/icons/Layers';
import BarChart from '@material-ui/icons/BarChart';
import Header from './Header';

const styles = {
    root: {
        width: '100%',
        position: 'absolute',
        bottom: 0
    }
};
class ControlPanel extends React.Component {
    state = {
        navValue: 1,
        title: 'Play'
    };

    handleChange = (event, value) => {
        let { title } = this.state;
        switch (value) {
            case 0:
                title = 'Hiscores';
                break;
            case 1:
                title = 'Play';
                break;
            case 2:
                title = 'Levels';
                break;
            default:
                break;
        }
        this.setState({ navValue: value, title: title });
    };

    render() {
        const { classes } = this.props;
        const { navValue, title } = this.state;

        return (
            <div>
                <Header title={title} />
                <BottomNavigation
                    value={navValue}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction label="Hiscores" icon={<BarChart />} />
                    <BottomNavigationAction label="Play" icon={<VideogameAsset />} />
                    <BottomNavigationAction label="Levels" icon={<Layers />} />
                </BottomNavigation>
            </div>
        );
    }
}

ControlPanel.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlPanel);
