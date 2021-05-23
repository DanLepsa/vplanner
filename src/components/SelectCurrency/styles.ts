import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': {
      width: '25ch',
    },
  },
  inputLabel: {
    display: 'flex',
    alignItems: 'center',
  },
}));
