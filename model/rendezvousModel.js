const mongoose = require("mongoose")

const rendezvousModel = mongoose.Schema({
    patientId : {
    
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : [true , 'Veuillez choisir un patient.']
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
  
    nomCompletPatient : {
        type : String,
        require : [true  , "Vieullez écrire le nom complet du patient."]
    },
   
    dateRendezvous : {
        type : Date , 
        require : [true , "Vieullez écrire la date de rendez vous."]
    },
    description: {
        type: String,
        require : [true , "Vieullez écrire la description de rendez vous."], 
    },
    dataPatient : {
        type : Object,
        // require : [true , 'Vieullez donner la description.']
    },
   
})

const RendezvousModel = mongoose.model("Rendezvous" , rendezvousModel)

module.exports = RendezvousModel