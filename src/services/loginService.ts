import Result from '../models/result';
import UserRepository from '../repositories/userRepository';

export default class LoginService {
  login(username: string, password: string): Result {
    const repository = new UserRepository();
    const user = repository.getUserByName(username);

    if (password === user?.password) {
      return new Result('Login successful', true);
    } else {
      return new Result('Invalid credentials', false);
    }
  }
}