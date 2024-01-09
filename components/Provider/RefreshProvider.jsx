import React, { createContext, useContext, useState } from "react";

const RefreshContext = createContext();

export const useRefresh = () => {
  return useContext(RefreshContext);
};
export const RefreshProvider = ({ children }) => {
  const [refreshBooking, setRefreshBooking] = useState(0);
  const [refreshUpdate, setRefreshUpdate] = useState(0);
  return (
    <RefreshContext.Provider
      value={{
        refreshBooking,
        setRefreshBooking,
        refreshUpdate,
        setRefreshUpdate,
      }}
    >
      {children}
    </RefreshContext.Provider>
  );
};
