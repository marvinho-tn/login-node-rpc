import Result from '../models/result';
import UserRepository from '../repositories/userRepository';
import { INVALID_CREDENTIALS_MESSAGE, LOGIN_SUCCESSFUL_MESSAGE, REQUIRED_USERNAME_OR_PASSWORD } from '../utils/constants';

export default class LoginService {
  private readonly repository: UserRepository;

  /**
   * Construtor para injetar dependência do repositório de usuários.
   * @param repository Instância de UserRepository.
   */
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  /**
   * Realiza login de usuário.
   * @param username Nome do usuário.
   * @param password Senha do usuário.
   * @returns Resultado da operação de login.
   */
  async login(username: string, password: string): Promise<Result> {
    if (!username || !password) {
      return Result.failure(REQUIRED_USERNAME_OR_PASSWORD);
    }

    const user = await this.repository.getUserByName(username);

    if (user && password === user.password) {
      return Result.success(LOGIN_SUCCESSFUL_MESSAGE);
    }

    return Result.failure(INVALID_CREDENTIALS_MESSAGE);
  }
}
