const express = require('express')
const { getRendezvous, addRendezvous} = require('../controllers/rendezvousControllers')
const router = express.Router()

router.get('/' , getRendezvous)
router.post('/' , addRendezvous)


module.exports = router