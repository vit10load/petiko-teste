# Petiko-App - Gerenciador de Tarefas

Aplicação frontend em **Vue.js 2.7** para gerenciamento de tarefas (To-Do List), estruturada de forma modularizada com Vuex para facilitar a organização, manutenção e escalabilidade do código.

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Instalacao](#instalacao)

---

## Sobre o Projeto

Petiko-App é um gerenciador de tarefas (to-do list) desenvolvido com Vue.js 2.7, que utiliza o Vuex de forma modular para organização das regras de negócio, incluindo:

- **Modularização do Vuex**: Separação clara entre `actions`, `mutations`, `state` e um arquivo `index.js` que orquestra os módulos.
- **Interface responsiva** para criar, editar, listar, filtrar e excluir tarefas.
- **Gerenciamento de usuários**: Cada usuário tem suas próprias tarefas, podendo gerenciar, alterar descrição, marcar como concluída ou alterar o status.
- **Segurança**: Autenticação baseada em **JSON Web Tokens (JWT)** que se comunicam com um backend em Laravel, garantindo controle de acesso e proteção das rotas e dados.
- **Facilidade de manutenção** e escalabilidade devido à arquitetura organizada.
- **Testes automatizados** com Jest para garantir a qualidade do código.

---

## Tecnologias Utilizadas

- [Vue.js 2.7](https://vuejs.org/v2/guide/)
- [Vuex](https://vuex.vuejs.org/)
- [Jest](https://jestjs.io/) para testes unitários
- [Axios](https://axios-http.com/) para requisições HTTP
- JSON Web Tokens (JWT) para autenticação e segurança

---

## Estrutura do Projeto

```plaintext
petiko-app/
├── public/                  # Arquivos públicos estáticos
├── src/
│   ├── assets/              # Imagens, fontes e estilos globais
│   ├── components/          # Componentes Vue reutilizáveis
│   ├── router/              # Arquivo de rotas (se houver)
│   ├── store/               # Vuex modularizado
│   │   ├── modules/         # Módulos Vuex separados (ex: tarefas, usuario, etc)
│   │   │   ├── actions.js
│   │   │   ├── mutations.js
│   │   │   ├── state.js
│   │   │   └── index.js     # Exporta o módulo do Vuex
│   │   └── index.js         # Combina os módulos e cria a store
│   ├── views/               # Views ou páginas da aplicação
│   ├── App.vue              # Componente raiz
│   └── main.js              # Entrada principal da aplicação
├── tests/                   # Testes unitários com Jest
│   └── ...
├── package.json
├── babel.config.js
├── jest.config.js
└── README.md
```

---

## Funcionalidades

- Listar tarefas cadastradas pelo usuário logado
- Criar nova tarefa vinculada ao usuário
- Editar tarefa existente (descrição, status)
- Excluir tarefa
- Marcar tarefas como concluídas
- Filtrar tarefas por título
- Gerenciamento completo por usuários, garantindo que cada usuário acesse e manipule apenas suas próprias tarefas
- Autenticação e autorização via **JSON Web Tokens (JWT)** para proteger rotas e comunicação segura com backend Laravel
- Organização do estado da aplicação usando Vuex modularizado:
  - **state**: dados e estado da aplicação
  - **actions**: chamadas assíncronas e lógica de negócio
  - **mutations**: mutações síncronas do estado
- Testes automatizados para garantir o funcionamento correto dos módulos Vuex e componentes

---

## Instalacao

- **Desenvolvimento com hot-reload:**

  ```bash
    npm run serve
  ```

- **Produção:**

  ```bash
    npm run build
  ```

- **Executar testes:**
  ```bash
    npm run test:unit
  ```
