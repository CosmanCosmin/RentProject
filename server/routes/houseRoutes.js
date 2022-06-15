const express = require("express")
const multer = require("multer")
const auth = require("../middleware/auth")
const path = require("path")
const upload = multer({
    dest: "pictures/"
})

module.exports = app => {
    const houses = require('../controllers/houseController.js');
    var router = express.Router();

    router.post("/create", auth, houses.create);
    router.get("/search", houses.getAllByCriteria);
    router.get("/:id", houses.getHouseById);
    router.delete("/:id", houses.deleteHouse);
    router.post("/handleFile", upload.single("file"), (req, res) => {
        res.status(200).json({message: req.file.path.replace('pictures\\', '')})
    })

    app.use('/housingAPI', router);
}