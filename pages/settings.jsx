import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import ControlPanel from '../src/components/ControlPanel';
import Header from '../src/components/Header';
import PlayerIndicator from '../src/components/PlayerIndicator';
import GlobalContext from '../src/components/GlobalContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& > * ': {
      padding: '20px 0',
    },
  },
  label: {
    display: 'flex',
    '& *': {
      margin: '10px 5px',
    },
  },
  settingItem: {
    width: '225px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const marks = [
  {
    value: 0.8,
    label: 'Default',
  },
];

function Settings() {
  const {
    settings: { playerColor, gameSize },
    dispatch,
  } = useContext(GlobalContext);

  function updatePlayerColor(color) {
    dispatch({ type: 'UPDATE_PLAYER_COLOR', playerColor: color.hex });
  }

  function updateGameSize(event, newValue) {
    dispatch({ type: 'UPDATE_GAME_SIZE', gameSize: newValue });
  }

  const classes = useStyles();
  return (
    <div>
      <Header title="Settings" />
      <div className={classes.root}>
        <div className={classes.settingItem}>
          <div className={classes.label}>
            <Typography variant="subtitle1">Player Colour</Typography>
            <PlayerIndicator />
          </div>
          <ChromePicker color={playerColor} disableAlpha onChange={updatePlayerColor} />
        </div>
        <div className={classes.settingItem}>
          <Typography variant="subtitle1">Game Size</Typography>
          <Slider
            defaultValue={gameSize}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            min={0.1}
            max={1}
            step={0.1}
            marks={marks}
            onChange={updateGameSize}
            value={gameSize}
          />
        </div>
      </div>
      <ControlPanel navigationValue="/settings" />
    </div>
  );
}

export default Settings;
