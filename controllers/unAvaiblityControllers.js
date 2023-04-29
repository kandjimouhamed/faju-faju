const UnAvaiblityModel = require("../model/unAvaiblityModel");
const isValidTime = require('./utils/regexTime')
const AppointmentModel = require("../model/appointmentModel");

const addAvaiblity = async (req, res) => {
    const { day, time, motif, duration, breakBetweenAppoints } = req.body;

    if (!day || !time) {
        res
        .status(400)
        .json({ message: "Veuillez renseigner le jour les heures et la durée" });
        return;
    }
    if(!isValidTime(time.timeStart) || !isValidTime(time.timeEnd)){
        res.status(400).json({message: "Veuillez fournir une heure au format HH:MM"})
        return
    }
    if(!Number(duration)){
        res.status(400).json({message: "Fournissez la durée des rendez-vous en min"})
        return
    }
    if(Number(duration) > 60){
        res.status(400).json({message: "Veuillez fournir une durée inférieur ou égale a 60min"})
        return
    }
    if(!Number(breakBetweenAppoints)){
        res.status(400).json({message: "Fournissez une durée de pause en min"})
        return
    }
    if(Number(breakBetweenAppoints) > 60){
        res.status(400).json({message: "Veuillez fournir une durée inférieur ou égale a 60min"})
        return
    }

    const findDay = await UnAvaiblityModel.findOne({ day });
    if (findDay) {
        const addHours = findDay.hours;
        const isValid = {
            isStart: false,
            isEnd: false,
            isInterval: false
        };

        findDay.hours.forEach(hour => {
            if (hour.timeStart <= time.timeStart && time.timeStart <= hour.timeEnd) {
                isValid.isStart = true;
                return
            } else if (
                hour.timeStart <= time.timeEnd &&
                time.timeEnd <= hour.timeEnd
            ) {
                isValid.isEnd = true;
                return
            } else if (
                time.timeStart <= hour.timeStart &&
                time.timeEnd >= hour.timeEnd
            ) {
                isValid.isInterval = true;
                return
            }
        });

        if (isValid.isStart) {
            res.status(400).json({
                isStart: true,
                isEnd: false,
                isInterval: false,
                message: "L'heure de début pour cette indisponibilité est déjà prise"
            });
            return;
        } else if (isValid.isEnd) {
            res.status(400).json({
                isStart: false,
                isEnd: true,
                isInterval: false,
                message: "L'heure de fin pour cette indisponibilité est déjà prise"
            });
            return;
        } else if (isValid.isInterval) {
            res.status(400).json({
                isStart: false,
                isEnd: false,
                isInterval: true,
                message:
                    "Cette indisponibilité ne peut pas englober une autre indisponibilité"
            });
            return;
        }

        // let's find find all appointments based on this unAvaiblityId
        const appointments = await AppointmentModel.find({
            unAvaiblityId: findDay._id
        });
        const invalidAppointments = []
        const possiblities = {
            startedIsBetween: false,
            endedIsBetween: false,
            isEnglobed: false
        };
        appointments.forEach(appointment => {
            if (
                time.timeStart <= appointment.startedAt &&
                appointment.startedAt <= time.timeEnd
            ) {
                if (appointment.isConfirmed === null || appointment.isConfirmed === true) {
                    invalidAppointments.push(appointment)
                    possiblities.startedIsBetween = true;
                    return;
                }
            }
            if (
                time.timeStart <= appointment.endedAt &&
                appointment.endedAt <= time.timeEnd
            ) {
                if (appointment.isConfirmed === null || appointment.isConfirmed === true) {
                    invalidAppointments.push(appointment)
                    possiblities.endedIsBetween = true;
                    return;
                }
            }
            if (
                appointment.startedAt <= time.timeStart &&
                appointment.startedAt <= time.timeEnd &&
                appointment.endedAt >= time.timeStart &&
                appointment.endedAt >= time.timeEnd
            ) {
                if (appointment.isConfirmed === null || appointment.isConfirmed === true) {
                    invalidAppointments.push(appointment)
                    possiblities.isEnglobed = true;
                    return;
                }
            }
        });
        
        // !check if there is an error
        if (possiblities.startedIsBetween) {
            res.status(400).json({ message: `Veuillez d'abord annulé ces rendez-vous`, data: invalidAppointments })
            return
        }
        if (possiblities.endedIsBetween) {
            res.status(400).json({ message: `Veuillez d'abord annulé ces rendez-vous`, data: invalidAppointments })
            return
        }
        if (possiblities.isEnglobed) {
            res.status(400).json({ message: `Veuillez d'abord annulé ces rendez-vous`, data: invalidAppointments })
            return
        }

        // !add time to unAvaiblities
        addHours.push(time);
        const result = await UnAvaiblityModel.findByIdAndUpdate(findDay._id, {
            hours: addHours
        });
        res.json(result);
        return;
    }

    // !day not found **********************************************************************************
    const { dayStartAt, dayEndAt } = req.body;
    if (!dayStartAt || !dayEndAt) {
        res
        .status(400)
        .json({ message: "Veuillez fournir l'heure de début et de fin de votre journée" });
        return;
    }
    if(!isValidTime(dayStartAt) || !isValidTime(dayStartAt)){
        res.status(400).json({message: "Veuillez fournir une heure au format HH:MM"})
        return
    }
    const createdAvaiblity = await UnAvaiblityModel.create({
        day,
        hours: [time],
        motif,
        duration,
        breakBetweenAppoints: Number(breakBetweenAppoints),
        dayStartAt,
        dayEndAt
    });
    // ! create appointments*******************************************
    // !recuperer les heures et les minutes separement
    const [timeStartHour, timeStartMinutes] = time.timeStart.split(":");
    const [timeEndHour, timeEndMinutes] = time.timeEnd.split(":");
    const [workStartHour, workStartMinutes] = dayStartAt.split(":");
    const [workEndHour, workEndMinutes] = dayEndAt.split(":");
    // !obtenir le nombre total de minute
    const totalStartMinuties =
        Number(timeStartHour) * 60 + Number(timeStartMinutes);
    let totalEndMinuties = Number(timeEndHour) * 60 + Number(timeEndMinutes);
    let totalWorkStartMinutes =
        Number(workStartHour) * 60 + Number(workStartMinutes);
    const totalWorkEndMinutes = Number(workEndHour) * 60 + Number(workEndMinutes);
    // !l'heure de fin du rendez-vous
    // const timeEndAppointment = totalWorkStartMinutes + APPOINTMENT_DURATION
    const appointmentHours = [];
    let startedAt = dayStartAt;
    const APPOINTMENT_DURATION = Number(duration);
    const BREAK = Number(breakBetweenAppoints);
    // !rendez-vous avant l'heure d'indispo
    while (totalStartMinuties - totalWorkStartMinutes >= APPOINTMENT_DURATION) {
        totalWorkStartMinutes += APPOINTMENT_DURATION;
        // !l'heure de fin d'un rendez-vous en heure et minute
        const appointmentEndHour = Math.floor(totalWorkStartMinutes / 60);
        const appointmentEndMinutes = totalWorkStartMinutes % 60;
        const timeEnd = appointmentEndMinutes <= 9 ? `0${appointmentEndMinutes}` : appointmentEndMinutes;
        const endedAt = appointmentEndHour <= 9 ? `0${appointmentEndHour}:${timeEnd}` : appointmentEndHour + ":" + timeEnd;
        appointmentHours.push({
            unAvaiblityId: createdAvaiblity._id,
            userId: null,
            startedAt,
            endedAt,
            description: "",
            isConfirmed: null,
            done: false
        });

        totalWorkStartMinutes += BREAK;
        const nextStartHour = Math.floor(totalWorkStartMinutes / 60);
        const nextStartMinutes = totalWorkStartMinutes % 60;
        const nextTime = nextStartMinutes <= 9 ? `0${nextStartMinutes}` : nextStartMinutes;
        startedAt = nextStartHour + ":" + nextTime;
    }

    const afterEndHour = totalEndMinuties + BREAK;
    const afterEndHourMinutes = afterEndHour % 60
    const normalAfterEndHourMinutes = afterEndHourMinutes <= 9 ? `0${afterEndHourMinutes}` : afterEndHourMinutes
    startedAt = Math.floor(afterEndHour / 60) + ":" + normalAfterEndHourMinutes;
    totalEndMinuties += BREAK;
    // !rendez-vous apres l'heure d'indispo
    
    while (totalWorkEndMinutes - totalEndMinuties >= APPOINTMENT_DURATION) {
        totalEndMinuties += APPOINTMENT_DURATION;
        const appointmentEndHour = Math.floor(totalEndMinuties / 60);
        const appointmentEndMinutes = totalEndMinuties % 60;
        const timeEnd = appointmentEndMinutes <= 9 ? `0${appointmentEndMinutes}` : appointmentEndMinutes;;
        const endedAt =
            appointmentEndHour <= 9
                ? `0${appointmentEndHour}:${timeEnd}`
                : appointmentEndHour + ":" + timeEnd;
        appointmentHours.push({
            unAvaiblityId: createdAvaiblity._id,
            userId: null,
            startedAt,
            endedAt,
            description: "",
            isConfirmed: null,
            done: false
        });

        totalEndMinuties += BREAK;
        const nextStartHour = Math.floor(totalEndMinuties / 60);
        const nextStartMinutes = totalEndMinuties % 60;
        const startTIme = nextStartMinutes <= 9 ? `0${nextStartMinutes}` : nextStartMinutes;
        startedAt = nextStartHour + ":" + startTIme;
    }
    appointmentHours.forEach(async appointment => {
        await AppointmentModel.create(appointment);
    });
    res.json(createdAvaiblity);
};























const getAvaiblities = async (req, res) => {
    const avaiblities = await UnAvaiblityModel.find();
    res.json(avaiblities);
};

const updateAvaiblity = async (req, res) => {
    const avaiblityId = req.params.id;
    const findAvaiblity = await UnAvaiblityModel.findById(avaiblityId);

    if (!findAvaiblity) {
        res.status(400).json({ message: "Not such an avaiblity" });
        return;
    }

    const updatedAvaiblity = await UnAvaiblityModel.findByIdAndUpdate(
        avaiblityId,
        { ...req.body },
        { new: true }
    );
    res.json(updatedAvaiblity);
};

const deleteAvaiblity = async (req, res) => {
    const avaiblityId = req.params.id;
    const findAvaiblity = await UnAvaiblityModel.findById(avaiblityId);

    if (!findAvaiblity) {
        res.status(400).json({ message: "Avaiblity not found" });
        return;
    }

    await UnAvaiblityModel.findByIdAndDelete(avaiblityId);
    res.json({ message: "Avaiblity deleted" });
};

module.exports = {
    addAvaiblity,
    getAvaiblities,
    updateAvaiblity,
    deleteAvaiblity
};
