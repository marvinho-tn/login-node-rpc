import { MESSAGES, ERRORS } from '../../../../common/utils/constants';
import ILoginService from '../interfaces/loginService';
import IUserRepository from '../interfaces/userRepository';
import Result from '../models/result';

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
