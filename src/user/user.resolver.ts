import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login-response';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User, { name: 'signup' })
  signup(

    @Args('signupInput') signupInput: SignupInput
  ): Promise<User> {
    return this.userService.signup(signupInput);
  }

  @Query(() => LoginResponse)
  login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<LoginResponse> {
    return this.userService.login(loginInput);
  }

  @Query(() => [User])
  @UseGuards(GraphqlJwtAuthGuard)
  users(@Context() context: { req: RequestWithUser }): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  @UseGuards(GraphqlJwtAuthGuard)
  user(
    @Args('id') id: string,
    @Context() context: { req: RequestWithUser }
  ): Promise<User> {
    return this.userService.findOne(id);
  }

}
