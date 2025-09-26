// src/Redux/Store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cardReducer from "./CardSlice";
import authSlice from '../pages/features/auth/AuthSlice';
import popupReducer from "./Popupslice/PopupSlice";
const persistConfig = {
    key: "cartData",
    storage,
};

const persistedReducer = persistReducer(persistConfig, cardReducer);

// Create and export store
export const store = configureStore({
    reducer: {
        mycart: persistedReducer,
        auth: authSlice,
         popup: popupReducer,
        
    }
});

// Export persistor
export const persistor = persistStore(store);