import { createSlice } from '@reduxjs/toolkit';
import { addUnAvaiblity, getUnAvaiblities } from '../services/unAvaiblitiesServices';

const initialState = {
    data: [],
    loading: true,
    isSuccess: false,
    message: ''
}

const unAvaiblitiesSlice = createSlice({
    name: 'unavaiblities',
    initialState,
    reducers: {
        clearAvaiblities: (state) => {
            state = initialState
            return state
        }
    },
    extraReducers: {
        [getUnAvaiblities.pending]: (state) => {
            state.loading = true
        },
        [getUnAvaiblities.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.isSuccess = true
            state.data = payload
        },
        [getUnAvaiblities.rejected]: (state, { payload }) => {
            state.loading = false
            state.isSuccess = false
            state.message = payload
        },

        [addUnAvaiblity.pending]: (state) => {
            state.loading = true
        },
        [addUnAvaiblity.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.isSuccess = true
            state.data.push(payload.hours[0])

        },
        [addUnAvaiblity.rejected]: (state, { payload }) => {
            state.loading = false
            state.isSuccess = false
            state.message = payload
        }
    }
})

export const { clearAvaiblities } = unAvaiblitiesSlice.actions

export default unAvaiblitiesSlice.reducer
