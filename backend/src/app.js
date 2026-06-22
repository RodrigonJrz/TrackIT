const express = require("express");
const cors = require("cors");

require("./database/database");

const midiaRoutes = require("./routes/midiaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/midias", midiaRoutes);

app.get("/", (req, res) => {
    res.json({
        projeto: "TrackIT"
    });
});

module.exports = app;