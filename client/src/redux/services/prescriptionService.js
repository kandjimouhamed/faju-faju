import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios/globalInstance";


const addPrescription = createAsyncThunk(
    'prescription/addPrescription',
    async (prescription , {rejectWithValue}) => {
        try {
            const {data} = await instance.post('/prescription' , prescription)
            return data
        } catch (error) {
            rejectWithValue(error.response.data)
        }
    }
)

const getPrescription = createAsyncThunk(
    'prescription/getPrescription',
    async (arg , {rejectWithValue}) => {
        try {
            const {data} = await instance.get('/prescription')
            return data
        } catch (error) {
            console.log(error);
            rejectWithValue(error.response.data)
        }
    } 
)

const deletePrescription = createAsyncThunk(
    'prescription/deletePrescription',
    async (id , {rejectWithValue}) => {
        try {
            const {data} = await instance.delete(`/prescription/${id}`)
            return data
        } catch (error) {
            console.log(error);
            rejectWithValue(error.message)
        }
    }
)

export { addPrescription , getPrescription , deletePrescription }