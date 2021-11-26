import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginResponse {
  @Field()
  jwt: string;
}
