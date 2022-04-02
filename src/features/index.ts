import { combineReducers } from '@reduxjs/toolkit';
import { WeatherActions } from './weather/weatherActions';
// Weather State
import { weatherReducer, weatherInitialState } from './weather/weatherReducer';
import { WeatherSelectors } from './weather/weatherSelectors';

export const rootReducer = combineReducers({
  weather: weatherReducer
});

export { WeatherActions };
export { WeatherSelectors };
export { weatherInitialState };
