import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productslice"; // Adjust the path accordingly
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import {combineReducers} from "@reduxjs/toolkit"
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  products: productReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export default store;