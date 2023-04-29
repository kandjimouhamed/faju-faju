import { Avatar, Badge, Button, Drawer } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { convertDate, getTodayDate } from '../utils/functions/dates'
import { btnStyle } from '../utils/linkStyle'
import DrawerDetail from './DrawerDetail'
import { useDispatch } from 'react-redux';
import { cancelAppointment } from '../redux/slices/appointmentsSlice'
import instance from '../axios/globalInstance'
import successMsg from '../utils/functions/successMsg'
import localFrFormat from '../utils/functions/localFrFormat'

const DetailsAppointment = ({ opened, setOpened, firstname, lastname, appointmentId }) => {
    const allAppointments = useSelector(state => state.appointments)
    const allavaiblities = useSelector(state => state.unavaiblities)
    const appointment = allAppointments.appointments.find(appointment => appointment._id === appointmentId)
    const unAvaiblityId = appointment.unAvaiblityId
    const unAvaiblity = allavaiblities.data.find(aviblity => aviblity._id === unAvaiblityId)
    const dispatch = useDispatch()
    const today = getTodayDate()

    const cancel = async (id) => {
        // update dans redux
        dispatch(cancelAppointment(id))
        // creer un thunk pour Appointment et ChooseAppointment
        await instance.put(`/appointments/${id}`, { isConfirmed: false })
        successMsg("Rendez-vous annulé")
        setOpened(false)
    }

    return (
        <Drawer
            position="right"
            opened={opened}
            onClose={() => setOpened(false)}
            title="Détails du rendez-vous"
            padding="xl"
            size="xl"
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid gray',
                paddingBottom: '0.5rem'
            }
            } className="avatar--profil">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar mr='sm' src={null} />
                    <span>
                        <Badge>
                            {
                                firstname
                            }
                        </Badge>
                    </span>
                </div>
                {/* {
                    unAvaiblity?.day >= today && appointment.isConfirmed && <button onClick={() => cancel(appointment._id)} style={{ ...btnStyle, margin: '0' }} type="">Annuler</button>
                } */}
            </div>
            <div className='drawer-details'>
                <DrawerDetail
                    color=""
                    title="Date"
                    badge={localFrFormat(unAvaiblity?.day)}
                />
                <DrawerDetail
                    color=""
                    title="Heure"
                    badge={appointment.startedAt + ' - ' + appointment.endedAt}
                />
                <DrawerDetail
                    color=""
                    title="Durée"
                    badge={Number(unAvaiblity.duration) === 60 ? '1 h' : `${unAvaiblity.duration} '`} 
                />
                <DrawerDetail
                    color=""
                    title="Description" badge={appointment.description}
                />
                <DrawerDetail
                    color={appointment.isConfirmed ? "green" : 'pink'}
                    title="Status"
                    badge={appointment.isConfirmed !== null ? appointment.isConfirmed ? "Confirmé" : "Annulé" : 'En attente'}
                />
            </div>
        </Drawer>
    )
}

export default DetailsAppointment