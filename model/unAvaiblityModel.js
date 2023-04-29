const mongoose = require('mongoose')

const UnAvaiblitySchema = new mongoose.Schema({
    day: {
        type: Date,
        required: [true, "Please choose a day"]
    },
    hours: {
        type: Object,
        required: [true, "Please choose avablity hours"]
    },
    dayStartAt:{
        type: String,
        required:[true, "Please give a started day(hour)"]
    },
    dayEndAt:{
        type: String,
        required:[true, "Please give an ended day(hour)"]
    },
    motif: {
        type: String
    },
    duration: {
        type: Number,
        required: [true, "Give appointment duration"]
    },
    breakBetweenAppoints:{
        type: Number,
        required: [true, "Give break duration between appointments"]
    }
})

const UnAvaiblityModel = mongoose.model("UnAvaiblity", UnAvaiblitySchema)
module.exports = UnAvaiblityModel