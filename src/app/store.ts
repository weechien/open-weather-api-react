import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { rootReducer } from '../features';
import { weatherInitialState } from '../features';

export const getStore = () => {
  const initialState = {
    weather: cloneDeep(weatherInitialState)
  };
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState
  });
  return store;
};

export type Store = ReturnType<typeof getStore>;
export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
