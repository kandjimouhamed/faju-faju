import { createSlice } from "@reduxjs/toolkit";
import { addRendezvous, getRendezvous } from "../services/rendezvousService";

const initialState = {
    data : [],
    loading : true,
    isSuccess : false,
    message : "",
    // getRendezvousStatus : "",

}

const rendezvousSlice = createSlice({
    name : "rebdezvous",
    initialState,
    extraReducers : {
        [getRendezvous.pending] : (state) => {
            return {
                ...state,
                loading : true,
                getRendezvousStatus : "pending",
            }
        },

        [getRendezvous.fulfilled] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : payload.data,
                getRendezvousStatus : "success",
            }
        },

        [getRendezvous.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload,
                getRendezvousStatus : "rejected",
            }
        },
        [addRendezvous.pending] : (state) => {
            return {
                ...state,
                loading : true
            }
        },

        [addRendezvous.fulfilled] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : [...state.data , payload.data]
            }
        },

        [addRendezvous.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload
            }
        },
        // [deletePatients.pending] : (state) => {
        //     return {
        //         ...state,
        //         loading : true
        //     }
        // },

        // [deletePatients.fulfilled] : (state , {payload}) => {
        //     const deleteItem = state.data.filter((patient) => patient._id !== payload.data._id)
        //     return {
        //         ...state,
        //         loading : false,
        //         isSuccess : true,
        //         data : deleteItem
        //     }
        // },

        // [deletePatients.rejected] : (state , {payload}) => {
        //     return {
        //         ...state,
        //         loading : false,
        //         isSuccess : false,
        //         message : payload
        //     }
        // },
        // [updatePatients.pending] : (state) => {
        //     return {
        //         ...state,
        //         loading : true
        //     }
        // },

        // [updatePatients.fulfilled] : (state , {payload}) => {
        //     const updateItem = state.data.map((patient) => patient._id === payload.data._id ? payload.data : patient)
        //     return {
        //         ...state,
        //         loading : false,
        //         isSuccess : true,
        //         data : updateItem
        //     }
        // },

        // [updatePatients.rejected] : (state , {payload}) => {
        //     return {
        //         ...state,
        //         loading : false,
        //         isSuccess : false,
        //         message : payload
        //     }
        // }
    }
})

export default rendezvousSlice.reducer