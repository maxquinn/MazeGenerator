import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

function GameTimer({ time }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" color="primary" gutterBottom>
        {time}
      </Typography>
    </div>
  );
}

GameTimer.propTypes = {
  time: PropTypes.string.isRequired,
};

export default GameTimer;
