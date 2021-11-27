import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFavoriteInput {
  @Field()
  userId: string;

  @Field()
  propertyId: string;
}
