const express = require('express')
const { signup, login, getUser, logout, getUsers, editUser, getPatient } = require('../controllers/UserControllers')
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
router.get('/patients' , getPatient)


module.exports = router