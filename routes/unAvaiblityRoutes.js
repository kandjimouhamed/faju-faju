const express = require('express')
const { addAvaiblity, updateAvaiblity, deleteAvaiblity, getAvaiblities } = require('../controllers/unAvaiblityControllers')
const router = express.Router()

router.post('/add', addAvaiblity)
router.get('/avaiblities', getAvaiblities)
router.put('/update/:id', updateAvaiblity)
router.delete('/delete/:id', deleteAvaiblity)


module.exports = router