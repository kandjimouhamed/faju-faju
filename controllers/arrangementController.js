const arrangementModel = require('../model/arrangementModel')

const getAllArrangements = async(req , res) => {
    try {
        const arrangement = await arrangementModel.find()
        res.json({data : arrangement , message : "Ordonnaces récuperée avec success"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error : error.message})
    }
}


const postArrangement = async (req , res) => {

    const newArrangement = {
        drugName : req.body.drugName,
        hours : req.body.hours,
        dayStart : req.body.dayStart,
        numberDay : req.body.numberDay
    }
    try {
        const arrangement = await arrangementModel.create(newArrangement)
        res.json({data : arrangement , message : "Ordonnace ajoutée avec success ..."})
    } catch (error) {
        console.log(error);
        res.status(400).json({ error : error.message})
    }
}

const deleteArrangement =  async (req , res) => {

    const arrangement = await arrangementModel.findById(req.params.id)

    if(!arrangement) return res.status(404).send('Todo not found ...')

    try {
        const supprimer = await arrangementModel.findByIdAndDelete(arrangement)
        res.json({data: supprimer , message : "Ordonnace suppimée avec success ..."})
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message})
    }

}

module.exports = {getAllArrangements , postArrangement , deleteArrangement}