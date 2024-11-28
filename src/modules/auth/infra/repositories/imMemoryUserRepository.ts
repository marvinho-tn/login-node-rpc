import IUserRepository from '../../domain/interfaces/userRepository';
import User from '../../domain/models/user';

export default class InMemoryUserRepository implements IUserRepository {
  private static readonly users: Array<User> = [];

  /**
   * Construtor para injetar o usuário padrão.
   * @param defaultPassowrd Senha padrão.
   * @param defaultUsername Usuário padrão.
   */
  constructor(defaultUsername: string, defaultPassowrd: string) {
    if (InMemoryUserRepository.users.length === 0) {
      InMemoryUserRepository.users.push(new User(defaultUsername, defaultPassowrd));
    }
  }

  /**
   * Busca um usuário pelo nome.
   * @param username Nome do usuário a ser buscado.
   * @returns Retorna o usuário encontrado ou `null` se não encontrado.
   */
  async getUserByName(username: string): Promise<User | null> {
    let returnUser = null;

    InMemoryUserRepository.users.forEach((user) => {
      if (username === user.username) {
        returnUser = user;
      }
    });

    return returnUser;
  }
}