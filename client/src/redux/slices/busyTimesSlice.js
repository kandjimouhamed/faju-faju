import { createSlice } from '@reduxjs/toolkit';
import { editBusyTimes, getOneBusyTimes } from '../services/busyTimesServices';

const busyTimesSlice = createSlice({
    name: 'busyTimes',
    initialState: {
        data:[],
        loading: true,
        message: '',
        currentBusyTIme: {}
    },
    reducers:{},
    extraReducers:{
        [editBusyTimes.pending] : (state) => {
            state.loading = true
        },
        [editBusyTimes.fulfilled] : (state, {payload}) => {
            state.loading = false
            state.currentBusyTIme = payload
        },
        [editBusyTimes.rejected] : (state, {payload}) => {
            state.loading = false
            state.message = payload
        },
        // ********************************************
        [getOneBusyTimes.pending]: (state) => {
            state.loading = true
        },
        [getOneBusyTimes.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.currentBusyTIme = payload
        },
        [getOneBusyTimes.rejected]: (state, {payload}) => {
            state.loading = false
            state.message = payload
        },
    }
})

export default busyTimesSlice.reducer