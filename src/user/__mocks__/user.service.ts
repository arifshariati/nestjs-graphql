import { loginResponseStub } from "../test/stubs/loginResponse.stub";
import { signupInputStub } from "../test/stubs/signupInput.stub";
import { userStub } from "../test/stubs/user.stub";

export const email = signupInputStub().email;

export const UserService = jest.fn().mockReturnValue({
    signup: jest.fn().mockResolvedValue(userStub()),
    login: jest.fn().mockResolvedValue(loginResponseStub()),
    findAll: jest.fn().mockResolvedValue([userStub()]),
    findOne: jest.fn().mockResolvedValue(userStub()),
    getUserByEmail: jest.fn().mockResolvedValue(signupInputStub().email),
});