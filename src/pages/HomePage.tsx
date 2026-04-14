import React, { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SearchBar from "../components/search/SearchBar";
import { fetchCityCount } from "../api/citiesApi";
import { Hand, Heart } from "lucide-react";

const HomePage: React.FC = memo(() => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const savedTrips = useSelector((s: RootState) => s.trips.savedTrips);
  const user = useSelector((s: RootState) => s.auth.user);

  useEffect(() => {
    const cached = localStorage.getItem("cityCount");
    const cachedTime = localStorage.getItem("cityCountTime");

    const ONE_DAY = 24 * 60 * 60 * 1000;

    if (cached && cachedTime && Date.now() - Number(cachedTime) < ONE_DAY) {
      setCount(Number(cached));
    } else {
      fetchCityCount()
        .then((c) => {
          if (c > 0) {
            setCount(c);
            localStorage.setItem("cityCount", String(c));
            localStorage.setItem("cityCountTime", String(Date.now()));
          }
        })
        .catch(() => {
          setCount(300);
        });
    }
  }, []);
  const formatted =
    count >= 100000
      ? `${Math.floor(count / 1000)}k+`
      : count >= 1000
        ? `${(count / 1000).toFixed(1)}k+`
        : `${count}+`;
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <h1 className="home-hero__title">
            Discover Your
            <br />
            <span className="home-hero__title-accent">Next Adventure</span>
          </h1>
          <p className="home-hero__subtitle">
            Search destinations, explore weather, and plan unforgettable trips
          </p>

          <div className="home-hero__search">
            <SearchBar placeholder="Search any city in the world..." large />
          </div>
        </div>

        <div className="home-stats">
          <div className="home-stat">
            <span className="home-stat__num">{formatted}</span>
            <span className="home-stat__label">Destinations</span>
          </div>
          <div className="home-stat">
            <span className="home-stat__num">{savedTrips.length}</span>
            <span className="home-stat__label">Saved Trips</span>
          </div>
          <div className="home-stat">
            <span className="home-stat__num">Live</span>
            <span className="home-stat__label">Weather</span>
          </div>
        </div>
      </section>

      {user && (
        <section className="home-welcome">
          <p>
            <Hand size={16} /> Welcome back, <strong>{user.name}</strong>! Ready
            to explore?
          </p>
        </section>
      )}

      {savedTrips.length > 0 && (
        <section className="home-recent">
          <div className="home-recent__header">
            <h2 className="home-section-title"> Recent Trips</h2>
            <button
              className="home-recent__see-all"
              onClick={() => navigate("/trips")}
            >
              See all →
            </button>
          </div>
          <div className="home-recent__list">
            {savedTrips.slice(0, 3).map((trip) => (
              <div
                key={trip.id}
                className="recent-trip-item"
                onClick={() => navigate(`/trips/${trip.id}`)}
              >
                {trip.country?.flag && (
                  <img
                    src={trip.country.flag}
                    alt=""
                    className="recent-trip-item__flag"
                  />
                )}
                <div>
                  <p className="recent-trip-item__city">{trip.cityName}</p>
                  <p className="recent-trip-item__country">
                    {trip.countryName}
                  </p>
                </div>
                {trip.weather && (
                  <span className="recent-trip-item__temp">
                    {trip.weather.temperature}°C
                  </span>
                )}

                {trip.isFavorite && <Heart size={18} fill="red" stroke="red" />}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
});

export default HomePage;
