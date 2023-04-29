const express = require('express');
const { addAppointment, deleteAppointment, getAppointments, updateAppointment, chooseAppointment } = require('../controllers/appointmentsControllers')
const router = express.Router()

router.get('/', getAppointments)
router.post('/', addAppointment)
router.put('/:id', updateAppointment)
router.put('/choose/:id', chooseAppointment)
router.delete('/:id', deleteAppointment)


module.exports = router