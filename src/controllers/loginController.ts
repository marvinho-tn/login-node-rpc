import * as grpc from '@grpc/grpc-js';
import LoginService from '../services/loginService';
import { LOGIN_PROCESS_ERROR, LOGIN_SERVICE_ERROR } from '../utils/constants';

export default function login(
  call: grpc.ServerUnaryCall<{ username: string; password: string }, {}>,
  callback: grpc.sendUnaryData<{ message: string; success: boolean }>
): void {
  const service = new LoginService();

  try {
    const response = service.login(
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