import { config } from 'dotenv';
import * as grpc from '@grpc/grpc-js';
import configureDependencies from '../dependencies/configuration';

config();

function main() {
  const server = new grpc.Server();
  const address = process.env.SERVER_ADDRESS ?? '';

  configureDependencies(server);

  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server running at ${address}`);
  });
}

main();
