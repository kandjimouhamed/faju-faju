import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../services/usersServices";

const initialState = {
    users: [],
    loading: true,
    message: ''
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducer: {},
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.loading = true
        },
        [getUsers.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.users = payload
        },
        [getUsers.pending]: (state) => {
            state.pending = false
        }
    }
})

export default usersSlice.reducer