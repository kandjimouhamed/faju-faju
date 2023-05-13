import { createSlice } from "@reduxjs/toolkit"
import { addPrescription, deletePrescription, getPrescription } from "../services/prescriptionService"

const initialState = {
    data : [],
    loading:true,
    isSuccess : false,
    message : ''
}

const prescriptionSlice = createSlice({
    name : 'prescription',
    initialState ,
    reducers : {

    },
    extraReducers : {
        [addPrescription.pending] : (state , action) => {
            return {
                ...state,
                loading : true
            }
        },
        [addPrescription.fulfilled] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : payload
            }
        },
        [addPrescription.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload

            }
        },
        [getPrescription.pending] : (state , action) => {
            return {
                ...state,
                loading : true
            }
        },
        [getPrescription.fulfilled] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : payload
            }
        },
        [getPrescription.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload
            }
        },
        [deletePrescription.pending] : (state , action) => {
            return {
                ...state,
                loading : true
            }
        },
        [deletePrescription.fulfilled] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : payload
            }
        },
        [deletePrescription.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload
            }
        },

    }
})

export default prescriptionSlice.reducer