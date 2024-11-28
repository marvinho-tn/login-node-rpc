import Result from '../../domain/models/result';
import IUserRepository from '../../domain/repositories/userRepository';
import ILoginService from '../../domain/services/loginService';
import { MESSAGES, ERRORS } from '../../utils/constants';

export default class LoginService implements ILoginService {
  private readonly repository: IUserRepository;

  /**
   * Construtor para injetar dependência do repositório de usuários.
   * @param repository Instância de UserRepository.
   */
  constructor(repository: IUserRepository) {
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
      return Result.failure(ERRORS.REQUIRED_FIELDS);
    }

    const user = await this.repository.getUserByName(username);

    if (user && password === user.password) {
      return Result.success(MESSAGES.LOGIN_SUCCESS);
    }

    return Result.failure(ERRORS.INVALID_CREDENTIALS);
  }
}
