import LoginRequest from '../models/loginRequest';
import LoginResponse from '../models/loginResponse';

export default class LoginService {
  login(request: LoginRequest): LoginResponse {
      if (request.username === process.env.DEFAULT_USERNAME && request.password === process.env.DEFAULT_PASSWORD) {
        return new LoginResponse ('Login successful', true);
      } else {
        return new LoginResponse ('Invalid credentials', false);
      }
    }
}