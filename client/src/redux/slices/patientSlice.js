import { createSlice } from "@reduxjs/toolkit";
import { getPatients } from "../services/patientService";

const initialState = {
    data : [],
    loading : true,
    isSuccess : false,
    message : ""

}

const patientSlice = createSlice({
    name : "patient",
    initialState,
    extraReducers : {
        [getPatients.pending] : (state) => {
            return {
                ...state,
                loading : true
            }
        },

        [getPatients.fulfilled] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : payload.data
            }
        },

        [getPatients.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload
            }
        }
    }
})

export default patientSlice.reducer