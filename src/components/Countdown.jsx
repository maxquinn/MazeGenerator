import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Header from './Header';

const useStyles = makeStyles({
  root: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

function Countdown({ s }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header title="Game starting in" subtitle={s} />
    </div>
  );
}

Countdown.propTypes = {
  s: PropTypes.string.isRequired,
};

export default Countdown;
