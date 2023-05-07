const express = require('express')
const {getAllArrangements , postArrangement, deleteArrangement} = require("../controllers/arrangementController")

const router = express.Router()

router.get("/" , getAllArrangements)
router.post("/" , postArrangement)
router.delete("/:id" , deleteArrangement)

module.exports = router