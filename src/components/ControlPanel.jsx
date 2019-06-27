import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import VideogameAsset from '@material-ui/icons/VideogameAsset';
import Settings from '@material-ui/icons/Settings';
import BarChart from '@material-ui/icons/BarChart';
import { makeStyles } from '@material-ui/styles';
import Router from 'next/router';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

function ControlPanel(props) {
  const classes = useStyles();
  const { navigationValue } = props;

  function handleChange(event, value) {
    Router.push(value);
  }

  return (
    <BottomNavigation
      value={navigationValue}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Highscores" icon={<BarChart />} value="/highscores" />
      <BottomNavigationAction label="Play" icon={<VideogameAsset />} value="/" />
      <BottomNavigationAction label="Settings" icon={<Settings />} value="/settings" />
    </BottomNavigation>
  );
}

ControlPanel.propTypes = {
  navigationValue: PropTypes.string.isRequired,
};

export default ControlPanel;
