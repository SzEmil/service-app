import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/authSlice';
import { restaurantsReducer } from './restaurants/restaurantsSlice';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from '@reduxjs/toolkit';
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

const restaurantsPersistConfig = {
  key: 'restaurants',
  storage,
  whitelist: ['restaurants'],
};

const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    // auth: authReducer,
    restaurants: persistReducer(restaurantsPersistConfig, restaurantsReducer)
  },

  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ignoredActions,
    },
  }),
});

export const persistor = persistStore(store);
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<any, any, AnyAction>;
