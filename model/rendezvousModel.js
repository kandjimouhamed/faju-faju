const mongoose = require("mongoose")

const rendezvousModel = mongoose.Schema({
  
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
   
})

const RendezvousModel = mongoose.model("Rendezvous" , rendezvousModel)

module.exports = RendezvousModel