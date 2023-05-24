import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios/globalInstance';

const editBusyTimes = createAsyncThunk(
    'busyTimes/edit',
    async (args, {rejectWithValue} ) => {
        try {
            const {data} = await instance.put(`/busy-times/${args.id}`, args.data)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const getBusyTimes = createAsyncThunk(
    'busyTimes/get',
    async (arg, {rejectWithValue}) => {
        try {
            const {data} = instance.get('/busy-times')
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const getOneBusyTimes = createAsyncThunk(
    'busyTimes/getOne',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await instance.get(`/busy-times/${id}`)
            
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export { editBusyTimes, getBusyTimes, getOneBusyTimes }