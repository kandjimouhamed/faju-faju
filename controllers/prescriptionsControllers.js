const prescriptionModel = require('../model/prescriptionModel')
const UserModel = require('../model/UserModel')

const getPrescriptions = async (req , res) => {
    try {
        const prescription = await prescriptionModel.find()
        return res.json({data : prescription , message : "Prescription récupérer avec success ."})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : error.message})
    }
}

const postPrescription = async (req , res) => {
    const userId = req.params.id
    const {patientId , description } = req.body
    console.log(req.body , 'Post');

    // const user = await UserModel.findById(userId)
    // if(!user) res.status(404).json({message : "L'utilisateur est introuvable."})

    try {
            const prescription = await prescriptionModel.create({ patientId , userId : '645a3000118d102b4fec2fcc' ,description })
            return res.json({data : prescription , message : 'Prescription ajoutée avec success.' } )
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : error.message})
    }
    
}


const updatePrescription = async (req , res) => {
    const idPrescription = req.params.id
    const { patientId , description} = req.body;
    console.log(req.body , 'update');

    const findPrescription = await prescriptionModel.findById(req.params.id)
    if(!findPrescription) return res.status(404).json("La prescription est introuvable")
    
    try {
        const prescription = await prescriptionModel.findByIdAndUpdate(
            req.params.id , 
            { patientId, userId : '645a3000118d102b4fec2fcc', description },
            { new : true }
        );
        return res.status(200).json({data : prescription , message : 'Prescription modifié avec success.'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : error.message})
    }

}

module.exports = {getPrescriptions , postPrescription , updatePrescription}