import { getConfig } from '../../config';
import { CityWeatherResponse, WeatherErrorResponse } from './weatherTypes';

const { WEATHER_API_URL, WEATHER_API_KEY } = getConfig();

export const fetchWeather = async (cityName: string, countryCode: string): Promise<CityWeatherResponse> => {
  const parsedCountryCode = countryCode === '' ? '' : `,${countryCode}`;
  const url = `${WEATHER_API_URL}?q=${cityName}${parsedCountryCode}&appid=${WEATHER_API_KEY}`;
  const res = await fetch(url);
  return await res.json();
};
