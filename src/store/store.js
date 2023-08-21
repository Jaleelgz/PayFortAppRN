import {combineReducers, configureStore} from '@reduxjs/toolkit';
import TestReducer from './slices/testSlice';
import CardsReducer from './slices/cardsSlice';
import DeviceIdReducer from './slices/deviceIdSlice';
import SDKTokenReducer from './slices/sdkTokenSlice';

const combineReducer = combineReducers({
  test: TestReducer,
  cards: CardsReducer,
  deviceId: DeviceIdReducer,
  sdkToken: SDKTokenReducer,
});

export const store = configureStore({
  reducer: combineReducer,
  devTools: __DEV__,
});
