const express = require("express");
const cors = require("cors");

require("./database/database");

const midiaRoutes = require("./routes/midiaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const avaliacaoRoutes = require("./routes/avaliacaoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/midias", midiaRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/avaliacoes", avaliacaoRoutes);

app.get("/", (req, res) => {
    res.json({
        projeto: "TrackIT"
    });
});

module.exports = app;