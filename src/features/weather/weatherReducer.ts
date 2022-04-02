import { createReducer } from '@reduxjs/toolkit';
import { WeatherActions } from './weatherActions';
import { WeatherState } from './weatherTypes';

export const weatherInitialState: WeatherState = {
  searchHistory: [],
  loading: false,
  hasError: false,
  displayWeather: {
    city: '',
    country: '',
    main: '',
    description: '',
    temperature: '',
    humidity: '',
    time: ''
  }
};

export const {
  searchLocationWeather: searchLocationWeather,
  addSearchHistory,
  removeSearchHistory,
  updateError,
  setDisplayWeather
} = WeatherActions;

export const weatherReducer = createReducer(weatherInitialState, (builder) => {
  builder
    .addCase(searchLocationWeather.pending, (state, _) => {
      state.loading = true;
      state.hasError = false;
    })
    .addCase(searchLocationWeather.fulfilled, (state, _) => {
      state.loading = false;
    })
    .addCase(searchLocationWeather.rejected, (state, _) => {
      state.loading = false;
      state.hasError = true;
    })
    .addCase(addSearchHistory, (state, { payload: { searchHistory } }) => {
      state.searchHistory.push(searchHistory);
    })
    .addCase(removeSearchHistory, (state, { payload: { searchHistory } }) => {
      state.searchHistory.splice(
        state.searchHistory.findIndex(({ datetime: { iso } }) => iso === searchHistory.datetime.iso),
        1
      );
    })
    .addCase(updateError, (state, { payload: { hasError } }) => {
      state.hasError = hasError;
    })
    .addCase(setDisplayWeather, (state, { payload: { displayWeather } }) => {
      state.displayWeather = displayWeather;
    });
});
