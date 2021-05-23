import React, { useReducer } from 'react';

import { Dashboard } from 'pages';
import { AppContext, reducer, initialState } from 'context';

function App() {
  const [appState, appDispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <AppContext.Provider value={{ state: appState, dispatch: appDispatch }}>
        <Dashboard />
      </AppContext.Provider>
    </div>
  );
}

export default App;
