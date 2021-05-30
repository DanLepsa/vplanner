import {
  useAppContext,
  getAirportsByLocationAction,
  getAirportsByOriginLocationAction,
  getBrowseDatesAction,
} from 'context';
import { City, BrowseDateRequestObject } from 'types';

import { useStyles } from './styles';

export const useData = () => {
  const classes = useStyles();

  const {
    state: { pendingAirports, pendingAirportsOrigin, error, airports, airportsOrigin },
    dispatch,
  } = useAppContext();

  const getAirportsByReturnLocation = (location: City) => getAirportsByLocationAction(dispatch)(location);
  const getAirportsByOutboundLocation = (location: City) => getAirportsByOriginLocationAction(dispatch)(location);
  const getBrowseDates = (data: BrowseDateRequestObject) => getBrowseDatesAction(dispatch)(data);

  return {
    pendingAirports,
    pendingAirportsOrigin,
    error,
    airports,
    airportsOrigin,
    dispatch,
    getAirportsByOutboundLocation,
    getAirportsByReturnLocation,
    getBrowseDates,
    classes,
  };
};
