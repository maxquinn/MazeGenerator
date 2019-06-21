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
    bottom: 0,
  },
};

function ControlPanel(props) {
  function handleChange(event, value) {
    const { onNavigationChange } = props;
    onNavigationChange(event, value);
  }

  const { classes, navigationValue } = props;

  return (
    <BottomNavigation
      value={navigationValue}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Hiscores" icon={<BarChart />} />
      <BottomNavigationAction label="Play" icon={<VideogameAsset />} />
      <BottomNavigationAction label="Modes" icon={<Layers />} />
    </BottomNavigation>
  );
}

ControlPanel.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  onNavigationChange: PropTypes.func.isRequired,
  navigationValue: PropTypes.number.isRequired,
};

export default withStyles(styles)(ControlPanel);
