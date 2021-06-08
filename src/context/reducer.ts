import { AppState } from './state';
import { ActionTypes, Action } from './actions';

export const initialState: AppState = {
  airports: [],
  airportsOrigin: [],
  pendingAirports: false,
  pendingAirportsOrigin: false,
  pending: false,
  error: false,
  availableQuotes: [],
  availableCarriers: [],
};

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GET_AIRPORTS_SUCCESS: {
      return {
        ...state,
        airports: action.payload,
        pendingAirports: false,
        error: false,
      };
    }
    case ActionTypes.GET_AIRPORTS_PENDING: {
      return {
        ...state,
        pendingAirports: true,
        error: false,
      };
    }
    case ActionTypes.GET_AIRPORTS_ERROR: {
      return {
        ...state,
        pendingAirports: false,
        error: true,
      };
    }
    case ActionTypes.GET_ORIGIN_AIRPORTS_SUCCESS: {
      return {
        ...state,
        airportsOrigin: action.payload,
        pendingAirportsOrigin: false,
        error: false,
      };
    }
    case ActionTypes.GET_ORIGIN_AIRPORTS_PENDING: {
      return {
        ...state,
        pendingAirportsOrigin: true,
        error: false,
      };
    }
    case ActionTypes.GET_ORIGIN_AIRPORTS_ERROR: {
      return {
        ...state,
        pendingAirportsOrigin: false,
        error: true,
      };
    }
    case ActionTypes.GET_BROWSE_DATES_PENDING: {
      return {
        ...state,
        pending: true,
        availableQuotes: [],
        availableCarriers: [],
      };
    }
    case ActionTypes.GET_BROWSE_DATES_SUCCESS: {
      return {
        ...state,
        availableQuotes: action.payload.quotes,
        availableCarriers: action.payload.carriers,
        pending: false,
        error: false,
      };
    }
    case ActionTypes.GET_BROWSE_DATES_ERROR: {
      return {
        ...state,
        pending: false,
        error: true,
      };
    }
    default:
      return state;
  }
};
