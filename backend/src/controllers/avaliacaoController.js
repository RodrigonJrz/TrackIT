const db = require('../database/database');

const criarAvaliacao = (req, res) => {
    const { usuario_id, midia_id, nota, comentario } = req.body;

    db.run(`
        INSERT INTO avaliacoes (usuario_id, midia_id, nota, comentario)
        VALUES (?, ?, ?, ?)
    `,
        [usuario_id, midia_id, nota, comentario],
        function (err) {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            res.status(201).json({
                id: this.lastID,
                nota,
                comentario,
                usuario_id,
                midia_id
            });
        }
    );
}

const listarAvaliacoes = (req, res) => {
    const query = `
        SELECT a.id, a.nota, a.comentario, a.data, u.nome AS usuario, m.titulo AS midia
        FROM avaliacoes a
        JOIN usuarios u ON a.usuario_id = u.id
        JOIN midias m ON a.midia_id = m.id
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(rows);
    });
};

module.exports = { criarAvaliacao, listarAvaliacoes };
