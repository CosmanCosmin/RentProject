const Sequelize = require("sequelize");
const dbconfig = require("./config/dbconfig.js");

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dbconfig: dbconfig.dialect,
    dialect: dbconfig.dialect,
    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.houses = require("./models/house-model.js")(sequelize, Sequelize);
db.users = require("./models/user-model.js")(sequelize, Sequelize);

module.exports = db;