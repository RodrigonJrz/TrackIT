const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./trackit.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Banco SQLite conectado com sucesso!');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS midias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            genero TEXT NOT NULL,
            ano INTEGER,
            tipo TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS avaliacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nota INTEGER NOT NULL,
            comentario TEXT,
            data TEXT DEFAULT CURRENT_TIMESTAMP,
            usuario_id INTEGER NOT NULL,
            midia_id INTEGER NOT NULL,
            FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
            FOREIGN KEY (midia_id) REFERENCES midias (id) ON DELETE CASCADE
        )
    `);
});

module.exports = db;