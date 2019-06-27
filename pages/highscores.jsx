import { useState, useEffect, useContext } from 'react';
import fetch from 'isomorphic-unfetch';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ControlPanel from '../src/components/ControlPanel';
import Header from '../src/components/Header';
import GlobalContext from '../src/components/GlobalContext';
import ScoresTable from '../src/components/ScoresTable';
import Difficulties from '../src/helpers/difficulties';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '30px',
    '& > *': {
      marginBottom: '20px',
    },
  },
  errorSnack: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    '&>svg': {
      fontSize: '2rem',
      paddingRight: '9px',
    },
  },
}));

function Highscores() {
  const { settings: { difficulty } } = useContext(GlobalContext);
  const [scoreCategory, setScoreCategory] = useState(difficulty);
  const [errorSnackOpen, setErrorSnackOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const request = `/api/highscores?difficulty=${scoreCategory}`;
    fetch(request)
      .then(res => res.json())
      .then(data => (('error' in data) ? setErrorSnackOpen(true) : setTableData(data)));
  }, [scoreCategory]);

  function changeScoreView(event) {
    setScoreCategory(event.target.value);
  }

  function closeSnack() {
    setErrorSnackOpen(false);
  }

  const classes = useStyles();
  return (
    <div>
      <Header title="Highscores" />
      <div className={classes.root}>
        <InputLabel>Show scores for</InputLabel>
        <Select
          value={scoreCategory}
          onChange={changeScoreView}
        >
          {Difficulties.map(d => (
            <MenuItem key={d.name} value={d.value}>{d.name}</MenuItem>
          ))}
        </Select>

        <Grid container>
          <Grid item xs={1} sm={3} />
          <Grid item xs={10} sm={6}><ScoresTable scores={tableData} /></Grid>
          <Grid item xs={1} sm={3} />
        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={errorSnackOpen}
          autoHideDuration={6000}
        >
          <SnackbarContent
            className={classes.errorSnack}
            message={(
              <span className={classes.message}>
                <ErrorIcon />
                {'Could not retrieve highscores'}
              </span>
      )}
            action={[
              <IconButton key="close" aria-label="Close" color="inherit" onClick={closeSnack}>
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </div>
      <ControlPanel navigationValue="/highscores" />
    </div>
  );
}

export default Highscores;
