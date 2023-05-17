const mongoose = require('mongoose')

const prescriptionModel = new mongoose.Schema({
    patientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : [true , 'Veuillez choisir un patient.']
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    description : {
        type : String,
        require : [true , 'Vieullez donner la description.']
    },
    dataPatient : {
        type : Object,
        // require : [true , 'Vieullez donner la description.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const PrescriptionModel = mongoose.model('Prescription' , prescriptionModel)
module.exports = PrescriptionModel