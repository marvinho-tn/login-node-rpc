import User from '../models/user';

export default class UserRepository {
  private readonly defaultUser: User;

  /**
   * Construtor para injetar o usuário padrão.
   * @param defaultPassowrd Senha padrão.
   * @param defaultUsername Usuário padrão.
   */
  constructor(defaultUsername: string, defaultPassowrd: string) {
    this.defaultUser = new User(defaultUsername, defaultPassowrd);
  }

  /**
   * Busca um usuário pelo nome.
   * @param username Nome do usuário a ser buscado.
   * @returns Retorna o usuário encontrado ou `null` se não encontrado.
   */
  async getUserByName(username: string): Promise<User | null> {
    if (username === this.defaultUser.username) {
      return this.defaultUser;
    }
    return null;
  }
}