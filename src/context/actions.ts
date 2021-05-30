import { Dispatch } from 'react';

import { getAirportsFromApi, getBrowseDatesFromApi } from 'api';
import { City, BrowseDateRequestObject } from 'types';

export enum ActionTypes {
  GET_AIRPORTS_PENDING = 'GET_AIRPORTS_PENDING',
  GET_AIRPORTS_SUCCESS = 'GET_AIRPORTS_SUCCESS',
  GET_AIRPORTS_ERROR = 'GET_AIRPORTS_ERROR',
  GET_ORIGIN_AIRPORTS_PENDING = 'GET_ORIGIN_AIRPORTS_PENDING',
  GET_ORIGIN_AIRPORTS_SUCCESS = 'GET_ORIGIN_AIRPORTS_SUCCESS',
  GET_ORIGIN_AIRPORTS_ERROR = 'GET_ORIGIN_AIRPORTS_ERROR',
  GET_BROWSE_DATES_PENDING = 'GET_BROWSE_DATES_PENDING',
  GET_BROWSE_DATES_SUCCESS = 'GET_BROWSE_DATES_SUCCESS',
  GET_BROWSE_DATES_ERROR = 'GET_BROWSE_DATES_ERROR',
}

export interface Action {
  type: ActionTypes;
  payload?: any;
}

export const getAirportsByLocationAction = (dispatch: Dispatch<Action>) => async (location: City) => {
  dispatch({ type: ActionTypes.GET_AIRPORTS_PENDING });

  try {
    const result = await getAirportsFromApi(location);
    dispatch({ type: ActionTypes.GET_AIRPORTS_SUCCESS, payload: result });
  } catch {
    dispatch({ type: ActionTypes.GET_AIRPORTS_ERROR });
  }
};

export const getAirportsByOriginLocationAction = (dispatch: Dispatch<Action>) => async (location: City) => {
  dispatch({ type: ActionTypes.GET_ORIGIN_AIRPORTS_PENDING });

  try {
    const result = await getAirportsFromApi(location);
    dispatch({ type: ActionTypes.GET_ORIGIN_AIRPORTS_SUCCESS, payload: result });
  } catch {
    dispatch({ type: ActionTypes.GET_ORIGIN_AIRPORTS_ERROR });
  }
};

export const getBrowseDatesAction = (dispatch: Dispatch<Action>) => async (data: BrowseDateRequestObject) => {
  dispatch({ type: ActionTypes.GET_BROWSE_DATES_PENDING });

  try {
    const result = await getBrowseDatesFromApi(data);
    dispatch({ type: ActionTypes.GET_BROWSE_DATES_SUCCESS, payload: result });
  } catch {
    dispatch({ type: ActionTypes.GET_BROWSE_DATES_ERROR });
  }
};
