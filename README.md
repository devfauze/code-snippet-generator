# *Code Snippet Generator*

## *Visão Geral*

*O ****Code Snippet Generator**** é uma aplicação projetada para criar, gerenciar e compartilhar trechos de códigos de forma eficie*nte. Utilizando boas práticas de desenvolvimento e uma arquitetura limpa, o projeto é construído com TypeScript e oferece suporte a operações CRUD para snippets de código.

---

## Funcionalidades

- **Criação de snippets** com título e conteúdo.
- **Atualização** de snippets existentes.
- **Exclusão** de snippets.
- **Listagem** de todos os snippets.
- **Busca** por snippet através do ID.
- **Persistência de dados** em banco de dados configurado via Docker.

---

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução.
- **TypeScript**: Para um código mais robusto e com tipagem.
- **Express.js**: Framework para criação de APIs.
- **TypeORM**: ORM utilizado para gerenciar as interações com o banco de dados.
- **PostgreSQL**: Banco de dados utilizado.
- **Docker**: Para containerização do banco de dados.
- **Jest**: Framework de testes.

---

## Estrutura de Pastas

```
src/
├── application/       # Lógica de negócios
├── domain/            # Entidades e regras de negócio
├── infrastructure/    # Integrações externas (API, Banco de Dados)
├── presentation/      # Camada de API e controladores
├── shared/            # Funções e tipos reutilizáveis
└── index.ts           # Ponto de entrada da aplicação
```

---

## Configuração do Projeto

### 1. Clone o repositório:

```bash
git clone <URL-do-repositorio>
cd code-snippet-generator
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Configure o arquivo `.env`:

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/snippetdb
```

### 4. Suba o banco de dados via Docker:

Botão direito no arquivo do docker-compose.yml e run 

### 5. Execute as migrations:

```bash
npm run typeorm migration:run
```

### 6. Inicie o servidor:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

---

## Testes

### Executando os testes:

```bash
npm run test:cov
```

---

## Endpoints Disponíveis

### 1. **Criar um Snippet**

- **POST** `/snippets`
- **Body:**

```json
{
  "title": "Exemplo de Snippet",
  "content": "console.log('Hello, world!');"
}
```

### 2. **Obter todos os Snippets**

- **GET** `/snippets`

### 3. **Obter um Snippet por ID**

- **GET** `/snippets/:id`

### 4. **Atualizar um Snippet**

- **PUT** `/snippets/:id`
- **Body:**

```json
{
  "title": "Novo Título",
  "content": "console.log('Atualizado!');"
}
```

### 5. **Deletar um Snippet**

- **DELETE** `/snippets/:id`

---

## Contribuições

Fique à vontade para abrir issues e enviar pull requests para melhorias ou correções!

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

