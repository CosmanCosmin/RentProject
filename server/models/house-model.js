module.exports = (sequelize, Sequelize) => {
    const House = sequelize.define("house", {
        title: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        county: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        ownerName: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        contactEmail: {
            type: Sequelize.STRING
        },
        sellType: {
            type: Sequelize.STRING
        },
        spaceType: {
            type: Sequelize.STRING
        },
        rooms: {
            type: Sequelize.INTEGER
        },
        space: {
            type: Sequelize.INTEGER
        },
        floor: {
            type: Sequelize.STRING
        },
        photos: {
            type: Sequelize.JSON
        }

    });
    return House;
}