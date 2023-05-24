const prescriptionModel = require('../model/prescriptionModel')
const UserModel = require('../model/UserModel')

const getPrescriptions = async (req , res) => {
    try {
        const prescription = await prescriptionModel.find().select("-password").populate('patientId');
        return res.json({data : prescription , message : "Prescription récupérer avec success ."})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : error.message})
    }
}

const postPrescription = async (req , res) => {
    // const userId = req.params.id
    const {patientId  , userId , description } = req.body


    // ! Verifier si utilisateur qui a effectué la requéte existe
    const user = await UserModel.findById(userId)
    if(!user) res.status(404).json({message : "L'utilisateur est introuvable."})

    const findPatient = await UserModel.findOne({ _id: patientId })
    if(!findPatient) res.status(404).json({message : "Patient improuvable."})
    try {
            const prescription = await prescriptionModel.create({
                patientId ,
                userId ,
                description,
                dataPatient : findPatient
            })
            return res.json({data : prescription , message : 'Prescription ajoutée avec success.' } )
    } catch (error) {
        console.log(error , 'error');
        return res.status(500).json({message : error.message})
    }
    
}


const updatePrescription = async (req , res) => {
    const { patientId , description } = req.body;
    const userId = req.params.id

    const findPrescription = await prescriptionModel.findById(req.params.id)
    if(!findPrescription) return res.status(404).json("La prescription est introuvable")

    const findPatient = await UserModel.findOne({ _id: patientId })
    if(!findPatient) res.status(404).json({message : "Patient improuvable."})
    
    try {
        const prescription = await prescriptionModel.findByIdAndUpdate(
            req.params.id , 
            { patientId, userId , description , dataPatient : findPatient},
            { new : true }
        );
        return res.status(200).json({data : prescription , message : 'Prescription modifié avec success.'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : error.message})
    }

}



const deletePrescription = async (req , res) => {
    const idPrescription = await prescriptionModel.findById(req.params.id)
    if(!idPrescription) return res.status(404).json({message : "Prescription introuvable."})

    try {
        const prescription = await prescriptionModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({data : prescription , message : 'Prescription supprimée avec success.'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : error.message})
    }
}


module.exports = { getPrescriptions , postPrescription , updatePrescription , deletePrescription }