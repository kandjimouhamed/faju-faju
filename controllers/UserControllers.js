const UserModel = require('../model/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('../config/auth')
const axios = require('axios')
require("dotenv").config();
const BusyModel = require('../model/busyTimeModel')


// @desc: dignup
// @route: /api/signup
const signup = async (req, res) => {
    // if (req.body.googleAccessToken) {
    //     axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    //         headers: {
    //             "Authorization": `Bearer ${req.body.googleAccessToken}`
    //         }
    //     })
    //         .then(async (response) => {
    //             // console.log(response);
    //             const firstname = response.data.given_name
    //             const lastname = response.data.family_name
    //             const email = response.data.email

    //             const findUser = await UserModel.findOne({ email })

    //             if (findUser) {
    //                 const token = generateToken(result._id)
    //                 res.json(token)
    //                 return
    //             }

    //             const result = await UserModel.create({
    //                 firstname,
    //                 lastname,
    //                 email,
    //                 role: 'client',
    //                 phone: null,
    //                 password: null
    //             })

    //             const token = generateToken(result._id)
    //             res.json(token)
    //         })
    //         .catch(error => {
    //             res.status(400).json(error)
    //         })
    // }
    // else {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        // console.log(user)
        const { email } = user
        // console.log(email)
        const findUser = await UserModel.find({ email })
        if (findUser.length) {
            res.status(402).send({ error: "L'utilisateur exist deja" })
            return
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)

        try {
            const createdUser = await UserModel.create({ ...user, password: hashedPassword })
            res.status(200).json({
                // 'res':user,
                'message': "l'inscription est reuissie"
                // token: generateToken(createdUser._id)
            })
        }
        catch (err) {
            res.status(400).json(err)
        }
    // }
}

// @desc: get the user by the token
// @route: /api/user
const getUser = (req, res) => {
    res.json(req.user)
}

// @desc: login
// @route: /api/login
const login = async (req, res) => {
    // if (req.body.googleAccessToken) {
    //     axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    //         headers: {
    //             "Authorization": `Bearer ${req.body.googleAccessToken}`
    //         }
    //     })
    //         .then(async (response) => {
    //             const firstname = response.data.given_name
    //             const lastname = response.data.family_name
    //             const email = response.data.email

    //             const findUser = await UserModel.findOne({ email })

    //             if (!findUser) {
    //                 const result = await UserModel.create({
    //                     firstname,
    //                     lastname,
    //                     email,
    //                     role: 'client',
    //                     phone: null,
    //                     password: null
    //                 })
    
    //                 const token = generateToken(result._id)
    //                 res.json(token)
    //                 return
    //             }

    //             const token = generateToken(findUser._id)
    //             res.json(token)
    //         })
    // }
    // else {
        const { email, password } = req.body
        console.log(email, password)
        const user = await UserModel.find({ email })
        // console.log(user[0])


        if (user.length) {
            // check if the given password matches with user password in database
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (!result) {
                    res.status(400).json({ error: "Utilisateur introuvable" })
                    return
                }
                res.status(200).json({
                    token: generateToken(user[0]._id),
                     
                    'reponse': 'la connexion est etabli',
                    'user' : user,
                })
            });
        }
        else {
            res.status(400).json({ error: "L'utilisateur n'existe pas" })
        }
    // }

}

const logout = (req, res) => {
    req.logout()
    req.session.destroy()
}

const editUser = async (req, res) => {
    const id = req.params.id
    const findUser = await UserModel.findById(id)

    if(!findUser){
        res.status(404).json({message: "Utilisateur introuvable"})
        return
    }

    try {
        await UserModel.findByIdAndUpdate(id, {...req.body})
        res.json({message: "Utilisateur modifier"})
    } catch (error) {
        res.status(400).json({message: "une erreur s'est produite"})
    }
}

const getUsers = async (req, res) => {
    const users = await UserModel.find().select("-password")
    res.json(users)
}

const generateToken = (userId) => {
    // return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' })
    return jwt.sign({ userId }, 'kkxsjgshgsyudyusydhsgfdybufdh-r', { expiresIn: '30d' })
}

module.exports = {
    login,
    signup,
    getUser,
    logout,
    getUsers,
    editUser,
}