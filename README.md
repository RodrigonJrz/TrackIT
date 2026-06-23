# 🎬 TrackIT - Fórum & Gerenciador de Mídias

O **TrackIT** é um sistema Fullstack projetado com uma interface inspirada na estética clássica e retrô dos fóruns dos anos 90/2000. A plataforma permite que os usuários se registrem, criem tópicos para filmes ou séries e postem respostas estruturadas com notas e comentários em tempo real.

## 🌐 Links do Projeto em Produção
* **Acesse o Frontend (Vercel):** [https://track-it-mu-hazel.vercel.app/]
* **Acesse o Backend (Render):** [https://trackit-backend-mhl5.onrender.com/]

---

## 📋 Arquitetura & Tecnologias

O projeto foi dividido seguindo o modelo cliente-servidor para isolar as responsabilidades:

* **Frontend (Single Page Application - SPA):** HTML5, CSS3 estrutural customizado, Bootstrap 5 para responsividade e JavaScript Puro (Vanilla JS) com manipulação assíncrona do DOM (`fetch` API).
* **Backend (API REST):** Node.js com o framework Express.
* **Banco de Dados:** SQLite (Armazenamento relacional persistido localmente via arquivo `.db`).

---

## 💾 Modelo Relacional e Classes de Domínio

O banco de dados utiliza restrições de integridade referencial e chaves estrangeiras (`Foreign Keys`) para conectar as entidades:

### 👤 Usuario
* `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
* `nome` (TEXT)
* `email` (TEXT UNIQUE)
* `senha` (TEXT)

### 📂 Midia
* `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
* `titulo` (TEXT)
* `genero` (TEXT)
* `ano` (INTEGER)
* `tipo` (TEXT) - Ex: 'Filme' ou 'Série'

### 💬 Avaliacao (Tabela de Relacionamento)
* `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
* `usuario_id` (INTEGER FOREIGN KEY -> Usuario)
* `midia_id` (INTEGER FOREIGN KEY -> Midia)
* `nota` (INTEGER) - Valores de 1 a 5
* `comentario` (TEXT)
* `data` (DATETIME DEFAULT CURRENT_TIMESTAMP)

---

## 📖 Documentação da API (Endpoints REST)

Todas as requisições e respostas utilizam o formato `application/json`.

### 👥 Gerenciamento de Usuários
* **`GET /usuarios`**
    * **Descrição:** Lista todos os usuários cadastrados.
    * **Resposta (200 OK):** Array de objetos contendo `id`, `nome` e `email`.
* **`POST /usuarios`**
    * **Descrição:** Cadastra um novo membro no fórum.
    * **Corpo da Requisição:**
        ```json
        { "nome": "Bob_Muller", "email": "bob@email.com", "senha": "123" }
        ```
    * **Resposta (201 Created):** Mensagem de confirmação ou erro de e-mail duplicado (400).

### 📂 Gerenciamento de Mídias (Tópicos)
* **`GET /midias`**
    * **Descrição:** Retorna todos os tópicos de filmes/séries salvos.
    * **Resposta (200 OK):** Array de objetos com as colunas da tabela de mídias.
* **`POST /midias`**
    * **Descrição:** Cria um novo tópico para votação.
    * **Corpo da Requisição:**
        ```json
        { "titulo": "Matrix", "genero": "Ficção Científica", "ano": 1999, "tipo": "Filme" }
        ```
    * **Resposta (201 Created)**

### 💬 Gerenciamento de Avaliações (Respostas)
* **`GET /avaliacoes`**
    * **Descrição:** Retorna o feed de respostas combinando dados estruturados através de um `JOIN` SQL entre as tabelas.
    * **Resposta (200 OK):** Retorna o nome do autor, título do filme, nota e comentário formatados.
* **`POST /avaliacoes`**
    * **Descrição:** Vincula o comentário de um usuário a um tópico através dos IDs correspondentes.
    * **Corpo da Requisição:**
        ```json
        { "usuario_id": 1, "midia_id": 1, "nota": 5, "comentario": "Obra prima!" }
        ```
    * **Resposta (201 Created)**

---
