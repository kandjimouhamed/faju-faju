import React, { useEffect, useState } from 'react'
import { Modal, Grid, TextInput, Loader, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { btnStyle } from '../utils/linkStyle';
import { convertDate, getTodayDate } from '../utils/functions/dates';
import successMsg from '../utils/functions/successMsg';
import { useDispatch, useSelector } from 'react-redux';
import { addUnAvaiblity, getUnAvaiblities } from '../redux/services/unAvaiblitiesServices';
import addSimpleAppointments from '../utils/functions/addSimpleAppointments';
import { getAppointments } from '../redux/services/appointmentsServices';
import { DatePicker } from '@mantine/dates';
import { IconAlertCircle } from '@tabler/icons';
import { getOneBusyTimes } from '../redux/services/busyTimesServices';


const AddAvaiblityModal = ({ opened, setOpened }) => {
    const currentUser = useSelector(state => state.user)
    const busyTimes = useSelector(state => state.busyTimes)
    const busyTime = busyTimes?.currentBusyTIme
    const WORKSTARTAT = busyTime?.workStartAt
    const WORKENDAT = busyTime?.workEndAt
    const APPOINTMENT_DURATION = Number(busyTime?.appointmentDuration)
    const BREAK = Number(busyTime?.breakTime)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const unAllAvaiblities = useSelector(state => state.unavaiblities)
    const unAvaiblities = unAllAvaiblities.data
    const [actualDate, setActualDate] = useState({})
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const form = useForm({
        initialValues: { date: '', timeStart: '', timeEnd: '', motif: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            date: (value) => (value === '' ? 'Choisissez une date' : null),
            timeStart: (value) => (value === '' ? "Veuillez choisir l'heure de début " : null),
            timeEnd: (value) => (value === '' ? "Veuillez choisir l'heure de fin" : null),
        },
    });
    useEffect(() => {
        // get all avaiblities && appointments % && users
        dispatch(getAppointments());
        dispatch(getUnAvaiblities());
        dispatch(getOneBusyTimes(currentUser._id))
    }, []);

    useEffect(() => {
        const data = unAvaiblities.find(unAvaiblity => convertDate(unAvaiblity.day) === form.values.date)
        if (data) {
            setActualDate(data)
        }
        else {
            setActualDate('')
        }
    }, [form.values.date, form.values.duration, unAvaiblities])

    const handleSubmit = form.onSubmit(async (values) => {
        const { date: selectedDate, timeStart, timeEnd, motif } = values
        setError(false)
        setMessage('')
        const today = getTodayDate()
        if (convertDate(selectedDate) < today) {
            form.setErrors({
                date: "Vous ne pouvez pas choisir une date inférieure à celle d'aujourd'hui"
            }
            )
            return
        }
        if (timeStart > timeEnd) {
            form.setErrors({
                timeStart: "Veuillez choisir une heure inférieure à l'heure de fin",
                timeEnd: "Veuillez choisir une heure supériere à l'heure de début"
            }
            )
            return
        }
        if (timeStart === timeEnd) {
            form.setErrors({
                timeStart: "Veuillez choisir des heures différentes",
                timeEnd: "Veuillez choisir des heures différentes"
            }
            )
            return
        }

        if (timeStart < WORKSTARTAT) {
            console.log(timeStart, WORKSTARTAT);
            form.setErrors({
                timeStart: "Votre journée commence à partir de 8h",
            }
            )
            return
        }

        if (timeEnd > WORKENDAT) {
            form.setErrors({
                timeEnd: "Votre journée se termine à 18h",
            }
            )
            return
        }

        if (actualDate) {
            form.setErrors({
                date: "Indisponibilité déjà ajoutée pour cette date"
            }
            )
            return
        }

        const unAvaiblity = {
            day: selectedDate,
            time: { timeStart, timeEnd },
            dayStartAt: WORKSTARTAT,
            dayEndAt: WORKENDAT,
            motif,
            duration: APPOINTMENT_DURATION,
            breakBetweenAppoints: BREAK
        }

        // const BREAK = Number(breakAppointment)
        const appointmentHours = addSimpleAppointments(timeStart, timeEnd, WORKSTARTAT, WORKENDAT, APPOINTMENT_DURATION, BREAK)

        setLoading(true)
        let unAvaiblityId

        dispatch(addUnAvaiblity(unAvaiblity))
            .then(res => {
                
                if (res.type === "unavaiblities/addUnAvaiblity/rejected") {
                    setError(true)
                    if(res.payload.data){
                        const result = res.payload.data.map(data => {
                            return `${data.startedAt} - ${data.endedAt}`
                        })
                        
                        setMessage(`Annuler ces heures de rendez-vous pour cette journée : ${result.join(', ')}`)
                        setLoading(false)
                        return
                    }
                    setMessage(res.payload.message)
                    setLoading(false)
                }
                if (res.type === "unavaiblities/addUnAvaiblity/fulfilled") {
                    setError(false)
                    successMsg("Indisponibilité ajoutée")
                    setOpened(false)
                    form.reset()
                }
            })

            setLoading(true)

    })

    return (
        <div>
            <Modal
                radius="lg"
                overlayOpacity={0.43}
                overlayBlur={2}
                opened={opened}
                onClose={() => setOpened(false)}
                title="Ajouter une indisponibilité"
            >
                <form onSubmit={handleSubmit}>
                    <span className='modal-span'>Date</span>
                    <Grid>
                        <Grid.Col>
                            <DatePicker placeholder='Date' {...form.getInputProps('date')} />
                            {/* <DatePicker placeholder='Date' {...form.getInputProps('date')} excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6} /> */}
                        </Grid.Col>
                    </Grid>
                    <span className='modal-span'>Plage horaire</span>
                    <Grid justify="center">
                        <Grid.Col span={6}>
                            <TextInput type="time" {...form.getInputProps('timeStart')} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput type="time" {...form.getInputProps('timeEnd')} />
                        </Grid.Col>
                    </Grid>

                    {
                        error && <Alert icon={<IconAlertCircle size={16} />} title="Error!" color="red" mt="sm">
                        {
                            message
                        }
                      </Alert>
                    }
                    <button disabled={loading} style={{ ...btnStyle, width: '100%', padding: '0.8rem' }} type="submit">
                        {
                            !loading ? "Ajouter" : <Loader color="white" variant="dots" />
                        }
                    </button>
                </form>
            </Modal>
        </div>
    )
}

export default AddAvaiblityModal