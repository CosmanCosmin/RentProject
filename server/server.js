const express = require("express");
const cors = require("cors");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();


var corsOptions = {
    origin: "http://localhost:3000"
};

const PORT = process.env.PORT || 3001;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('C:/Users/cosmi/Desktop/New folder (2)/react_node_project/pictures'));

app.get("/api", (req, res) => {
    res.json({version: process.env.npm_package_version});
})

const db = require("./dbInitializer")
db.sequelize.sync({force: false}).then();

require("./routes/houseRoutes.js")(app);
require("./routes/userRoutes.js")(app);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});