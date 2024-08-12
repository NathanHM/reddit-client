import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
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
        root: persistReducer(persistConfig, rootReducer)
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(syncMiddleware)
})