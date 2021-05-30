import React, { Dispatch } from 'react';

import { Airport } from 'types';

import { Action } from './actions';

export interface AppState {
  airports: Airport[];
  airportsOrigin: Airport[];
  pendingAirports: boolean;
  pendingAirportsOrigin: boolean;
  pending?: boolean;
  error?: boolean;
  availableFlights: any[];
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
