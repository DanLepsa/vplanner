import { AppState } from './state';
import { ActionTypes, Action } from './actions';

export const initialState: AppState = {
  airports: [
    // {
    //   id: 'LCA-sky',
    //   name: 'Larnaca',
    //   countryId: 'CY-sky',
    //   regionId: '',
    //   cityId: 'LARN-sky',
    //   countryName: 'Cyprus',
    // },
  ],
  airportsOrigin: [
    // {
    //   id: 'CLJ-sky',
    //   name: 'Cluj-Napoca',
    //   countryId: 'RO-sky',
    //   regionId: '',
    //   cityId: 'CLUJ-sky',
    //   countryName: 'Romania',
    // },
  ],
  pendingAirports: false,
  pendingAirportsOrigin: false,
  pending: false,
  error: false,
  availableQuotes: [
    // {
    //   QuoteId: 1,
    //   MinPrice: 197,
    //   Direct: true,
    //   OutboundLeg: {
    //     CarrierIds: [18],
    //     OriginId: 45146,
    //     DestinationId: 65441,
    //     DepartureDate: '2021-06-06T00:00:00',
    //   },
    //   QuoteDateTime: '2021-05-31T11:23:00',
    // },
  ],
  availableCarriers: [
    // {
    //   CarrierId: 18,
    //   Name: 'Blue Air',
    // },
  ],
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
