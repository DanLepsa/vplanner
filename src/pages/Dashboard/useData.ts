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
    state: {
      pending,
      pendingAirports,
      pendingAirportsOrigin,
      error,
      airports,
      airportsOrigin,
      availableQuotes,
      availableCarriers,
    },
    dispatch,
  } = useAppContext();

  const getAirportsByReturnLocation = (location: City) => getAirportsByLocationAction(dispatch)(location);
  const getAirportsByOutboundLocation = (location: City) => getAirportsByOriginLocationAction(dispatch)(location);
  const getBrowseDates = (data: BrowseDateRequestObject) => getBrowseDatesAction(dispatch)(data);

  return {
    pending,
    pendingAirports,
    pendingAirportsOrigin,
    availableQuotes,
    availableCarriers,
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
