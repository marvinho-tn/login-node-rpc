import * as grpc from '@grpc/grpc-js';
import * as readline from 'readline';
import { config } from 'dotenv';
import AuthService from '../../modules/auth/infra/protos/configuration/authConfiguration';

config();

// Função para obter entrada do usuário
function prompt(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function main() {
    // Solicita as credenciais do usuário
    const username = await prompt('Digite seu usuário: ');
    const password = await prompt('Digite sua senha: ');
    const address = process.env.SERVER_ADDRESS;

    // Conecta ao servidor gRPC
    const client = new AuthService(address, grpc.credentials.createInsecure());

    // Dados para o login
    const loginRequest = { username, password };

    // Chama o método Login do serviço
    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
        if (err) {
            console.error('Erro ao realizar login:', err.message);
        } else {
            console.log('Resposta do servidor:', response);
        }
    });
}

main();
