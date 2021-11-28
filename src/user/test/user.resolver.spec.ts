import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { ILoginResponse } from '../interface';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';
import { loginInputStub } from './stubs/loginInput.stub';
import { loginResponseStub } from './stubs/loginResponse.stub';
import { signupInputStub } from './stubs/signupInput.stub';
import { userStub } from './stubs/user.stub';


// mock userService 
jest.mock('../user.service');

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
    // cleanup
    jest.clearAllMocks();
  });

  it('UserResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('UserService should be defined', () => {
    expect(service).toBeDefined();
  });

  // signup
  describe('signup', () => {
    describe('When signup is called', () => {

      let user: User;

      beforeEach(async () => {
        user = await service.signup(signupInputStub());
      });

      test('then it should call userService.signup()', () => {
        expect(service.signup).toHaveBeenCalledWith(signupInputStub());
      });

      test('then should return a user', () => {
        expect(user).toEqual(userStub());
      });

    });
  });

  // login
  describe('login', () => {
    describe('When login is called', () => {

      let loginResponse: ILoginResponse;

      beforeEach(async () => {
        loginResponse = await service.login(loginInputStub());
      });

      test('then it should have called userService.login()', () => {
        expect(service.login).toHaveBeenLastCalledWith(loginInputStub());
      });

      test('then it should return jwt token', () => {
        expect(loginResponse).toEqual(loginResponseStub());
      });

    });
  });

  // users 
  describe('users', () => {
    describe('When users is called', () => {

      let users: User[];

      beforeEach(async () => {
        users = await service.findAll();
      });

      test('then it should have called userService.findAll()', () => {
        expect(service.findAll).toHaveBeenCalled();
      });

      test('then it should return list of users', () => {
        expect(users).toEqual([userStub()]);
      });

    });
  });

  // user 
  describe('user', () => {
    describe('When user is called', () => {

      let user: User;

      beforeEach(async () => {
        user = await service.findOne(userStub().id);
      });

      test('then it should call userService.findOne()', () => {
        expect(service.findOne).toHaveBeenLastCalledWith(userStub().id);
      });

      test('then should return a user', () => {
        expect(user).toEqual(userStub());
      });

    });

  });

});
