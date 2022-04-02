import { RootState } from '../../app/store';

export const selectSearchHistory = (state: RootState) => state.weather.searchHistory;
export const selectLoading = (state: RootState) => state.weather.loading;
export const selectHasError = (state: RootState) => state.weather.hasError;
export const selectDisplayWeather = (state: RootState) => state.weather.displayWeather;

export const WeatherSelectors = {
  selectSearchHistory,
  selectLoading,
  selectHasError,
  selectDisplayWeather
};
