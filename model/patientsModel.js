const mongoose = require("mongoose")

const patientsModel = mongoose.Schema({
    CIN : {
        type : Number,
        require : [true , "Vieullez écrire le numéro de carte d'entité du patient ."],
        unique : true

    },
    nomPatient : {
        type : String,
        minlength : 3,
        maxlength : 200,
        require : [true  , "Vieullez écrire le nom du patient."]
    },
    prenomPatient : {
        type : String,
        minlength : 3,
        maxlength : 200,
        require : [true  , "Vieullez écrire le prénom du patient."]
    },
    dateNaissance : {
        type : Date , 
        require : [true , "Vieullez écrire la date de naissance du patient."]
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    telephone: {
        type: String,
        required: [true , 'Vieullez le écrire le numéro de téléphone du patient.'],
        unique: true,
        // match: [/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Please enter a valid phone number'],
    },
    adress : {
        type : String ,
        require : [true , "Vieullez écrire l'addresse du patient."] ,
        minlength : 3,
        maxlength : 200
    },
    email: {
        type: String,
        required: false,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
      },
})

const PatientModel = mongoose.model("Patient" , patientsModel)

module.exports = PatientModel