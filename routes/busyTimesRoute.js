const express = require('express')
const { editBusyTimes, getBusyTimes, getOneBusyTimes } = require('../controllers/busyTimesController')
const router = express.Router()

router.get("", getBusyTimes)
router.get("/:id", getOneBusyTimes)
router.put('/:id', editBusyTimes)


module.exports = router