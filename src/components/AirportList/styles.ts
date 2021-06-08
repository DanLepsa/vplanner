import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    minHeight: 100,
    maxHeight: 400,
    overflow: 'auto',
    borderRadius: spacing(1),
  },
  inputLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 500,
  },
  skeletonListItem: {
    marginTop: spacing(2),
  },
}));
