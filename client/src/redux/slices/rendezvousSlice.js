import { createSlice } from "@reduxjs/toolkit";
import { addRendezvous, getRendezvous, updateRendezvous, deleteRendezvous} from "../services/rendezvousService";

const initialState = {
    data : [],
    loading : true,
    isSuccess : false,
    message : "",
    // getRendezvousStatus : "",

}

const rendezvousSlice = createSlice({
    name : "rendezvous",
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
        [deleteRendezvous.pending] : (state) => {
            return {
                ...state,
                loading : true
            }
        },

        [deleteRendezvous.fulfilled] : (state , {payload}) => {
            const deleteItem = state.data.filter((rendezvous) => rendezvous._id !== payload.data._id)
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : deleteItem
            }
        },

        [deleteRendezvous.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload
            }
        },
        [updateRendezvous.pending] : (state) => {
            return {
                ...state,
                loading : true
            }
        },

        [updateRendezvous.fulfilled] : (state , {payload}) => {
            const updateItem = state.data.map((rendezvous) => rendezvous._id === payload.data._id ? payload.data : rendezvous)
            return {
                ...state,
                loading : false,
                isSuccess : true,
                data : updateItem
            }
        },

        [updateRendezvous.rejected] : (state , {payload}) => {
            return {
                ...state,
                loading : false,
                isSuccess : false,
                message : payload
            }
        }
    }
})

export default rendezvousSlice.reducer