import { createSlice } from "@reduxjs/toolkit"
import { detailPatient } from "../services/detailsService"



const initialState = {
    data : {},
    getDetailsPatient : "",
    message : "",
}

const detaisSlice = createSlice({
    name : "details",
    initialState,
    extraReducers : {
         [detailPatient.pending] : (state) => {
            return {
                ...state,
                getDetailsPatient : "pending",
                message : "",
            }
        },

        [detailPatient.fulfilled] : (state , {payload}) => {
            return {
                ...state,
                getDetailsPatient : "fulfilled",
                message : "",
                data : payload
            }
        },

        [detailPatient.rejected] : (state , {payload}) => {
            return {
                ...state,
                getDetailsPatient : "rejected",
                message : payload
            }
        }
    }
})

export default detaisSlice.reducer
