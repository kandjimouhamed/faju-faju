import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        patient : []
    },
    reducers:{
        addUser: (state, {payload}) => {
            state = [...state.patient , payload]
            return state
        },
        clearUser: (state) => {
            state = {}
            return state
        }
    }
})

export const {addUser, clearUser} = userSlice.actions
export default userSlice.reducer