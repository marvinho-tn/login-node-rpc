import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import login from '../../modules/auth/controllers/loginController';
import { PROTO_PATH } from '../utils/constants';
import UserRepository from '../../modules/auth/infra/repositories/userRepository';
import LoginService from '../../modules/auth/domain/services/loginService';

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

  // Injeção de dependências
  const defaultUsername = process.env.DEFAULT_USERNAME ?? '';
  const defaultPassword = process.env.DEFAULT_PASSWORD ?? '';
  const userRepository = new UserRepository(defaultUsername, defaultPassword);
  const loginService = new LoginService(userRepository);

  // Registro do serviço e suas dependências
  server.addService(AuthService.service, {
    Login: (
      call: grpc.ServerUnaryCall<{ username: string; password: string; }, {}>, 
      callback: grpc.sendUnaryData<{ message: string; success: boolean; }>
    ) => {
      call.metadata.add('loginService', loginService as any);
      login(call, callback);
    },
  });

  const address = process.env.SERVER_ADDRESS ?? '';

  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server running at ${address}`);
  });
}

main();
