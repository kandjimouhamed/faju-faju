import { Grid, Loader } from '@mantine/core'
import React, { useEffect } from 'react'
import CardAvaiblity from './CardAvaiblity';
import { useDispatch, useSelector } from 'react-redux';

import useAppointments from '../hooks/useAppointments';
import { getAppointments } from '../redux/services/appointmentsServices';
import { getUnAvaiblities } from '../redux/services/unAvaiblitiesServices';
import { getUsers } from '../redux/services/usersServices';

const UserHome = () => {
    // const { data: avaiblities, loading } = useAvaiblities()
    const allAvaiblities = useSelector(state => state.avaiblities)
    const avaiblities = allAvaiblities.data
    const { data: appointments } = useAppointments();
    const dispatch = useDispatch()
    
    useEffect(() => {
        // get all avaiblities && appointments
        dispatch(getUnAvaiblities())
        dispatch(getAppointments())
        dispatch(getUsers())
    }, [])

    return (
        <div>
            <h1 style={{ marginBottom: '1rem' }}>Choisissez votre rendez-vous</h1>
            <Grid>
                {
                    !allAvaiblities.loading ? avaiblities?.map(avaiblity => (
                        <CardAvaiblity key={avaiblity._id} {...avaiblity} />
                    )) : <Loader sx={{ marginLeft: '1rem', marginTop: '2rem' }} variant="dots" />
                }
            </Grid>
        </div>
    )
}

export default UserHome