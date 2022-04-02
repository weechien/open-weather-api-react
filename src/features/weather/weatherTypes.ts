import { getConfig } from '../../config';
import { getTypedKeys } from '../../utils/misc';

const { COUNTRIES } = getConfig();
const typedCountryCode = getTypedKeys(COUNTRIES);

export interface CityWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];

  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: typeof typedCountryCode[number];
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherErrorResponse {
  cod: string;
  message: string;
}

export interface SearchHistory {
  city: string;
  country: string;
  datetime: { display: string; iso: string };
}

export interface DisplayWeather {
  city: string;
  country: string;
  main: string;
  description: string;
  temperature: string;
  humidity: string;
  time: string;
}

export interface WeatherState {
  searchHistory: SearchHistory[];
  loading: boolean;
  hasError: boolean;
  displayWeather: DisplayWeather;
}
