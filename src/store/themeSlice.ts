import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState } from '../types';

const initialState: ThemeState = { theme: 'dark' };

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; },
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => { state.theme = action.payload; },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
