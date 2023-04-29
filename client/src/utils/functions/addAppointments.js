function addAppointments(timeStart, timeEnd, APPOINTMENT_DURATION, BREAK) {
    // !recuperer les heures et les minutes separement
    const [startHours, startMinutes] = timeStart.split(':')
    const [endHours, endMinutes] = timeEnd.split(':')
    // !obtenir le nombre total de minute
    const totalStartMinuties = Number(startHours) * 60 + Number(startMinutes)
    const totalEndMinuties = Number(endHours) * 60 + Number(endMinutes)

    // !il determine la prochaine heure de fin du rendez-vous
    let appointmentInterval = totalStartMinuties

    let startedAt = timeStart

    const appointmentHours = []
    while (appointmentInterval < totalEndMinuties) {
        appointmentInterval += APPOINTMENT_DURATION
        // !l'heure de fin d'un rendez-vous en heure et minute
        const appointmentHour = Math.floor(appointmentInterval / 60)
        const appointmentMinutes = appointmentInterval % 60
        const endedAt = appointmentHour + ':' + appointmentMinutes

        appointmentHours.push({
            userId: null,
            startedAt,
            endedAt,
            description: '',
            isDuration: true,
            isConfirmed: null
        })
        // !il nous permet de savoir a quelle heure le prochaine rendez-vous aura lieu
        if ((totalEndMinuties - appointmentInterval) < APPOINTMENT_DURATION) {
            const remainingMinutes = totalEndMinuties - appointmentInterval
            // !on recalcule la prochaine heure du debut du rendez-vous
            const naxtAppointmentHour = Math.floor(appointmentInterval / 60)
            const nextAppointmentMinutes = appointmentInterval % 60
            startedAt = naxtAppointmentHour + ':' + nextAppointmentMinutes

            // appointmentHours.push({
            //     userId: null,
            //     startedAt, 
            //     endedAt: timeEnd,
            //     description: '',
            //     isDuration: false,
            //     isConfirmed: null
            // })

            return appointmentHours
        }
        appointmentInterval += BREAK
        // !on recalcule la prochaine heure du debut du rendez-vous
        const naxtAppointmentHour = Math.floor(appointmentInterval / 60)
        const nextAppointmentMinutes = appointmentInterval % 60

        startedAt = naxtAppointmentHour + ':' + nextAppointmentMinutes
    }
}

export default addAppointments