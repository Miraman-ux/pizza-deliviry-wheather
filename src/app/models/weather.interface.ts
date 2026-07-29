export interface CurrentWeatherUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  wind_speed_10m: string;
  relative_humidity_2m: string;
  weather_code: string;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
  weather_code: number;
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentWeatherUnits;
  current: CurrentWeather;
}
