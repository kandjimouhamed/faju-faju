const express = require('express')
const { getPatient, addPatient, updatePatient, deletePatient } = require('../controllers/patientsControllers')
const router = express.Router()

router.get('/' , getPatient)
router.post('/' , addPatient)
router.put('/:id' , updatePatient)
router.delete('/:id', deletePatient)

module.exports = router