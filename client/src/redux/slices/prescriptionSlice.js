import { createSlice } from "@reduxjs/toolkit"
import { addPrescription, deletePrescription, getPrescription, updatePrescription } from "../services/prescriptionService"

const initialState = {
    data : [],
    loading:true,
    isSuccess : false,
    message : '',
    getPrescriptionStatus : "",
    addPrescriptionStatus : "",
    updatePrescriptionStatus : "",
    deletePrescriptionStatus : ""
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
                loading : true,
                getPrescriptionStatus : "",
                addPrescriptionStatus : "pending",
                updatePrescriptionStatus : "",
                deletePrescriptionStatus : ""

            }
        },
        [addPrescription.fulfilled] : (state , {payload}) => {
     
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : [...state.data , payload.data ],
                getPrescriptionStatus : "",
                addPrescriptionStatus : "success",
                updatePrescriptionStatus : "",
                deletePrescriptionStatus : ""
            }
        },
        [addPrescription.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload,
                getPrescriptionStatus : "",
                addPrescriptionStatus : "rejected",
                updatePrescriptionStatus : "",
                deletePrescriptionStatus : ""
            }
        },
        [getPrescription.pending] : (state , action) => {
            return {
                ...state,
                loading : true,
                getPrescriptionStatus : "pending",
                addPrescriptionStatus : "",
                updatePrescriptionStatus : "",
                deletePrescriptionStatus : ""
            }
        },
        [getPrescription.fulfilled] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : payload.data,
                getPrescriptionStatus : "success",
                addPrescriptionStatus : "",
                updatePrescriptionStatus : "",
                deletePrescriptionStatus : ""
            }
        },
        [getPrescription.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload.data,
                getPrescriptionStatus : "rejected",
                addPrescriptionStatus : "",
                updatePrescriptionStatus : "",
                deletePrescriptionStatus : ""
            }
        },
        [deletePrescription.pending] : (state , action) => {
            return {
                ...state,
                loading : true,
                getPrescriptionStatus : "",
                addPrescriptionStatus : "",
                updatePrescriptionStatus : "",
                deletePrescriptionStatus : "pending"
            }
        },
        [deletePrescription.fulfilled] : (state , {payload}) => {
            const deleteItem = state.data.filter((data) => data._id !== payload.data._id)
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : deleteItem,
                getPrescriptionStatus : "",
                addPrescriptionStatus : "",
                updatePrescriptionStatus : "",
                deletePrescriptionStatus : "success"
            }
        },
        [deletePrescription.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload.data,
                getPrescriptionStatus : "",
                addPrescriptionStatus : "",
                updatePrescriptionStatus : "",
                deletePrescriptionStatus : "rejected"
            }
        },
        [updatePrescription.pending] : (state , action) => {
            return {
                ...state,
                loading : true,
                getPrescriptionStatus : "",
                addPrescriptionStatus : "",
                updatePrescriptionStatus : "pending",
                deletePrescriptionStatus : ""
            }
        },
        [updatePrescription.fulfilled] : (state , {payload}) => {
            const updateItem = state.data.map((data) => 
                data._id === payload.data._id ? payload.data : data
            )
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : updateItem,
                getPrescriptionStatus : "",
                addPrescriptionStatus : "",
                updatePrescriptionStatus : "success",
                deletePrescriptionStatus : ""
            }
        },
        [updatePrescription.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload.data,
                getPrescriptionStatus : "",
                addPrescriptionStatus : "",
                updatePrescriptionStatus : "rejected",
                deletePrescriptionStatus : ""
            }
        }

    }
})

export default prescriptionSlice.reducer