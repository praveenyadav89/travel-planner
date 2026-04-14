import React, { useState, useEffect, useRef, memo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCities } from "../../api/citiesApi";
import { City } from "../../types";
import useDebounce from "../../hooks/useDebounce";
import { Search, MapPin } from "lucide-react";

interface Props {
  placeholder?: string;
  large?: boolean;
}

const SearchBar: React.FC<Props> = memo(
  ({ placeholder = "Search cities...", large = false }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<City[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    const debouncedQuery = useDebounce(query, 600);

    useEffect(() => {
      if (debouncedQuery.trim().length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      let isCancelled = false;

      setIsLoading(true);

      fetchCities(debouncedQuery)
        .then((data) => {
          if (!isCancelled) {
            setResults(data);
            setIsOpen(data.length > 0);
            setActiveIndex(-1);
          }
        })
        .catch(() => {
          if (!isCancelled) setResults([]);
        })
        .finally(() => {
          if (!isCancelled) setIsLoading(false);
        });

      return () => {
        isCancelled = true;
      };
    }, [debouncedQuery]);

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    const selectCity = (city: City) => {
      setQuery(city.city);
      setIsOpen(false);
      navigate(
        `/search?city=${encodeURIComponent(city.city)}&country=${encodeURIComponent(city.countryCode)}&lat=${city.latitude}&lon=${city.longitude}`,
      );
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        selectCity(results[activeIndex]);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    return (
      <div
        ref={wrapRef}
        className={`search-bar${large ? " search-bar--large" : ""}`}
      >
        <div className="search-bar__input-wrap">
          <span className="search-bar__icon">
            <Search size={16} />
          </span>
          <input
            ref={inputRef}
            type="text"
            className="search-bar__input"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            autoComplete="off"
          />
          {isLoading && <span className="search-bar__spinner" />}
          {query && (
            <button
              className="search-bar__clear"
              onClick={() => {
                setQuery("");
                setResults([]);
                inputRef.current?.focus();
              }}
            >
              ✕
            </button>
          )}
        </div>

        {isOpen && (
          <ul className="search-bar__dropdown">
            {results.map((city, i) => (
              <li
                key={city.id}
                className={`search-bar__option${i === activeIndex ? " search-bar__option--active" : ""}`}
                onMouseDown={() => selectCity(city)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span className="search-bar__option-city">
                  <MapPin size={16} /> {city.city}
                </span>
                <span className="search-bar__option-country">
                  {city.country}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

export default SearchBar;
