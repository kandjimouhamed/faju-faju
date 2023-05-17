import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers:{
        addUser: (state, {payload}) => {
            console.log(payload);
            state = {...state , payload}
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