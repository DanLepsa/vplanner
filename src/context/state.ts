import React, { Dispatch } from 'react';

import { Airport } from 'types';

import { Action } from './actions';

export interface AppState {
  airports: Airport[];
  pending?: boolean;
  error?: boolean;
}

interface AppContextInterface {
  state: AppState;
  dispatch: Dispatch<Action>;
}

export const AppContext = React.createContext<AppContextInterface | undefined>(undefined);

export const useAppContext = () => {
  let context = React.useContext(AppContext);

  if (context === undefined) {
    throw Error('useAppContext must be used as a ancestor of AppContext.Provider in order to work.');
  }

  return context;
};
