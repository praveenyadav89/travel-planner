import React, { useState, useMemo, memo } from "react";
import { Place } from "../../types";
import PlaceCard from "./PlaceCard";
import Spinner from "../common/Spinner";
import { MapPin } from "lucide-react";

interface Props {
  places: Place[];
  loading: boolean;
  error: string | null;
  cityName: string;
}

const PlacesSection: React.FC<Props> = memo(
  ({ places, loading, error, cityName }) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(4);
    const handleLoadMore = () => {
      setVisibleCount((prev) => prev + 4);
    };

    const filtered = useMemo(
      () =>
        activeCategory === "All"
          ? places
          : places.filter((p) => p.category === activeCategory),
      [places, activeCategory],
    );

    if (loading)
      return (
        <div className="places-section">
          <h2 className="places-section__title">Top Attractions</h2>
          <Spinner text="Finding nearby attractions…" />
        </div>
      );

    if (error)
      return (
        <div className="places-section">
          <h2 className="places-section__title">Top Attractions</h2>
          <div className="places-section__error">
            <p>Could not load attractions</p>
            <small>Check your REACT_APP_FOURSQUARE_KEY in .env</small>
          </div>
        </div>
      );

    if (!places.length)
      return (
        <div className="places-section">
          <h2 className="places-section__title"> Top Attractions</h2>
          <div className="places-section__empty">
            <p>No attractions found near {cityName}</p>
          </div>
        </div>
      );

    return (
      <div className="places-section">
        <div className="places-section__header">
          <h2 className="places-section__title">
            <MapPin size={16} /> Top Attractions
            <span className="places-section__count"> ({filtered.length})</span>
          </h2>
        </div>

        <div className="places-grid">
          {places.slice(0, visibleCount).map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
        {places.length > visibleCount && (
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <button onClick={handleLoadMore} className="cta-btn">
              Load More
            </button>
          </div>
        )}
      </div>
    );
  },
);

export default PlacesSection;
