const express = require("express");
const router = express.Router();

const {
    listarMidias,
    criarMidia,
    buscarMidiaPorId,
    atualizarMidia,
    deletarMidia
} = require("../controllers/midiaController");

router.get("/", listarMidias);
router.post("/", criarMidia);

router.get("/:id", buscarMidiaPorId);
router.put("/:id", atualizarMidia);
router.delete("/:id", deletarMidia);

module.exports = router;