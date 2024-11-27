import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import login from './controllers/loginController';
import { PROTO_PATH } from './utils/constants';

require('dotenv').config();

// Carrega o arquivo .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;

// Obtem a definição do serviço
const AuthService = protoDescriptor.AuthService;

// Configura o servidor
function main() {
  const server = new grpc.Server();

  server.addService(AuthService.service, { Login: login });

  const address = process.env.SERVER_ADDRESS ?? '';

  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server running at ${address}`);
  });
}

main();
