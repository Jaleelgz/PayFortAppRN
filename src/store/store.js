import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TestReducer from "./slices/testSlice";
import CardsReducer from "./slices/cardsSlice";

const combineReducer = combineReducers({
  test: TestReducer,
  cards: CardsReducer,
});

export const store = configureStore({
  reducer: combineReducer,
  devTools: __DEV__,
});
