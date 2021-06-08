import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    marginTop: spacing(2),
    borderRadius: spacing(),
    background: palette.primary.light,
    padding: spacing(2),
    fontSize: spacing(2),
    fontWeight: 600,
    color: palette.common.white,
    textAlign: 'initial',
  },
  flip: {
    WebkitTransform: 'scaleX(-1)',
    transform: 'scaleX(-1)',
  },
  cardItem: {
    display: 'flex',
    alignContent: 'center',
    marginBottom: spacing(0.5),
  },
}));
