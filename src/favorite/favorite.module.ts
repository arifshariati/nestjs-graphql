import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteResolver } from './favorite.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { UserModule } from 'src/user/user.module';
import { PropertyModule } from 'src/property/property.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Favorite]),
    UserModule,
    PropertyModule
  ],
  providers: [FavoriteResolver, FavoriteService]
})
export class FavoriteModule {}
