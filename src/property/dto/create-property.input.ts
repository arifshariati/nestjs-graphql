import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePropertyInput {
  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  city?: string;

  @Field()
  rooms: number;

  @Field()
  rent: number;

  @Field()
  userId: string;
}
