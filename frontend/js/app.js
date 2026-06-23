const API_URL = "https://trackit-backend-mhl5.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    carregarUsuarios();   
    carregarMidias();
    carregarAvaliacoes();

    document.getElementById("form-usuario").addEventListener("submit", cadastrarUsuario);
    document.getElementById("form-midia").addEventListener("submit", cadastrarMidia);
    document.getElementById("form-avaliacao").addEventListener("submit", cadastrarAvaliacao);
});

function carregarUsuarios() {
    fetch(`${API_URL}/usuarios`)
        .then(response => response.json())
        .then(usuarios => {
            const selectUsuario = document.getElementById("av-usuario");
            selectUsuario.innerHTML = '<option value="">-- Selecione o Autor --</option>';

            usuarios.forEach(usr => {
                selectUsuario.innerHTML += `
                    <option value="${usr.id}">👤 ${usr.nome} (ID: ${usr.id})</option>
                `;
            });
        })
        .catch(err => console.error("Erro ao listar usuários:", err));
}

function cadastrarUsuario(e) {
    e.preventDefault();
    const nome = document.getElementById("usr-nome").value;
    const email = document.getElementById("usr-email").value;
    const shadowPassword = document.getElementById("usr-senha").value;

    fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha: shadowPassword })
    })
    .then(response => {
        if (response.status === 201) {
            document.getElementById("form-usuario").reset();
            carregarUsuarios(); 
        } else {
            alert("Erro ao cadastrar membro. Verifique se o e-mail já existe.");
        }
    })
    .catch(err => console.error("Erro ao cadastrar usuário:", err));
}

function carregarMidias() {
    fetch(`${API_URL}/midias`)
        .then(response => response.json())
        .then(midias => {
            const tabela = document.getElementById("tabela-midias");
            const selectMidia = document.getElementById("av-midia");
            
            tabela.innerHTML = "";
            selectMidia.innerHTML = '<option value="">-- Selecione uma Mídia --</option>';

            if (midias.length === 0) {
                tabela.innerHTML = `<tr><td colspan="4" class="text-center text-muted p-3">Nenhum tópico criado ainda.</td></tr>`;
                return;
            }

            midias.forEach(midia => {
                tabela.innerHTML += `
                    <tr>
                        <td class="fw-bold text-primary">📂 ${midia.titulo}</td>
                        <td>${midia.genero}</td>
                        <td>${midia.ano}</td>
                        <td><span class="badge bg-dark">${midia.tipo}</span></td>
                    </tr>
                `;

                selectMidia.innerHTML += `
                    <option value="${midia.id}">${midia.titulo}</option>
                `;
            });
        })
        .catch(err => console.error("Erro ao listar mídias:", err));
}

function cadastrarMidia(e) {
    e.preventDefault();
    const titulo = document.getElementById("midia-titulo").value;
    const genero = document.getElementById("midia-genero").value;
    const ano = document.getElementById("midia-ano").value;
    const tipo = document.getElementById("midia-tipo").value;

    fetch(`${API_URL}/midias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, genero, ano, tipo })
    })
    .then(response => {
        if (response.status === 201) {
            document.getElementById("form-midia").reset();
            carregarMidias();
        }
    })
    .catch(err => console.error("Erro ao cadastrar mídia:", err));
}


function carregarAvaliacoes() {
    fetch(`${API_URL}/avaliacoes`)
        .then(response => response.json())
        .then(avaliacoes => {
            const container = document.getElementById("container-avaliacoes");
            container.innerHTML = "";

            if (avaliacoes.length === 0) {
                container.innerHTML = `<div class="text-center text-muted p-3">Nenhum comentário postado recentemente.</div>`;
                return;
            }

            avaliacoes.forEach(av => {
                const estrelas = "⭐".repeat(av.nota);

                container.innerHTML += `
                    <div class="d-flex forum-post">
                        <div class="user-sidebar p-3 text-center small text-truncate">
                            <div class="fw-bold text-dark">👤 ${av.usuario}</div>
                            <div class="text-muted font-monospace" style="font-size: 10px;">Membro Ativo</div>
                        </div>
                        <div class="p-3 flex-grow-1">
                            <div class="d-flex justify-content-between border-bottom pb-1 mb-2 small text-muted">
                                <span>RE: <strong>${av.midia}</strong></span>
                                <span>${av.data}</span>
                            </div>
                            <div class="mb-2 text-warning">${estrelas}</div>
                            <p class="m-0 font-monospace">${av.comentario}</p>
                        </div>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Erro ao listar avaliações:", err));
}

function cadastrarAvaliacao(e) {
    e.preventDefault();
    const usuario_id = document.getElementById("av-usuario").value;
    const midia_id = document.getElementById("av-midia").value;
    const nota = document.getElementById("av-nota").value;
    const comentario = document.getElementById("av-comentario").value;

    if (!usuario_id || !midia_id) {
        alert("Selecione um Autor e uma Mídia antes de enviar a resposta.");
        return;
    }

    fetch(`${API_URL}/avaliacoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id, midia_id, nota, comentario })
    })
    .then(response => {
        if (response.status === 201) {
            document.getElementById("form-avaliacao").reset();
            carregarAvaliacoes();
        }
    })
    .catch(err => console.error("Erro ao postar resposta:", err));
}