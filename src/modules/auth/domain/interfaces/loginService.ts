import Result from '../models/result';

export default interface ILoginService {
  /**
   * Realiza o login do usuário.
   * @param username Nome do usuário.
   * @param password Senha do usuário.
   * @returns Resultado da operação de login.
   */
  login(username: string, password: string): Promise<Result>;
}
