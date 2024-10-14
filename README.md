# Madereira_Marketplace

## (Para desenvolvedores) Preparação do Ambiente de desenvolvimento

### Install Node js

Projeto roda na versão **16.17.1** do Node

[**Download do instalador**](https://nodejs.org/dist/v16.17.1/)

Para Windows escolha o arquivo .msi

Após a instalação é possível verificar com o comando:

```shell
node --version
```

```shell
npm --version
```

```shell
npm version
```

### MongoDB

MongoDB será utilizado para o banco de dados da aplicação
Necessário criar um projeto e um cluster para testar o projeto

### Configurar arquivo .env

criar um arquivo .env para configurar variáveis de ambiente
com a seguinte estrutura:

```
API_URL=/api/v1
CONNECTION_STRING='mongodb+srv://<user-name>:<user-password>@<mongo-db-cluster-info>'
```

### (Opcional) Extenções recomendadas VScode

- Prettier - Code formatter

_É preciso configurar o pretier no projeto_

- Node.js Extension Pack

### (Opcional) Postman

Postman será usado para facilitar o teste com as APIs

[**Download**](https://www.postman.com/downloads/)

## Inicalizar aplicação

para iniciar o projeto após configurações basta digitar incialmente os seguintes comandos:

```shell
# Para a primeira vez
npm install
# Para as outras vezes
npm start
```
