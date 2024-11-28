// Caminho do arquivo proto para o serviço gRPC
export const PROTO_PATH = './src/protos/login.proto';

// Mensagens de sucesso
export const MESSAGES = {
  LOGIN_SUCCESS: 'Autorizado com sucesso.',
};

// Mensagens de erro
export const ERRORS = {
  INVALID_CREDENTIALS: 'Crendenciais inválidas.',
  LOGIN_ERROR: 'Erro no serviço de login:',
  LOGIN_PROCESS_ERROR: 'Erro ao processar o login. Tente novamente mais tarde.',
  REQUIRED_FIELDS: 'Nome de usuário e senha são obrigatórios.',
};