import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    // private authService: AuthService,
  ) { }

  async signup(signupInput: SignupInput): Promise<User> {
    const existingUser = await this.getUserByEmail(signupInput.email);
    if (existingUser) {
      throw new HttpException('User Already exists.', HttpStatus.BAD_REQUEST);

    } else {
      const newUser = this.usersRepository.create(signupInput);
      newUser.password = await this.authService.hashPassword(signupInput.password);
      newUser.createdAt = new Date();
      return this.usersRepository.save(newUser);
    }
  }

  async login(loginInput: LoginInput): Promise<LoginResponse> {

    const userRecord = await this.getUserByEmail(loginInput.email);
    if (!userRecord) throw new HttpException('Provided Email Address and Password does not match', HttpStatus.NOT_FOUND);
    const authResponse = await this.matchPassword(loginInput.password, userRecord.password);
    if (!authResponse) throw new HttpException('Provided Email Address and Password does not match', HttpStatus.NOT_FOUND);
    return {
      jwt: await this.authService.generateJWT(userRecord)
    }
  }

  findAll():Promise<User[]> {
    return this.usersRepository.find({ relations: ['properties', 'favorites'] });
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail(id, { relations: ['properties', 'favorites'] });
  }

  async getUserByEmail(email: string): Promise<User> {

    return await this.usersRepository.findOne({ email });
  };

  async matchPassword(providedPassword: string, toMatchPassword: string): Promise<boolean> {

    return await this.authService.comparePassword(providedPassword, toMatchPassword);
  }

}
