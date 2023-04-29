const jwt = require('jsonwebtoken')
const UserModel = require('../model/UserModel')

const protect = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            // get token from header
            token = req.headers.authorization.split(' ')[1]
            // verify token
            // const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const decoded = jwt.verify(token, 'kkxsjgshgsyudyusydhsgfdybufdh-r')

            // get user from the token
            req.user = await UserModel.findById(decoded.userId).select('-password')
            // res.json(req.user)
            next()
        }
        catch(error){
            return res.status(401).json({message: "Accès non autorisé"})
        }
    }

    if(!token){
        return res.status(401).json({message: "Vous n'etes pas autosisé à faire ces actions"})
    }
}

module.exports = protect