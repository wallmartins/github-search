# GitHub Search

Uma aplicação desenvolvida em **Vue 3** com **Pinia**, que permite buscar repositórios no GitHub, listá-los, e elencar alguns como favoritos. Este projeto foi criado como parte de um teste técnico para avaliação de habilidades em **Vue.js** e gerenciamento de estado com **Pinia**.

## ⚡ Funcionalidades

- **Busca de repositórios**: Insira o nome ou palavras-chave para encontrar repositórios no GitHub.
- **Listagem de repositórios**: Exibe os repositórios encontrados com detalhes relevantes.
- **Favoritos**: Permite marcar e desmarcar repositórios como favoritos, com armazenamento gerenciado via Pinia.

## 🛠️ Tecnologias e Ferramentas Utilizadas

- **Vue 3**: Framework JavaScript para a construção de interfaces de usuário.
- **Pinia**: Gerenciamento de estado global.
- **Axios**: Biblioteca para requisições HTTP.
- **Vite**: Ferramenta de build rápida para o desenvolvimento em Vue.
- **GitHub REST API**: API utilizada para buscar os repositórios.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- Gerenciador de pacotes (npm ou yarn)

### Passos para rodar o projeto

1. Clone este repositório:

   ```bash
   git clone <url-do-repositorio>
   cd github-repository-finder
   ```

2. Instale as dependências:

   ```bash
     npm install
     # ou
     yarn install
   ```

3. Crie um arquivo .env na raiz do projeto e adicione a chave da API do GitHub (opcional, se necessário):

   ```bash
     VITE_GITHUB_API_URL=COLE_AQUI_SUA_API_KEY
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
     npm run dev
     # ou
     yarn dev
   ```

5. Acesse a aplicação no navegador:

   ```bash
     http://localhost:5173
   ```

## 📂 Estrutura de Pastas

Abaixo está a estrutura da pasta src com a explicação de cada diretório:

```graphql
    src/
    ├── assets/        # Imagens e outros recursos estáticos
    ├── components/    # Componentes reutilizáveis da aplicação
    ├── pages/         # Views principais da aplicação
    ├── service/       # Serviço para conexão com a API do GitHub
    ├── stores/        # Gerenciamento de estado com Pinia
    ├── types/         # Definições de interfaces e tipos TypeScript
```

## 🔄 Fluxo de Funcionamento

1. O usuário insere o nome de um repositório na barra de busca.
2. A aplicação utiliza a GitHub REST API para buscar os repositórios.
3. Os repositórios encontrados são exibidos na interface.
4. O usuário pode marcar/desmarcar repositórios como favoritos.
5. O estado dos repositórios e favoritos listados são gerenciados globalmente pelo Pinia.

## 📜 Licença

Este projeto é apenas para fins de aprendizado e teste técnico. Não possui licença específica.
