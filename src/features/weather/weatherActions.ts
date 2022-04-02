import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { getConfig } from '../../config';
import { fetchWeather } from './weatherAPI';
import { DisplayWeather, SearchHistory } from './weatherTypes';

const { COUNTRIES } = getConfig();

interface SearchLocationWeatherAction {
  city: string;
  country: string;
  shouldUpdateSearchHistory?: boolean;
}

const addSearchHistory = createAction<{ searchHistory: SearchHistory }>('weather/addSearchHistory');
const removeSearchHistory = createAction<{ searchHistory: SearchHistory }>('weather/removeSearchHistory');
const updateError = createAction<{ hasError: boolean }>('weather/updateError');
const setDisplayWeather = createAction<{ displayWeather: DisplayWeather }>('weather/setDisplayWeather');

const searchLocationWeather = createAsyncThunk(
  'weather/searchLocationWeather',
  async (
    { city, country, shouldUpdateSearchHistory = true }: SearchLocationWeatherAction,
    { dispatch, rejectWithValue }
  ) => {
    if (city.trim() === '' && country.trim() === '') {
      return;
    }

    const countryLower = country.toLowerCase();
    let countryCodeToSearch = '';

    if (countryLower.trim() !== '') {
      countryCodeToSearch = countryLower;
      type CountryName = typeof COUNTRIES[keyof typeof COUNTRIES];
      const indexedCountry: string | undefined = (COUNTRIES as Record<string, CountryName>)[countryLower];

      if (typeof indexedCountry === 'undefined') {
        const countryArray = Object.entries(COUNTRIES);
        const foundCountry = countryArray.find(([_, countryInArray]) => countryInArray.includes(country));

        if (typeof foundCountry === 'undefined') {
          return rejectWithValue('');
        }
        countryCodeToSearch = foundCountry[0];
      }
    }
    const res = await fetchWeather(city, countryCodeToSearch);

    const resCity = res.name;
    const resCountry = res.sys.country;
    const now = moment();
    const datetime = { display: now.format('hh:mm:ss A'), iso: now.toISOString() };

    shouldUpdateSearchHistory &&
      dispatch(addSearchHistory({ searchHistory: { city: resCity, country: resCountry, datetime } }));

    const { weather, main } = res;

    dispatch(
      setDisplayWeather({
        displayWeather: {
          city: resCity,
          country: resCountry,
          main: weather[0].main ?? '',
          description: weather[0].description ?? '',
          temperature: `${main.temp_min}°C ~ ${main.temp_max}°C`,
          humidity: `${main.humidity}%`,
          time: now.format('YYYY-MM-DD hh:mm A')
        }
      })
    );
    return res;
  }
);

export const WeatherActions = {
  searchLocationWeather,
  addSearchHistory,
  removeSearchHistory,
  updateError,
  setDisplayWeather
};
