import * as grpc from '@grpc/grpc-js';
import { expect } from 'chai';
import { ERRORS, MESSAGES } from '../../src/common/utils/constants';
import { config } from 'dotenv';
import AuthService from '../../src/modules/auth/infra/protos/configuration/authConfiguration';

config();

const SERVER_ADDRESS = process.env.SERVER_ADDRESS ?? '';
const DEFAULT_USERNAME = process.env.DEFAULT_USERNAME ?? '';
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD ?? '';

describe('Login gRPC Tests', () => {
  let client: any;

  before(() => {
    client = new AuthService(SERVER_ADDRESS, grpc.credentials.createInsecure());
  });

  it('Deve realizar login com sucesso', (done) => {
    const loginRequest = { username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD };

    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
      expect(err).to.be.null;
      expect(response).to.have.property('success', true);
      expect(response).to.have.property('message', MESSAGES.LOGIN_SUCCESS);
      done();
    });
  });

  it('Deve falhar no login com nome de usuário inválido', (done) => {
    const loginRequest = { username: 'wronguser', password: DEFAULT_PASSWORD };

    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
      expect(err).to.be.null;
      expect(response).to.have.property('success', false);
      expect(response).to.have.property('message', ERRORS.INVALID_CREDENTIALS);
      done();
    });
  });

  it('Deve falhar no login com senha inválida', (done) => {
    const loginRequest = { username: DEFAULT_USERNAME, password: 'wrongpassword' };

    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
      expect(err).to.be.null;
      expect(response).to.have.property('success', false);
      expect(response).to.have.property('message', ERRORS.INVALID_CREDENTIALS);
      done();
    });
  });

  it('Deve falhar no login sem nome de usuário', (done) => {
    const loginRequest = { username: '', password: DEFAULT_PASSWORD };

    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
      expect(err).to.be.null;
      expect(response).to.have.property('success', false);
      expect(response).to.have.property('message', ERRORS.REQUIRED_FIELDS);
      done();
    });
  });

  it('Deve falhar no login sem senha', (done) => {
    const loginRequest = { username: DEFAULT_USERNAME, password: '' };

    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
      expect(err).to.be.null;
      expect(response).to.have.property('success', false);
      expect(response).to.have.property('message', ERRORS.REQUIRED_FIELDS);
      done();
    });
  });

  after(() => {
    client.close();
  });
});
