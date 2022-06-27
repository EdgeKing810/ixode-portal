import React from 'react';

const LocalContext = React.createContext();

function LocalContextProvider({ children }) {
  // const API_URL = 'http://localhost:8000';
  const API_URL = 'https://api.kinesis.world/api/v2';
  const PUBLIC_URL = 'https://api.kinesis.world';

  return (
    <LocalContext.Provider
      value={{
        API_URL,
        PUBLIC_URL,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
}

export { LocalContext, LocalContextProvider };
