import { useContext } from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import GlobalContext from './GlobalContext';
import Difficulties from '../helpers/difficulties';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

const marks = Difficulties.map(d => ({
  value: d.value,
  label: d.name,
}));

function DifficultySelect() {
  const { settings, dispatch } = useContext(GlobalContext);

  function handleChange(event, newValue) {
    dispatch({ type: 'UPDATE_DIFFICULTY', difficulty: newValue });
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography align="center">Difficulty</Typography>
      <Slider
        defaultValue={settings.difficulty}
        min={11}
        max={111}
        step={null}
        marks={marks}
        onChange={handleChange}
        value={settings.difficulty}
      />
    </div>
  );
}

export default DifficultySelect;
