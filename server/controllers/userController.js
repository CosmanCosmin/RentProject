const db = require("../dbInitializer")
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).send("Content can not be empty!")
        }

        const oldUser = await User.findOne({where: {username: username}});

        if (oldUser) {
            return res.status(409).send("User already exists. Please Login.");
        }
        
        encryptedPassword = await bcrypt.hash(password, 10);

        User.create({username, password: encryptedPassword}).then(user => {
            const token = jwt.sign(
                {id: user.id, username},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            );

            user.dataValues.token = token

            res.status(201).json({token: token});  
        })      
    } catch (err) {
        console.log(err);
    }
};

exports.login = async (req, res) => {
    try {   
        const {username, password} = req.body

        if (!username || !password) {
            res.status(400).send("Content can not be empty!")
        }

        User.findOne({where: {username: username}}).then(user => {
            if (user && (bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    {id: user.id, username},
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h"
                    }
                );
                user.dataValues.token = token;
                res.status(200).json({token: token});
            }
            else res.status(400).send("Invalid credentials.");
            }).catch(err => {
                console.log(err);
            })
    } catch (err) {
        console.log(err);
    }
}