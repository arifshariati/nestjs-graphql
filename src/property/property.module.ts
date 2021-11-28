import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyResolver } from './property.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Property]),
    UserModule
  ],
  providers: [PropertyResolver, PropertyService],
  exports:[PropertyService]
})
export class PropertyModule {}
