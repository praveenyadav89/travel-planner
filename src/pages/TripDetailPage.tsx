import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { updateNotes, toggleFavorite, removeTrip } from "../store/tripsSlice";
import WeatherCard from "../components/weather/WeatherCard";
import CountryCard from "../components/trips/CountryCard";
import { Trash2, Heart, Sun, Globe } from "lucide-react";

const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trip = useSelector((s: RootState) =>
    s.trips.savedTrips.find((t) => t.id === id),
  );

  const [notes, setNotes] = useState(trip?.notes || "");
  const [notesSaved, setNotesSaved] = useState(false);

  const handleSaveNotes = useCallback(() => {
    if (!trip) return;
    dispatch(updateNotes({ id: trip.id, notes }));
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  }, [dispatch, trip, notes]);

  const handleDelete = useCallback(() => {
    if (!trip) return;
    if (window.confirm(`Remove ${trip.cityName} from saved trips?`)) {
      dispatch(removeTrip(trip.id));
      navigate("/trips");
    }
  }, [dispatch, trip, navigate]);

  if (!trip) {
    return (
      <div className="trip-detail-page">
        <div className="trips-page__empty">
          <span></span>
          <h2>Trip not found</h2>
          <button className="cta-btn" onClick={() => navigate("/trips")}>
            ← Back to trips
          </button>
        </div>
      </div>
    );
  }

  const savedDate = new Date(trip.savedAt).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="trip-detail-page">
      <button className="back-btn" onClick={() => navigate("/trips")}>
        ← My Trips
      </button>

      <div className="trip-detail-page__header">
        <div className="trip-detail-page__title-wrap">
          {trip.country?.flag && (
            <img
              src={trip.country.flag}
              alt=""
              className="trip-detail-page__flag"
            />
          )}
          <div>
            <h1 className="trip-detail-page__city">{trip.cityName}</h1>
            <p className="trip-detail-page__country">{trip.countryName}</p>
            <p className="trip-detail-page__date">Saved on {savedDate}</p>
          </div>
        </div>

        <div className="trip-detail-page__actions">
          <button
            className={`trip-card__fav${trip.isFavorite ? " trip-card__fav--active" : ""}`}
            onClick={() => dispatch(toggleFavorite(trip.id))}
          >
            <Heart
              size={18}
              fill={trip.isFavorite ? "red" : "none"}
              stroke={trip.isFavorite ? "red" : "gray"}
            />
          </button>
          <button className="trip-card__remove" onClick={handleDelete}>
            <Trash2 size={16} /> Remove
          </button>
        </div>
      </div>

      <div className="search-results-page__grid">
        <div className="search-results-page__col">
          <h2 className="search-results-page__col-title">
            {" "}
            <Sun size={16} /> Weather
          </h2>
          <WeatherCard
            weather={trip.weather || null}
            loading={false}
            error={null}
          />
        </div>
        <div className="search-results-page__col">
          <h2 className="search-results-page__col-title">
            {" "}
            <Globe size={16} /> Country
          </h2>
          <CountryCard
            country={trip.country || null}
            loading={false}
            error={null}
          />
        </div>
      </div>

      <div className="trip-detail-page__notes">
        <h2>Trip Notes</h2>
        <textarea
          className="notes-textarea"
          placeholder="Add your travel notes, plans, tips..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
        />
        <div className="notes-actions">
          <button className="save-trip-btn" onClick={handleSaveNotes}>
            {notesSaved ? "Saved!" : "Save Notes"}
          </button>
          {trip.notes && notes !== trip.notes && (
            <button className="back-btn" onClick={() => setNotes(trip.notes)}>
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetailPage;
