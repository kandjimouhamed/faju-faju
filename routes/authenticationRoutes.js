const express = require('express')
// const passport = require('passport')
const { signup, login, getUser, logout, getUsers, editUser } = require('../controllers/UserControllers')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus(401)
}

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.get('/user', protect, getUser)
// router.get('/user', getUser)
router.get('/users', getUsers)
router.put('/users/:id', editUser)



module.exports = router