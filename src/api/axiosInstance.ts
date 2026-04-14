import axios, { AxiosInstance, AxiosError } from "axios";

export const API_KEYS = {
  openWeather: process.env.REACT_APP_WEATHER_API_KEY || "",
  geoDB: process.env.REACT_APP_GEODB_KEY || "",
  fourSquare: process.env.REACT_APP_FOURSQUARE_KEY || "demo",
};

export const BASE_URLS = {
  weather: process.env.REACT_APP_WEATHER_API_BASE_URL || "",
  countries: process.env.REACT_APP_COUNTRIES_API_BASE_URL || "",
  geoDB: process.env.REACT_APP_GEODB_API_BASE_URL || "",
  fourSquare: process.env.REACT_APP_FOURSQUARE_API_BASE_URL || "",
};

const createInstance = (
  baseURL: string,
  type?: "weather" | "geoDB" | "fourSquare",
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
  });

  instance.interceptors.request.use((config) => {
    console.log(
      ` ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
    );

    if (type === "geoDB") {
      config.headers["X-RapidAPI-Key"] = API_KEYS.geoDB;
      config.headers["X-RapidAPI-Host"] = "wft-geo-db.p.rapidapi.com";
    }

    if (type === "fourSquare") {
      config.headers["authorization"] = `Bearer ${API_KEYS.fourSquare}`;
      config.headers["X-Places-Api-Version"] = "2025-06-17";
      config.headers["accept"] = "application/json";
    }

    if (type === "weather") {
      config.params = {
        ...config.params,
        appid: API_KEYS.openWeather,
      };
    }

    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const config = error.config as any;

      if (error.response?.status === 429) {
        console.error("Rate limit exceeded");
        return Promise.reject(error);
      }

      if (!config || config.__retryCount >= 3) {
        return Promise.reject(error);
      }

      config.__retryCount = (config.__retryCount || 0) + 1;

      if (!error.response || error.response.status >= 500) {
        await new Promise((r) => setTimeout(r, 1000 * config.__retryCount));
        return instance(config);
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export const weatherApi = createInstance(BASE_URLS.weather, "weather");
export const countriesApi = createInstance(BASE_URLS.countries);
export const geoDBApi = createInstance(BASE_URLS.geoDB, "geoDB");
export const fourSquareApi = createInstance("/", "fourSquare");
