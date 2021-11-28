import { LoginResponse } from "src/user/dto/login-response";

export const loginResponseStub = (): LoginResponse => {
    return {
        jwt: '123'
    }
}