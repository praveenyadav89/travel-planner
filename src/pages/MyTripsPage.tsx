import React, { useState, useMemo, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { clearAllTrips } from "../store/tripsSlice";
import TripCard from "../components/trips/TripCard";
import SearchBar from "../components/search/SearchBar";
import { Trash2, Heart } from "lucide-react";

type SortOption = "newest" | "oldest" | "name" | "favorites";

const MyTripsPage: React.FC = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedTrips = useSelector((s: RootState) => s.trips.savedTrips);

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [showFavs, setShowFavs] = useState(false);

  const displayedTrips = useMemo(() => {
    let trips = [...savedTrips];

    if (filter) {
      const q = filter.toLowerCase();
      trips = trips.filter(
        (t) =>
          t.cityName.toLowerCase().includes(q) ||
          t.countryName.toLowerCase().includes(q),
      );
    }

    if (showFavs) trips = trips.filter((t) => t.isFavorite);

    // Sort
    switch (sort) {
      case "newest":
        trips.sort(
          (a, b) =>
            new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime(),
        );
        break;
      case "oldest":
        trips.sort(
          (a, b) =>
            new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime(),
        );
        break;
      case "name":
        trips.sort((a, b) => a.cityName.localeCompare(b.cityName));
        break;
      case "favorites":
        trips.sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
        break;
    }

    return trips;
  }, [savedTrips, filter, sort, showFavs]);

  const favCount = savedTrips.filter((t) => t.isFavorite).length;

  return (
    <div className="trips-page">
      <div className="trips-page__header">
        <div>
          <h1 className="trips-page__title"> My Trips</h1>
          <p className="trips-page__subtitle">
            {savedTrips.length} saved · {favCount} favorite
            {favCount !== 1 ? "s" : ""}
          </p>
        </div>
        {savedTrips.length > 0 && (
          <button
            className="clear-btn"
            onClick={() => {
              if (window.confirm("Clear all saved trips?"))
                dispatch(clearAllTrips());
            }}
          >
            <Trash2 size={16} /> Clear All
          </button>
        )}
      </div>

      {savedTrips.length === 0 ? (
        <div className="trips-page__empty">
          <span className="trips-page__empty-icon"></span>
          <h2>No trips saved yet</h2>
          <p>Search for a destination and save it to start planning</p>
          <button className="cta-btn" onClick={() => navigate("/search")}>
            Search Destinations →
          </button>
        </div>
      ) : (
        <>
          <div className="trips-page__controls">
            <input
              type="text"
              className="trips-filter-input"
              placeholder="Filter trips..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <select
              className="trips-sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">City name</option>
              <option value="favorites">Favorites first</option>
            </select>
            <button
              className={`trips-fav-btn${showFavs ? " trips-fav-btn--active" : ""}`}
              onClick={() => setShowFavs((f) => !f)}
            >
              <Heart
                size={18}
                fill={showFavs ? "red" : "none"}
                stroke={showFavs ? "red" : "gray"}
              />
            </button>
          </div>

          {displayedTrips.length === 0 ? (
            <p className="trips-page__no-match">No trips match your filter</p>
          ) : (
            <div className="trips-page__grid">
              {displayedTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </>
      )}

      <div className="trips-page__search">
        <h3> Find a new destination</h3>
        <SearchBar />
      </div>
    </div>
  );
});

export default MyTripsPage;
