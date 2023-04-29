import { createSlice } from '@reduxjs/toolkit';
import { getAppointments, addAppointment, updateAppointment } from '../services/appointmentsServices';

const initialState =  {
    appointments: [],
    loading: false,
    isSuccess: false,
    message: ''
}

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        chooseAppointment: (state, {payload}) => {
            const appointment = state.appointments.find(appoint => appoint._id === payload.id)
            appointment.userId = payload.userId
            appointment.description = payload.description

            return state
        },
        validateAppointment: (state, {payload}) => {
            state.appointments.find(appointment => appointment._id === payload).isConfirmed = true

            return state
        },
        cancelAppointment: (state, {payload}) => {
            state.appointments.find(appointment => appointment._id === payload).isConfirmed = false

            return state
        },
        clearAppointments: (state) => {
            state = initialState
            return state
        }
    },
    extraReducers: {
        [getAppointments.pending]: (state) => {
            state.loading = true
        },
        [getAppointments.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.isSuccess = true
            state.appointments = payload
            
        },
        [getAppointments.rejected]: (state, {payload}) => {
            state.loading = false
            state.isSuccess = false
            state.message = payload
        },
        
        // ! ****************************
        [addAppointment.pending]: (state) => {
            state.loading = true
        },
        [addAppointment.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.isSuccess = true
            state.appointments.push(payload)
        },
        [addAppointment.rejected]: (state, {payload}) => {
            state.loading = false
            state.isSuccess = false
            state.message = payload
        },

        // ! *******************************
        [updateAppointment.pending]: (state) => {
            
        },
        [updateAppointment.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.appointments = JSON.parse(JSON.stringify(state.appointments))
            state.appointments = state.appointments.map(appointment => {
                if(appointment._id !== payload._id){
                    return appointment
                }
                return payload 
            })
            // console.log(state.appointments);
            // console.log(JSON.parse(JSON.stringify(state.appointments)));
            return state
        },
        [updateAppointment.rejected]: (state) => {
            state.loading = false
        },
    }
})

export const { chooseAppointment, validateAppointment, cancelAppointment, clearAppointments } = appointmentsSlice.actions
export default appointmentsSlice.reducer