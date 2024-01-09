import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../screens/Favourite/FavoriteStore";

const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
});

export default store;
