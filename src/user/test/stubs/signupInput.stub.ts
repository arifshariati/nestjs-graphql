import { SignupInput } from "src/user/dto/signup.input";

export const signupInputStub = (): SignupInput => {
    return {
        email: 'mohammad.arif.fast@hotmail.com',
        password: '123',
        firstName: 'Mohammad Arif',
        lastName: 'Shariati'
    }
};