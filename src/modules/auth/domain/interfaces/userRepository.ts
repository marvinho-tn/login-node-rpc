import User from '../models/user';

export default interface IUserRepository {
  /**
   * Busca um usuário pelo nome de usuário.
   * @param username Nome do usuário.
   * @returns Usuário encontrado ou undefined.
   */
  getUserByName(username: string): Promise<User | null>;
}
