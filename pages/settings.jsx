import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import ControlPanel from '../src/components/ControlPanel';
import Header from '../src/components/Header';
import GlobalContext from '../src/components/GlobalContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '30px',
  },
});

function Settings() {
  const { settings: { playerColor }, dispatch } = useContext(GlobalContext);

  function updatePlayerColor(color) {
    dispatch({ type: 'UPDATE_PLAYER_COLOR', playerColor: color.hex });
  }

  const classes = useStyles();
  return (
    <div>
      <Header title="Settings" />
      <div className={classes.root}>
        <ChromePicker color={playerColor} disableAlpha onChangeComplete={updatePlayerColor} />
      </div>
      <ControlPanel navigationValue="/settings" />
    </div>
  );
}

export default Settings;
