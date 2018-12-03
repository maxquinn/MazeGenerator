import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import VideogameAsset from '@material-ui/icons/VideogameAsset';
import Layers from '@material-ui/icons/Layers';
import BarChart from '@material-ui/icons/BarChart';

const styles = {
    root: {
        width: '100%',
        position: 'absolute',
        bottom: 0
    }
};

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, value) {
        const { onNavigationChange } = this.props;
        onNavigationChange(event, value);
    }

    render() {
        const { classes, navigationValue } = this.props;

        return (
            <BottomNavigation
                value={navigationValue}
                onChange={this.handleChange}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="Hiscores" icon={<BarChart />} />
                <BottomNavigationAction label="Play" icon={<VideogameAsset />} />
                <BottomNavigationAction label="Levels" icon={<Layers />} />
            </BottomNavigation>
        );
    }
}

ControlPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    onNavigationChange: PropTypes.func.isRequired,
    navigationValue: PropTypes.number.isRequired
};

export default withStyles(styles)(ControlPanel);
