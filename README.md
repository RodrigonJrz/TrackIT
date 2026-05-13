# TrackIT

## Ideia do projeto

TrackIT será um sistema fullstack para gerenciamento de filmes e séries assistidos.

O usuário poderá:
- cadastrar filmes e séries
- marcar conteúdos como assistidos
- avaliar com notas e comentários
- criar listas personalizadas
- acompanhar episódios assistidos

## Classes do domínio

### Usuario
- id
- nome
- email
- senha

### Midia
- id
- titulo
- genero
- ano
- tipo

### Avaliacao
- id
- nota
- comentario
- data

### Lista
- id
- nome
- descricao

### Episodio
- id
- titulo
- numero
- temporada
- assistido

## Relações

- Um Usuario pode criar várias Avaliacoes
- Uma Midia pode possuir várias Avaliacoes
- Um Usuario pode possuir várias Listas
- Uma Lista contém várias Midias
- Uma Série pode possuir vários Episodios