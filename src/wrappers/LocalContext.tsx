import React, { ReactElement } from 'react';

interface ContextInterface {
  API_URL: string;
  PUBLIC_URL: string;
}

const LocalContext = React.createContext<ContextInterface>({
  API_URL: '',
  PUBLIC_URL: '',
});

function LocalContextProvider({ children }: { children: ReactElement }) {
  const API_URL: string = 'http://localhost:8080/';
  // const API_URL = 'https://api.kinesis.world/api/v2';
  const PUBLIC_URL: string = 'https://api.kinesis.world';

  let currentContext: ContextInterface = {
    API_URL,
    PUBLIC_URL,
  };

  return (
    <LocalContext.Provider value={currentContext}>
      {children}
    </LocalContext.Provider>
  );
}

export { LocalContext, LocalContextProvider };
