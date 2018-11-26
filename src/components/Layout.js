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
class Layout extends React.Component {
    state = {
        navValue: 1
    };

    handleChange = (event, value) => {
        this.setState({ navValue: value });
    };

    render() {
        const { children, classes } = this.props;
        const { navValue } = this.state;

        return (
            <div>
                <Header title="Title TBD" />
                <div className="Component_Layout-container">{children[0]}</div>
                <div className="Component_Layout-container">{children[1]}</div>
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

Layout.propTypes = {
    children: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layout);
