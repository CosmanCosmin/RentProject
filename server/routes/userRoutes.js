const auth = require("../middleware/auth");
const express = require("express")

module.exports = app => {
    const users = require('../controllers/userController.js');
    var router = express.Router();

    router.post("/register", users.register);
    router.post("/login", users.login);
    router.post("/welcome", auth, (req, res) => {
        res.status(200).send("Authentification worked. Welcome!");
    }) 

    app.use('/userAPI', router);
}