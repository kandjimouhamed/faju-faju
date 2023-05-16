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
                data : [...state.data , payload.data ]
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
                data : payload.data
            }
        },
        [getPrescription.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload.data
            }
        },
        [deletePrescription.pending] : (state , action) => {
            return {
                ...state,
                loading : true
            }
        },
        [deletePrescription.fulfilled] : (state , {payload}) => {
            const deleteItem = state.data.filter((data) => data._id !== payload.data._id)
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : deleteItem
            }
        },
        [deletePrescription.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload.data
            }
        },

    }
})

export default prescriptionSlice.reducer