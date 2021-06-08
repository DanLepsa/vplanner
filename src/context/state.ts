import React, { Dispatch } from 'react';

import { Airport, API_Quote, API_Carrier } from 'types';

import { Action } from './actions';

export interface AppState {
  airports: Airport[];
  airportsOrigin: Airport[];
  pendingAirports: boolean;
  pendingAirportsOrigin: boolean;
  pending?: boolean;
  error?: boolean;
  availableQuotes: API_Quote[];
  availableCarriers: API_Carrier[];
}

interface AppContextInterface {
  state: AppState;
  dispatch: Dispatch<Action>;
}

export const AppContext = React.createContext<AppContextInterface | undefined>(undefined);

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (context === undefined) {
    throw Error('useAppContext must be used as a ancestor of AppContext.Provider in order to work.');
  }

  return context;
};
