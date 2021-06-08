import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }) => ({
  inputLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 500,
    marginBottom: spacing(2),
  },
}));
