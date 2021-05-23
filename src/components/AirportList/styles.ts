import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    maxHeight: 400,
    overflow: 'auto',
    borderRadius: spacing(1),
  },
  inputLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  skeletonListItem: {
    marginTop: spacing(2),
  },
}));
