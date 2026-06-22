const db = require("../database/database");

const listarMidias = (req, res) => {
    db.all("SELECT * FROM midias", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }

        res.json(rows);
    });
};

const criarMidia = (req, res) => {
    const { titulo, genero, ano, tipo } = req.body;

    db.run(
        `
        INSERT INTO midias (titulo, genero, ano, tipo) 
        VALUES (?, ?, ?, ?)
        `,
        [titulo, genero, ano, tipo],
        function (err) {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            res.status(201).json({
                id: this.lastID,
                titulo,
                genero,
                ano,
                tipo
            })
        }
    )
}

const buscarMidiaPorId = (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM midias WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        if (!row) {
            return res.status(404).json({ erro: "Mídia não encontrada" });
        }
        res.json(row);
    });
}

const atualizarMidia = (req, res) => {
    const { id } = req.params;
    const { titulo, genero, ano, tipo } = req.body;

    db.run(
        `
        UPDATE midias
        SET titulo = ?, genero = ?, ano = ?, tipo = ?
        WHERE id = ?
        `,
        [titulo, genero, ano, tipo, id],
        function (err) {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ erro: "Mídia não encontrada" });
            }
            res.json({
                id,
                titulo,
                genero,
                ano,
                tipo
            });
        }
    );
};

const deletarMidia = (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM midias WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ erro: "Mídia não encontrada" });
        }
        res.json({ mensagem: "Mídia deletada com sucesso" });
    });
}

module.exports = {listarMidias, criarMidia, buscarMidiaPorId, atualizarMidia, deletarMidia};