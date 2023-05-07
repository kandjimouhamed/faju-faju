const mongoose = require('mongoose')
const Schema = mongoose.Schema
const findOrCreate = require('mongoose-findorcreate')

const arrangementShema = new Schema ({
    drugName : {
        type : String,
        require : [true , "Viellez donner le nom du médicament."],
        minlength : 3,
        maxlength : 200
    },
    hours : {
        type : Object ,
        require : [true , "Viellez donner l'heure pour prendre le médicament."]
    },
    dayStart : {
        type : Date ,
        require : [true , "Viellez donner la date pour commencer ce médicament."]
    },
    numberDay : {
        type : Number ,
        true : [true , 'Viellez donner nombre de jour pour ce medicament.']
    }
})

arrangementShema.plugin(findOrCreate)

const arrangementModel = mongoose.model('Arrangement', arrangementShema)
module.exports = arrangementModel;