import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import VideogameAsset from '@material-ui/icons/VideogameAsset';
import Layers from '@material-ui/icons/Layers';
import BarChart from '@material-ui/icons/BarChart';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

function ControlPanel(props) {
  const classes = useStyles();
  const { onNavigationChange, navigationValue } = props;

  function handleChange(event, value) {
    onNavigationChange(event, value);
  }

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
  onNavigationChange: PropTypes.func.isRequired,
  navigationValue: PropTypes.number.isRequired,
};

export default ControlPanel;
