import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trip } from "../../types";
import { removeTrip, toggleFavorite } from "../../store/tripsSlice";
import { Trash2, Heart } from "lucide-react";

interface Props {
  trip: Trip;
}

const TripCard: React.FC<Props> = memo(({ trip }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(removeTrip(trip.id));
    },
    [dispatch, trip.id],
  );

  const handleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(toggleFavorite(trip.id));
    },
    [dispatch, trip.id],
  );

  const handleView = useCallback(() => {
    navigate(`/trips/${trip.id}`);
  }, [navigate, trip.id]);

  const savedDate = new Date(trip.savedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="trip-card" onClick={handleView}>
      <div className="trip-card__header">
        <div className="trip-card__location">
          <h3 className="trip-card__city">{trip.cityName}</h3>
          <p className="trip-card__country">{trip.countryName}</p>
        </div>
        <div className="trip-card__actions">
          <button
            className={`trip-card__fav${trip.isFavorite ? " trip-card__fav--active" : ""}`}
            onClick={handleFavorite}
            title="Toggle favorite"
          >
            <Heart
              size={18}
              fill={trip.isFavorite ? "red" : "none"}
              stroke={trip.isFavorite ? "red" : "gray"}
            />
          </button>
          <button
            className="trip-card__remove"
            onClick={handleRemove}
            title="Remove trip"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {trip.weather && (
        <div className="trip-card__weather">
          <img
            src={trip.weather.icon}
            alt={trip.weather.description}
            className="trip-card__weather-icon"
          />
          <span className="trip-card__temp">{trip.weather.temperature}°C</span>
          <span className="trip-card__weather-desc">
            {trip.weather.description}
          </span>
        </div>
      )}

      {trip.country?.flag && (
        <img src={trip.country.flag} alt="flag" className="trip-card__flag" />
      )}

      {trip.notes && (
        <p className="trip-card__notes">
          {trip.notes.substring(0, 60)}
          {trip.notes.length > 60 ? "..." : ""}
        </p>
      )}

      <div className="trip-card__footer">
        <span className="trip-card__date">Saved {savedDate}</span>
        <span className="trip-card__view">View details →</span>
      </div>
    </div>
  );
});

export default TripCard;
