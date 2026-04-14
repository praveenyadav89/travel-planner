import React, { memo } from "react";
import { WeatherData } from "../../types";
import Spinner from "../common/Spinner";
import { Wind, Droplets, Eye, Gauge, Sunset, Sunrise } from "lucide-react";

interface Props {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const formatTime = (unix: number): string => {
  return new Date(unix * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const WeatherCard: React.FC<Props> = memo(({ weather, loading, error }) => {
  if (loading) return <Spinner text="Loading weather..." />;
  if (error)
    return (
      <div className="weather-error">
        <span></span>
        <p>{error}</p>
        <small>Check your OpenWeatherMap API key in .env file</small>
      </div>
    );
  if (!weather) return null;

  return (
    <div className="weather-card">
      <div className="weather-card__header">
        <div>
          <h2 className="weather-card__city">{weather.city}</h2>
          <p className="weather-card__desc">{weather.description}</p>
        </div>
        <img
          src={weather.icon}
          alt={weather.description}
          className="weather-card__icon"
        />
      </div>

      <div className="weather-card__temp">
        <span className="weather-card__temp-main">{weather.temperature}°C</span>
        <span className="weather-card__temp-feels">
          Feels like {weather.feelsLike}°C
        </span>
      </div>

      <div className="weather-card__stats">
        <div className="weather-stat">
          <span className="weather-stat__icon">
            <Droplets size={16} />
          </span>
          <span className="weather-stat__label">Humidity</span>
          <span className="weather-stat__value">{weather.humidity}%</span>
        </div>
        <div className="weather-stat">
          <span className="weather-stat__icon">
            <Wind size={16} />
          </span>
          <span className="weather-stat__label">Wind</span>
          <span className="weather-stat__value">{weather.windSpeed} m/s</span>
        </div>
        <div className="weather-stat">
          <span className="weather-stat__icon">
            <Eye size={16} />
          </span>
          <span className="weather-stat__label">Visibility</span>
          <span className="weather-stat__value">
            {(weather.visibility / 1000).toFixed(1)} km
          </span>
        </div>
        <div className="weather-stat">
          <span className="weather-stat__icon">
            <Gauge size={16} />
          </span>
          <span className="weather-stat__label">Pressure</span>
          <span className="weather-stat__value">{weather.pressure} hPa</span>
        </div>
        <div className="weather-stat">
          <span className="weather-stat__icon">
            <Sunrise size={16} />
          </span>
          <span className="weather-stat__label">Sunrise</span>
          <span className="weather-stat__value">
            {formatTime(weather.sunrise)}
          </span>
        </div>
        <div className="weather-stat">
          <span className="weather-stat__icon">
            <Sunset size={16} />
          </span>
          <span className="weather-stat__label">Sunset</span>
          <span className="weather-stat__value">
            {formatTime(weather.sunset)}
          </span>
        </div>
      </div>
    </div>
  );
});

export default WeatherCard;
