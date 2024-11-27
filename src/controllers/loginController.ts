import * as grpc from '@grpc/grpc-js';
import LoginService from '../services/loginService';

export default function login(
  call: grpc.ServerUnaryCall<{ username: string; password: string }, {}>,
  callback: grpc.sendUnaryData<{ message: string; success: boolean }>
): void {
  const service = new LoginService();
  const response = service.login(call.request.username, call.request.password);

  callback(null, { message: response.message, success: response.success });
}