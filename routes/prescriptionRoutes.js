const express = require('express')
const { getPrescriptions, postPrescription, updatePrescription, deletePrescription } = require('../controllers/prescriptionsControllers')
const router = express.Router()



router.get('' , getPrescriptions);
router.post('' , postPrescription);
router.put('/:id', updatePrescription);
// router.put('/:id', testUpdate);
router.delete('/:id' , deletePrescription);

module.exports = router