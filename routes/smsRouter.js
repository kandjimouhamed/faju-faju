const express = require('express')
const sendSms = require('../controllers/smsControllers')

const router = express.Router()

router.post('', sendSms)

module.exports = router