import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { CreatePropertyInput } from './dto/create-property.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { IRequestWithUser } from 'src/auth/interface';
import { FindPropertyInput } from './dto/find-property.input';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Property)
export class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Mutation(() => Property, { name: 'createProperty'})
  @UseGuards(GraphqlJwtAuthGuard)
  create(
    @Args('createPropertyInput') createPropertyInput: CreatePropertyInput,
    @Context() context: { req: IRequestWithUser }
    ) {
    return this.propertyService.create(createPropertyInput);
  }

  @Query(() => [Property], { name: 'properties' })
  @UseGuards(GraphqlJwtAuthGuard)
  findAll(
    @Args('findPropertyInput') findPropertyInput: FindPropertyInput,
    @Context() context: { req: IRequestWithUser }
    ) {
    return this.propertyService.findAll(findPropertyInput);
  }

  @Query(() => Property, { name: 'property' })
  @UseGuards(GraphqlJwtAuthGuard)
  findOne(
    @Args('id') id: string, 
    @Context() context: { req: IRequestWithUser }
    ) {
    return this.propertyService.findOne(id);
  }


  @ResolveField(returns => User)
  owner(@Parent() property: Property): Promise<User> {
    return this.propertyService.getUser(property.userId)
  }
}
