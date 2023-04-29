import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
// !redux-persit
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import unAvaiblitiesSlice from "./slices/unAvaiblitiesSlice";
import appointmentsSlice from "./slices/appointmentsSlice";
import usersSlice from "./slices/usersSlice";
import busyTimesSlice from "./slices/busyTimesSlice";

const persistConfig = {
    key: 'store',
    storage,
};

const reducers = combineReducers({ user: userSlice, unavaiblities: unAvaiblitiesSlice, appointments: appointmentsSlice, users: usersSlice, busyTimes: busyTimesSlice });

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})