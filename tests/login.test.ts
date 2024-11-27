import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { expect } from 'chai';
import { PROTO_PATH, LOGIN_SUCCESSFUL_MESSAGE, INVALID_CREDENTIALS_MESSAGE } from '../src/utils/constants';

require('dotenv').config();

const SERVER_ADDRESS = process.env.SERVER_ADDRESS ?? '';
const DEFAULT_USERNAME = process.env.DEFAULT_USERNAME ?? '';
const DEFAULT_PASSW0RD = process.env.DEFAULT_PASSWORD ?? '';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const AuthService = protoDescriptor.AuthService;

describe('Login gRPC Tests', () => {
  let client: any;

  before(() => {
    client = new AuthService(SERVER_ADDRESS, grpc.credentials.createInsecure());
  });

  it('Deve realizar login com sucesso', (done) => {
    const loginRequest = { username: DEFAULT_USERNAME, password: DEFAULT_PASSW0RD };

    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
      expect(err).to.be.null;
      expect(response).to.have.property('success', true);
      expect(response).to.have.property('message', LOGIN_SUCCESSFUL_MESSAGE);
      done();
    });
  });

  it('Deve falhar no login com nome de usuário inválido', (done) => {
    const loginRequest = { username: 'wronguser', password: DEFAULT_PASSW0RD };

    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
      expect(err).to.be.null;
      expect(response).to.have.property('success', false);
      expect(response).to.have.property('message', INVALID_CREDENTIALS_MESSAGE);
      done();
    });
  });

  it('Deve falhar no login com senha inválida', (done) => {
    const loginRequest = { username: DEFAULT_USERNAME, password: 'wrongpassword' };

    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
      expect(err).to.be.null;
      expect(response).to.have.property('success', false);
      expect(response).to.have.property('message', INVALID_CREDENTIALS_MESSAGE);
      done();
    });
  });

  after(() => {
    client.close();
  });
});
