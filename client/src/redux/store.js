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
import prescriptionSlice from "./slices/prescriptionSlice";
import patientSlice from "./slices/patientSlice";
import rendezvousSlice from "./slices/rendezvousSlice";

const persistConfig = {
    key: 'store',
    storage,
};

const reducers = combineReducers({
    user: userSlice, 
    unavaiblities: unAvaiblitiesSlice, 
    appointments: appointmentsSlice, 
    users: usersSlice, 
    busyTimes: busyTimesSlice ,
    prescription : prescriptionSlice  ,
    patients: patientSlice,
    rendezvous: rendezvousSlice,
});

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