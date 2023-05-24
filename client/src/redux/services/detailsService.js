import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios/globalInstance";

const detailPatient = createAsyncThunk(
    'patient/detailPatient',
    async(id , {rejectWithValue}) => {
        try {
            const {data} = await instance.get(`/patients/detail/${id}`)
            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data)
        }
    }
)

export {detailPatient}