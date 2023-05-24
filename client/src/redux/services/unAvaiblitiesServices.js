import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios/globalInstance';

const addUnAvaiblity = createAsyncThunk(
    'unavaiblities/addUnAvaiblity',
    async (unAvaiblity, { rejectWithValue }) => {
        try {
            const { data } = await instance.post('/add', unAvaiblity)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const getUnAvaiblities = createAsyncThunk(
    'unavaiblities/getUnAvaiblities',
    async (arg, { rejectWithValue }) => {
        try {
            const { data } = await instance.get('/avaiblities')
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export { addUnAvaiblity, getUnAvaiblities }