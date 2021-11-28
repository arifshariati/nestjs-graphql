import { User } from "src/user/entities/user.entity";

export const userStub = (): User => {
    return {
        id: '123',
        firstName: 'Mohammad Arif',
        lastName: 'Shariati',
        email: 'mohammad.arif.fast@hotmail.com',
        password: '123',
        createdAt: new Date('2021-11-28')
    }
};