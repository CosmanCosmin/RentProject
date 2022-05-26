const express = require("express");

const PORT = 3001;

const app = express();

app.get('/api', (req, res) => {
    res.json({message: "test"});
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});