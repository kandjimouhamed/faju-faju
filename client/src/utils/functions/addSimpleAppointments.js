function addSimpleAppointments(timeStart, timeEnd, WORKSTARTAT, WORKENDAT, APPOINTMENT_DURATION, BREAK) {
    // !recuperer les heures et les minutes separement
    const [timeStartHour, timeStartMinutes] = timeStart.split(':')
    const [timeEndHour, timeEndMinutes] = timeEnd.split(':')
    const [workStartHour, workStartMinutes] = WORKSTARTAT.split(':')
    const [workEndHour, workEndMinutes] = WORKENDAT.split(':')
    // !obtenir le nombre total de minute
    const totalStartMinuties = Number(timeStartHour) * 60 + Number(timeStartMinutes)
    let totalEndMinuties = Number(timeEndHour) * 60 + Number(timeEndMinutes)
    let totalWorkStartMinutes = Number(workStartHour) * 60 + Number(workStartMinutes)
    const totalWorkEndMinutes = Number(workEndHour) * 60 + Number(workEndMinutes)

    // console.log(totalStartMinuties, totalEndMinuties, totalWorkStartMinutes, totalWorkEndMinutes, APPOINTMENT_DURATION, BREAK);

    // console.log(totalStartMinuties - totalWorkStartMinutes);
    // console.log(totalWorkEndMinutes - totalEndMinuties);

    // !l'heure de fin du rendez-vous
    // const timeEndAppointment = totalWorkStartMinutes + APPOINTMENT_DURATION
    const appointmentHours = []
    let startedAt = WORKSTARTAT

    // !rendez-vous avant l'heure d'indispo
    while ((totalStartMinuties - totalWorkStartMinutes) >= APPOINTMENT_DURATION) {

        totalWorkStartMinutes += APPOINTMENT_DURATION
        // !l'heure de fin d'un rendez-vous en heure et minute
        const appointmentEndHour = Math.floor(totalWorkStartMinutes / 60)
        const appointmentEndMinutes = totalWorkStartMinutes % 60
        const timeEnd = appointmentEndMinutes <= 9 ? `0${appointmentEndMinutes}` : appointmentEndMinutes
        const endedAt = appointmentEndHour + ':' + timeEnd
        appointmentHours.push({
            userId: null,
            startedAt,
            endedAt,
            description: '',
            isDuration: true,
            isConfirmed: null,
            done: false
        })

        totalWorkStartMinutes += BREAK
        const nextStartHour = Math.floor(totalWorkStartMinutes / 60)
        const nextStartMinutes = totalWorkStartMinutes % 60
        const nextTime = nextStartMinutes <= 9 ? `0${nextStartMinutes}` : nextStartMinutes
        startedAt = nextStartHour + ':' + nextTime
    }

    const afterEndHour = totalEndMinuties + BREAK
    startedAt = Math.floor(afterEndHour / 60) + ':' + afterEndHour % 60
    totalEndMinuties += BREAK
    // !rendez-vous apres l'heure d'indispo
    while ((totalWorkEndMinutes - totalEndMinuties) >= APPOINTMENT_DURATION) {
        totalEndMinuties += APPOINTMENT_DURATION
        const appointmentEndHour = Math.floor(totalEndMinuties / 60)
        const appointmentEndMinutes = totalEndMinuties % 60
        const timeEnd = appointmentEndMinutes <= 9 ? `0${appointmentEndMinutes}` : appointmentEndMinutes
        const endedAt = appointmentEndHour + ':' + timeEnd
        appointmentHours.push({
            userId: null,
            startedAt,
            endedAt,
            description: '',
            isDuration: true,
            isConfirmed: null,
            done: false
        })

        totalEndMinuties += BREAK
        const nextStartHour = Math.floor(totalEndMinuties / 60)
        const nextStartMinutes = totalEndMinuties % 60
        const startTIme = nextStartMinutes <= 9 ? `0${nextStartMinutes}` : nextStartMinutes
        startedAt = nextStartHour + ':' + startTIme
    }

    return appointmentHours
}

export default addSimpleAppointments