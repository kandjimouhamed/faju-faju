const mongoose = require('mongoose')

const appointmentModel = new mongoose.Schema({
    unAvaiblityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avaiblity",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [false, "Please give a user id"]
    },
    startedAt: {
        type: String,
        required: [true, "Please choose a starter hour"]
    },
    endedAt: {
        type: String,
        required: [true, "Please choose an ended hour"]
    },
    isConfirmed: {
        type: Boolean
    },
    isDuration: {
        type: Boolean
    },
    description: {
        type: String
    },
    done:{
        type: Boolean
    }
})

const AppointmentModel = mongoose.model("Appointment", appointmentModel)
module.exports = AppointmentModel