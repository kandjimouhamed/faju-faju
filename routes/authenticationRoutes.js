const express = require('express')
const { signup, login, getUser, logout, getUsers, editUser, getPatient, deletePatients, updatePatients, AddPatient } = require('../controllers/UserControllers')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus(401)

}

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.get('/user', protect, getUser)
router.get('/users', getUsers)
router.put('/users/:id', editUser)
router.post('/patients' , AddPatient)
router.get('/patients' , getPatient)
router.delete('/patients/:id' , deletePatients)
router.put("/patients/:id", updatePatients)


module.exports = router