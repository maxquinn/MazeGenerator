import Slider from '@material-ui/lab/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

const marks = [
  {
    value: 11,
    label: 'Easy',
    emoji: '💩',
  },
  {
    value: 41,
    label: 'Med',
    emoji: '🤷‍',
  },
  {
    value: 71,
    label: 'Hard',
    emoji: '🙃',
  },
  {
    value: 111,
    label: 'Expert',
    emoji: '😡',
  },
];

function valueLabelFormat(value) {
  return marks[marks.findIndex(mark => mark.value === value)].emoji;
}

function DifficultySelect({ onDifficultyChange, value }) {
  function handleChange(event, newValue) {
    onDifficultyChange(newValue);
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography align="center">Difficulty</Typography>
      <Slider
        defaultValue={value}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        min={11}
        max={111}
        step={null}
        marks={marks}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
      />
    </div>
  );
}

DifficultySelect.propTypes = {
  onDifficultyChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default DifficultySelect;
