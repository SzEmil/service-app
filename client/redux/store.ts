import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/authSlice';

import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

 const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    // auth: authReducer,
  },

  middleware: getDefaultMiddleware({
    serializableCheck: {
         ignoredActions: ignoredActions,
    },
  }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
