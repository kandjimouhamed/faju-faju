const AppointmentModel = require('../model/appointmentModel')
const nodemailer = require("nodemailer")
const UserModel = require('../model/UserModel')
const UnAvaiblityModel = require('../model/unAvaiblityModel')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const formatLocalDate = require('./utils/formatLocalDate')

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};


const getAppointments = async (req, res) => {
    const appointments = await AppointmentModel.find()

    res.json(appointments)
}

const addAppointment = async (req, res) => {
    const createdAppointment = await AppointmentModel.create({ ...req.body })
    res.json(createdAppointment)
}

const updateAppointment = async (req, res) => {
    const appointmentId = req.params.id
    const {isConfirmed, motif} = req.body
    const findAvaiblity = await AppointmentModel.findById(appointmentId)

    if (!findAvaiblity) {
        res.status(400).json({ message: "Not such an avaiblity" })
        return
    }

    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(appointmentId, { isConfirmed }, { new: true })

    const findDay = await UnAvaiblityModel.findById(updatedAppointment.unAvaiblityId)
   console.log(findDay.day);
    const findUser = await UserModel.findById(updatedAppointment.userId)

    const isTrue = updatedAppointment.isConfirmed
    // ! sending email
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "lka.dev02@gmail.com",
            pass: "iiptxfcbhguwddvv"
        }
    });

    // use a template file with nodemailer
    transport.use('compile', hbs(handlebarOptions))

    const mailOptions = {
        from: 'Gertion rendez-vous',
        to: findUser?.email,
        subject: 'Notification',
        template: 'email',
        context: {
            name: findUser.firstname, 
            day: formatLocalDate(findDay.day),
            interval: `${updatedAppointment.startedAt} - ${updatedAppointment.endedAt}`,
            status: isTrue ? "confirmé" : "annulé",
            motif: !isTrue ? motif : null 
        },
        attachments: [{
            filename: 'illustration-2.png',
            path: __dirname + '/images/illustration-2.png',
            cid: 'illustration'
        }]
    };

    transport.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });

    res.json(updatedAppointment)
}

const chooseAppointment = async(req, res) => {
    const appointmentId = req.params.id

    const result = await AppointmentModel.findByIdAndUpdate(appointmentId, {...req.body}, {new: true})

    res.json(result)
}



const deleteAppointment = async (req, res) => {
    const appointmentId = req.params.id
    const findAppointment = await AppointmentModel.findById(appointmentId)

    if (!findAppointment) {
        res.status(400).json({ message: "Avaiblity not found" })
        return
    }

    await AppointmentModel.findByIdAndDelete(appointmentId)
    res.json({ message: "Avaiblity deleted" })
}

module.exports = {
    addAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment,
    chooseAppointment
}