import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios/globalInstance";

const getRendezvous = createAsyncThunk(
    'rendezvous/getRendezvous',
    async (arg , {rejectWithValue}) => {
        try {
            const {data} = await instance.get('/rendezvous')
            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data)
        }
    }
)

const addRendezvous = createAsyncThunk(
    'rendezvous/addRendezvous',
    async (rendezvous, { rejectWithValue }) => {
      try {
        const { data } = await instance.post("/rendezvous", rendezvous);
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
      }
    }
  );

const deleteRendezvous = createAsyncThunk(
    'patient/deleteRendezvous',
    async(id , {rejectWithValue}) => {
        try {
            const {data} = await instance.delete(`/rendezvous/${id}`)
            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data)
        }
    }
)
  

const updateRendezvous = createAsyncThunk(
    'rendezvous/updateRendezvous',
    async(rendezvous , {rejectWithValue}) => {
        try {
            const {data} = await instance.put(`/rendezvous/${rendezvous._id}` , rendezvous)
            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data)
        }
    }
)

export {addRendezvous, getRendezvous, updateRendezvous, deleteRendezvous}