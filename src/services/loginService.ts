import Result from '../models/result';
import UserRepository from '../repositories/userRepository';
import { INVALID_CREDENTIALS_MESSAGE, LOGIN_SUCCESSFUL_MESSAGE } from '../utils/constants';

export default class LoginService {
  login(username: string, password: string): Result {
    const repository = new UserRepository();
    const user = repository.getUserByName(username);

    if (password === user?.password) {
      return new Result(LOGIN_SUCCESSFUL_MESSAGE, true);
    } else {
      return new Result(INVALID_CREDENTIALS_MESSAGE, false);
    }
  }
}