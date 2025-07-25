# 🐾 Petiko - Teste de Desenvolvimento Web

Este projeto foi desenvolvido como parte do processo seletivo da Petiko para a vaga de Desenvolvedor Web. A aplicação consiste em um sistema completo de gerenciamento de tarefas (To-Do List), com **backend em Laravel** e **frontend em Vue.js**, incluindo autenticação, permissões por tipo de usuário, e recursos avançados que demonstram domínio das tecnologias solicitadas.

---

## ✅ Funcionalidades Implementadas

### 🗂️ Funcionalidades principais

- [x] Cadastro, edição, exclusão e visualização de tarefas.
- [x] Validação de formulário para campos obrigatórios (título, status e data de vencimento).
- [x] Apenas usuários **administradores** podem cadastrar novas tarefas.
- [x] Autenticação com login/token protegendo as rotas (Laravel Sanctum).
- [x] Cada usuário visualiza **apenas suas próprias tarefas**.

### 🔍 Funcionalidades adicionais

- [x] Filtro de tarefas por título (busca reativa).
- [x] Paginação das tarefas com suporte ao backend (`?page=1&title=xyz`).
- [x] Validação de data de vencimento para impedir datas inválidas ou passadas.
- [x] Exportação de tarefas para **CSV**.
- [x] Tela responsiva e reativa com Vue.js + Vuex modularizado.
- [x] Interface de administração para gerenciamento de tarefas por tipo de usuário.

### ⚙️ Funcionalidades avançadas Laravel

- [x] **Events e Listeners**: criação, edição e deleção de tarefas disparam eventos.
- [x] **Jobs**: tarefas demoradas foram tratadas com jobs assíncronos.
- [x] **Observers**: criado um observer que registra alterações nas tarefas.
- [x] **Broadcasts com Laravel Echo + laravel-echo-server**: frontend atualizado em tempo real.
- [x] **Comando Artisan personalizado**: comando criado para manipular e exibir tarefas por status.
- [x] **Seeders e Factories**: populam o banco com usuários e tarefas para testes.

### 🧪 Testes

- [x] Testes de interface (Vue Test Utils + Jest) cobrindo criação, edição, exclusão e carregamento de tarefas.
- [x] Testes unitários no backend com PHPUnit.
- [x] Cobertura de fluxos críticos como autenticação e permissão.

---

## 🚀 Tecnologias Utilizadas

### Backend (Laravel 10.x)

- Laravel Sanctum (autenticação via token)
- Eventos, Listeners, Jobs, Observers
- Exportação com Laravel Excel
- Seeders, Factories e Migrations
- Laravel Echo + Redis + laravel-echo-server
- Testes com PHPUnit

### Frontend (Vue.js 2.x)

- Vue CLI + Vuex (modularizado)
- Vuetify para UI
- Axios para consumo da API
- Vue Test Utils + Jest para testes automatizados
- Componentes reutilizáveis e reativos

---

## 🛠️ Instalação e Execução

Acesse a pasta correspondente de cada projeto que tem o readme com as instruções para rodar as aplicações e scripts necessários.
