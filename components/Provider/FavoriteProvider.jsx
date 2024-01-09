import React, { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const useFavorite = () => {
  return useContext(FavoriteContext);
};
export const FavoriteProvider = ({ children }) => {
  const [quantityFavorite, setQuantityFavorite] = useState(0);

  return (
    <FavoriteContext.Provider value={{ quantityFavorite, setQuantityFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
