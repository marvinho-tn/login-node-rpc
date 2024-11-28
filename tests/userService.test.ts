import { ERRORS, MESSAGES } from '../src/common/utils/constants';
import ILoginService from '../src/modules/auth/domain/interfaces/loginService';
import IUserRepository from '../src/modules/auth/domain/interfaces/userRepository';
import LoginService from '../src/modules/auth/domain/services/loginService';
import Result from '../src/modules/auth/domain/models/result';

jest.mock('../src/modules/auth/domain/interfaces/userRepository');

describe('LoginService', () => {
  let userRepositoryMock: jest.Mocked<IUserRepository>;
  let loginService: ILoginService;

  beforeEach(() => {
    userRepositoryMock = {
      getUserByName: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    loginService = new LoginService(userRepositoryMock);
  });

  it('Deve realizar login com sucesso', async () => {
    const validUser = { username: 'validuser', password: 'validpassword' };

    userRepositoryMock.getUserByName.mockResolvedValue(validUser);

    const result: Result = await loginService.login(validUser.username, validUser.password);

    expect(result.success).toBe(true);
    expect(result.message).toBe(MESSAGES.LOGIN_SUCCESS);
  });

  it('Deve falhar no login com senha incorreta', async () => {
    const validUser = { username: 'validuser', password: 'validpassword' };
    const invalidPassword = 'wrongpassword';

    userRepositoryMock.getUserByName.mockResolvedValue(validUser);

    const result: Result = await loginService.login(validUser.username, invalidPassword);

    expect(result.success).toBe(false);
    expect(result.message).toBe(ERRORS.INVALID_CREDENTIALS);
  });

  it('Deve falhar no login com nome de usuário incorreto', async () => {
    const invalidUser = { username: 'wronguser', password: 'validpassword' };

    userRepositoryMock.getUserByName.mockResolvedValue(null);

    const result: Result = await loginService.login(invalidUser.username, invalidUser.password);

    expect(result.success).toBe(false);
    expect(result.message).toBe(ERRORS.INVALID_CREDENTIALS);
  });
});
