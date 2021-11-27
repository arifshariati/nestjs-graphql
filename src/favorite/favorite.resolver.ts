import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { FavoriteService } from './favorite.service';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { IRequestWithUser } from 'src/auth/interface';
import { User } from 'src/user/entities/user.entity';
import { Property } from 'src/property/entities/property.entity';

@Resolver(() => Favorite)
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Mutation(() => Favorite, { name: 'createFavorite'})
  @UseGuards(GraphqlJwtAuthGuard)
  async create(
    @Args('createFavoriteInput') createFavoriteInput: CreateFavoriteInput,
    @Context() context: { req: IRequestWithUser }
    ):Promise<Favorite> {
    return await this.favoriteService.create(createFavoriteInput);
  }

  @Query(() => [Favorite], { name: 'favorites' })
  @UseGuards(GraphqlJwtAuthGuard)
  async findAll(@Context() context: { req: IRequestWithUser }):Promise<Favorite[]> {
    return await this.favoriteService.findAll();
  }

  @Query(() => [Favorite], { name: 'myFavorites' })
  @UseGuards(GraphqlJwtAuthGuard)
  async myFavorites(
    @Args('id') id: string,
    @Context() context: { req: IRequestWithUser }
  ): Promise<Favorite[]>{
    return await this.favoriteService.myFavorites(id);
  }

  @ResolveField(() => User)
  user(@Parent() favorite: Favorite): Promise<User> {
    return this.favoriteService.getUser(favorite.userId);
  }

  @ResolveField(() => Property)
  property(@Parent() favorite: Favorite): Promise<Property> {
    return this.favoriteService.getProperty(favorite.propertyId);
  }

}
