import React, { createContext, useState, useContext } from 'react';

const FetchContext = createContext();

export const useFetchContext = () => useContext(FetchContext);

export const FetchProvider = ({ children }) => {
  const [key, setKey] = useState(0);

  const refreshData = () => {
    setKey(prevKey => prevKey + 1);
  };

  return (
    <FetchContext.Provider value={{ key, refreshData }}>
      {children}
    </FetchContext.Provider>
  );
};
