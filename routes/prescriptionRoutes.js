const express = require('express')
const { getPrescriptions, postPrescription, updatePrescription } = require('../controllers/prescriptionsControllers')
const router = express.Router()



router.get('' , getPrescriptions),
router.post('' , postPrescription)
router.put("/:id", updatePrescription)

module.exports = router