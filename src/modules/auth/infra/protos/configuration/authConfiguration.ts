import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { PROTO_PATH } from '../../../../../common/utils/constants';

// Carrega o arquivo .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;

// Obtem a definição do serviço AuthService
const AuthService = protoDescriptor.AuthService;

export default AuthService;