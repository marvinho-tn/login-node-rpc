import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { expect } from 'chai';
import { PROTO_PATH, ERRORS, MESSAGES } from '../../src/common/utils/constants';
import { config } from 'dotenv';

config();

const SERVER_ADDRESS = process.env.SERVER_ADDRESS ?? '';
const DEFAULT_USERNAME = process.env.DEFAULT_USERNAME ?? '';
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD ?? '';

// Carregar definições do Proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const AuthService = protoDescriptor.AuthService;

// Testes de Login gRPC
describe('Login gRPC Tests', () => {
  let client: any;

  // Inicializar cliente gRPC antes dos testes
  before(() => {
    client = new AuthService(SERVER_ADDRESS, grpc.credentials.createInsecure());
  });

  // Teste de sucesso no login
  it('Deve realizar login com sucesso', (done) => {
    const loginRequest = { username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD };

    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
      expect(err).to.be.null;
      expect(response).to.have.property('success', true);
      expect(response).to.have.property('message', MESSAGES.LOGIN_SUCCESS);
      done();
    });
  });

  // Teste de nome de usuário inválido
  it('Deve falhar no login com nome de usuário inválido', (done) => {
    const loginRequest = { username: 'wronguser', password: DEFAULT_PASSWORD };

    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
      expect(err).to.be.null;
      expect(response).to.have.property('success', false);
      expect(response).to.have.property('message', ERRORS.INVALID_CREDENTIALS);
      done();
    });
  });

  // Teste de senha inválida
  it('Deve falhar no login com senha inválida', (done) => {
    const loginRequest = { username: DEFAULT_USERNAME, password: 'wrongpassword' };

    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
      expect(err).to.be.null;
      expect(response).to.have.property('success', false);
      expect(response).to.have.property('message', ERRORS.INVALID_CREDENTIALS);
      done();
    });
  });

  // Teste de nome de usuário ausente
  it('Deve falhar no login sem nome de usuário', (done) => {
    const loginRequest = { username: '', password: DEFAULT_PASSWORD };

    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
      expect(err).to.be.null;
      expect(response).to.have.property('success', false);
      expect(response).to.have.property('message', ERRORS.REQUIRED_FIELDS);
      done();
    });
  });

  // Teste de senha ausente
  it('Deve falhar no login sem senha', (done) => {
    const loginRequest = { username: DEFAULT_USERNAME, password: '' };

    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
      expect(err).to.be.null;
      expect(response).to.have.property('success', false);
      expect(response).to.have.property('message', ERRORS.REQUIRED_FIELDS);
      done();
    });
  });

  // Fechar cliente após os testes
  after(() => {
    client.close();
  });
});
