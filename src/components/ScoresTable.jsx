import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
}));

function ScoresTable({ scores }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Player Name</TableCell>
            <TableCell align="right">Time (seconds)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.length ? (
            scores.map(score => (
              <TableRow key={score.id}>
                <TableCell>{score.name}</TableCell>
                <TableCell align="right">{score.time}</TableCell>
              </TableRow>
            ))) : (
              <TableRow>
                <TableCell colSpan={2}>No scores yet. Go and play!</TableCell>
              </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

ScoresTable.propTypes = {
  scores: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    time: PropTypes.number,
  })).isRequired,
};

export default ScoresTable;
