import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '25px',
    width: '25px',
    backgroundColor: theme.palette.primary.main,
  },
}));

function PlayerIndicator() {
  const classes = useStyles();

  return <div className={classes.root} />;
}

export default PlayerIndicator;
