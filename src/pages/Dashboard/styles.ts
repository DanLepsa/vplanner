import { makeStyles } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  background: {
    minHeight: '100vh',
    background: lightBlue[200],
  },
  root: {
    flexGrow: 1,
    margin: `${theme.spacing(2)}px 0px`,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gridContainer: {
    marginBottom: theme.spacing(2),
  },
  searchButton: {
    justifyContent: 'flex-start',
    display: 'flex',
  },
}));
