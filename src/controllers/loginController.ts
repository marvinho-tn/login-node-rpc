import * as grpc from '@grpc/grpc-js';
import { ERRORS } from '../utils/constants';
import ILoginService from '../domain/services/loginService';

async function login(
  call: grpc.ServerUnaryCall<{ username: string; password: string }, {}>,
  callback: grpc.sendUnaryData<{ message: string; success: boolean }>
) {
  const service = call.metadata.get('loginService')[0] as unknown as ILoginService;

  try {
    const response = await service.login(
      call.request.username,
      call.request.password
    );

    callback(null, response);
  } catch (error) {
    console.error(ERRORS.LOGIN_ERROR, error);

    callback({
      code: grpc.status.INTERNAL,
      message: ERRORS.LOGIN_PROCESS_ERROR,
    } as grpc.ServiceError, null);
  }
}

export default login;