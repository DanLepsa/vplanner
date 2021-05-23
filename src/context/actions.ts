import { Dispatch } from 'react';

import { getAirportsFromApi } from 'api';
import { City } from 'types';

export enum ActionTypes {
  GET_AIRPORTS_PENDING = 'GET_AIRPORTS_PENDING',
  GET_AIRPORTS_SUCCESS = 'GET_AIRPORTS_SUCCESS',
  GET_AIRPORTS_ERROR = 'GET_AIRPORTS_ERROR',
}

export interface Action {
  type: ActionTypes;
  payload?: any;
}

export const getAirportsByLocationAction = (dispatch: Dispatch<Action>) => async (location: City) => {
  dispatch({ type: ActionTypes.GET_AIRPORTS_PENDING });

  try {
    let result = await getAirportsFromApi(location);
    dispatch({ type: ActionTypes.GET_AIRPORTS_SUCCESS, payload: result });
  } catch {
    dispatch({ type: ActionTypes.GET_AIRPORTS_ERROR });
  }
};
