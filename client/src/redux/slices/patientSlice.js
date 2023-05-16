import { createSlice } from "@reduxjs/toolkit";
import { addPatient, deletePatients, getPatients, updatePatients } from "../services/patientService";

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
        },
        [addPatient.pending] : (state) => {
            return {
                ...state,
                loading : true
            }
        },

        [addPatient.fulfilled] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : [...state.data , payload.data]
            }
        },

        [addPatient.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload
            }
        },
        [deletePatients.pending] : (state) => {
            return {
                ...state,
                loading : true
            }
        },

        [deletePatients.fulfilled] : (state , {payload}) => {
            const deleteItem = state.data.filter((patient) => patient._id !== payload.data._id)
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : deleteItem
            }
        },

        [deletePatients.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload
            }
        },
        [updatePatients.pending] : (state) => {
            return {
                ...state,
                loading : true
            }
        },

        [updatePatients.fulfilled] : (state , {payload}) => {
            const updateItem = state.data.map((patient) => patient._id === payload.data._id ? payload.data : patient)
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : updateItem
            }
        },

        [updatePatients.rejected] : (state , {payload}) => {
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