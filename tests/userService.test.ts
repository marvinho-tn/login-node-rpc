import { ERRORS, MESSAGES } from '../src/common/utils/constants';
import { expect } from 'chai';
import ILoginService from '../src/modules/auth/domain/interfaces/loginService';
import IUserRepository from '../src/modules/auth/domain/interfaces/userRepository';
import LoginService from '../src/modules/auth/domain/services/loginService';
import Result from '../src/modules/auth/domain/models/result';
import sinon from 'sinon';
import UserRepository from '../src/modules/auth/infra/repositories/userRepository';

describe('LoginService', () => {
  let userRepositoryMock: sinon.SinonMock;
  let loginService: ILoginService;

  beforeEach(() => {
    userRepositoryMock = sinon.mock(UserRepository.prototype);
    loginService = new LoginService(userRepositoryMock as unknown as IUserRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Deve realizar login com sucesso', async () => {
    const validUser = { username: 'validuser', password: 'validpassword' };
    
    userRepositoryMock.expects('getUserByName')
      .withArgs(validUser.username)
      .returns(Promise.resolve(validUser));

    const result: Result = await loginService.login(validUser.username, validUser.password);

    expect(result.success).to.be.true;
    expect(result.message).to.equal(MESSAGES.LOGIN_SUCCESS);

    userRepositoryMock.verify();
  });

  it('Deve falhar no login com senha incorreta', async () => {
    const validUser = { username: 'validuser', password: 'validpassword' };
    const invalidPassword = 'wrongpassword';

    userRepositoryMock.expects('getUserByName')
      .withArgs(validUser.username)
      .returns(Promise.resolve(validUser));

    const result: Result = await loginService.login(validUser.username, invalidPassword);

    expect(result.success).to.be.false;
    expect(result.message).to.equal(ERRORS.INVALID_CREDENTIALS);

    userRepositoryMock.verify();
  });

  it('Deve falhar no login com nome de usuário incorreto', async () => {
    const invalidUser = { username: 'wronguser', password: 'validpassword' };

    userRepositoryMock.expects('getUserByName')
      .withArgs(invalidUser.username)
      .returns(Promise.resolve(null));

    const result: Result = await loginService.login(invalidUser.username, invalidUser.password);

    expect(result.success).to.be.false;
    expect(result.message).to.equal(ERRORS.INVALID_CREDENTIALS);

    userRepositoryMock.verify();
  });
});
