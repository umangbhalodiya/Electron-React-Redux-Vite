import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import authSlice from "./ApiSlice/authSlice";
import commonStateSlice from "./ApiSlice/commonState";

const reducers = combineReducers({
  auth: authSlice,
  commonState: commonStateSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "commonState"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
  // devTools: false,
});

export const persistor = persistStore(store);
export default store;
