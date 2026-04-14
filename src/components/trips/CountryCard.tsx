import React, { memo } from "react";
import { CountryData } from "../../types";
import Spinner from "../common/Spinner";
import {
  Landmark,
  Users,
  Maximize,
  Banknote,
  Clock,
  Languages,
} from "lucide-react";

interface Props {
  country: CountryData | null;
  loading: boolean;
  error: string | null;
}

const CountryCard: React.FC<Props> = memo(({ country, loading, error }) => {
  if (loading) return <Spinner text="Loading country info..." />;
  if (error)
    return (
      <div className="weather-error">
        <span></span>
        <p>{error}</p>
      </div>
    );
  if (!country) return null;

  return (
    <div className="country-card">
      <div className="country-card__header">
        {country.flag && (
          <img
            src={country.flag}
            alt={`${country.name} flag`}
            className="country-card__flag"
          />
        )}
        <div>
          <h3 className="country-card__name">{country.name}</h3>
          <p className="country-card__region">{country.region}</p>
        </div>
      </div>

      <div className="country-card__grid">
        <div className="country-info-item">
          <span className="country-info-item__label">
            <Landmark size={16} /> Capital
          </span>
          <span className="country-info-item__value">{country.capital}</span>
        </div>
        <div className="country-info-item">
          <span className="country-info-item__label">
            <Users size={16} /> Population
          </span>
          <span className="country-info-item__value">
            {country.population.toLocaleString()}
          </span>
        </div>
        <div className="country-info-item">
          <span className="country-info-item__label">
            <Maximize size={16} /> Area
          </span>
          <span className="country-info-item__value">
            {country.area.toLocaleString()} km²
          </span>
        </div>
        <div className="country-info-item">
          <span className="country-info-item__label">
            <Banknote size={16} /> Currency
          </span>
          <span className="country-info-item__value">{country.currency}</span>
        </div>
        <div className="country-info-item">
          <span className="country-info-item__label">
            <Clock size={16} /> Timezone
          </span>
          <span className="country-info-item__value">{country.timezone}</span>
        </div>
        <div className="country-info-item">
          <span className="country-info-item__label">
            <Languages size={16} /> Languages
          </span>
          <span className="country-info-item__value">
            {country.languages.join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
});

export default CountryCard;
