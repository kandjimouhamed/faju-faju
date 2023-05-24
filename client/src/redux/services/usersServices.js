import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios/globalInstance';

const getUsers = createAsyncThunk(
    'users/getUsers',
    async (users, {rejectWithValue}) => {
        try {
            const {data} = await instance.get('/users')
            return data
        } catch (error) {
            rejectWithValue(error.response.data)
        }
    }
)

export {getUsers}