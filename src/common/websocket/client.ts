import { config } from 'dotenv';
import readlineSync from 'readline-sync';
import WebSocket from 'ws';

config();

const ws = new WebSocket(`ws://localhost:${process.env.WEBSOCKET_SERVER_PORT}`);
const username = readlineSync.question('Digite o usuário: ');
const password = readlineSync.question('Digite a senha: ');

ws.on('open', () => {
  console.log('Connected to WebSocket server.');

  const loginRequest = {
    action: 'login',
    username: username,
    password: password,
  };

  ws.send(JSON.stringify(loginRequest));
});

ws.on('message', (data) => {
  console.log('Response from server:', data.toString());
});

ws.on('close', () => {
  console.log('WebSocket connection closed.');
});