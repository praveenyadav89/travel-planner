import React, { useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { saveTrip } from "../store/tripsSlice";
import { fetchWeather } from "../api/weatherApi";
import { fetchCountry } from "../api/countriesApi";
import { fetchPlaces } from "../api/placesApi";
import { Trip } from "../types";
import useFetch from "../hooks/useFetch";
import SearchBar from "../components/search/SearchBar";
import WeatherCard from "../components/weather/WeatherCard";
import CountryCard from "../components/trips/CountryCard";
import PlacesSection from "../components/places/PlacesSection";
import axios from "axios";
import { Sun, Globe } from "lucide-react";

const SearchResultsPage: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedTrips = useSelector((s: RootState) => s.trips.savedTrips);

  const city = params.get("city") || "";
  const country = params.get("country") || "";
  const lat = params.get("lat") || "";
  const lon = params.get("lon") || "";

  const {
    data: weather,
    loading: wLoading,
    error: wError,
  } = useFetch(() => fetchWeather(city), [city]);

  const {
    data: countryData,
    loading: cLoading,
    error: cError,
  } = useFetch(() => fetchCountry(country), [country]);

  const {
    data: placesData,
    loading: pLoading,
    error: pError,
  } = useFetch(() => fetchPlaces(lat, lon), [lat, lon]);
  useEffect(() => {
    if (!pError) return;

    console.error(" Error object:", pError);

    if (axios.isAxiosError(pError)) {
      console.error("Request:", pError.request);
      console.error("Response:", pError.response);
      console.error("Data:", pError.response?.data);
      console.error("Status:", pError.response?.status);
    } else {
      console.error("Unknown error:", pError);
    }
  }, [pError]);

  const isSaved = savedTrips.some(
    (t) => t.cityName === city && t.countryCode === country,
  );

  const handleSave = useCallback(() => {
    //console.log(weather, "country Data" + countryData);
    if (!weather || !countryData) return;

    const trip: Trip = {
      id: `${city}-${country}-${Date.now()}`,
      cityName: city,
      countryName: countryData.name,
      countryCode: country,
      savedAt: new Date().toISOString(),
      weather,
      country: countryData,
      notes: "",
      isFavorite: false,
    };
    dispatch(saveTrip(trip));
  }, [city, country, weather, countryData, dispatch]);

  if (!city) {
    return (
      <div className="search-results-page">
        <div className="search-results-empty">
          <h2>Search for a destination</h2>
          <SearchBar large />
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <div className="search-results-page__search">
        <SearchBar placeholder="Search another city..." />
      </div>

      <div className="search-results-page__header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="search-results-page__title">
          <h1> {city}</h1>
          {countryData && (
            <p>
              {countryData.name} · {countryData.region}
            </p>
          )}
        </div>

        <button
          className={`save-trip-btn${isSaved ? " save-trip-btn--saved" : ""}`}
          onClick={handleSave}
          disabled={isSaved || wLoading || cLoading}
        >
          {isSaved ? " Saved" : " Save Trip"}
        </button>
      </div>

      <div className="search-results-page__grid">
        <div className="search-results-page__col">
          <h2 className="search-results-page__col-title">
            <Sun size={16} /> Current Weather
          </h2>
          <WeatherCard weather={weather} loading={wLoading} error={wError} />
        </div>

        <div className="search-results-page__col">
          <h2 className="search-results-page__col-title">
            <Globe size={16} /> Country Info
          </h2>
          <CountryCard
            country={countryData}
            loading={cLoading}
            error={cError}
          />
        </div>

        <PlacesSection
          places={placesData?.places || []}
          loading={pLoading}
          error={pError}
          cityName={city}
        />
      </div>

      {isSaved && (
        <div className="search-results-page__cta">
          <p>Trip saved! </p>
          <button className="cta-btn" onClick={() => navigate("/trips")}>
            View My Trips →
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
