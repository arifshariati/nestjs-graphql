import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindPropertyInput {

    @Field({ nullable: true })
    id?: string;

    @Field({ nullable: true })
    country?: string;

    @Field({ nullable: true })
    city?: string;

    @Field({ nullable: true })
    rooms?: number;

    @Field({ nullable: true })
    rent?: number;

    @Field({ nullable: true })
    userId?: string;

}