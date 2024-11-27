import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import login from './controllers/loginController';

require('dotenv').config();

// Carrega o arquivo .proto
const packageDefinition = protoLoader.loadSync('login.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;

// Obtenha a definição do serviço
const AuthService = protoDescriptor.AuthService;

// Configuração do servidor
function main() {
  const server = new grpc.Server();

  server.addService(AuthService.service, { Login: login });
  
  const address = process.env.SERVER_ADDRESS ?? '';

  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server running at ${address}`);
    server.start();
  });
}

main();
