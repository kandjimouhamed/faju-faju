import { Box, Grid } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Check, Trash } from 'tabler-icons-react'
import { useSelector } from 'react-redux';
import { convertDate, getTodayDate } from '../utils/functions/dates';
import { IconArrowMoveUp } from '@tabler/icons';

const Dashboard = () => {
    const allUnAvaiblities = useSelector(state => state.unavaiblities)
    const allAppointments = useSelector(state => state.appointments)
    const unAvaiblities = allUnAvaiblities?.data
    const appointments = allAppointments?.appointments
    const today = getTodayDate()
    const [performed, setPerformed] = useState([])
    const [canceled, setCanceled] = useState([])
    const [coming, setComing] = useState([])

    useEffect(() => {
        const performed = []
        const coming = []
        // !nbre de rdv confirmer
        appointments
            ?.filter(appointment => appointment.done === true)
            .forEach(appointment => {
                const unAvaiblity = unAvaiblities.find(avaiblity => avaiblity._id === appointment.unAvaiblityId)
                if (convertDate(unAvaiblity?.day) < today) {
                    performed.push(unAvaiblity)
                }
            })
        // !nbre de rdv annuler
        const canceled = appointments?.filter(appointment => appointment.isConfirmed === false)
        // !nbre de rdv a venir
        appointments
            ?.filter(appointment => appointment.userId !== null)
            .forEach(appointment => {
                const unAvaiblity = unAvaiblities.find(avaiblity => avaiblity._id === appointment.unAvaiblityId)
                if (convertDate(unAvaiblity?.day) > today) {
                    coming.push(unAvaiblity)
                }
            })
        setPerformed(performed)
        setComing(coming)
        setCanceled(canceled)
    }, [])

    return (
        <Grid>
            <Grid.Col sm={6} md={4}>
                <Box
                    sx={{
                        backgroundColor: '#BB1737',
                        color: 'white',
                        padding: '1rem 0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Check size={35} color="white" />
                    <div style={{ color: 'white', fontWeight: '600' }}>
                        <span style={{ color: 'white', display: 'inline-block', marginRight: '0.5rem' }}>{performed?.length}</span>
                        effectué(s)
                    </div>
                </Box>
            </Grid.Col>
            <Grid.Col sm={6} md={4}>
                <Box
                    sx={{
                        backgroundColor: '#9C0022',
                        color: 'white',
                        padding: '1rem 0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <IconArrowMoveUp size={35} color="white" />
                    <div style={{ color: 'white', fontWeight: '600' }}>
                        <span style={{ color: 'white', display: 'inline-block', marginRight: '0.5rem' }}>{coming?.length}</span>
                        à venir
                    </div>
                </Box>
            </Grid.Col>
            <Grid.Col sm={6} md={4}>
                <Box
                    sx={{
                        backgroundColor: '#7D000D',
                        color: 'white',
                        padding: '1rem 0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Trash size={35} color="white" />
                    <div style={{ color: 'white', fontWeight: '600' }}>
                        <span style={{ color: 'white', display: 'inline-block', marginRight: '0.5rem' }}>{canceled?.length}</span>
                        annulé(s)
                    </div>
                </Box>
            </Grid.Col>
        </Grid>
    )
}

export default Dashboard