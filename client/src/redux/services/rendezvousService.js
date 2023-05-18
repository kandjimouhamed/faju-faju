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

// const deletePatients = createAsyncThunk(
//     'patient/deletePatient',
//     async(id , {rejectWithValue}) => {
//         try {
//             const {data} = await instance.delete(`/patients/${id}`)
//             return data
//         } catch (error) {
//             console.log(error);
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
  

// const updatePatients = createAsyncThunk(
//     'patient/updatePatient',
//     async(patient , {rejectWithValue}) => {
//         try {
//             const {data} = await instance.put(`/patients/${patient._id}` , patient)
//             return data
//         } catch (error) {
//             console.log(error);
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

export {addRendezvous, getRendezvous}