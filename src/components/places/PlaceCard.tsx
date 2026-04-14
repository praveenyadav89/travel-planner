import React, { memo } from "react";
import { Place } from "../../types";
import { getCategoryIcon } from "../common/getCategoryIcon";
import { Phone } from "lucide-react";

interface Props {
  place: Place;
}

const formatDistance = (m: number): string =>
  m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${m} m`;

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const filled = Math.round((rating / 10) * 5);
  return (
    <div className="place-card__stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`place-card__star${i < filled ? " place-card__star--filled" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const PRICE_LABELS: Record<number, string> = {
  1: "Budget $",
  2: "Moderate $$",
  3: "Expensive $$$",
  4: "Luxury $$$$",
};

const PlaceCard: React.FC<Props> = memo(({ place }) => (
  <div className="place-card">
    {place.photos && place.photos.length > 0 ? (
      <div className="place-card__photo">
        <img src={place.photos[0]} alt={place.name} loading="lazy" />

        <span className="place-card__photo-badge">
          {getCategoryIcon(place.category)} {place.category}
        </span>
      </div>
    ) : (
      <div className="place-card__no-photo">
        <span className="place-card__no-photo-icon">
          {getCategoryIcon(place.category)}
        </span>
        <span className="place-card__no-photo-label">{place.category}</span>
      </div>
    )}

    <div className="place-card__body">
      <div className="place-card__header">
        <h3 className="place-card__name">{place.name}</h3>
        {place.rating !== undefined && (
          <div className="place-card__rating-badge">
            <span className="place-card__rating-num">{place.rating}</span>
            <span className="place-card__rating-denom">/10</span>
          </div>
        )}
      </div>

      {place.rating !== undefined && <RatingStars rating={place.rating} />}

      <div className="place-card__info-row">
        <span className="place-card__info-text">{place.address}</span>
      </div>

      {place.distance !== undefined && (
        <div className="place-card__info-row">
          <span className="place-card__info-text">
            {formatDistance(place.distance)} away
          </span>
        </div>
      )}

      {place.hours && (
        <div className="place-card__info-row">
          <span
            className={`place-card__info-text place-card__hours${
              place.hours.toLowerCase().includes("open")
                ? " place-card__hours--open"
                : ""
            }${
              place.hours.toLowerCase().includes("closed")
                ? " place-card__hours--closed"
                : ""
            }`}
          >
            {place.hours}
          </span>
        </div>
      )}

      {place.price !== undefined && PRICE_LABELS[place.price] && (
        <div className="place-card__info-row">
          <span className="place-card__info-text place-card__price">
            {PRICE_LABELS[place.price]}
          </span>
        </div>
      )}

      {place.tips && (
        <blockquote className="place-card__tip">
          "
          {place.tips.length > 100
            ? place.tips.slice(0, 100) + "…"
            : place.tips}
          "
        </blockquote>
      )}

      {(place.phone || place.website) && (
        <div className="place-card__actions">
          {place.phone && (
            <a href={`tel:${place.phone}`} className="place-card__action-link">
              <Phone size={16} /> {place.phone}
            </a>
          )}
        </div>
      )}
    </div>
  </div>
));

export default PlaceCard;
