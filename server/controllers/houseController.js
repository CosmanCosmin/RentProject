const db = require("../dbInitializer")
const House = db.houses;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title || !req.body.type || !req.body.price || !req.body.county || !req.body.address || !req.body.ownerName || !req.body.phoneNumber || !req.body.contactEmail
        || !req.body.sellType || !req.body.spaceType || !req.body.rooms || !req.body.space || !req.body.floor) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const house = {
        title: req.body.title,
        price: req.body.price,
        type: req.body.type,
        description: req.body.description,
        county: req.body.county,
        address: req.body.address,
        ownerName: req.body.ownerName,
        phoneNumber: req.body.phoneNumber,
        contactEmail: req.body.contactEmail,
        sellType: req.body.sellType,
        spaceType: req.body.spaceType,
        rooms: req.body.rooms,
        space: req.body.space,
        floor: req.body.floor,
        photos: req.body.photos
    };
    
    House.create(house).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error occured while creating a house"
        });
    });
};

exports.getAllByCriteria = (req, res) => {
    House.findAll({where: {
        county: req.query.county,
        type: req.query.type,
        sellType: req.query.sellType
    }}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error occured while retrieved houses"
        });
    });
};

exports.getHouseById = (req, res) => {
    const id = req.params.id;
    House.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            }
            else {
                res.status(404).send({
                    message: `Cannot find house with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving house with id=" + id
            });
        });
};

exports.deleteHouse = (req, res) => {
    const id = req.params.id;
    House.destroy({
        where: {id: id}
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "House deleted successfully."
            });
        } else {
            res.send({
                message: `Couldn't delete house with id=${id}, most likely it doesn't exist.`
            });
        };
    }).catch(err => {
        res.status(500).send({
            message: `Couldn't delete house with id=${id}`
        });
    });
};