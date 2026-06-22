const db = require('../database/database');

const criarUsuario = (req, res) => {
    const { nome, email, senha } = req.body;

    db.run(
        `
        INSERT INTO usuarios (nome, email, senha)
        VALUES (?, ?, ?)
        `,
        [nome, email, senha],
        function (err) {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            res.status(201).json({
                id: this.lastID,
                nome,
                email
            });
        }
    );
};

const listarUsuarios = (req, res) => {
    db.all("SELECT id, nome, email FROM usuarios", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.status(200).json(rows);
    });
};

module.exports = {criarUsuario,listarUsuarios};