const BusyModel = require('../model/busyTimeModel')
const UserModel = require('../model/UserModel')
const isValidTime = require('./utils/regexTime')

const editBusyTimes = async (req, res) => {
    const id = req.params.id
    const {workStartAt, workEndAt, appointmentDuration, breakTime} = req.body
    
    if(!workStartAt || !workEndAt){
        res.status(400).json({message: "Veuillez fournir des heures"})
    }
    if(!isValidTime(workStartAt) || !isValidTime(workEndAt)){
        res.status(400).json({message: "Veuillez fournir des heures avec un format HH:MM"})
        return
    }
    if(workStartAt >= workEndAt){
        res.status(400).json({message: "L'heure de début ne peut pas plus grande que l'heure de fin"})
        return
    }
    if(!Number(appointmentDuration) || !Number(breakTime)){
        res.status(400).json({message: "Veullez donner des minutes"})
        return
    }
    if(Number(appointmentDuration) > 60 || Number(appointmentDuration) < 0){
        res.status(400).json({message: "Veuillez donner des minutes entre 0 et 60"})
        return
    }
    if(Number(breakTime) > 60 || Number(breakTime) < 0){
        res.status(400).json({message: "Veuillez donner des minutes entre 0 et 60"})
        return
    }

    // !check if user exist
    const verifyUser = await UserModel.findById(id)

    if(!verifyUser){
        res.status(404).json({message: "Utilisateur introuvable"})
        return
    }

    const findBusyTimes = await BusyModel.findOne({"userId": id})
    
    if(!findBusyTimes){
        const result = await BusyModel.create({
            userId: id,
            workStartAt,
            workEndAt,
            appointmentDuration,
            breakTime
        })

        res.json(result)
        return
    }

    const updated = await BusyModel.findByIdAndUpdate(findBusyTimes._id, {...req.body}, {new: true})
    
    res.json(updated)
}

const getBusyTimes= async (req, res) => {
    const times = await BusyModel.find()
    res.json(times)
}

const getOneBusyTimes = async (req, res) => {
    const id = req.params.id

    const findBusyTime = await BusyModel.findOne({"userId": id})
    if(!findBusyTime){
        res.status(404).json({message: "Données introuvables"})
        return
    }

    res.json(findBusyTime)
}

module.exports = {
    editBusyTimes,
    getBusyTimes,
    getOneBusyTimes
}