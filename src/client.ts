import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as readline from 'readline';

require('dotenv').config();

// Carregue o arquivo .proto
const packageDefinition = protoLoader.loadSync('./src/protos/login.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;

// Obtenha a definição do serviço AuthService
const AuthService = protoDescriptor.AuthService;

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

// Função principal do cliente
async function main() {
    // Solicita as credenciais do usuário
    const username = await prompt('Digite seu usuário: ');
    const password = await prompt('Digite sua senha: ');
    const address = process.env.SERVER_ADDRESS;

    // Conecte-se ao servidor gRPC
    const client = new AuthService(address, grpc.credentials.createInsecure());

    // Dados para o login
    const loginRequest = { username, password };

    // Chame o método Login do serviço
    client.Login(loginRequest, (err: grpc.ServiceError | null, response: { message: string; success: boolean }) => {
        if (err) {
            console.error('Erro ao realizar login:', err.message);
        } else {
            console.log('Resposta do servidor:', response);
        }
    });
}

main();
