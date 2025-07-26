import { configureStore } from "@reduxjs/toolkit";
import glossaryReducer from './glossarySlice';
import tabReducer from './tabSlice';
import authReducer from './authSlice';
export const store = configureStore({
  reducer:{
    glossary:glossaryReducer,
    selectedTab:tabReducer,
    auth:authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;