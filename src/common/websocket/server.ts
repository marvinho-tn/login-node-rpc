import { config } from 'dotenv';
import * as grpc from '@grpc/grpc-js';
import * as WebSocket from 'ws';
import AuthService from '../../modules/auth/infra/protos/configuration/authConfiguration';

config();

const WEBSOCKET_PORT = parseInt(process.env.WEBSOCKET_SERVER_PORT ?? '');
const GRPC_SERVER_ADDRESS = process.env.SERVER_ADDRESS ?? '';
const wss = new WebSocket.Server({ port: WEBSOCKET_PORT });

console.log(`WebSocket server running on ws://localhost:${WEBSOCKET_PORT}`);

const grpcClient = new AuthService(
  GRPC_SERVER_ADDRESS,
  grpc.credentials.createInsecure()
);

wss.on('connection', (ws) => {
  console.log('Client connected via WebSocket.');

  ws.on('message', async (data) => {
    try {
      const parsed = JSON.parse(data.toString());

      if (parsed.action === 'login') {
        const request = { username: parsed.username, password: parsed.password };

        grpcClient.login(request, (err: any, response: any) => {
          if (err) {
            console.error('gRPC Error:', err);
            ws.send(JSON.stringify({ success: false, message: 'Internal error' }));
          } else {
            ws.send(JSON.stringify(response));
          }
        });
      } else {
        ws.send(JSON.stringify({ success: false, message: 'Invalid action' }));
      }
    } catch (error) {
      console.error('WebSocket Error:', error);
      ws.send(JSON.stringify({ success: false, message: 'Invalid request format' }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});
