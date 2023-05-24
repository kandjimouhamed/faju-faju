function determineAppointments(actualDate, timeStart, timeEnd, appointmentDuration, WORKSTARTAT, WORKENDAT) {

    const APPOINTMENT_DURATION = Number(appointmentDuration)
    // !recuperer les heures et les minutes separement
    const [timeStartHour, timeStartMinutes] = timeStart.split(':')
    const [timeEndHour, timeEndMinutes] = timeEnd.split(':')
    const [workStartHour, workStartMinutes] = WORKSTARTAT.split(':')
    const [workEndHour, workEndMinutes] = WORKENDAT.split(':')
    // !obtenir le nombre total de minute
    const totalStartMinuties = Number(timeStartHour) * 60 + Number(timeStartMinutes)
    const totalEndMinuties = Number(timeEndHour) * 60 + Number(timeEndMinutes)
    let totalWorkStartMinutes = Number(workStartHour) * 60 + Number(workStartMinutes)
    const totalWorkEndMinutes = Number(workEndHour) * 60 + Number(workEndMinutes)

    console.log(totalStartMinuties, totalEndMinuties, totalWorkStartMinutes, totalWorkEndMinutes, APPOINTMENT_DURATION);

    // console.log(totalStartMinuties - totalWorkStartMinutes);
    // console.log(totalWorkEndMinutes - totalEndMinuties);

    // !l'heure de fin du rendez-vous
    // const timeEndAppointment = totalWorkStartMinutes + APPOINTMENT_DURATION
    const appointmentHours = []
    const times = []
    let startedAt = WORKSTARTAT
    while((totalStartMinuties - totalWorkStartMinutes) >= APPOINTMENT_DURATION){
        
        totalWorkStartMinutes += APPOINTMENT_DURATION
        // !l'heure de fin d'un rendez-vous en heure et minute
        const appointmentEndHour = Math.floor(totalWorkStartMinutes / 60)
        const appointmentEndMinutes = totalWorkStartMinutes % 60
        const endedAt = appointmentEndHour + ':' + appointmentEndMinutes
        appointmentHours.push({
            userId: null,
            startedAt,
            endedAt,
            description: '',
            isDuration: true,
            isConfirmed: null
        })

        // const nextStartHour = Math.floor(totalWorkStartMinutes / 60)
        // const nextStartMinutes = totalWorkStartMinutes % 60
        startedAt = endedAt
        // times.push(endedAt)
        console.log(appointmentHours);
    }
    if((totalWorkEndMinutes - totalEndMinuties) >= APPOINTMENT_DURATION){
        console.log('appoint 2');
    }

    // !il determine la prochaine heure de fin du rendez-vous
    // let appointmentInterval = totalStartMinuties

    // let startedAt = timeStart

    // const appointmentHours = []
    // while (appointmentInterval < totalEndMinuties) {
    //     appointmentInterval += APPOINTMENT_DURATION
        // !l'heure de fin d'un rendez-vous en heure et minute
        // const appointmentHour = Math.floor(appointmentInterval / 60)
        // const appointmentMinutes = appointmentInterval % 60
        // const endedAt = appointmentHour + ':' + appointmentMinutes

        // appointmentHours.push({
        //     userId: null,
        //     startedAt,
        //     endedAt,
        //     description: '',
        //     isDuration: true,
        //     isConfirmed: null
        // })
        // !il nous permet de savoir a quelle heure le prochaine rendez-vous aura lieu
        // if ((totalEndMinuties - appointmentInterval) < APPOINTMENT_DURATION) {
        //     const remainingMinutes = totalEndMinuties - appointmentInterval
            // !on recalcule la prochaine heure du debut du rendez-vous
            // const naxtAppointmentHour = Math.floor(appointmentInterval / 60)
            // const nextAppointmentMinutes = appointmentInterval % 60
            // startedAt = naxtAppointmentHour + ':' + nextAppointmentMinutes

            // appointmentHours.push({
            //     userId: null,
            //     startedAt, 
            //     endedAt: timeEnd,
            //     description: '',
            //     isDuration: false,
            //     isConfirmed: null
            // })

        //     return appointmentHours
        // }
        // appointmentInterval += BREAK
        // // !on recalcule la prochaine heure du debut du rendez-vous
        // const naxtAppointmentHour = Math.floor(appointmentInterval / 60)
        // const nextAppointmentMinutes = appointmentInterval % 60

        // startedAt = naxtAppointmentHour + ':' + nextAppointmentMinutes
    // }
}

export default determineAppointments