import { AppState } from './state';
import { ActionTypes, Action } from './actions';

export const initialState: AppState = {
  // airports: [],
  airports: [
    { id: '1', name: 'aaa', countryId: 'a', regionId: 'a', cityId: 'a', countryName: 'a' },
    { id: '2', name: 'bbbb', countryId: 'b', regionId: 'b', cityId: 'b', countryName: 'b' },
  ],
  pending: false,
  error: false,
};

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GET_AIRPORTS_SUCCESS: {
      return {
        ...state,
        airports: action.payload,
        pending: false,
        error: false,
      };
    }
    case ActionTypes.GET_AIRPORTS_PENDING: {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case ActionTypes.GET_AIRPORTS_ERROR: {
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
