import { useAppContext, getAirportsByLocationAction } from 'context';
import { City } from 'types';

import { useStyles } from './styles';

export const useData = () => {
  const classes = useStyles();

  const {
    state: { pending, error, airports },
    dispatch,
  } = useAppContext();

  const getAirportsByLocation = (location: City) => getAirportsByLocationAction(dispatch)(location);

  return {
    pending,
    error,
    airports,
    dispatch,
    getAirportsByLocation,
    classes,
  };
};
