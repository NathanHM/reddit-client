import { configureStore } from "@reduxjs/toolkit";
import logInReducer from '../features/logIn/logInSlice';
import dashboardReducer from "../features/dashboard/dashboard.slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStateSyncMiddleware } from "redux-state-sync";

const persistConfig = {
    key: 'root',
    storage
}

const syncMiddleware = createStateSyncMiddleware({
    blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
})

export default configureStore({
    reducer: {
        logIn: persistReducer(persistConfig, logInReducer),
        dashboard: persistReducer(persistConfig, dashboardReducer)
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncMiddleware)
})