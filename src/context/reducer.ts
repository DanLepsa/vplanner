import { AppState } from './state';
import { ActionTypes, Action } from './actions';

export const initialState: AppState = {
  airports: [
    // { id: '1', name: 'aaa', countryId: 'a', regionId: 'a', cityId: 'a', countryName: 'a' },
    // { id: '2', name: 'bbbb', countryId: 'b', regionId: 'b', cityId: 'b', countryName: 'b' },
  ],
  airportsOrigin: [
    // {
    //   id: 'COR-sky',
    //   name: 'Cordoba',
    //   countryId: 'AR-sky',
    //   regionId: '',
    //   cityId: 'CORA-sky',
    //   countryName: 'Argentina',
    // },
    // {
    //   id: 'MTR-sky',
    //   name: 'Monteria',
    //   countryId: 'CO-sky',
    //   regionId: '',
    //   cityId: 'MTRA-sky',
    //   countryName: 'Colombia',
    // },
    // {
    //   id: 'RCU-sky',
    //   name: 'Rio Cuarto',
    //   countryId: 'AR-sky',
    //   regionId: '',
    //   cityId: 'RCUA-sky',
    //   countryName: 'Argentina',
    // },
  ],
  pendingAirports: false,
  pendingAirportsOrigin: false,
  pending: false,
  error: false,
  availableFlights: [],
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
        availableFlights: action.payload,
        pending: false,
        error: false,
      };
    }
    case ActionTypes.GET_BROWSE_DATES_SUCCESS: {
      return {
        ...state,
        pending: true,
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
