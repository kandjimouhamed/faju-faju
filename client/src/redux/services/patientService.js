import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios/globalInstance";

const getPatients = createAsyncThunk(
    'patients/getPatients',
    async (arg , {rejectWithValue}) => {
        try {
            const {data} = await instance.get('/patients')
            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data)
        }
    }
)

const addPatient = createAsyncThunk(
    'patient/addPatient',
    async (patient, { rejectWithValue }) => {
      try {
        const { data } = await instance.post("/signup", patient);
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
      }
    }
  );

const deletePatients = createAsyncThunk(
    'patient/deletePatient',
    async(id , {rejectWithValue}) => {
        try {
            const {data} = await instance.delete(`/patients/${id}`)
            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data)
        }
    }
)
  

const updatePatients = createAsyncThunk(
    'patient/updatePatient',
    async(patient , {rejectWithValue}) => {
        try {
            const {data} = await instance.put(`/patients/${patient._id}` , patient)
            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data)
        }
    }
)

export {getPatients , addPatient , deletePatients , updatePatients}