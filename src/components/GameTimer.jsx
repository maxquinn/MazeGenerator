import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  countdown: {
    fontSize: 30,
    color: '#ff0000e0',
  },
};

function GameTimer({ time, classes }) {
  return (
    <div className="Component_GameTimer-container">
      <Typography className={classes.countdown}>{time}</Typography>
    </div>
  );
}

GameTimer.propTypes = {
  time: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    countdown: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(GameTimer);
