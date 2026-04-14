import { weatherApi, API_KEYS } from "./axiosInstance";
import { WeatherData } from "../types";

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const { data } = await weatherApi.get("/weather", {
    params: { q: city, appid: API_KEYS.openWeather, units: "metric" },
  });
  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    visibility: data.visibility,
    pressure: data.main.pressure,
  };
};
