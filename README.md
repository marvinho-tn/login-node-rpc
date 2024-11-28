# Login RPC WebSocket Project

Este é um projeto de autenticação que permite que um usuário realize login via WebSocket. A autenticação é realizada por meio de uma comunicação RPC (Remote Procedure Call) usando o protocolo gRPC para validação do login.

## Estrutura do Projeto

O projeto é composto por:

- **Servidor gRPC**: Responsável pela lógica de autenticação.
- **Servidor WebSocket**: Expondo o serviço de login para clientes que se conectam via WebSocket.
- **Cliente WebSocket**: Permite que o usuário se conecte e faça login usando WebSocket.

## Requisitos

Antes de rodar o projeto, você precisará garantir que as seguintes ferramentas estão instaladas:

- **Node.js**: Recomendado versão 16 ou superior.
- **npm**: O gerenciador de pacotes do Node.js.

## Instalação

### 1. Clone o Repositório

Primeiro, clone este repositório para o seu ambiente local:

```bash
git clone <URL do repositório>
cd <diretório do projeto>
```

### 2. Configuração das Variáveis de Ambiente

O projeto usa um arquivo `.env` para configurar as variáveis de ambiente. Para criar esse arquivo, copie o conteúdo de `env-sample` para um novo arquivo chamado `.env`:

```bash
cp .env-sample .env
```

Agora, edite o arquivo `.env` e configure os valores conforme necessário (como portas, credenciais, etc.).

### 3. Instalação das Dependências

Com o arquivo `.env` configurado, instale as dependências do projeto usando o `npm`:

```bash
npm install
```

### 4. Compilar o Projeto

Para compilar o projeto TypeScript para JavaScript, use o seguinte comando:

```bash
npm run build
```

### 5. Subir o Servidor gRPC

Para iniciar o servidor gRPC, use o comando abaixo:

```bash
npm run server
```

Isso irá subir o servidor gRPC, que ficará aguardando por conexões para validar o login via RPC.

### 6. Subir o Servidor WebSocket

Para iniciar o servidor WebSocket, use o comando:

```bash
npm run ws-server
```

Este servidor WebSocket será responsável por gerenciar as conexões de clientes e passar a comunicação para o serviço gRPC para autenticação.

### 7. Subir o Cliente WebSocket

Se você deseja testar a aplicação via WebSocket, pode iniciar o cliente WebSocket com:

```bash
npm run client
```

Esse cliente vai se conectar ao servidor WebSocket e permitir que você teste o login.

## Testes

Para rodar os testes do projeto, use o comando:

```bash
npm test
```

Isso executará todos os testes automatizados configurados no projeto.

## Scripts Disponíveis

- **`npm install`**: Instala todas as dependências do projeto.
- **`npm run build`**: Compila o projeto TypeScript para JavaScript.
- **`npm run server`**: Inicia o servidor gRPC.
- **`npm run ws-server`**: Inicia o servidor WebSocket.
- **`npm run client`**: Inicia o cliente WebSocket para testes.
- **`npm test`**: Executa os testes automatizados.

## Tecnologias Utilizadas

- **Node.js**
- **gRPC**
- **WebSocket**
- **TypeScript**
- **Jest** (para testes)
