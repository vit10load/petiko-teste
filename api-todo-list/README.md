<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Logotipo Laravel"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Status da Build"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total de Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Última Versão Estável"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="Licença"></a>
</p>

## Sobre o Laravel

Laravel é um framework para aplicações web com uma sintaxe expressiva e elegante. Acreditamos que o desenvolvimento deve ser uma experiência prazerosa e criativa para ser verdadeiramente satisfatória. O Laravel elimina as dores do desenvolvimento facilitando tarefas comuns usadas em muitos projetos web, tais como:

-   [Motor de rotas simples e rápido](https://laravel.com/docs/routing).
-   [Poderoso container para injeção de dependências](https://laravel.com/docs/container).
-   Múltiplos back-ends para armazenamento de [sessões](https://laravel.com/docs/session) e [cache](https://laravel.com/docs/cache).
-   ORM expressivo e intuitivo para banco de dados ([Eloquent](https://laravel.com/docs/eloquent)).
-   Migrations para esquema de banco de dados independentes do sistema ([schema migrations](https://laravel.com/docs/migrations)).
-   [Processamento robusto de jobs em background](https://laravel.com/docs/queues).
-   [Broadcasting de eventos em tempo real](https://laravel.com/docs/broadcasting).

Laravel é acessível, poderoso e fornece as ferramentas necessárias para aplicações grandes e robustas.

---

## Sobre este projeto

Este projeto consiste em uma **API backend construída com Laravel com PHP 8.2.27**, que serve para gerenciar tarefas dos usuários. A API oferece recursos para cadastro, edição, exclusão e listagem de tarefas, além de autenticação segura utilizando tokens JWT para garantir que cada usuário acesse apenas suas próprias tarefas.

---

## Configuração para o banco de dados

Exemplo de variáveis no `.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=todo_app
DB_USERNAME=postgres
DB_PASSWORD=postgres

```

## Composer

```env
Versão 2.8.3
```

## Como subir a API

Para executar a API localmente, utilize o seguinte comando (com o **Composer** já instalado no sistema):

```bash
composer run start-api

```

Esse comando realiza os seguintes passos automaticamente:

1. **Restaura o banco de dados do zero**, executando todas as migrations para criar as tabelas necessárias.

2. **Popula o banco com dados de exemplo**, incluindo:

    - **Usuários de teste:**

        - `vitor@example.com` — Senha: `123456`
        - `maria@example.com` — Senha: `123456`

    - **Tarefas de exemplo** já associadas a esses usuários, para facilitar testes iniciais.

3. **Inicia o servidor local da API**, geralmente acessível através do endereço:

http://127.0.0.1:8000

---

A API estará pronta para ser consumida pelo frontend (ex: aplicação Vue.js).  
Você poderá autenticar-se utilizando os usuários de teste acima e testar funcionalidades como:

-   ✅ Listar tarefas do usuário autenticado
-   ✅ Criar novas tarefas
-   ✅ Editar descrição e status
-   ✅ Marcar como concluída
-   ✅ Excluir tarefas
