import * as grpc from '@grpc/grpc-js';
import LoginService from '../services/loginService';
import { LOGIN_PROCESS_ERROR, LOGIN_SERVICE_ERROR } from '../utils/constants';
import UserRepository from '../repositories/userRepository';

async function login(
  call: grpc.ServerUnaryCall<{ username: string; password: string }, {}>,
  callback: grpc.sendUnaryData<{ message: string; success: boolean }>
) {
  const defaultUsername = process.env.DEFAULT_USERNAME ?? '';
  const defaultPassowrd = process.env.DEFAULT_PASSWORD ?? '';
  const repository = new UserRepository(defaultUsername, defaultPassowrd);
  const service = new LoginService(repository);

  try {
    const response = await service.login(
      call.request.username,
      call.request.password
    );

    callback(null, response);
  } catch (error) {
    console.error(LOGIN_SERVICE_ERROR, error);

    callback({
      code: grpc.status.INTERNAL,
      message: LOGIN_PROCESS_ERROR,
    } as grpc.ServiceError, null);
  }
}

export default login;