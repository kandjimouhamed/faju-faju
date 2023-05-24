const mongoose = require('mongoose')
const Schema = mongoose.Schema

const busySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    workStartAt:{
        type: String,
        required: [true, "Donner l'heure de début de la journée de travail"]
    },
    workEndAt:{
        type: String,
        required: [true, "Donner l'heure de fin de la journée de travail"]
    },
    appointmentDuration:{
        type: Number,
        required: [true, "Donner la durée des rendez-vous"]
    },
    breakTime:{
        type: String,
        required: [true, "Donner la durée des pauses"]
    }
})

const BusyModel = mongoose.model('BusyTime', busySchema)
module.exports = BusyModel