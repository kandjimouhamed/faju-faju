import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios/globalInstance';

const getAppointments = createAsyncThunk(
    'appointments/getAppointments',
    async(arg, {rejectWithValue}) => {
        try {
            const {data} = await instance.get('/appointments')
            return data
        } catch (error) {
            rejectWithValue(error.response.data)
        }
    }
)

const addAppointment = createAsyncThunk(
    'appointments/addAppointment',
    async (appointment, {rejectWithValue} ) => {
        try {
            const {data} = await instance.post('/appointments', appointment)
            return data
        } catch (error) {
            rejectWithValue(error.reponse.data)
        }
    }
)

const updateAppointment = createAsyncThunk(
    'appointments/updateappointment',
    async (args, {rejectWithValue}) => {
        try {
            const {data} = await instance.put(`/appointments/${args.id}`, args.data)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export {getAppointments, addAppointment, updateAppointment}
