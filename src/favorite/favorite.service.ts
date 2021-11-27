import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/property/entities/property.entity';
import { PropertyService } from 'src/property/property.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(@InjectRepository(Favorite) private favoriteRepository: Repository<Favorite>,
    private userService: UserService,
    private propertyService: PropertyService
  ) { }

  async create(createFavoriteInput: CreateFavoriteInput): Promise<Favorite> {
    const alreadyFavorite = await this.favoriteRepository.findOne(createFavoriteInput);

    if (alreadyFavorite) return alreadyFavorite;

    const newFavorite = this.favoriteRepository.create(createFavoriteInput);

    return await this.favoriteRepository.save(newFavorite);
  }

  async findAll(): Promise<Favorite[]> {
    return await this.favoriteRepository.find();
  }


  async myFavorites(id: string): Promise<Favorite[]> {
    return await this.favoriteRepository.find({ userId: id })
  }

  async getUser(userId: string): Promise<User> {
    return await this.userService.findOne(userId);
  }

  async getProperty(propertyId: string): Promise<Property> {
    return await this.propertyService.findOne(propertyId);
  }
}
