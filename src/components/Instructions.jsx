import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  pos: {
    margin: '18px 0 5px',
  },
});

function Instructions() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" color="textSecondary" gutterBottom>
          How to Play
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          To Begin
        </Typography>
        <Typography component="p">Press Space to start and stop the current game.</Typography>
        <Typography className={classes.pos} color="textSecondary">
          In Game
        </Typography>
        <Typography component="p">
          Use the arrow keys or W, A, S, D to control the player.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Instructions;
