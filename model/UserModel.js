const mongoose = require('mongoose')
const Schema = mongoose.Schema
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new Schema({
    googleId: {
        type: String
    },
    firstname:{
        type: String,
        required: [true, "Please give the firstname"]
    },
    lastname:{
        type: String,
        required: [true, "Please give the lastname"]
    },
    phone:{
        type: String,
        required: [true, "Please give the phone"],
        unique: true,
    },
    email:{
        type: String,
        // required: [true, "Please give the email"],
        unique: true,
    },
    password:{
        type: String,
        required: [false, "Please give the password"]
    },
    role: {
        type: String,
        required: [true, "Please give a role to the user"]
    },
    idMedecin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})

userSchema.plugin(findOrCreate);

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel