import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import tripsReducer from "./tripsSlice";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";

const persistConfig = {
  key: "travel-planner",
  storage,
  whitelist: ["trips", "theme", "auth"],
};

const rootReducer = combineReducers({
  trips: tripsReducer,
  theme: themeReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
