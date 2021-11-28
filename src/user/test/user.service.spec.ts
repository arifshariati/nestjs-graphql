import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ILoginResponse } from '../interface';
import { UserService } from '../user.service';
import { loginInputStub } from './stubs/loginInput.stub';
import { loginResponseStub } from './stubs/loginResponse.stub';
import { signupInputStub } from './stubs/signupInput.stub';
import { userStub } from './stubs/user.stub';

// mock user.service
jest.mock('../user.service');

describe('UserService', () => {
  let service: UserService;

  const mockUsersRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({ id: '123', ...user }))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // signup 
  describe('signup', () => {
    describe('When signup is called', () => {

      let user: User;
      let existingUser: User;

      beforeEach(async () => {
        user = await service.signup(signupInputStub());
        existingUser = await service.getUserByEmail(signupInputStub().email);

      });

      test('then it should have called this.getUserByEmail(signupInput.email)', async () => {
        expect(service.getUserByEmail).toHaveBeenCalledWith(signupInputStub().email);
      });


      test('then it should have called userRespository.create()', async () => {
        expect(await mockUsersRepository.create(signupInputStub())).toEqual(signupInputStub());
      });

      test('then should save user to database and return user', async () => {
        expect(await mockUsersRepository.save(signupInputStub())).toEqual({ id: '123', ...signupInputStub() });
      });

    });

  });

  // login
  describe('login', () => {
    describe('Wehen login is called', () => {

      let loginResponse: ILoginResponse;

      beforeEach(async () => {
        loginResponse = await service.login(loginInputStub());
      });

      test('then it should have called useService.login()', () => {
        expect(service.login).toHaveBeenCalledWith(loginInputStub());
      });

      test('then should return jwt token', () => {
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
        expect(service.findAll).toHaveBeenCalledWith();
      });

      test('then should return list of users', () => {
        expect(users).toEqual([userStub()]);
      });

    });
  });

  // user
  describe('user', () => {
    describe('when user is called', () => {

      let user: User;
      beforeEach(async () => {

        user = await service.findOne(userStub().id);
      });

      test('then it should call userService.findOne()', () => {
        expect(service.findOne).toHaveBeenCalledWith(userStub().id)
      });

      test('then should return list of users', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

});


