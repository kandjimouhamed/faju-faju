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
            rejectWithValue(error.response.data)
        }
    }
)

export {getPatients}