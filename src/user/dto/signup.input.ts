import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class SignupInput {
  @IsString()
  @Field()
  firstName: string;

  @IsString()
  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  city?: string;
}
