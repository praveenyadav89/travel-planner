export interface City {
  id: number;
  city: string;
  country: string;
  countryCode: string;
  region?: string;
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
  visibility: number;
  pressure: number;
}

export interface CountryData {
  name: string;
  capital: string;
  population: number;
  area: number;
  currency: string;
  languages: string[];
  flag: string;
  region: string;
  timezone: string;
}

export interface Trip {
  id: string;
  cityName: string;
  countryName: string;
  countryCode: string;
  savedAt: string;
  weather?: WeatherData;
  country?: CountryData;
  notes: string;
  isFavorite: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type Theme = "dark" | "light";

export interface TripsState {
  savedTrips: Trip[];
  currentTrip: Trip | null;
}

export interface ThemeState {
  theme: Theme;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface Place {
  id: string;
  name: string;
  address: string;
  category: string;
  //categoryIcon: ReactNode; /
  latitude: number;
  longitude: number;
  distance?: number;
  rating?: number;
  price?: number;
  hours?: string;
  phone?: string;
  website?: string;
  photos?: string[];
  tips?: string;
}

export interface PlacesResponse {
  places: Place[];
}
