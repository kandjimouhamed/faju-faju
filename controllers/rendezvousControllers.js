const RendezvousModel = require("../model/rendezvousModel")
const addRendezvous = async (req , res) => {
    try {
        const {nomCompletPatient, dateRendezvous,description} = req.body
        console.log(req.body);

        const rendezvous = await RendezvousModel.create({
            nomCompletPatient, dateRendezvous,description
           
        })
        
        res.status(200).json({data : rendezvous , message : "Rendez vous programmeé avec success."})

    } catch (error) {
        console.log(error);
        res.status(500).json({message : error.message})
    }
}
const getRendezvous = async (req , res) => {
    try {
        const rendezvous = await RendezvousModel.find()
        res.status(200).json({data : rendezvous , message : "Rendez vous recuperée avec success."})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : error.message})
    }
}

module.exports = {addRendezvous, getRendezvous}