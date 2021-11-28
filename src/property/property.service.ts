import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePropertyInput } from './dto/create-property.input';
import { FindPropertyInput } from './dto/find-property.input';
import { Property } from './entities/property.entity';


@Injectable()
export class PropertyService {

  constructor(
    @InjectRepository(Property) private propertiesRepository: Repository<Property>,
    private userService: UserService
    ){}

  create(createPropertyInput: CreatePropertyInput) {
    const newProperty = this.propertiesRepository.create(createPropertyInput);
    newProperty.createdAt = new Date();
    return this.propertiesRepository.save(newProperty);
  }

  async findAll(findPropertyInput:FindPropertyInput):Promise<Property[]> {
    return await this.propertiesRepository.find(findPropertyInput);
  }

  async findOne(id: string):Promise<Property> {
    return await this.propertiesRepository.findOneOrFail(id);
  }

  async getUser(userId: string): Promise<User> {
    return await this.userService.findOne(userId);
  }
  
}
