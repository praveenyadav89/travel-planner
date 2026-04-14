import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip, TripsState } from '../types';

const initialState: TripsState = { savedTrips: [], currentTrip: null };

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    saveTrip: (state, action: PayloadAction<Trip>) => {
      const exists = state.savedTrips.find(
        t => t.cityName === action.payload.cityName && t.countryCode === action.payload.countryCode
      );
      if (!exists) state.savedTrips.push(action.payload);
    },
    removeTrip: (state, action: PayloadAction<string>) => {
      state.savedTrips = state.savedTrips.filter(t => t.id !== action.payload);
    },
    updateNotes: (state, action: PayloadAction<{ id: string; notes: string }>) => {
      const trip = state.savedTrips.find(t => t.id === action.payload.id);
      if (trip) trip.notes = action.payload.notes;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const trip = state.savedTrips.find(t => t.id === action.payload);
      if (trip) trip.isFavorite = !trip.isFavorite;
    },
    setCurrentTrip: (state, action: PayloadAction<Trip | null>) => {
      state.currentTrip = action.payload;
    },
    clearAllTrips: (state) => { state.savedTrips = []; },
  },
});

export const { saveTrip, removeTrip, updateNotes, toggleFavorite, setCurrentTrip, clearAllTrips } = tripsSlice.actions;
export default tripsSlice.reducer;
