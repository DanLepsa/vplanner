import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing }) => ({
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
    fontSize: 20,
    fontWeight: 500,
    marginBottom: spacing(2),
  },
}));
