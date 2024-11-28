import * as grpc from '@grpc/grpc-js';
import { Server } from "@grpc/grpc-js";
import login from '../../modules/auth/controllers/loginController';
import UserRepository from "../../modules/auth/infra/repositories/userRepository";
import LoginService from "../../modules/auth/domain/services/loginService";
import AuthService from "../../modules/auth/infra/protos/configuration/authConfiguration";

export default function configureDependencies(server: Server) {
    const defaultUsername = process.env.DEFAULT_USERNAME ?? '';
    const defaultPassword = process.env.DEFAULT_PASSWORD ?? '';
    const userRepository = new UserRepository(defaultUsername, defaultPassword);
    const loginService = new LoginService(userRepository);

    server.addService(AuthService.service, {
        Login: (
            call: grpc.ServerUnaryCall<{ username: string; password: string; }, {}>,
            callback: grpc.sendUnaryData<{ message: string; success: boolean; }>
        ) => {
            call.metadata.add('loginService', loginService as any);
            login(call, callback);
        },
    });
}