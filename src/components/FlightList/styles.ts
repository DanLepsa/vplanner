import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing }) => ({
  root: {
    maxHeight: 400,
    overflowY: 'auto',
  },
  skeletonListItem: {
    marginTop: spacing(2),
    borderRadius: spacing(),
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
