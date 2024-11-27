import * as grpc from '@grpc/grpc-js';
import LoginService from '../services/loginService';
import LoginRequest from '../models/loginRequest';

const service = new LoginService();

export default function login(
    call: grpc.ServerUnaryCall<{ username: string; password: string }, {}>,
    callback: grpc.sendUnaryData<{ message: string; success: boolean }>
  ): void {
    const response = service.login(new LoginRequest(call.request.username, call.request.password));

    callback(null, { message: response.message, success: response.success });
}